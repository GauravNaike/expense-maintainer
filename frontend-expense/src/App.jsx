import { useState, useEffect } from "react"
import { getTotal } from "./services/api"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Filter from "./components/FilterBar"
import Login from "./components/Login"
import Register from "./components/Register"

export default function App() {

  const [active, setActive] = useState("dashboard")
  const [total, setTotal] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [username, setUsername] = useState("")

  // 🔐 Check token on refresh
  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUsername = localStorage.getItem("username")

    if (token) {
      setIsLoggedIn(true)
      setUsername(storedUsername || "User")
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      fetchTotal()
    }
  }, [isLoggedIn])

  const fetchTotal = async () => {
    try {
      const res = await getTotal()
      setTotal(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    setUsername("")
  }

  // ================= LOGIN / REGISTER =================
  if (!isLoggedIn) {
    return showRegister ? (
      <Register switchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login
        onLogin={() => {
          const storedUsername = localStorage.getItem("username")
          setUsername(storedUsername || "User")
          setIsLoggedIn(true)
        }}
        switchToRegister={() => setShowRegister(true)}
      />
    )
  }

  // ================= MAIN APP =================
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white relative overflow-hidden">

      {/* 🔥 Soft Glow Background Effect */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500 opacity-20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

      {/* Sidebar */}
      <div className="w-64 bg-white/10 backdrop-blur-lg p-6 space-y-6 border-r border-white/20 relative z-10">

        <h1 className="text-2xl font-bold mb-4">💰 Expense Tracker</h1>

        <p className="text-sm text-white/70 mb-6">
          Logged in as:
          <br />
          <span className="font-semibold">{username}</span>
        </p>

        {["dashboard", "add", "list", "filter", "total"].map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition 
            ${active === item ? "bg-white text-indigo-900" : "hover:bg-white/20"}`}
          >
            {item === "dashboard" && "Dashboard"}
            {item === "add" && "Add Expense"}
            {item === "list" && "Expense List"}
            {item === "filter" && "Filter"}
            {item === "total" && "Total"}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 mt-6 transition"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 relative z-10">

        {/* ================= DASHBOARD ================= */}
        {active === "dashboard" && (
          <div className="space-y-8">

            <div>
              <h2 className="text-4xl font-bold">
                Welcome, {username} 👋
              </h2>
              <p className="text-white/70 mt-3 text-lg max-w-xl">
                Track your daily expenses, analyze spending patterns,
                and manage your finances smartly with a clean and powerful dashboard.
              </p>
            </div>

            {/* Total Card */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 max-w-sm">
              <p className="text-white/70">Total Expenses</p>
              <h3 className="text-4xl font-bold mt-2">
                ₹ {total}
              </h3>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
                <h3 className="text-xl font-semibold mb-2">➕ Add Expenses</h3>
                <p className="text-white/70 text-sm">
                  Quickly log your daily spending with category and description.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
                <h3 className="text-xl font-semibold mb-2">🔎 Filter & Analyze</h3>
                <p className="text-white/70 text-sm">
                  Filter expenses by category to understand where your money goes.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
                <h3 className="text-xl font-semibold mb-2">📊 Track Totals</h3>
                <p className="text-white/70 text-sm">
                  Instantly view your total expenses and stay in control.
                </p>
              </div>

            </div>

          </div>
        )}

        {active === "add" && <ExpenseForm />}
        {active === "list" && <ExpenseList />}
        {active === "filter" && <Filter />}
        {active === "total" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Total Expenses</h2>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md max-w-md">
              <p className="text-4xl font-bold">
                ₹ {total}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

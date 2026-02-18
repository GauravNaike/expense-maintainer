import { useState } from "react"
import { loginUser } from "../services/api"

export default function Login({ onLogin, switchToRegister }) {

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await loginUser(form)

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("username", res.data.name)

            onLogin()   // 🔥 tell App user logged in

        } catch (error) {
            console.error(error)
            alert("Login failed ❌")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">

            <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/20 w-96 shadow-2xl">

                <h2 className="text-3xl font-bold text-white text-center mb-8">
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-white/70 mt-6 text-sm">
                    Don’t have an account?{" "}
                    <span
                        onClick={switchToRegister}
                        className="text-indigo-300 cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>

            </div>
        </div>
    )
}

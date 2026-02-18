import { useState } from "react"
import { registerUser } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Register({ switchToLogin }) {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await registerUser(form)

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("username", res.data.name)

            navigate("/")
            window.location.reload()

        } catch (error) {
            console.error(error)
            alert("Registration failed ❌")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-96 border border-white/20 text-white">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Create Account ✨
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/20 outline-none"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/20 outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/20 outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
                    >
                        Register
                    </button>

                </form>

                {/* ✅ FIXED LOGIN SWITCH BUTTON */}
                <p className="text-center text-sm text-white/70 mt-4">
                    Already have an account?{" "}
                    <button
                        onClick={switchToLogin}
                        className="text-indigo-300 hover:underline"
                    >
                        Login
                    </button>
                </p>

            </div>
        </div>
    )
}

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (email && password) {
            console.log("Login exitoso ✅")
            navigate("/recharge-dashboard")
        } else {
            alert("Por favor ingresa las credenciales")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
            {/* Fondos animado */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-200"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
            </div>

            {/* Contenido */}
            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-lg shadow-2xl p-8"
            >
                {/* Icono */}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8-4H8m8 8H8m-2-6v8a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2z" />
                    </svg>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${!isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Register
                    </button>
                </div>

                {/* Inputs */}
                {!isLogin && (
                    <div className="mb-4">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-11 border border-gray-200 rounded px-3 focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                            required
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 border border-gray-200 rounded px-3 focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-11 border border-gray-200 rounded px-3 pr-10 focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁"}
                        </button>
                    </div>
                </div>

                {!isLogin && (
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-11 border border-gray-200 rounded px-3 focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                            required
                        />
                    </div>
                )}

                {isLogin && (
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center space-x-2 text-sm text-gray-600">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                            Forgot password?
                        </a>
                    </div>
                )}

                <button
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg rounded-lg"
                    type="submit"
                >
                    {isLogin ? "Log in" : "Sign up"}
                </button>

                <div className="text-center text-sm text-gray-600 mt-4">
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                                onClick={() => setIsLogin(false)}
                            >
                                Sign up here
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                                onClick={() => setIsLogin(true)}
                            >
                                Log in
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    )
}

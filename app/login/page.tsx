'use client'

import { useState } from 'react'

export default function LoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        })

        if (res.ok) {
            window.location.href = "/" // reload app
        } else {
            setError("Incorrect password")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-8 rounded-2xl shadow-lg space-y-4 w-80"
            >
                <h1 className="text-xl font-bold text-center">🔐 Enter Password</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="btn-primary w-full"
                >
                    Unlock
                </button>
            </form>
        </div>
    )
}

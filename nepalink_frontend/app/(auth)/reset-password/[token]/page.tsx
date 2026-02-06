'use client'

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Input } from "../../_components/ui/Input"
import { Button } from "../../_components/ui/Button"
import { AuthCard } from "../../_components/ui/AuthCard"
import { handleResetPassword } from "@/lib/actions/forgot-actions"

export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useParams()   // ✅ useParams hook for dynamic routes
  const token = params?.token as string

  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const res = await handleResetPassword(token, password)
    setMessage(res.message)

    if (res.success) {
      setTimeout(() => router.push("/login"), 1000)
    }

    setLoading(false)
  }

  return (
    <AuthCard title="Reset Password" description="Enter your new password">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        {message && <p className="text-sm text-center mt-4">{message}</p>}
      </form>
    </AuthCard>
  )
}

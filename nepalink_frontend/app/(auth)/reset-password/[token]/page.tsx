'use client'

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Input } from "../../_components/ui/Input"
import { Button } from "../../_components/ui/Button"
import { AuthCard } from "../../_components/ui/AuthCard"
import { handleResetPassword } from "@/lib/actions/forgot-actions"
import { Loader2, ShieldCheck, ArrowLeft, KeyRound } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useParams()
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
    <AuthCard title="Reset Password" description="Enter your new secure password">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* New Password Input with High Contrast */}
        <div className="space-y-1">
          <Input
            label="New Security Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-slate-900! font-normal border-slate-300 focus:border-sky-500 h-11 transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white! font-medium text-base h-11 flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Update Password</span>
              </>
            )}
          </Button>

          {/* Back Button with Icon */}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium py-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Return to Login
          </button>
        </div>

        {/* Status Message with conditional coloring */}
        {message && (
          <div className={`p-3 rounded-lg text-sm text-center font-medium border animate-in fade-in slide-in-from-top-1 ${
            message.toLowerCase().includes("success") 
              ? "bg-green-50 border-green-100 text-green-700" 
              : "bg-red-50 border-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}
      </form>
    </AuthCard>
  )
}
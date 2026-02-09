'use client'

import { Input } from '../_components/ui/Input'
import { Button } from '../_components/ui/Button'
import { AuthCard } from '../_components/ui/AuthCard'
import { useForgotPasswordForm } from '@/hooks/useForgotPasswordForm'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    serverError,
    serverSuccess,
    loading,
  } = useForgotPasswordForm()

  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email to receive a reset link"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Email Input with no-bleed text */}
        <Input
          label="Email Address"
          type="email"
          placeholder="yourgmail@nepalink.com"
          {...register('email')}
          error={errors.email?.message}
          className="text-slate-900! font-normal border-slate-300 focus:border-sky-500 h-11 transition-all"
        />

        {/* Server Messaging */}
        {serverError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm font-medium">
            {serverError}
          </div>
        )}
        {serverSuccess && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm font-medium">
            {serverSuccess}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white! font-medium text-base h-11 flex items-center justify-center gap-2 transition-all shadow-sm"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Mail size={18} />
                <span>Send Reset Link</span>
              </>
            )}
          </Button>

          {/* Back Button with Icon */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium py-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </button>
        </div>
      </form>
    </AuthCard>
  )
}
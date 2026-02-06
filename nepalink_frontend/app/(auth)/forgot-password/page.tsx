'use client'

import { Input } from '../_components/ui/Input'
import { Button } from '../_components/ui/Button'
import { AuthCard } from '../_components/ui/AuthCard'
import { useForgotPasswordForm } from '@/hooks/useForgotPasswordForm'

export default function ForgotPasswordPage() {
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
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
        {serverSuccess && <p className="text-green-600 text-sm">{serverSuccess}</p>}

        <Button
          type="submit"
          className="w-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </AuthCard>
  )
}

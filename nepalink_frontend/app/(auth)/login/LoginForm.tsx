'use client'

import { Input } from '../_components/ui/Input'
import { Button } from '../_components/ui/Button'
import { useLoginForm } from '@/hooks/useLoginForm'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    goToSignup,
    serverError,
    serverSuccess,
    loading,
  } = useLoginForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      {serverSuccess && <p className="text-green-600 text-sm">{serverSuccess}</p>}

      <Button
        type="submit"
        className="w-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="flex flex-col items-center gap-2 mt-4 text-sm text-gray-600">
        <p>
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={goToSignup}
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </button>
        </p>

        <p>
          <button
            type="button"
            onClick={() => router.push('/forgot-password')}
            className="text-blue-600 hover:underline font-medium"
          >
            Forgot Password?
          </button>
        </p>
      </div>
    </form>
  )
}

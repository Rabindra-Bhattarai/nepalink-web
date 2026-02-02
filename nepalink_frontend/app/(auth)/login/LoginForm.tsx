'use client'

import { Input } from '../_components/ui/Input'
import { Button } from '../_components/ui/Button'
import { useLoginForm } from '@/hooks/useLoginForm'
// import { useAuth } from '@/contexts/AuthContext';

// sir ko code ma authcontext file hola search gara
//logout ma ne thapne(sir le page.tsx ma halnu va cha root wala, of auth)

export const LoginForm = () => {
  // const { checkAuth } = useAuth();
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
      {/* await checkAuth(); */}
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      {serverSuccess && <p className="text-green-600 text-sm">{serverSuccess}</p>}

      <Button
        type="submit"
        className="w-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{' '}
        <button
          type="button"
          onClick={goToSignup}
          className="text-blue-600 hover:underline font-medium"
        >
          Register
        </button>
      </p>
    </form>
  )
}

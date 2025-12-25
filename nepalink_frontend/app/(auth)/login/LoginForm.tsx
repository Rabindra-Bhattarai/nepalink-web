'use client'

import { Input } from '../_components/ui/Input'
import { Button } from '../_components/ui/Button'
import { useLoginForm } from '@/hooks/useLoginForm'

export const LoginForm = () => {
  const {
    role,
    switchRole,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    goToSignup, // ✅ new handler from hook
  } = useLoginForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Role Toggle */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => switchRole('member')}
          className={`px-4 py-2 font-medium border rounded-md transition-all duration-200 ${
            role === 'member' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          }`}
        >
          Member
        </button>
        <button
          type="button"
          onClick={() => switchRole('caregiver')}
          className={`px-4 py-2 font-medium border rounded-md transition-all duration-200 ${
            role === 'caregiver' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          }`}
        >
          Caregiver
        </button>
      </div>

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

      <Button type="submit" className="w-full font-semibold text-lg">
        Sign In
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

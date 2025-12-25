'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema'
import { z } from 'zod'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import Link from 'next/link'

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data)
    window.location.href = '/auth/dashboard'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button type="button" className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
          Student
        </button>
        <button type="button" className="px-4 py-2 rounded-full bg-gray-100 text-gray-600">
          Caregiver
        </button>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="email@nepalink.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        placeholder="********"
        {...register('password')}
        error={errors.password?.message}
      />
      <Button type="submit">Sign In</Button>
      <p className="text-sm text-center mt-4 text-black">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  )
}

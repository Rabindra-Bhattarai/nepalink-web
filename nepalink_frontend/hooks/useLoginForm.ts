import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { handleLogin } from '@/lib/actions/auth-actions'
import { useState } from 'react'

type LoginFormData = z.infer<typeof loginSchema>

export const useLoginForm = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [serverSuccess, setServerSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null)
    setServerSuccess(null)
    setLoading(true)

    const res = await handleLogin({
      email: data.email,
      password: data.password,
    })

    if (res.success) {
      setServerSuccess(res.message)
      setTimeout(() => router.push('/dashboard/member-dashboard'), 1500)
    } else {
      setServerError(res.message)
    }

    setLoading(false)
  }

  const goToSignup = () => {
    router.push('/register')
  }

  return { ...form, onSubmit, goToSignup, serverError, serverSuccess, loading }
}

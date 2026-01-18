import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { handleLogin } from '@/lib/actions/auth-actions'

type LoginFormData = z.infer<typeof loginSchema>

export const useLoginForm = () => {
  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    const res = await handleLogin({
      email: data.email,
      password: data.password,
    })

    if (res.success) {
      console.log('Login success:', res.data)
      // redirect based on role or just to dashboard
      router.push('/dashboard/member-dashboard')
    } else {
      alert(res.message)
    }
  }

  const goToSignup = () => {
    router.push('/register')
  }

  return { ...form, onSubmit, goToSignup }
}

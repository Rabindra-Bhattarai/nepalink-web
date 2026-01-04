import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/schemas/registerSchema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

type RegisterFormData = z.infer<typeof registerSchema>

export const useRegisterForm = () => {
  const router = useRouter()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    console.log('Member register data:', data)
    router.push('/login')
  }

  return { ...form, onSubmit }
}

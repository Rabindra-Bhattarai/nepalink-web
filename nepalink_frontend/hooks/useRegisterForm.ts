import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/schemas/registerSchema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { handleRegister } from '@/lib/actions/auth-actions'

type RegisterFormData = z.infer<typeof registerSchema>

export const useRegisterForm = () => {
  const router = useRouter()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    const res = await handleRegister({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    })

    if (res.success) {
      console.log('Register success:', res.data)
      router.push('/login')
    } else {
      // surface backend error message to UI
      alert(res.message)
    }
  }

  return { ...form, onSubmit }
}

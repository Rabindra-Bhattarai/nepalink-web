import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/schemas/registerSchema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'

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
    try {
      const res = await axios.post('http://192.168.1.4:3000/api/auth/register', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      })

      console.log('Register success:', res.data)
      router.push('/login')
    } catch (error: any) {
      console.error('Register error:', error.response?.data || error.message)
    }
  }

  return { ...form, onSubmit }
}

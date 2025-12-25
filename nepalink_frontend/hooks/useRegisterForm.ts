import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/schemas/registerSchema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type RegisterFormData = z.infer<typeof registerSchema>

export const useRegisterForm = () => {
  const router = useRouter()
  const [role, setRole] = useState<'member' | 'caregiver'>('member')

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'member',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const switchRole = (newRole: 'member' | 'caregiver') => {
    setRole(newRole)
    form.setValue('role', newRole)
  }

  const onSubmit = async (data: RegisterFormData) => {
    console.log('Register data:', data)
    router.push('/login')
  }

  return { role, switchRole, ...form, onSubmit }
}

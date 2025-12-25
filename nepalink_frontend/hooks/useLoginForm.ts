import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type LoginFormData = z.infer<typeof loginSchema>

export const useLoginForm = () => {
  const router = useRouter()
  const [role, setRole] = useState<'member' | 'caregiver'>('member')

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'member',
      email: '',
      password: '',
    },
  })

  const switchRole = (newRole: 'member' | 'caregiver') => {
    setRole(newRole)
    form.setValue('role', newRole)
  }

  // ✅ Login submit handler
  const onSubmit = async (data: LoginFormData) => {
    console.log('Login data:', data)
    router.push('/dashboard')
  }

  // ✅ Signup navigation handler
  const goToSignup = () => {
    router.push('/register')
  }

  return { role, switchRole, ...form, onSubmit, goToSignup }
}

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

type LoginFormData = z.infer<typeof loginSchema>

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'admin123'

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
    // ✅ Admin check
    if (data.email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD) {
      router.push('/dashboard/admin-dashboard')
    } else {
      // ✅ Member login (registered users)
      router.push('/dashboard/member-dashboard')
    }
  }

  const goToSignup = () => {
    router.push('/register')
  }

  return { ...form, onSubmit, goToSignup }
}

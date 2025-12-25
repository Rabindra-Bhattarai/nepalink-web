import { AuthCard } from '../_components/ui/AuthCard'
import { LoginForm } from './LoginForm'

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome to NepaLink"
      description="Sign in to your account"
    >
      <LoginForm />
    </AuthCard>
  )
}
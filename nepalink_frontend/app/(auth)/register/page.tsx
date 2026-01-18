import { AuthCard } from "../_components/ui/AuthCard";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your NepaLink account"
      description="Join us to access verified caregivers and real-time updates"
    >
      <RegisterForm />
    </AuthCard>
  );
}

interface AuthCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => (
  <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl animate-fade-in">
    <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">{title}</h2>
    {subtitle && <p className="text-gray-600 text-center mb-6">{subtitle}</p>}
    {children}
  </div>
)

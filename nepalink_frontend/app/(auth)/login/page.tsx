'use client'

import { LoginForm } from '../_components/forms/LoginForm'
import { AuthCard } from '../_components/ui/AuthCard'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left branding section */}
      <div className="w-1/2 bg-gradient-to-br from-blue-100 to-blue-300 p-12 flex flex-col justify-center">
        <div className="mb-6">
          <Image
            src="/nepalink.png"
            alt="Nepalink Logo"
            width={96}
            height={96}
            className="rounded-full shadow-md bg-white"
          />
        </div>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Professional elder care services that bridge the distance. Stay connected, ensure quality care, and find peace of mind knowing your loved ones are in good hands.
        </p>
        <ul className="space-y-3 text-gray-700 font-medium">
          <li>✔ Verified Caregivers: Background-checked professionals you can trust.</li>
          <li>✔ Real-Time Updates: Track tasks, location, and new activities live.</li>
          <li>✔ Seamless Communication: Stay in touch with instant messaging and alerts.</li>
        </ul>
      </div>

      {/* Right login form section */}
      <div className="w-1/2 flex items-center justify-center p-12 bg-gray-50">
        <AuthCard title="Welcome to Nepalink" subtitle="Sign in to your account">
          <LoginForm />
        </AuthCard>
      </div>
    </div>
  )
}

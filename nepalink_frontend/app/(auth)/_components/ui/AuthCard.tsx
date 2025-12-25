import Image from 'next/image'
import { ReactNode } from 'react'

export const AuthCard = ({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-10 w-1/2 text-blue-900 space-y-6">
        <div className="flex items-center gap-3">
          <Image
            src="/nepalink.png"
            alt="Logo"
            width={80}
            height={80}
            className="ring-2 ring-blue-200 rounded-full"
          />
          <h1 className="text-3xl font-bold">NepaLink</h1>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Verified Caregivers</h2>
          <p className="text-sm text-gray-700">Background-checked professionals you can trust</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Real-Time Updates</h2>
          <p className="text-sm text-gray-700">Track tasks, location, and care activities live</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Seamless Communication</h2>
          <p className="text-sm text-gray-700">Stay in touch with instant messaging and alerts</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-6 py-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-100">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
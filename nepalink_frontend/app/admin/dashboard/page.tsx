"use client"

import { useRouter } from "next/navigation"
import { clearAuthCookies } from "@/lib/cookie"

const Button = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
)

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await clearAuthCookies()
    router.push("/login")
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 flex flex-col items-center p-8">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-sm">
          Admin Dashboard
        </h1>
        <Button
          onClick={handleLogout}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2 text-green-600">Total Users</h2>
          <p className="text-3xl font-bold text-gray-800">120</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">Active Nurses</h2>
          <p className="text-3xl font-bold text-gray-800">45</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2 text-yellow-600">Pending Requests</h2>
          <p className="text-3xl font-bold text-gray-800">12</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex gap-6">
        <Button
          onClick={() => router.push("/admin/users")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Manage Users
        </Button>
        <Button
          onClick={() => router.push("/admin/users/create")}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Create User
        </Button>
        
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} NepaLink Admin. All rights reserved.
      </footer>
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { clearAuthCookies } from "@/lib/cookie"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts"

// Dummy data
const barData = [
  { name: "Notices", value: 10 },
  { name: "Opportunities", value: 35 },
  { name: "Events", value: 12 },
  { name: "Requests", value: 7 },
]

const lineData = [
  { month: "Jan", requests: 5 },
  { month: "Feb", requests: 8 },
  { month: "Mar", requests: 12 },
  { month: "Apr", requests: 7 },
]

const pieData = [
  { name: "Caregivers", value: 60 },
  { name: "Members", value: 40 },
]
const COLORS = ["#2563eb", "#f59e0b"]

const areaData = [
  { week: "Week 1", opportunities: 10 },
  { week: "Week 2", opportunities: 15 },
  { week: "Week 3", opportunities: 20 },
  { week: "Week 4", opportunities: 25 },
]

// Simple Button component
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
    className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
)

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/auth/me", { credentials: "include" })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      }
    }
    loadUser()
  }, [])

  const handleLogout = async () => {
    await clearAuthCookies()
    router.push("/login")
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 flex flex-col items-center p-8">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
          🌿 NepaLink Dashboard
        </h1>
        <div className="flex gap-4">
          <Button onClick={() => router.push("/user/profile")} className="bg-green-600 hover:bg-green-700">
            Edit Profile
          </Button>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
            Logout
          </Button>
        </div>
      </div>

      {/* Greeting */}
      <div className="w-full max-w-6xl mb-6">
        <h2 className="text-2xl font-bold text-blue-700">
          Welcome back, {user?.name || "Member"} 👋
        </h2>
        <p className="text-gray-600">Role: {user?.role || "User"}</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2">Activity Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2">Requests Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2">Community Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2">Opportunities Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="opportunities" stroke="#10b981" fill="#d1fae5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} NepaLink. All rights reserved.
      </footer>
    </main>
  )
}

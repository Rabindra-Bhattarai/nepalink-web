"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Notices", value: 10 },
  { name: "Opportunities", value: 35 },
  { name: "Events", value: 12 },
  { name: "Requests", value: 7 },
]

export default function DashboardPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Caregiver Dashboard</h1>

      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}

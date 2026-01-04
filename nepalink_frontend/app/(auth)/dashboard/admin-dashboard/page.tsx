'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts"

const barData = [
  { name: "Users", value: 120 },
  { name: "Reports", value: 15 },
  { name: "Approvals", value: 8 },
  { name: "Tasks", value: 25 },
]

const lineData = [
  { month: "Jan", activity: 50 },
  { month: "Feb", activity: 65 },
  { month: "Mar", activity: 80 },
  { month: "Apr", activity: 70 },
]

const pieData = [
  { name: "Active Members", value: 75 },
  { name: "Inactive Members", value: 25 },
]
const COLORS = ["#2563eb", "#f59e0b"]

const areaData = [
  { week: "Week 1", approvals: 5 },
  { week: "Week 2", approvals: 10 },
  { week: "Week 3", approvals: 15 },
  { week: "Week 4", approvals: 20 },
]

export default function AdminDashboardPage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">System Overview</h2>
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
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">User Activity Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="activity" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Member Status</h2>
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
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Approvals Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="approvals" stroke="#10b981" fill="#d1fae5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  )
}

"use client"

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts"

// Example member data
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

export default function MemberDashboardPage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Member Dashboard</h1>

      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Your Activity Summary</h2>
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
        <div className="bg-white p-4 rounded-lg shadow">
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
        <div className="bg-white p-4 rounded-lg shadow">
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
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Users, Activity, Clock, BookOpen, BarChart3, CheckCircle, XCircle } from "lucide-react"
import { fetchUsers, fetchWorkload, fetchAnalytics } from "@/lib/actions/admin-actions"
import AdminSidebar from "@/app/(auth)/components/AdminSidebar"

const StatCard = ({ title, value, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${colorClass.replace("bg-", "text-")}`} />
      </div>
    </div>
  </div>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const users = await fetchUsers()
        const workload = await fetchWorkload()
        const analytics = await fetchAnalytics()

        setStats({
          totalUsers: users?.total || 0,
          activeNurses: workload ? workload.length : 0,
          pendingVerifications: users?.data?.filter((u: any) => u.status === "pending").length || 0,
          totalBookings: analytics?.totalBookings || 0,
          acceptanceRate: analytics?.acceptanceRate || 0,
          accepted: analytics?.accepted || 0,
          declined: analytics?.declined || 0,
          avgActivitiesPerBooking: analytics?.avgActivitiesPerBooking || 0,
          nurseUtilization: analytics?.nurseUtilization || 0,
          pendingBookings: analytics?.pending || 0,
        })
      } catch (err) {
        console.error("Error loading dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // ✅ Improved loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex">
        <AdminSidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600 font-medium">Loading dashboard...</p>
          </div>
        </main>
      </div>
    )
  }

  // ✅ Normal dashboard render
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <AdminSidebar />
      <main className="flex-1 p-8 max-w-7xl mx-auto">
        <h1 className="text-lg font-semibold text-slate-800 mb-6">Healthcare Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Registered Users" value={stats.totalUsers} icon={Users} colorClass="bg-blue-600" />
          <StatCard title="Active Nurses" value={stats.activeNurses} icon={Activity} colorClass="bg-green-600" />
          <StatCard title="Pending Verifications" value={stats.pendingVerifications} icon={Clock} colorClass="bg-amber-500" />
          <StatCard title="Total Bookings" value={stats.totalBookings} icon={BookOpen} colorClass="bg-purple-600" />
          <StatCard title="Acceptance Rate" value={`${stats.acceptanceRate}%`} icon={BarChart3} colorClass="bg-indigo-600" />
          <StatCard title="Accepted Bookings" value={stats.accepted} icon={CheckCircle} colorClass="bg-green-600" />
          <StatCard title="Declined Bookings" value={stats.declined} icon={XCircle} colorClass="bg-red-600" />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Additional Insights</h2>
          <ul className="space-y-2 text-slate-600">
            <li>Average activities per booking: <strong>{stats.avgActivitiesPerBooking}</strong></li>
            <li>Nurse utilization rate: <strong>{stats.nurseUtilization}%</strong></li>
            <li>Pending bookings: <strong>{stats.pendingBookings}</strong></li>
          </ul>
        </div>
      </main>
    </div>
  )
}

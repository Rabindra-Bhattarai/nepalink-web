"use client"
import { useEffect, useState } from "react"
import { fetchBookings } from "@/lib/actions/admin-actions"
import AdminSidebar from "@/app/(auth)/components/AdminSidebar"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBookings = async () => {
      const data = await fetchBookings()
      if (data) setBookings(data)
      setLoading(false)
    }
    loadBookings()
  }, [])

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#fcfdfd]">
      <p className="text-slate-500 animate-pulse font-medium">Loading bookings...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">All Bookings</h1>
            <p className="text-slate-500 mt-1">Manage and monitor patient appointments.</p>
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Nurse</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-slate-500">#{b._id.slice(-6)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{b.memberId?.name || "—"}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{b.nurseId?.name || "—"}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {b.date ? new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
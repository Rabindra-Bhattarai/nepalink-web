"use client"
import { useEffect, useState } from "react"
import { fetchWorkload } from "@/lib/actions/admin-actions"
import AdminSidebar from "@/app/(auth)/components/AdminSidebar"

export default function AdminWorkloadPage() {
  const [workload, setWorkload] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWorkload = async () => {
      const data = await fetchWorkload()
      if (data) setWorkload(data)
      setLoading(false)
    }
    loadWorkload()
  }, [])

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#fcfdfd]">
      <p className="text-slate-500 animate-pulse font-medium">Loading nurse workload...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">Nurse Workload</h1>
            <p className="text-slate-500 mt-1">Resource allocation and activity tracking.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workload.map((w, index) => (
              <div key={w.nurseId || index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {w.nurse?.name?.charAt(0) || "N"}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{w.nurse?.name || "Unknown Nurse"}</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-tighter">Medical Staff</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Active Bookings</span>
                      <span className="font-semibold text-blue-600">{w.bookings}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${Math.min(w.bookings * 10, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-sm text-slate-500">Activities Logged</span>
                    <span className="text-sm font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {w.activities}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
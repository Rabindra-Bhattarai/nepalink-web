"use client"
import { useEffect, useState } from "react"
import { fetchWorkload } from "@/lib/actions/admin-actions"

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

  if (loading) return <p className="p-6">Loading nurse workload...</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Nurse Workload</h1>
      <table className="w-full border-collapse border border-slate-200">
        <thead className="bg-slate-100">
          <tr>
            <th className="border p-2 text-left">Nurse</th>
            <th className="border p-2 text-left">Bookings</th>
            <th className="border p-2 text-left">Activities</th>
          </tr>
        </thead>
        <tbody>
          {workload.map((w) => (
            <tr key={w.nurseId} className="hover:bg-slate-50">
              <td className="border p-2">{w.nurse?.name || "—"}</td>
              <td className="border p-2">{w.bookings}</td>
              <td className="border p-2">{w.activities}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

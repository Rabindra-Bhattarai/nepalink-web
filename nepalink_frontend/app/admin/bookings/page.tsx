"use client"
import { useEffect, useState } from "react"
import { fetchBookings } from "@/lib/actions/admin-actions"

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

  if (loading) return <p className="p-6">Loading bookings...</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      <table className="w-full border-collapse border border-slate-200">
        <thead className="bg-slate-100">
          <tr>
            <th className="border p-2 text-left">Booking ID</th>
            <th className="border p-2 text-left">Member</th>
            <th className="border p-2 text-left">Nurse</th>
            <th className="border p-2 text-left">Date</th>
            <th className="border p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="hover:bg-slate-50">
              <td className="border p-2">{b._id}</td>
              <td className="border p-2">{b.memberId?.name || "—"}</td>
              <td className="border p-2">{b.nurseId?.name || "—"}</td>
              <td className="border p-2">
                {b.date ? new Date(b.date).toLocaleDateString() : "—"}
              </td>
              <td className="border p-2 capitalize">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

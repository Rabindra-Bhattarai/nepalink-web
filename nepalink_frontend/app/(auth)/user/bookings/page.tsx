"use client";
import { useEffect, useState } from "react";
import { fetchMemberBookings } from "@/lib/api/member";
import UserSidebar from "../components/UserSidebar";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchMemberBookings("USER_OBJECT_ID");
        setBookings(data);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fcfdfd]">
        <p className="text-slate-500 animate-pulse font-medium">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <UserSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">My Bookings</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Booking ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Nurse</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">#{b._id.slice(-6)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{b.nurseId?.name || "—"}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {b.date ? new Date(b.date).toLocaleDateString("en-US") : "—"}
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
      </main>
    </div>
  );
}

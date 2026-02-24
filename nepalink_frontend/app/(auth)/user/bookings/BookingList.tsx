"use client";

import BookingStatusBadge from "./BookingStatusBadge";
import { cancelBooking } from "@/lib/api/member";
import { useState } from "react";

export default function BookingList({ bookings }: { bookings: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (!bookings?.length) {
    return <p className="p-6 text-slate-400 text-center">No bookings found.</p>;
  }

  const handleCancel = async (id: string) => {
    setLoadingId(id);
    try {
      await cancelBooking(id);
      // Refresh the page or trigger a re-fetch depending on your data fetching setup
      window.location.reload();
    } catch (err) {
      console.error("Cancel failed", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="divide-y divide-slate-100">
      {bookings.map((b) => (
        <div
          key={b._id}
          className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-600 flex flex-col items-center justify-center text-white shadow-lg shadow-blue-200">
              <span className="text-[10px] font-bold uppercase leading-none">
                {new Date(b.date).toLocaleString("default", { month: "short" })}
              </span>
              <span className="text-lg font-bold leading-none">
                {new Date(b.date).getDate()}
              </span>
            </div>
            <div>
              <p className="font-bold text-slate-800">Nursing Visit</p>
              <p className="text-sm text-slate-500">
                Nurse: {b.nurseId?.name || "Pending..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BookingStatusBadge status={b.status} />
            {["accepted", "pending"].includes(b.status.toLowerCase()) && (
              <button
                onClick={() => handleCancel(b._id)}
                disabled={loadingId === b._id}
                className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
              >
                {loadingId === b._id ? "Cancelling..." : "Cancel"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

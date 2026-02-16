"use client";

import { useBookings } from "@/app/(auth)/user/dashboard/hooks/useBookings";
import { Booking } from "@/schemas/bookingSchema";

interface BookingListProps {
  memberId: string;
}

export default function BookingList({ memberId }: BookingListProps) {
  const { bookings, loading, error, refreshBookings } = useBookings(memberId);

  if (loading) {
    return <p className="text-slate-500 text-sm">Loading bookings...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Error: {error}
        <button
          onClick={refreshBookings}
          className="ml-2 text-sky-600 underline text-xs"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <p className="text-slate-500 text-sm">
          Hi 👋 Ready to book your first caregiver?
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-slate-900">Your Bookings</h3>
      <ul className="space-y-3">
        {bookings.map((booking: Booking) => (
          <li
            key={booking._id}
            className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50"
          >
            <div>
              <p className="text-sm font-bold text-slate-900">
                Nurse: {booking.nurseId}
              </p>
              <p className="text-xs text-slate-500">
                Date: {new Date(booking.date).toLocaleString()}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : booking.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

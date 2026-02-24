"use client";

import useSWR from "swr";
import axios from "axios";
import NurseCard from "./NurseCard";

const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export default function NursesPage() {
  const { data: nurses, error } = useSWR("/api/users?role=nurse", fetcher);
  const { data: bookings } = useSWR("/api/bookings", fetcher); // ✅ fetch member bookings

  if (error) return <div className="p-4 text-red-600">Error loading nurses</div>;
  if (!nurses || !bookings) return <div className="p-4">Loading...</div>;

  // ✅ Find nurses already booked by this member (pending or accepted)
  const activeBookings = bookings.filter((b: any) =>
    ["pending", "accepted"].includes(b.status)
  );
  const bookedNurseIds = activeBookings.map((b: any) => b.nurseId._id);

  // ✅ Filter out booked nurses
  const availableNurses = nurses.filter(
    (nurse: any) => !bookedNurseIds.includes(nurse._id)
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Available Nurses</h1>
      <p className="text-slate-600">Select a nurse and book an appointment.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {availableNurses.length > 0 ? (
          availableNurses.map((nurse: any) => (
            <NurseCard key={nurse._id} nurse={nurse} />
          ))
        ) : (
          <p className="text-slate-500">No nurses available right now.</p>
        )}
      </div>
    </div>
  );
}

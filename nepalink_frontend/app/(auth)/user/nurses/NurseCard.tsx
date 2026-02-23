"use client";

import AddBookingForm from "../bookings/AddBookingForm";

export default function NurseCard({ nurse }: { nurse: any }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm space-y-3">
      <h3 className="font-bold text-lg">{nurse.name}</h3>
      <p className="text-sm text-gray-500">{nurse.email}</p>

      {/* Booking form for this nurse */}
      <AddBookingForm nurseId={nurse._id} />
    </div>
  );
}

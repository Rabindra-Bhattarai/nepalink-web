"use client";

import { useState } from "react";
import { useBookings } from "@/app/(auth)/user/dashboard/hooks/useBookings";
import { CreateBookingSchema } from "@/schemas/bookingSchema";
// import { z } from "zod";

interface BookingFormProps {
  memberId: string;
  onSuccess?: () => void; // optional callback after booking
}

export default function BookingForm({ memberId, onSuccess }: BookingFormProps) {
  const { createBooking, loading, error } = useBookings(memberId);
  const [nurseId, setNurseId] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = CreateBookingSchema.safeParse({ memberId, nurseId, date });
    if (!parsed.success) {
      alert(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }

    try {
      await createBooking({ nurseId, date });
      if (onSuccess) onSuccess();
      setNurseId("");
      setDate("");
    } catch (err: any) {
      console.error("Booking error:", err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4"
    >
      <h3 className="text-lg font-bold text-slate-900">Book a Caregiver</h3>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Nurse ID
        </label>
        <input
          type="text"
          value={nurseId}
          onChange={(e) => setNurseId(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
          placeholder="Enter Nurse ID"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Date
        </label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-sky-700 transition-all"
      >
        {loading ? "Booking..." : "Book Caregiver"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}

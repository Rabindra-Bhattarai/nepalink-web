"use client";
import { useState } from "react";
import { createBooking } from "@/lib/api/member";
import UserSidebar from "../../components/UserSidebar";

export default function NewBookingPage() {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBooking({
        memberId: "USER_OBJECT_ID", // replace with logged-in user._id
        nurseId: "NURSE_OBJECT_ID", // replace with selected nurse._id
        date,
        notes,
      });
      alert("Booking created successfully!");
      setDate("");
      setNotes("");
    } catch (err: any) {
      console.error(err.message);
      alert("Failed to create booking: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <UserSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">New Booking</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-lg"
        >
          <label className="block mb-2 text-sm font-medium text-slate-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <label className="block mb-2 text-sm font-medium text-slate-700">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Booking"}
          </button>
        </form>
      </main>
    </div>
  );
}

"use client";

import { useBookings } from "@/app/(auth)/user/dashboard/hooks/useBookings";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import ActiveSession from "./components/ActivitySession";
import CareFeed from "./components/CareFeed";
import VitalStats from "./components/VitalStats";

export default function MemberDashboard() {
  const memberId = "demo-member-id"; // replace with real auth context
  const { bookings, loading, error } = useBookings(memberId);

  const activeBooking = bookings.find((b) => b.status === "accepted") || null;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Member Dashboard</h1>
        </header>

        {/* Booking Form + List */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-800">Bookings</h2>
          <BookingForm memberId={memberId} onSuccess={() => console.log("Booking created")} />
          <BookingList memberId={memberId} />
        </section>

        {/* Active Session */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800">Active Session</h2>
          {activeBooking ? (
            <ActiveSession booking={activeBooking} />
          ) : (
            <p className="text-slate-500 text-sm">No active session at the moment.</p>
          )}
        </section>

        {/* Care Feed */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800">Care Feed</h2>
          {activeBooking ? (
            <CareFeed bookingId={activeBooking._id} />
          ) : (
            <p className="text-slate-500 text-sm">No care activities yet.</p>
          )}
        </section>

        {/* Vital Stats */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800">Vital Stats</h2>
          <VitalStats healthScore={82} summary="Health status based on recent updates." />
        </section>

        {/* Feedback */}
        {loading && <p className="text-slate-500 text-sm">Loading...</p>}
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
      </div>
    </div>
  );
}

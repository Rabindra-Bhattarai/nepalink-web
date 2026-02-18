"use client";

import { useState } from "react";
import { useBookings } from "@/hooks/useBookings";
import BookingList from "../dashboard/components/BookingList";
import LoadingSkeleton from "../dashboard/components/LoadingSkeleton";
import { CalendarDays, Filter, Plus } from "lucide-react";

export default function BookingsPage() {
  const { bookings, loading, error } = useBookings();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // Functional Enhancement: Split bookings into categories
  const upcomingBookings = bookings?.filter(b => b.status === "accepted" || b.status === "pending") || [];
  const pastBookings = bookings?.filter(b => b.status === "declined") || [];

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header with Quick Action */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <CalendarDays className="text-blue-600" size={32} />
            My Appointments
          </h1>
          <p className="text-slate-500 mt-1">Manage your nursing visits and consultation schedule.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
          <Plus size={20} />
          New Booking
        </button>
      </header>

      {error ? (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
          <p className="text-red-600 font-medium flex items-center gap-2">
            <span>⚠️</span> {error}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Custom Tabs UI */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 w-fit rounded-xl">
            <button 
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "upcoming" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Upcoming ({upcomingBookings.length})
            </button>
            <button 
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "past" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Past / History ({pastBookings.length})
            </button>
          </div>

          {/* List Display */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-2">
              <BookingList bookings={activeTab === "upcoming" ? upcomingBookings : pastBookings} />
            </div>
            
            {/* Empty State Enhancement */}
            {((activeTab === "upcoming" && upcomingBookings.length === 0) || 
              (activeTab === "past" && pastBookings.length === 0)) && (
              <div className="py-20 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">No {activeTab} bookings found.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
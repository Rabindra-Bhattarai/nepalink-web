"use client";

import { useState } from "react";
import { useBookings } from "@/hooks/useBookings";
import BookingList from "../bookings/BookingList";
import LoadingSkeleton from "../dashboard/components/LoadingSkeleton";
import { CalendarDays, Filter, Clock, CheckCircle, AlertCircle, RefreshCcw } from "lucide-react";

export default function BookingsPage() {
  const { bookings, loading, error } = useBookings({ refreshInterval: 3600000 });

  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcomingBookings = bookings?.filter((b) => ["accepted", "pending"].includes(b.status)) || [];
  const pastBookings = bookings?.filter((b) => ["declined", "cancelled", "completed"].includes(b.status)) || [];

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]"> {/* Subtle medical-tinted background */}
      <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-10">
        
        {/* --- HEADER SECTION --- */}
        <header className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <RefreshCcw size={12} className="animate-spin-slow" />
              Live Updates Active
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
              <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-200">
                <CalendarDays className="text-white" size={28} />
              </div>
              My Schedule
            </h1>
            <p className="text-slate-500 font-medium max-w-md">
              Review and manage your care appointments. Your nurse will update the status in real-time.
            </p>
          </div>

          {/* Quick Stats Summary */}
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                <CheckCircle className="text-emerald-500" size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Upcoming</p>
                <p className="text-lg font-bold text-slate-800 leading-none">{upcomingBookings.length}</p>
              </div>
            </div>
          </div>
        </header>

        {error ? (
          <div className="flex items-center gap-3 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-700 shadow-sm">
            <AlertCircle size={20} />
            <p className="font-semibold">{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* --- CUSTOM TABS --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex p-1.5 bg-slate-200/50 backdrop-blur-sm w-fit rounded-2xl border border-slate-200">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`relative px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    activeTab === "upcoming"
                      ? "bg-white text-blue-600 shadow-md ring-1 ring-black/5"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Active Bookings
                  {upcomingBookings.length > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded text-[10px]">
                      {upcomingBookings.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    activeTab === "past"
                      ? "bg-white text-blue-600 shadow-md ring-1 ring-black/5"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  History
                </button>
              </div>

              <div className="text-[11px] font-bold text-slate-400 flex items-center gap-2 italic">
                <Clock size={14} /> Auto-refreshing every 1 hour
              </div>
            </div>

            {/* --- LIST CONTAINER --- */}
            <div className="relative">
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-linear-to-tr from-blue-50 to-indigo-50/30 rounded-[40px] -z-10" />
              
              <div className="bg-white/70 backdrop-blur-sm rounded-4xl border border-white shadow-xl shadow-blue-900/5 overflow-hidden transition-all">
                <div className="p-4 md:p-6">
                  <BookingList
                    bookings={activeTab === "upcoming" ? upcomingBookings : pastBookings}
                  />
                  
                  {/* Empty State */}
                  {((activeTab === "upcoming" && upcomingBookings.length === 0) ||
                    (activeTab === "past" && pastBookings.length === 0)) && (
                    <div className="py-24 text-center">
                      <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                        <Filter className="text-slate-300" size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">No records found</h3>
                      <p className="text-slate-400 text-sm max-w-50 mx-auto mt-2">
                        There are currently no {activeTab} appointments to show.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
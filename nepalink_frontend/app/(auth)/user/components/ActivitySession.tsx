"use client";

import { Booking } from "@/schemas/bookingSchema";
import { useActivities } from "@/app/(auth)/user/dashboard/hooks/useActivities";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";

interface ActiveSessionProps {
  booking: Booking | null; // accepted booking
}

export default function ActiveSession({ booking }: ActiveSessionProps) {
  const { activities, loading } = useActivities(booking?._id || null);

  if (!booking) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <p className="text-slate-500 text-sm">No active caregiver session.</p>
      </div>
    );
  }

  const latestActivity = activities.length > 0 ? activities[0] : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm overflow-hidden relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Clock className="text-sky-500" /> Active Session
        </h3>
        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-full uppercase">
          On Duty
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.nurseId}`}
            alt="Nurse Avatar"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold">Nurse {booking.nurseId}</h4>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            <MapPin size={14} /> Location: Kathmandu • Arrived at{" "}
            {new Date(booking.date).toLocaleTimeString()}
          </p>
          <div className="flex gap-2 mt-3">
            <button className="bg-sky-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-sky-700">
              <Phone size={14} /> Call Nurse
            </button>
            <button className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200">
              <MessageCircle size={14} /> Message
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">
            Live Update
          </p>
          <p className="text-sm font-bold text-emerald-600 mt-1">
            {loading
              ? "Loading..."
              : latestActivity
              ? `"${latestActivity.notes}"`
              : "No updates yet"}
          </p>
        </div>
      </div>
    </div>
  );
}

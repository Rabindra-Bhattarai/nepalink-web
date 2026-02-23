"use client";

import { useState } from "react";
import { createBooking } from "@/lib/api/member";
import { Calendar, Loader2, Clock, ShieldCheck, Info } from "lucide-react";

export default function AddBookingForm({ nurseId }: { nurseId: string }) {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "waiting" | "booked">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createBooking({ nurseId, date });
      setStatus("waiting");
      setDate("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- SUCCESS / WAITING STATE ---
  if (status === "waiting") {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xl shadow-blue-500/5 text-center transition-all">
        <div className="relative mx-auto w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
          <div className="relative bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center">
            <Clock className="text-blue-600 w-10 h-10" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Request Pending</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-60 mx-auto">
          Your request has been sent to the nurse. You will receive a notification once confirmed.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
        >
          Schedule Another
        </button>
      </div>
    );
  }

  // --- MAIN FORM STATE ---
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header Accent */}
      <div className="h-1.5 bg-linear-to-r from-blue-500 to-cyan-400" />
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Schedule Care</h3>
            <p className="text-xs text-slate-500">Select your preferred date & time</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              Appointment Details
            </label>
            <div className="relative group/input">
              <input
                type="datetime-local"
                value={date}
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all appearance-none"
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-normal">
              By clicking confirm, a request is sent to the nurse for verification. You can cancel up to 2 hours before.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !date}
            className="w-full group/btn relative overflow-hidden flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 text-white px-4 py-4 rounded-xl font-bold transition-all duration-300 active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-white/70" />
            ) : (
              <>
                <span>Confirm Booking</span>
              </>
            )}
          </button>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs font-medium justify-center animate-shake">
              <Info className="w-3.5 h-3.5" />
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
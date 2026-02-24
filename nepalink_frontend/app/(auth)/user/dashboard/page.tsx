"use client";

import { useMemo } from "react";
import BookingList from "./components/BookingList";
import ActivityList from "./components/ActivityList";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { ActivityChart } from "./components/ActivityChart";
import { useBookings } from "@/hooks/useBookings";
import { useActivities, Activity } from "@/hooks/useActivities";
import { Calendar, Activity as ActivityIcon, Heart, Pill, LayoutDashboard, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const { bookings, loading: bLoading, error: bError, refresh: refreshBookings } = useBookings();
  const { activities, loading: aLoading, error: aError, refresh: refreshActivities } = useActivities();

  const chartData = useMemo(() => {
    if (!activities) return [];
    return activities.map((act: Activity) => ({
      date: new Date(act.performedAt ?? act.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      count: 1,
      bloodPressure: act.vitalSigns?.bloodPressure ? parseInt(act.vitalSigns.bloodPressure.split("/")[0]) : undefined,
      heartRate: act.vitalSigns?.heartRate,
      temperature: act.vitalSigns?.temperature,
      spo2: act.vitalSigns?.spo2,
      status: act.status,
    }));
  }, [activities]);

  if (bLoading || aLoading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sky-50 pb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
              <LayoutDashboard size={14} />
              Overview
            </div>
            <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Member Portal</h1>
            <p className="text-sky-600/70 font-medium mt-1">Personal health monitoring and care schedule</p>
          </div>
          <div className="flex items-center gap-3 bg-blue-50/50 px-4 py-2 rounded-full border border-blue-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-blue-800">System Verified</span>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Scheduled Visits"
            value={bookings?.length || 0}
            icon={<Calendar className="text-blue-600" size={24} />}
            color="bg-blue-50"
          />
          <StatCard
            title="Care Activities"
            value={activities?.length || 0}
            icon={<ActivityIcon className="text-sky-600" size={24} />}
            color="bg-sky-50"
          />
          <div className="bg-white p-6 rounded-4xl border border-sky-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1">Daily Adherence</p>
              <p className="text-3xl font-black text-blue-900">85%</p>
            </div>
            <div className="relative w-14 h-14">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-sky-50" strokeWidth="4" />
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-500" strokeWidth="4" strokeDasharray="85, 100" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-blue-600">85%</div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-950 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-blue-600" />
              Health Analytics
            </h2>
          </div>
          <ActivityChart data={chartData} />
        </section>

        {/* Lists Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 px-2">
              <Heart size={18} className="text-red-500" /> Recent Bookings
            </h3>
            <div className="bg-white rounded-4xl border border-sky-50 shadow-sm overflow-hidden">
              {bError ? <p className="p-6 text-red-500">{bError}</p> : <BookingList bookings={bookings} />}
              <div className="p-4 bg-sky-50/30 text-center">
                <button onClick={refreshBookings} className="text-xs font-bold text-blue-600 hover:underline">
                  Synchronize Bookings
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 px-2">
              <Pill size={18} className="text-blue-500" /> Care Timeline
            </h3>
            <div className="bg-white rounded-4xl border border-sky-50 shadow-sm overflow-hidden p-6">
              {aError ? <p className="text-red-500">{aError}</p> : <ActivityList activities={activities} />}
              <div className="mt-4 pt-4 border-t border-sky-50 text-center">
                <button onClick={refreshActivities} className="text-xs font-bold text-blue-600 hover:underline">
                  Refresh Activities
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-4xl border border-sky-100 shadow-sm flex items-center gap-5 transition-all hover:border-blue-200">
      <div className={`p-4 ${color} rounded-2xl text-blue-600`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-3xl font-black text-blue-900 leading-none">{value}</p>
      </div>
    </div>
  );
}
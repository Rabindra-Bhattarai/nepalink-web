"use client";

import { useMemo } from "react";
import BookingList from "./components/BookingList";
import ActivityList from "./components/ActivityList";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { ActivityChart } from "./components/ActivityChart";
import { useBookings } from "@/hooks/useBookings";
import { useActivities } from "@/hooks/useActivities";
import { Calendar, Activity, ShieldCheck, Heart, Pill } from "lucide-react";

export default function DashboardPage() {
  const { bookings, loading: bLoading, error: bError } = useBookings();
  const { activities, loading: aLoading, error: aError } = useActivities();

  // Process data for the chart
  const chartData = useMemo(() => {
    if (!activities) return [];
    const groups = activities.reduce((acc: any, curr: any) => {
      const date = new Date(curr.performedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(groups).map(([date, count]) => ({ date, count })).slice(-7);
  }, [activities]);

  if (bLoading || aLoading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Patient Portal</h1>
            <p className="text-slate-500 mt-1">Health monitoring and care schedule</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700">System Active</span>
          </div>
        </header>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Upcoming Bookings" 
            value={bookings?.length || 0} 
            icon={<Calendar className="text-blue-600" />} 
            color="bg-blue-50" 
          />
          <StatCard 
            title="Care Activities" 
            value={activities?.length || 0} 
            icon={<Activity className="text-emerald-600" />} 
            color="bg-emerald-50" 
          />
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Adherence</p>
              <p className="text-2xl font-black text-slate-800">85%</p>
            </div>
            <div className="relative w-12 h-12">
               <svg className="w-full h-full" viewBox="0 0 36 36">
                 <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 <path className="text-blue-500" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
               </svg>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">Activity Engagement</h2>
            <p className="text-sm text-slate-500">Visual trend of your medical interactions</p>
          </div>
          <ActivityChart data={chartData} />
        </section>

        {/* Lists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Heart size={18} className="text-red-500" /> Recent Bookings
            </h3>
            <div className="bg-white p-2 rounded-3xl border border-slate-200 shadow-sm">
              {bError ? <p className="p-4 text-red-500">{bError}</p> : <BookingList bookings={bookings} />}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Pill size={18} className="text-blue-500" /> Care Timeline
            </h3>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              {aError ? <p className="text-red-500">{aError}</p> : <ActivityList activities={activities} />}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.02]">
      <div className={`p-4 ${color} rounded-2xl`}>{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}
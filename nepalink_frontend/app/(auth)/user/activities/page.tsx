"use client";

import { useState } from "react";
import { useActivities } from "@/hooks/useActivities";
import ActivityList from "../dashboard/components/ActivityList";
import LoadingSkeleton from "../dashboard/components/LoadingSkeleton";
import { Activity, Download, Filter, Info } from "lucide-react";

export default function ActivitiesPage() {
  const { activities, loading, error } = useActivities();
  const [filter, setFilter] = useState("all");

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header with Export Action */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Activity className="text-emerald-600" size={32} />
            Medical History
          </h1>
          <p className="text-slate-500 mt-1">A chronological record of your clinical care and observations.</p>
        </div>
        
        {/* Functional Change: Export Button for Doctors */}
        <button 
          onClick={() => window.print()} 
          className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all"
        >
          <Download size={18} />
          Export Report
        </button>
      </header>

      {/* Summary Alert - Context for the patient */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
        <Info className="text-blue-500 mt-0.5" size={20} />
        <p className="text-sm text-blue-700 leading-relaxed">
          This timeline includes notes recorded by your nursing staff during visits. 
          If you notice any discrepancies, please contact your care coordinator.
        </p>
      </div>

      {error ? (
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-center">
          <p className="text-red-600 font-semibold italic">{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick Stats / Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Logs</p>
                <p className="text-xl font-bold text-slate-800">{activities?.length || 0}</p>
              </div>
              <div className="h-8 w-px bg-slate-100" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Update</p>
                <p className="text-xl font-bold text-slate-800">
                  {activities?.[0] ? new Date(activities[0].performedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <select 
                className="bg-transparent text-sm font-semibold text-slate-600 focus:outline-none cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="recent">Last 7 Days</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {/* Activity List Content */}
          <div className="bg-white p-2 rounded-3xl border border-slate-200 shadow-sm">
             <ActivityList activities={activities} />
          </div>
        </div>
      )}
    </div>
  );
}
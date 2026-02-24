"use client";

import { useState } from "react";
import { useActivities } from "@/hooks/useActivities";
import ActivityList from "../activities/ActivityList";
import LoadingSkeleton from "../dashboard/components/LoadingSkeleton";
import { Activity as ActivityIcon, FileDown, Filter, Info, ChevronDown, Printer } from "lucide-react";

export default function ActivitiesPage() {
  const { activities, loading, error } = useActivities();
  const [filter, setFilter] = useState("all");
  const [showExportOptions, setShowExportOptions] = useState(false);

  // CSV Export Logic
  const downloadCSV = () => {
    if (!activities) return;
    const headers = ["Date", "Description", "Status", "BP", "HR", "Temp", "SpO2"];
    const rows = activities.map(act => [
      new Date(act.date).toLocaleDateString(),
      act.description,
      act.status,
      act.vitalSigns?.bloodPressure || "N/A",
      act.vitalSigns?.heartRate || "N/A",
      act.vitalSigns?.temperature || "N/A",
      act.vitalSigns?.spo2 || "N/A"
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Medical_Report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    setShowExportOptions(false);
  };

  if (loading) return <LoadingSkeleton />;

  const filteredActivities = activities?.filter((a) => {
    if (filter === "recent") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(a.date) >= sevenDaysAgo;
    }
    if (filter === "month") {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      return new Date(a.date) >= startOfMonth;
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-50 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <ActivityIcon className="text-blue-600" size={18} />
            </div>
            Clinical History
          </h1>
          <p className="text-sky-600 text-sm mt-0.5">Verified nursing logs and patient observations.</p>
        </div>

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowExportOptions(!showExportOptions)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm active:scale-95"
          >
            <FileDown size={16} />
            Export Report
            <ChevronDown size={14} className={`transition-transform ${showExportOptions ? 'rotate-180' : ''}`} />
          </button>
          
          {showExportOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-sky-100 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
              <button 
                onClick={downloadCSV}
                className="w-full text-left px-4 py-2 text-sm text-blue-900 hover:bg-sky-50 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Download .CSV
              </button>
              <button 
                onClick={() => { window.print(); setShowExportOptions(false); }}
                className="w-full text-left px-4 py-2 text-sm text-blue-900 hover:bg-sky-50 flex items-center gap-2"
              >
                <Printer size={14} className="text-blue-500" /> Save as PDF / Print
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Filter & Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[10px] font-bold text-sky-500 uppercase block">Records</span>
            <span className="text-lg font-bold text-blue-900 leading-none">{activities?.length || 0}</span>
          </div>
          <div className="w-px h-6 bg-sky-200" />
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-sky-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-sm font-bold text-blue-900 focus:outline-none cursor-pointer"
            >
              <option value="all">Full Timeline</option>
              <option value="recent">Last 7 Days</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-blue-600 bg-white px-3 py-1 rounded-full border border-sky-100 text-xs font-bold">
           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
           Live Record Sync
        </div>
      </div>

      {error ? (
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-center text-red-600 font-bold">
          {error}
        </div>
      ) : (
        <ActivityList activities={filteredActivities || []} />
      )}
    </div>
  );
}
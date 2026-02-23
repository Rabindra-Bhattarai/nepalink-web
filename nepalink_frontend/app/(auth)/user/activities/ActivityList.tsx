"use client";

import { 
  Heart, 
  Activity as ActivityIcon, 
  Thermometer, 
  Droplets, 
  Clipboard, 
  ShieldCheck, 
  Clock, 
  User 
} from "lucide-react";
import { Activity } from "@/hooks/useActivities"; // ✅ import shared type

interface ActivityListProps {
  activities: Activity[];
  onSelectActivity?: (id: string) => void;
}

export default function ActivityList({ activities, onSelectActivity }: ActivityListProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <ActivityIcon size={48} className="mb-4 opacity-20" />
        <p className="font-medium">No medical activities found for this period.</p>
      </div>
    );
  }

  const getStatusBadge = (status: Activity["status"]) => {
    const base = "px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border";
    switch (status) {
      case "completed":
        return <span className={`${base} bg-emerald-50 text-emerald-600 border-emerald-100`}>Completed</span>;
      case "pending":
        return <span className={`${base} bg-amber-50 text-amber-600 border-amber-100`}>In Progress</span>;
      case "cancelled":
        return <span className={`${base} bg-slate-100 text-slate-500 border-slate-200`}>Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-px before:bg-slate-100">
      {activities.map((act) => (
        <div key={act._id} className="relative pl-12 group">
          {/* Timeline Node */}
          <div className="absolute left-3 top-1 w-4 h-4 rounded-full border-4 border-white bg-emerald-500 shadow-sm z-10" />

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            {/* Header Section */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-tight">
                  <Clock size={14} />
                  {new Date(act.performedAt ?? act.date).toLocaleDateString(undefined, { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                  {act.description ?? act.notes ?? "No description"}
                </h3>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <User size={14} className="text-emerald-500" />
                  <span className="font-medium italic">
                    Nurse: {typeof act.nurseId === "object" ? act.nurseId?.name : "Unknown"}
                  </span>
                </div>
              </div>
              {getStatusBadge(act.status)}
            </div>

            {/* Content */}
            {act.status === "pending" && (
              <div className="bg-amber-50/50 border border-dashed border-amber-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="animate-pulse w-2 h-2 rounded-full bg-amber-400" />
                <p className="text-sm font-semibold text-amber-700 italic text-center w-full">
                  Awaiting nurse documentation...
                </p>
              </div>
            )}

            {act.status === "completed" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vitals Box */}
                {act.vitalSigns && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold text-sm">
                      <Heart size={16} className="text-rose-500" /> Vital Signs
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <DataPoint icon={<ActivityIcon size={12}/>} label="BP" value={act.vitalSigns.bloodPressure} />
                      <DataPoint icon={<Heart size={12}/>} label="HR" value={act.vitalSigns.heartRate ? `${act.vitalSigns.heartRate} bpm` : "N/A"} />
                      <DataPoint icon={<Thermometer size={12}/>} label="Temp" value={act.vitalSigns.temperature ? `${act.vitalSigns.temperature}°C` : "N/A"} />
                      <DataPoint icon={<Droplets size={12}/>} label="SpO2" value={act.vitalSigns.spo2 ? `${act.vitalSigns.spo2}%` : "N/A"} />
                    </div>
                  </div>
                )}

                {/* Daily Care Box */}
                {act.dailyCare && (
                  <div className="bg-blue-50/30 rounded-2xl p-4 border border-blue-100/50">
                    <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold text-sm">
                      <Clipboard size={16} className="text-blue-500" /> Daily Care
                    </div>
                    <div className="space-y-1">
                      <CareRow label="Meals" value={act.dailyCare.meals} />
                      <CareRow label="Sleep" value={act.dailyCare.sleepQuality} />
                      <CareRow label="Mobility" value={act.dailyCare.mobility} />
                    </div>
                  </div>
                )}

                {/* Tracking & Safety */}
                <div className="md:col-span-2 flex flex-wrap gap-2 pt-2 border-t border-slate-50 mt-2">
                  {act.medicalTracking?.medication && (
                    <span className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-orange-100">
                      💊 Meds: {act.medicalTracking.medication}
                    </span>
                  )}
                  {act.safetyVerification?.jointSignature && (
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-100 flex items-center gap-1">
                      <ShieldCheck size={14} /> Safety Verified
                    </span>
                  )}
                </div>
              </div>
            )}

            {onSelectActivity && (
              <button
                onClick={() => onSelectActivity(act._id)}
                className="mt-6 w-full py-3 bg-white border-2 border-slate-100 hover:border-emerald-500 hover:text-emerald-600 rounded-2xl text-sm font-bold transition-all shadow-sm"
              >
                View Clinical Summary
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper Components
const DataPoint = ({ icon, label, value }: { icon: any; label: string; value?: string | number }) => (
  <div className="flex items-center gap-2">
    <div className="p-1.5 bg-white rounded-lg text-slate-400 shadow-sm border border-slate-50">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-0.5">{label}</p>
      <p className="text-sm font-bold text-slate-700 leading-none">{value || "N/A"}</p>
    </div>
  </div>
);

const CareRow = ({ label, value }: { label: string; value?: string }) => (
  <p className="text-xs text-slate-600">
    <span className="font-bold text-slate-800">{label}:</span> {value || "Not recorded"}
  </p>
);

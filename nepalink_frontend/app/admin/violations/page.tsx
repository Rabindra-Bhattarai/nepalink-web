"use client";

import { useState } from "react";
import AdminSidebar from "@/app/admin/componets/AdminSidebar";
import { 
  AlertTriangle, ShieldAlert, Clock, 
  CheckCircle2, UserX, Scale, 
  Search, Filter, ArrowUpRight 
} from "lucide-react";

const dummyViolations = [
  {
    _id: "VL-001",
    user: "Ramesh Rai",
    role: "Member",
    issue: "Repeated last-minute cancellations",
    severity: "warning",
    reportedBy: "System Engine",
    action: "Warning Issued",
    resolution: "open",
    date: "2026-02-25T09:30:00.000Z",
  },
  {
    _id: "VL-002",
    user: "Sita Wagle",
    role: "Nurse",
    issue: "Unannounced absence from care session",
    severity: "serious",
    reportedBy: "Admin Audit",
    action: "Under Review",
    resolution: "pending",
    date: "2026-02-26T14:00:00.000Z",
  },
  {
    _id: "VL-003",
    user: "Maya Gurung",
    role: "Member",
    issue: "Violation of professional conduct (Verbal)",
    severity: "critical",
    reportedBy: "Staff Feedback",
    action: "Permanent Suspension",
    resolution: "resolved",
    date: "2026-02-27T18:15:00.000Z",
  },
];

export default function ViolationsPage() {
  const [violations] = useState(dummyViolations);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col md:flex-row font-sans text-slate-900">
      <AdminSidebar />
      
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-x-hidden">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Scale className="text-sky-500" size={18} />
              <span className="text-sky-600 text-[10px] font-black uppercase tracking-[4px]">Trust & Safety</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Conduct Registry</h1>
            <p className="text-slate-400 font-medium mt-1">Enforcing professional standards across the NepaLink network.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by ID or Name..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 outline-none w-64 shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-500 hover:bg-slate-50">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Conduct Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Active Disputes", val: "08", color: "text-sky-600", bg: "bg-sky-50", icon: <ShieldAlert size={20}/> },
            { label: "Critical Bans", val: "02", color: "text-rose-600", bg: "bg-rose-50", icon: <UserX size={20}/> },
            { label: "System Alerts", val: "14", color: "text-amber-600", bg: "bg-amber-50", icon: <AlertTriangle size={20}/> },
            { label: "Resolved Cases", val: "128", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 size={20}/> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-50 shadow-sm flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <h3 className="text-xl font-black text-slate-900">{stat.val}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Violation Table-style Grid */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Table Header - Hidden on Mobile */}
          <div className="hidden lg:grid grid-cols-5 gap-4 p-6 border-b border-slate-50 bg-slate-50/50">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Involved Party</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-2">Issue Description</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Severity</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</span>
          </div>

          <div className="divide-y divide-slate-50">
            {violations.map((vl) => (
              <div key={vl._id} className="p-6 lg:p-8 hover:bg-slate-50/50 transition-colors group">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                  
                  {/* Party Column */}
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-xs
                      ${vl.role === 'Nurse' ? 'bg-indigo-50 text-indigo-600' : 'bg-sky-50 text-sky-600'}`}>
                      {vl.user[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{vl.user}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{vl.role} • {vl._id}</p>
                    </div>
                  </div>

                  {/* Issue Column */}
                  <div className="lg:col-span-2">
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                      {vl.issue}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      {/* FIXED HYDRATION ISSUE HERE 👇 */}
                      <span 
                        suppressHydrationWarning
                        className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"
                      >
                        <Clock size={12} /> {new Date(vl.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <ArrowUpRight size={12} /> via {vl.reportedBy}
                      </span>
                    </div>
                  </div>

                  {/* Severity Column */}
                  <div className="flex justify-start lg:justify-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                      ${vl.severity === 'warning' ? 'bg-amber-50 text-amber-500 border-amber-100' : 
                        vl.severity === 'serious' ? 'bg-orange-50 text-orange-500 border-orange-100' : 
                        'bg-rose-50 text-rose-500 border-rose-100 animate-pulse'}`}>
                      {vl.severity}
                    </span>
                  </div>

                  {/* Action Column */}
                  <div className="flex items-center justify-between lg:justify-end gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black text-slate-900 leading-none">{vl.action}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">{vl.resolution}</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-600 transition-all">
                      Review
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
"use client";

import { useState } from "react";
import AdminSidebar from "@/app/admin/componets/AdminSidebar";
import { 
  Calendar, Clock, User, 
  CheckCircle2, AlertCircle, 
  ChevronRight, Filter, ShieldCheck, 
  ArrowUpRight, FileText
} from "lucide-react";

export default function BookingsPage() {
  const [bookings] = useState([
    {
      _id: "BK-2026-001",
      memberName: "Ramesh Rai",
      nurseName: "Sita Wagle",
      service: "Post-Op Recovery",
      date: "2026-02-28T07:00:00.000Z",
      status: "pending",
      priority: "High"
    },
    {
      _id: "BK-2026-002",
      memberName: "Ram Sharma",
      nurseName: "Gita Chaudhary",
      service: "Elderly Care",
      date: "2026-02-28T17:34:00.000Z",
      status: "declined",
      priority: "Standard"
    },
    {
      _id: "BK-2026-003",
      memberName: "Maya Tamang",
      nurseName: "Gita Chaudhary",
      service: "Wound Dressing",
      date: "2026-03-01T05:45:00.000Z",
      status: "pending",
      priority: "Critical"
    },
    {
      _id: "BK-2026-004",
      memberName: "Binod Gurung",
      nurseName: "Suresh BK",
      service: "Physiotherapy",
      date: "2026-03-05T05:50:00.000Z",
      status: "pending",
      priority: "Standard"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col md:flex-row font-sans text-slate-900">
      <AdminSidebar />
      
      <main className="flex-1 p-4 sm:p-8 lg:p-14 overflow-x-hidden">
        
        {/* Premium Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-sky-600 text-[11px] font-bold uppercase tracking-[4px]">Live Monitoring</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Service Registry</h1>
            <p className="text-slate-400 font-medium mt-2">Manage clinical assignments and patient coordination.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:shadow-xl hover:shadow-slate-100 transition-all">
              <Filter size={16} className="text-sky-500" /> Advanced Filters
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-sky-600 transition-all shadow-2xl shadow-slate-200">
              <FileText size={16} /> Reports
            </button>
          </div>
        </div>

        {/* Dynamic Stats - Glassmorphism style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="relative overflow-hidden bg-white p-8 rounded-4xl border border-slate-50 shadow-sm group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <ShieldCheck size={80} className="text-sky-500" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Queue</p>
            <div className="flex items-end gap-2">
              <h3 className="text-4xl font-black text-slate-900">0{bookings.filter(b => b.status === 'pending').length}</h3>
              <span className="text-sky-500 text-xs font-bold mb-1.5 flex items-center"><ArrowUpRight size={14}/> +12%</span>
            </div>
          </div>
          
          <div className="bg-sky-500 p-8 rounded-4xl text-white shadow-2xl shadow-sky-100 relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-white/10 rounded-full blur-2xl" />
            <p className="text-[10px] font-black text-sky-100 uppercase tracking-widest mb-2">Total Services</p>
            <h3 className="text-4xl font-black">{bookings.length}k+</h3>
          </div>
        </div>

        {/* Booking Pipeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[2px]">Registry Feed</h3>
            <span className="text-[10px] font-bold text-slate-300 italic">Auto-refreshing every 30s</span>
          </div>
          
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-4xl border border-slate-50 p-6 lg:p-8 shadow-sm hover:shadow-2xl hover:shadow-sky-100/50 transition-all group">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                
                {/* Visual Connection */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-6 lg:gap-12">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center font-black text-slate-400 shrink-0 border border-slate-200/50 shadow-inner">
                      {booking.memberName[0]}
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest">Client</span>
                      <h4 className="font-bold text-slate-900 text-xl tracking-tight">{booking.memberName}</h4>
                      <p className="text-[10px] font-medium text-slate-400 mt-0.5 tracking-wider">{booking._id}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-300 group-hover:text-sky-500 group-hover:border-sky-100 transition-colors">
                    <ChevronRight size={20} />
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-sky-50 flex items-center justify-center font-black text-sky-400 shrink-0 border border-sky-100/50 shadow-inner">
                      {booking.nurseName[0]}
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Medical Staff</span>
                      <h4 className="font-bold text-slate-800 text-xl tracking-tight">{booking.nurseName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <p className="text-xs font-bold text-slate-500">{booking.service}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scheduling Metadata */}
                <div className="flex flex-wrap items-center gap-4 lg:gap-8 bg-slate-50/30 px-6 py-4 rounded-3xl border border-slate-100">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Calendar size={14} className="text-sky-400" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Schedule</span>
                    </div>
                    <p className="text-sm font-black text-slate-700">
                      {new Date(booking.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Clock size={14} className="text-sky-400" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Time</span>
                    </div>
                    <p className="text-sm font-black text-slate-700">
                      {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Refined Actions */}
                <div className="flex items-center justify-between xl:justify-end gap-6 border-t xl:border-t-0 xl:border-l border-slate-100 pt-6 xl:pt-0 xl:pl-8">
                  <div className="flex flex-col items-end">
                     <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[1.5px] border-2 shadow-sm
                      ${booking.status === 'pending' ? 'bg-amber-50 text-amber-500 border-amber-100' : 'bg-rose-50 text-rose-500 border-rose-100'}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <button className="group/btn relative h-14 w-14 bg-slate-900 text-white rounded-[20px] flex items-center justify-center overflow-hidden transition-all hover:bg-sky-600 hover:rounded-2xl shadow-xl shadow-slate-200">
                    <User size={20} className="relative z-10" />
                    <div className="absolute inset-0 bg-linear-to-tr from-sky-400 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
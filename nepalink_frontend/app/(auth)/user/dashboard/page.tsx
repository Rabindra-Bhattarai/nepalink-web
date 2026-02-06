"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, User, LogOut, HeartPulse, 
  ShieldCheck, MessageCircle, Clock, CheckCircle2, 
  MapPin, Phone, CalendarDays, MoreHorizontal,
  TrendingUp, AlertCircle
} from "lucide-react";

export default function GuardianDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  return (
    <div className="flex min-h-screen bg-[#F4F7FA] font-sans antialiased text-slate-900">
      
      {/* SIDEBAR: Focused on Family Management */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col z-50">
        <div className="h-20 flex items-center px-6 gap-3">
          <div className="bg-sky-500 p-2 rounded-lg text-white">
            <HeartPulse size={22} />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">NepaLink</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <SidebarLink icon={<LayoutDashboard size={19}/>} label="Family Overview" active />
          <SidebarLink icon={<User size={19}/>} label="Caregivers" />
          <SidebarLink icon={<CalendarDays size={19}/>} label="Visit Schedule" />
          <SidebarLink icon={<MessageCircle size={19}/>} label="Nurse Chat" badge="2" />
          <SidebarLink icon={<ShieldCheck size={19}/>} label="Billing & Reports" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4 mb-4">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Emergency Contact</p>
            <p className="text-xs text-white font-medium">Support: 980-0000000</p>
          </div>
          <button onClick={() => router.push("/login")} className="flex items-center gap-3 w-full p-2 hover:text-white transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8">
        
        {/* Header: Focus on the Dependent */}
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Guardian Dashboard</h1>
            <p className="text-slate-500">Monitoring care for: <span className="text-sky-600 font-bold">Harimaya Devi (Parent)</span></p>
          </div>
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <Plus size={16} /> Book New Caregiver
          </button>
        </header>

        <div className="grid grid-cols-12 gap-6">
          
          {/* 1. CURRENT NURSE STATUS (The "Right Now" Vibe) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="bg-white rounded-4xl border border-slate-200 p-6 shadow-sm overflow-hidden relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Clock className="text-sky-500" /> Active Session
                </h3>
                <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-full uppercase">On Duty</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nurse" alt="Nurse" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold">Nurse Sarita Thapa</h4>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <MapPin size={14} /> Kapan, Kathmandu • Arrived at 08:30 AM
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="bg-sky-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-sky-700">Call Nurse</button>
                    <button className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200">Message</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Live Update</p>
                  <p className="text-sm font-bold text-emerald-600 mt-1">"Giving Morning Medicine"</p>
                </div>
              </div>
            </div>

            {/* 2. TASK CHECKLIST (CW2 Requirements) */}
            <div className="bg-white rounded-4xl border border-slate-200 p-8 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Today's Care Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TaskItem task="Morning Medication" time="09:00 AM" status="completed" />
                <TaskItem task="Blood Pressure Check" time="10:30 AM" status="pending" />
                <TaskItem task="Physiotherapy Session" time="01:00 PM" status="scheduled" />
                <TaskItem task="Evening Walk" time="05:30 PM" status="scheduled" />
              </div>
            </div>
          </div>

          {/* 3. VITAL STATS (Parent Monitoring) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
             <div className="bg-linear-to-br from-sky-600 to-indigo-700 rounded-4xl p-6 text-white shadow-xl shadow-sky-200">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sky-100 text-sm font-medium">Recent Health Score</p>
                  <TrendingUp size={20} className="text-sky-200" />
                </div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-black">92</h2>
                  <span className="text-sky-200 font-bold">/100</span>
                </div>
                <p className="mt-4 text-xs text-sky-100 leading-relaxed">
                  Based on nurse updates and vitals, your parent's health is stable. No alerts today.
                </p>
             </div>

             {/* Recent Activity Feed */}
             <div className="bg-white rounded-4xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-6">Recent Activity</h3>
                <div className="space-y-6">
                  <FeedItem title="BP Recorded" detail="120/80 (Normal)" time="2h ago" type="health" />
                  <FeedItem title="Meal Update" detail="Finished Lunch (Balanced Diet)" time="4h ago" type="care" />
                  <FeedItem title="Shift Started" detail="Nurse Sarita checked in" time="6h ago" type="system" />
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// UI HELPER COMPONENTS
function SidebarLink({ icon, label, active = false, badge }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'hover:bg-slate-800'}`}>
      {icon}
      <span className="text-sm font-medium flex-1">{label}</span>
      {badge && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{badge}</span>}
    </div>
  );
}

function TaskItem({ task, time, status }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/50">
      {status === 'completed' ? <CheckCircle2 className="text-emerald-500" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-200" />}
      <div className="flex-1">
        <p className={`text-sm font-bold ${status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase">{time}</p>
      </div>
    </div>
  );
}

function FeedItem({ title, detail, time, type }: any) {
  return (
    <div className="flex gap-4">
      <div className={`w-2 h-2 rounded-full mt-1.5 ${type === 'health' ? 'bg-rose-500' : 'bg-sky-500'}`} />
      <div>
        <p className="text-sm font-bold text-slate-900 leading-none">{title}</p>
        <p className="text-xs text-slate-500 mt-1">{detail}</p>
        <p className="text-[10px] text-slate-300 mt-1 font-bold uppercase">{time}</p>
      </div>
    </div>
  );
}

function Plus({ size }: any) { return <span style={{fontSize: size}}>+</span> }
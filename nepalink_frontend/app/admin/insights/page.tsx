"use client";

import AdminSidebar from "@/app/admin/componets/AdminSidebar";
import { 
  Cpu, TrendingUp, Activity, 
  BrainCircuit, Zap, Globe, 
  BarChart3, ShieldAlert 
} from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col md:flex-row font-sans text-slate-900">
      <AdminSidebar />
      
      <main className="flex-1 p-6 sm:p-10 lg:p-14 overflow-x-hidden">
        
        {/* Future Vision Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
              Future Roadmap 2027
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Predictor <span className="text-slate-300 font-light">&</span> Insights</h1>
          <p className="text-slate-400 font-medium mt-2 max-w-2xl">
            This module represents the future of NepaLink: using machine learning to predict healthcare demand across Nepal before it happens.
          </p>
        </div>

        {/* AI Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "AI Matching Accuracy", val: "94.2%", icon: <BrainCircuit size={20}/>, color: "text-purple-500", bg: "bg-purple-50" },
            { label: "Predicted Demand", val: "+18%", icon: <TrendingUp size={20}/>, color: "text-emerald-500", bg: "bg-emerald-50" },
            { label: "System Latency", val: "12ms", icon: <Zap size={20}/>, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Global Trust Rank", val: "#12", icon: <Globe size={20}/>, color: "text-sky-500", bg: "bg-sky-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-4xl border border-slate-50 shadow-sm flex flex-col gap-4">
              <div className={`h-10 w-10 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Future Chart Placeholder */}
          <div className="lg:col-span-2 bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h4 className="text-xl font-bold">Predictive Care Analysis</h4>
                  <p className="text-slate-400 text-sm">Forecasting nursing demand for Kathmandu Valley</p>
                </div>
                <BarChart3 className="text-indigo-400" size={32} />
              </div>
              
              {/* Dummy Chart Visualization using simple Divs */}
              <div className="flex items-end justify-between h-48 gap-2 mt-12">
                {[40, 70, 45, 90, 65, 80, 95, 60, 50, 85, 40, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      className="w-full bg-linear-to-t from-indigo-600 to-sky-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125" 
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[8px] font-bold text-slate-500 uppercase">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-500/20 blur-[100px] rounded-full" />
          </div>

          {/* Side Module: Smart Alerts */}
          <div className="space-y-6">
            <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldAlert size={16} className="text-rose-500" /> Anomalies Detected
              </h4>
              <div className="space-y-4">
                {[
                  { msg: "High demand in Lalitpur", time: "2m ago", level: "urgent" },
                  { msg: "Nurse Sita Wagle offline", time: "15m ago", level: "warning" },
                  { msg: "Payment gateway delay", time: "1h ago", level: "info" }
                ].map((alert, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-700">{alert.msg}</p>
                      <p className="text-[10px] text-slate-400">{alert.time}</p>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${alert.level === 'urgent' ? 'bg-rose-500' : alert.level === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-600 rounded-4xl p-8 text-white group cursor-pointer hover:bg-indigo-700 transition-all">
               <Cpu className="mb-4 text-indigo-200" size={32} />
               <h4 className="font-bold text-lg mb-2">Enable Auto-Pilot</h4>
               <p className="text-indigo-200 text-xs leading-relaxed">
                 Allow AI to automatically assign nurses based on distance and rating.
               </p>
               <div className="mt-6 flex justify-end">
                 <div className="h-10 w-20 bg-white/20 rounded-full flex items-center p-1">
                   <div className="h-8 w-8 bg-white rounded-full shadow-lg" />
                 </div>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
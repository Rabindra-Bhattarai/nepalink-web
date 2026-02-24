"use client";

import { MessageSquareOff, ShieldCheck, Lock, Sparkles, Zap } from "lucide-react";

export default function ChatPlaceholder() {
  return (
    <div className="h-full w-full bg-[#FDFDFD] flex items-center justify-center overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-50/50 rounded-full blur-[120px]" />
      
      <div className="relative max-w-sm w-full mx-6 text-center">
        
        {/* Floating Abstract Elements to "Fill" the space */}
        <div className="absolute -top-12 -left-8 animate-bounce duration-3000">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 -rotate-12">
            <Sparkles size={20} className="text-amber-400" />
          </div>
        </div>
        <div className="absolute -bottom-10 -right-4 animate-bounce duration-4000">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 rotate-15">
            <Zap size={20} className="text-blue-500" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/40 backdrop-blur-md rounded-[3rem] p-12 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          <div className="relative inline-block mb-10">
            {/* Multi-layered Icon Ring */}
            <div className="w-24 h-24 rounded-[2.5rem] bg-linear-to-tr from-slate-50 to-white flex items-center justify-center shadow-inner border border-slate-100">
              <MessageSquareOff size={40} className="text-slate-200" />
            </div>
            
            {/* Status Badge */}
            <div className="absolute -bottom-2 -right-2 bg-slate-900 p-2.5 rounded-2xl shadow-xl border-4 border-white">
              <Lock size={16} className="text-white" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Inbox Secured
              </h2>
              <div className="h-1 w-12 bg-blue-500 rounded-full mx-auto" />
            </div>

            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              To maintain the highest standards of safety, messaging is automatically 
              encrypted and enabled once your <span className="text-slate-900 font-bold">care contract </span> 
              is finalized.
            </p>

            {/* Visual Checklist (Non-interactive) */}
            <div className="pt-6 flex justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-50 shadow-sm">
                <ShieldCheck size={14} className="text-green-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-12 space-y-2 opacity-40">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Waiting for Active Assignment
          </p>
          <div className="flex justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
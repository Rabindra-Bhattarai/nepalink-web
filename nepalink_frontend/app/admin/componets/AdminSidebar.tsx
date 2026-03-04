"use client";

import { useState } from "react"; // Added for loading state
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  CalendarCheck, 
  BarChart3, 
  LogOut,
  ChevronRight,
  Fingerprint,
  Loader2 // Added for logout animation
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Violations", href: "/admin/violations", icon: ShieldAlert },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Insights", href: "/admin/insights", icon: BarChart3 },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true); // Start loading animation
    
    try {
      // 1. Call your actual logout API
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      // 2. Clear local storage/session markers
      localStorage.clear();
      sessionStorage.clear();

      // 3. Force redirect to login
      window.location.href = "/login"; 
    } catch (err) {
      console.error("Logout failed:", err);
      // Even if API fails, we force redirect for security
      window.location.href = "/login";
    }
  };

  return (
    <>
      {/* Full Screen Loading Overlay during Logout */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-100 flex flex-col items-center justify-center text-white">
          <Loader2 className="w-12 h-12 text-sky-400 animate-spin mb-4" />
          <p className="text-sm font-black uppercase tracking-[4px]">Terminating Session...</p>
        </div>
      )}

      <aside className="w-full md:w-72 lg:w-80 bg-white border-r border-slate-100 h-screen sticky top-0 flex flex-col shadow-sm z-50">
        
        {/* Brand & Identity */}
        <div className="px-8 py-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-sky-600 rounded-[20px] flex items-center justify-center shadow-2xl shadow-sky-200">
              <Fingerprint className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">NepaLink</h1>
              <p className="text-[10px] font-black text-sky-500 uppercase tracking-[3px] mt-1.5">Admin Core</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          <div className="px-4 mb-4 mt-2">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Operations</p>
          </div>
          
          {navItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`group relative flex items-center justify-between px-5 py-4 rounded-[22px] font-bold transition-all duration-300 ${
                  active
                    ? "bg-slate-900 text-white shadow-2xl shadow-slate-200 translate-x-1"
                    : "text-slate-500 hover:bg-sky-50/50 hover:text-sky-600"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={`w-5 h-5 transition-colors ${active ? "text-sky-400" : "text-slate-400 group-hover:text-sky-500"}`} />
                  <span className="text-[13px] tracking-tight">{name}</span>
                </div>
                {active && <ChevronRight size={14} className="text-sky-400/50" />}
                
                {active && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-sky-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Persistent Logout & Version */}
        <div className="p-6 mt-auto shrink-0">
          <div className="bg-slate-50/80 rounded-4xl p-5 border border-slate-100 backdrop-blur-sm text-center">
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-white border border-slate-200 rounded-[20px] text-[11px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 hover:border-rose-100 hover:text-rose-600 transition-all active:scale-95 shadow-sm disabled:opacity-50"
            >
              <LogOut size={16} />
              End Session
            </button>
            
            <div className="mt-4 px-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Live System</span>
              </div>
              <span className="text-[9px] font-bold text-slate-300 tracking-tighter">BUILD 2.0.46</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
"use client"

import { useRouter } from "next/navigation"
import { clearAuthCookies } from "@/lib/cookie"
import { 
  LayoutDashboard,
  Users,
  BookOpen,
  Activity,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react"

export default function AdminSidebar() {
  const router = useRouter()

  const handleLogout = async () => {
    await clearAuthCookies()
    router.push("/login")
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white italic">N</div>
          NepaLink
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <button onClick={() => router.push("/admin/dashboard")} className="w-full flex items-center gap-3 px-4 py-3 text-green-700 bg-green-50 rounded-xl font-medium">
          <LayoutDashboard size={20} /> Dashboard
        </button>
        <button onClick={() => router.push("/admin/users")} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl">
          <Users size={20} /> Manage Users
        </button>
        <button onClick={() => router.push("/admin/bookings")} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl">
          <BookOpen size={20} /> Bookings
        </button>
        <button onClick={() => router.push("/admin/workload")} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl">
          <Activity size={20} /> Nurse Workload
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl">
          <Settings size={20} /> Settings
        </button>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition font-medium"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  )
}

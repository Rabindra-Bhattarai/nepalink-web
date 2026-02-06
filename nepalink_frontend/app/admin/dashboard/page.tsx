"use client"

import { useRouter } from "next/navigation"
import { clearAuthCookies } from "@/lib/cookie"
import { 
  Users, 
  UserPlus, 
  Activity, 
  Clock, 
  LogOut, 
  LayoutDashboard, 
  Settings 
} from "lucide-react" // Note: Install lucide-react for professional icons

const StatCard = ({ title, value, icon: Icon, colorClass, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
        {trend && <p className="text-xs mt-2 text-green-600 font-medium">{trend} increase</p>}
      </div>
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </div>
)

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await clearAuthCookies()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white italic">N</div>
            NepaLink
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-green-700 bg-green-50 rounded-xl font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => router.push("/admin/users")} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition">
            <Users size={20} /> Manage Users
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition">
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

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-slate-800">Healthcare Overview</h1>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-500">Welcome back,</p>
                <p className="text-sm font-bold text-slate-800">System Admin</p>
             </div>
             <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Dashboard Metrics</h2>
              <p className="text-slate-500">Real-time status of your medical staff and portal.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => router.push("/admin/users/create")}
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 shadow-md shadow-green-200 transition-all active:scale-95"
              >
                <UserPlus size={18} /> Create User
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard 
              title="Total Registered Users" 
              value="1,240" 
              icon={Users} 
              colorClass="bg-blue-600"
              trend="+12%"
            />
            <StatCard 
              title="Active Nurses" 
              value="45" 
              icon={Activity} 
              colorClass="bg-green-600"
              trend="+3 this week"
            />
            <StatCard 
              title="Pending Verifications" 
              value="12" 
              icon={Clock} 
              colorClass="bg-amber-500"
            />
          </div>

          {/* Recent Activity (New Placeholder Section) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent User Actions</h3>
              <button onClick={() => router.push("/admin/users")} className="text-sm text-green-600 font-semibold hover:underline">View All</button>
            </div>
            <div className="p-0">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">JD</div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">John Doe registered as a Nurse</p>
                        <p className="text-xs text-slate-400">2 hours ago</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">New</span>
                 </div>
               ))}
            </div>
          </div>

          <footer className="mt-12 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} NepaLink Health Systems • Admin Portal v2.0
          </footer>
        </div>
      </main>
    </div>
  )
}
"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/lib/actions/admin-actions";
import AdminSidebar from "@/app/admin/componets/AdminSidebar";
import {
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, ComposedChart, Line
} from "recharts";
import { Users, UserCheck, UserCog, Shield, Download, LogOut, Activity, BarChart3 } from "lucide-react";

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, borderClass }: any) => (
  <div className={`bg-white p-6 rounded-2xl border-t-4 ${borderClass} shadow-sm flex items-center justify-between transition-transform hover:-translate-y-1`}>
    <div>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-800">{value ?? "0"}</h3>
    </div>
    <div className="p-3 bg-slate-50 rounded-xl">
      <Icon className="w-6 h-6 text-slate-400" />
    </div>
  </div>
);

export default function MemberDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [counts, setCounts] = useState({
    total: 0,
    nurses: 0,
    members: 0,
    admins: 0
  });

  useEffect(() => {
    const loadData = async () => {
      // Using fetchUsers to get the data since fetchAnalytics is currently failing
      const res = await fetchUsers(1, 1000); 
      if (res && res.users) {
        const all = res.users;
        setUsers(all.slice(0, 5)); // Show most recent 5 in the table
        
        setCounts({
          total: res.pagination.total || all.length,
          nurses: all.filter((u: any) => u.role === 'nurse').length,
          members: all.filter((u: any) => u.role === 'member').length,
          admins: all.filter((u: any) => u.role === 'admin').length,
        });
      }
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "/login";
    }
  };

  // Staff Distribution Bar Data (Better visibility than Pie for small counts)
  const barData = [
    { name: "Nurses", count: counts.nurses, color: "#0ea5e9" },
    { name: "Members", count: counts.members, color: "#6366f1" },
    { name: "Admins", count: counts.admins, color: "#f43f5e" },
  ];

  // Your working Operational Growth Data
  const bookingGrowth = [
    { name: 'Jan', active: 400, growth: 240 },
    { name: 'Feb', active: 300, growth: 139 },
    { name: 'Mar', active: 200, growth: 980 },
    { name: 'Apr', active: 278, growth: 390 },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] flex overflow-hidden font-sans">
      <AdminSidebar />
      
      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-10 bg-slate-50 rounded-l-[40px]">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-3xl p-4 mb-8 shadow-sm border border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-200">
              HP
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Health Admin Portal</h1>
              <p className="text-sky-500 text-[10px] font-bold uppercase tracking-widest">Global Overview • Real-time</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stat Cards - Now dynamically driven by user data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={counts.total} icon={Users} borderClass="border-t-sky-400" />
          <StatCard title="Nurses" value={counts.nurses} icon={UserCheck} borderClass="border-t-emerald-400" />
          <StatCard title="Members" value={counts.members} icon={UserCog} borderClass="border-t-indigo-400" />
          <StatCard title="Admins" value={counts.admins} icon={Shield} borderClass="border-t-red-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Registrations */}
          <div className="lg:col-span-2 bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="text-sky-500 w-5 h-5" /> Recent Registrations
            </h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4">User Info</th>
                  <th className="pb-4">Designation</th>
                  <th className="pb-4">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((u) => (
                  <tr key={u._id} className="group">
                    <td className="py-4">
                      <p className="font-bold text-slate-800">{u.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{u.email}</p>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-black uppercase rounded-lg border border-sky-100">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-slate-500 font-medium">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* New Distribution Chart - More reliable for data visibility */}
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-lg font-black text-slate-800 mb-2">Staff Distribution</h2>
            <p className="text-slate-400 text-xs mb-8">Active count by role</p>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ left: -20 }}>
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                   <Tooltip cursor={{fill: 'transparent'}} />
                   <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={30}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                   </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Performance Area Chart - THE ONE YOU WANTED TO KEEP */}
          <div className="lg:col-span-3 bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <BarChart3 className="text-indigo-500 w-5 h-5" /> Operational Growth
            </h2>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={bookingGrowth}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <Bar dataKey="active" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={40} />
                    <Line type="monotone" dataKey="growth" stroke="#f43f5e" strokeWidth={3} dot={{r: 6, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff'}} />
                </ComposedChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
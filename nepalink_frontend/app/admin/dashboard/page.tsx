"use client";

import { useEffect, useState } from "react";
import { fetchAnalytics, fetchUsers } from "@/lib/actions/admin-actions";
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
      <h3 className="text-3xl font-black text-slate-800">{value || "0"}</h3>
    </div>
    <div className="p-3 bg-slate-50 rounded-xl">
      <Icon className="w-6 h-6 text-slate-400" />
    </div>
  </div>
);

export default function MemberDashboard() {
  const [stats, setStats] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const analytics = await fetchAnalytics();
      const userRes = await fetchUsers(1, 5);
      setStats(analytics || {});
      setUsers(userRes?.data || []);
    };
    loadData();
  }, []);

  // --- EXPORT CSV ---
  const handleExport = () => {
    const headers = ["Metric", "Value"];
    const rows = [
      ["Total Users", stats.totalUsers || 0],
      ["Nurses", stats.nurses || 0],
      ["Members", stats.members || 0],
      ["Admins", stats.admins || 0],
    ];
    const csvContent = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "health_system_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- LOGOUT ---
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // ensures cookie is sent and cleared
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "/login"; // redirect after cookie cleared
    }
  };

  // Chart Data
  const pieData = [
    { name: "Nurses", value: stats.nurses || 0 },
    { name: "Members", value: stats.members || 0 },
    { name: "Admins", value: stats.admins || 0 },
  ];
  const PIE_COLORS = ["#0ea5e9", "#6366f1", "#f43f5e"];

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
            <button onClick={handleExport} className="p-3 bg-slate-100 hover:bg-sky-500 hover:text-white rounded-2xl text-slate-600 transition-all">
              <Download className="w-5 h-5" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={stats.totalUsers} icon={Users} borderClass="border-t-sky-400" />
          <StatCard title="Nurses" value={stats.nurses} icon={UserCheck} borderClass="border-t-emerald-400" />
          <StatCard title="Members" value={stats.members} icon={UserCog} borderClass="border-t-indigo-400" />
          <StatCard title="Admins" value={stats.admins} icon={Shield} borderClass="border-t-red-400" />
        </div>

        {/* Charts Section */}
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

          {/* Donut Chart */}
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-lg font-black text-slate-800 mb-2">Staff Mix</h2>
            <p className="text-slate-400 text-xs mb-6">Current active roles</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={85} paddingAngle={10} dataKey="value">
                  {pieData.map((_, index) => <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
                            {pieData.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50">
                  <span className="text-xs font-bold text-slate-500">{item.name}</span>
                  <span className="text-sm font-black text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Performance Area Chart */}
        <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 className="text-indigo-500 w-5 h-5" /> Operational Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
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

      </main>
    </div>
  );
}

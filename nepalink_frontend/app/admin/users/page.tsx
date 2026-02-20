"use client";

import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "@/lib/actions/admin-actions";
import AdminSidebar from "@/app/admin/componets/AdminSidebar";
import { Button } from "@/app/(auth)/_components/ui/Button";
import { useRouter } from "next/navigation";
import { 
  Search, UserPlus, Trash2, Edit3, Eye, LogOut, 
  ChevronLeft, ChevronRight, AlertCircle, Users, 
  ShieldCheck, Activity, CheckSquare, Square, X, Download, Loader2
} from "lucide-react";

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const res = await fetchUsers(page, limit, search, role);
        if (res) {
          setUsers(res.data || []);
          setTotal(res.total || 0);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    const timeoutId = setTimeout(loadUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [page, limit, search, role]);

  // --- DELETE LOGIC ---
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      setActionLoading(id);
      const res = await deleteUser(id);
      if (res?.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Permanently delete ${selectedIds.length} users?`)) return;
    try {
      setLoading(true);
      await Promise.all(selectedIds.map(id => deleteUser(id)));
      setUsers(prev => prev.filter(u => !selectedIds.includes(u._id)));
      setSelectedIds([]);
    } catch (err) {
      alert("Error during bulk deletion.");
    } finally {
      setLoading(false);
    }
  };

  // --- SELECTION LOGIC ---
  const toggleSelectAll = () => {
    if (selectedIds.length === users.length && users.length > 0) setSelectedIds([]);
    else setSelectedIds(users.map(u => u._id));
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // --- EXPORT CSV ---
  const handleExport = () => {
    if (!users || users.length === 0) {
      alert("No users to export.");
      return;
    }
    const headers = ["Name", "Email", "Role", "Phone"];
    const rows = users.map(u => [u.name, u.email, u.role, u.phone || ""]);
    const csvContent = [headers, ...rows].map(row => row.map(val => `"${val}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- LOGOUT ---
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/login");
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const r = role.toLowerCase();
    if (r === 'admin') return 'bg-rose-50 text-rose-600 border-rose-100 ring-4 ring-rose-500/5';
    if (r === 'nurse') return 'bg-emerald-50 text-emerald-600 border-emerald-100 ring-4 ring-emerald-500/5';
    return 'bg-sky-50 text-sky-600 border-sky-100 ring-4 ring-sky-500/5';
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex font-sans selection:bg-sky-200 text-slate-900">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-12 w-full max-w-7xl mx-auto relative">

        {/* Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 bg-slate-900/95 backdrop-blur-xl text-white px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-10 animate-in slide-in-from-bottom-10 duration-500 border border-white/10">
            <div className="flex items-center gap-4 border-r border-slate-700 pr-10">
              <div className="bg-sky-500 text-[11px] font-black h-6 w-6 flex items-center justify-center rounded-full">
                {selectedIds.length}
              </div>
              <p className="text-sm font-bold tracking-tight">Staff Selected</p>
            </div>
            <div className="flex gap-6 items-center">
              <button onClick={handleBulkDelete} className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors font-black text-xs uppercase tracking-widest">
                <Trash2 size={18} /> Delete Collection
              </button>
              <button onClick={() => setSelectedIds([])} className="text-slate-400 hover:text-white transition-colors p-1">
                <X size={22} />
              </button>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col gap-10 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900">Staff Management</h1>
              <p className="text-slate-400 font-semibold text-lg mt-1">Configure user access and system roles.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleExport} className="bg-white hover:bg-slate-50 text-slate-600 h-14 px-6 rounded-2xl flex items-center gap-3 border border-slate-200 transition-all active:scale-95 shadow-sm">
                <Download size={18} />
                <span className="font-bold text-sm">Export CSV</span>
              </button>
              <Button onClick={() => router.push('/admin/users/create')} className="bg-sky-600 hover:bg-sky-700 text-white h-14 px-8 rounded-2xl flex items-center gap-3 shadow-xl shadow-sky-200 border-none transition-all active:scale-95">
                <UserPlus size={20} />
                <span className="font-bold text-sm">Add New Staff</span>
              </Button>
              <Button onClick={handleLogout} className="bg-rose-600 hover:bg-rose-700 text-white h-14 px-8 rounded-2xl flex items-center gap-3 shadow-xl shadow-rose-200 border-none transition-all active:scale-95">
                <LogOut size={20} />
                <span className="font-bold text-sm">Logout</span>
              </Button>
            </div>
          </div>


                    {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Personnel', val: total, color: 'bg-sky-500', icon: Users },
              { label: 'Authorized', val: users.filter(u=>u.role==='admin').length, color: 'bg-rose-500', icon: ShieldCheck },
              { label: 'Active Sessions', val: '12', color: 'bg-emerald-500', icon: Activity }
            ].map((card, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-sm p-6 rounded-[2.5rem] border border-white flex justify-between items-center group hover:bg-white transition-all shadow-sm ring-1 ring-black/2">
                <div className={`h-14 w-14 ${card.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <card.icon size={24} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{card.label}</p>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight">{card.val}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- MAIN DATA TABLE --- */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-sky-900/5 border border-white overflow-hidden">
          <div className="p-4 bg-slate-50/50 border-b border-slate-50 flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-sky-500 transition-colors" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Global filter search..."
                className="w-full pl-16 pr-8 py-4 bg-white rounded-3xl border-none focus:ring-4 focus:ring-sky-500/5 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-white text-slate-600 font-bold border-none rounded-3xl px-8 py-4 text-xs uppercase tracking-widest focus:ring-0 cursor-pointer hover:bg-slate-50 transition-all flex-1 md:flex-none outline-none appearance-none"
              >
                <option value="">All Roles</option>
                <option value="admin">Admins</option>
                <option value="nurse">Nurses</option>
              </select>
              <button 
                onClick={toggleSelectAll} 
                className="h-14 px-6 rounded-3xl bg-white border border-slate-100 flex items-center gap-3 hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 min-w-45 justify-center"
              >
                {selectedIds.length === users.length && users.length > 0 ? <CheckSquare size={18} className="text-sky-500"/> : <Square size={18}/>}
                {selectedIds.length === users.length && users.length > 0 ? "Deselect All" : "Select All"}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 w-16 text-center">Select</th>
                  <th className="px-6 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Identity</th>
                  <th className="px-6 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Permission</th>
                  <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <Loader2 className="animate-spin mx-auto text-sky-500 mb-4" size={32} />
                      <p className="text-xs font-black uppercase tracking-widest text-slate-300">Syncing Records...</p>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center text-slate-400 font-medium">No users found matching your criteria.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className={`group transition-all ${selectedIds.includes(user._id) ? 'bg-sky-50/50' : 'hover:bg-slate-50/30'}`}>
                      <td className="px-10 py-6 text-center">
                        <button onClick={() => toggleSelectOne(user._id)} className="text-slate-200 hover:text-sky-500 transition-colors">
                          {selectedIds.includes(user._id) ? <CheckSquare size={22} className="text-sky-500"/> : <Square size={22}/>}
                        </button>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden shrink-0 group-hover:scale-110 transition-all duration-500 ring-1 ring-black/5">
                            {user.imageUrl ? (
                              <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${user.imageUrl}`} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-xl uppercase">{user.name?.[0]}</div>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-lg leading-none mb-1 tracking-tight">{user.name}</p>
                            <p className="text-xs font-bold text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button onClick={() => router.push(`/admin/users/${user._id}`)} className="h-11 w-11 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-sky-500 hover:shadow-xl hover:shadow-sky-100 transition-all" title="View Profile">
                            <Eye size={18} />
                          </button>
                          <button onClick={() => router.push(`/admin/users/${user._id}/edit`)} className="h-11 w-11 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-emerald-500 hover:shadow-xl hover:shadow-emerald-100 transition-all" title="Edit User">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDelete(user._id)} disabled={actionLoading === user._id} className="h-11 w-11 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-rose-500 hover:shadow-xl hover:shadow-rose-100 transition-all disabled:opacity-50" title="Delete User">
                            {actionLoading === user._id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

                    {/* Pagination Footer */}
          <div className="p-10 bg-slate-50/50 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">
              Database Entry: <span className="text-slate-900">{total}</span> total
            </p>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setPage(p => Math.max(p - 1, 1))} 
                disabled={page === 1} 
                className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 disabled:opacity-30 transition-all hover:shadow-md"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>
              
              <div className="flex gap-2">
                {[...Array(Math.ceil(total / limit))].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setPage(i + 1)}
                    className={`h-12 w-12 rounded-2xl font-black text-xs transition-all ${page === i + 1 ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' : 'bg-white text-slate-400 border border-slate-100 hover:bg-sky-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setPage(p => p < Math.ceil(total / limit) ? p + 1 : p)} 
                disabled={page >= Math.ceil(total / limit)} 
                className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 disabled:opacity-30 transition-all hover:shadow-md"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


         
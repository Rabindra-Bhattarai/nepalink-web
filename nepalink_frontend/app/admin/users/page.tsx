"use client";

import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "@/lib/actions/admin-actions";
import AdminSidebar from "@/app/admin/componets/AdminSidebar";
import { Button } from "@/app/(auth)/_components/ui/Button";
import { useRouter } from "next/navigation";
import { 
  Search, UserPlus, Trash2, Edit3, Eye, 
  ChevronLeft, ChevronRight, Users, 
  ShieldCheck, Activity, CheckSquare, Square, Loader2
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

  // ✅ Build correct image URL by removing `/api` from base URL
  const assetBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const res = await fetchUsers(page, limit, search, role);
        if (res) {
          // Strictly handle the 10-item display
          const filteredUsers = (res.users || []).slice(0, limit);
          setUsers(filteredUsers);                
          setTotal(res.pagination.total || 0);      
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      setActionLoading(id);
      const res = await deleteUser(id);
      if (res?.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } finally { setActionLoading(null); }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      <AdminSidebar />
      <main className="flex-1 p-8 w-full max-w-360 mx-auto">
        
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Staff Directory</h1>
            <p className="text-slate-400 text-sm mt-0.5 font-medium italic">Viewing {limit} entries per page</p>
          </div>
          <Button onClick={() => router.push('/admin/users/create')} className="bg-[#1D4ED8] hover:bg-blue-700 text-white rounded-xl px-6 h-11 text-sm font-bold shadow-lg shadow-blue-100 border-none transition-all active:scale-95 flex items-center gap-2">
            <UserPlus size={18} /> Add Staff
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'TOTAL USERS', val: total, color: 'text-blue-600 bg-blue-50', icon: Users },
            { label: 'CURRENT VIEW', val: users.length, color: 'text-emerald-500 bg-emerald-50', icon: Activity },
            { label: 'TOTAL PAGES', val: totalPages || 1, color: 'text-amber-500 bg-amber-50', icon: ShieldCheck },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[20px] border border-slate-100 flex items-center gap-5 shadow-sm">
              <div className={`h-12 w-12 ${s.color} rounded-2xl flex items-center justify-center`}><s.icon size={22}/></div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-bold text-slate-800 leading-none mt-1">{s.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-150">
          
          {/* Filters Area */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-white">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Search name or email..." 
                value={search} 
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
            <select 
              value={role} 
              onChange={(e) => { setRole(e.target.value); setPage(1); }}
              className="bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 cursor-pointer focus:ring-0 outline-none"
            >
              <option value="">All Roles</option>
              <option value="admin">Admins</option>
              <option value="nurse">Nurses</option>
              <option value="member">Member</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed">
              <thead>
                <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                  <th className="px-6 py-5 w-16"></th>
                  <th className="px-6 py-5 w-[45%]">User Details</th>
                  <th className="px-6 py-5">Role</th>
                  <th className="px-6 py-5 text-right w-36">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan={4} className="py-20 text-center"><Loader2 className="animate-spin inline-block text-blue-500" size={32} /></td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/80 transition-all">
                      <td className="px-6 py-4">
                        <button onClick={() => toggleSelectOne(user._id)} className="text-slate-200 hover:text-blue-500 transition-colors">
                          {selectedIds.includes(user._id) ? <CheckSquare size={20} className="text-blue-600"/> : <Square size={20}/>}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* ✅ Fixed Profile Picture Logic */}
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs uppercase overflow-hidden ring-2 ring-slate-50 shadow-sm">
                             {user.imageUrl ? (
                               <img 
                                 src={`${assetBaseUrl}/uploads/${user.imageUrl}`} 
                                 alt={user.name}
                                 className="w-full h-full object-cover"
                                 onError={(e) => {
                                   (e.target as HTMLImageElement).onerror = null; 
                                   (e.target as HTMLImageElement).src = ""; 
                                 }}
                               />
                             ) : (
                               <span>{user.name ? user.name[0] : "?"}</span>
                             )}
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-bold text-slate-700 truncate">{user.name}</p>
                            <p className="text-[11px] font-medium text-slate-300 truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] font-black px-3 py-1 rounded-md border uppercase tracking-wider
                          ${user.role === 'admin' ? 'bg-rose-50 text-rose-500 border-rose-100' : 
                            user.role === 'nurse' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3 text-slate-300">
                          <button onClick={() => router.push(`/admin/users/${user._id}`)} className="hover:text-blue-600 transition-colors"><Eye size={18}/></button>
                          <button onClick={() => router.push(`/admin/users/${user._id}/edit`)} className="hover:text-emerald-500 transition-colors"><Edit3 size={18}/></button>
                          <button onClick={() => handleDelete(user._id)} className="hover:text-rose-500 transition-colors">
                            {actionLoading === user._id ? <Loader2 size={18} className="animate-spin"/> : <Trash2 size={18}/>}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="mt-auto px-8 py-5 bg-white border-t border-slate-100 flex items-center justify-between">
            <p className="text-[12px] font-bold text-slate-400">
              Showing page <span className="text-slate-900">{page}</span> of {totalPages || 1}
            </p>
            <div className="flex items-center gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="w-10 h-10 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-20 transition-all flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-1.5 px-2">
                {[...Array(totalPages || 1)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all
                      ${page === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
                className="w-10 h-10 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-20 transition-all flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
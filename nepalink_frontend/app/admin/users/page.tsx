"use client"

import { useEffect, useState } from "react"
import { fetchUsers, deleteUser } from "@/lib/actions/admin-actions"
import { Button } from "../../(auth)/_components/ui/Button"
import { useRouter } from "next/navigation"
import { clearAuthCookies } from "@/lib/cookie"
import toast from "react-hot-toast"
import { ArrowLeft, Search, UserPlus, Trash2, Edit3, Eye, LogOut, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import AdminSidebar from "@/app/(auth)/components/AdminSidebar"

async function getCurrentUser() {
  try {
    const res = await fetch("/api/auth/me", { credentials: "include" })
    if (!res.ok) return null
    const result = await res.json()
    return result.data
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("")
  const limit = 10
  const router = useRouter()

  useEffect(() => {
    async function init() {
      const user = await getCurrentUser()
      if (!user || user.role !== "admin") {
        toast.error("Access denied. Admins only.")
        router.push("/login")
        return
      }
      setAuthorized(true)
      loadUsers()
    }
    init()
  }, [page, search, role])

  const loadUsers = async () => {
    setLoading(true)
    const res = await fetchUsers(page, limit, search, role)
    if (res) {
      setUsers(res.data)
      setTotal(res.total)
    }
    setLoading(false)
  }

  const totalPages = Math.ceil(total / limit)

  const handleLogout = async () => {
    await clearAuthCookies()
    router.push("/login")
  }

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    setLoading(true)
    const result = await deleteUser(userId)
    if (result?.success) {
      toast.success("User deleted successfully!")
      loadUsers()
    } else {
      toast.error("Failed to delete user")
    }
    setLoading(false)
  }

  if (!authorized) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600 font-medium">Authorizing Secure Access...</p>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">User Directory</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Medical Staff Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                onClick={() => router.push("/admin/users/create")}
                className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-100 flex items-center justify-center gap-2 px-6 rounded-xl"
              >
                <UserPlus size={18} /> <span className="hidden sm:inline">Add User</span>
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-green border border-slate-200 text-slate-600 hover:bg-slate-50 px-3 py-2 rounded-xl"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </header>

        {/* Search & Filter */}
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-8 flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-green-500 transition-all outline-none"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative flex items-center bg-slate-50 rounded-xl px-3 border border-transparent focus-within:border-green-500 transition-all">
                <Filter size={16} className="text-slate-400 mr-2" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-transparent py-2.5 text-sm font-medium outline-none min-w-30"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                  <option value="nurse">Nurse</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">User Identity</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Designation</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Status</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="group hover:bg-green-50/30 transition-colors">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-green-100 to-blue-50 flex items-center justify-center text-green-700 font-bold border border-green-200">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{user.name}</p>
                              <p className="text-sm text-slate-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                            user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                            user.role === 'nurse' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                                                <td className="p-5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-sm font-medium text-slate-600">
                              {user.status || "Active"}
                            </span>
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex justify-end items-center gap-2">
                            <button 
                              onClick={() => router.push(`/admin/users/${user._id}`)}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              title="View Profile"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => router.push(`/admin/users/${user._id}/edit`)}
                              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                              title="Edit Record"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(user._id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete User"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-20 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-slate-50 p-4 rounded-full mb-4">
                            <Search className="text-slate-300" size={32} />
                          </div>
                          <p className="text-slate-500 font-medium">
                            No medical staff found matching your criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-slate-500 font-medium">
                Page <span className="text-slate-900">{page}</span> of{" "}
                <span className="text-slate-900">{totalPages || 1}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1 || loading}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-sm shadow-sm"
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages || loading}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-sm shadow-sm"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

                        
                          
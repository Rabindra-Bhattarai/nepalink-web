"use client";

import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "@/lib/actions/admin-actions";
import { Button } from "../../(auth)/_components/ui/Button";
import { useRouter } from "next/navigation";
import { clearAuthCookies } from "@/lib/cookie";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";




async function getCurrentUser() {
  try {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) return null;
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const limit = 10;
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const user = await getCurrentUser();
      if (!user || user.role !== "admin") {
        toast.error("Access denied. Admins only.");
        router.push("/login");
        return;
      }
      setAuthorized(true);

      setLoading(true);
      const res = await fetchUsers(page, limit, search, role);
      if (res) {
        setUsers(res.data);
        setTotal(res.total);
      }
      setLoading(false);
    }
    init();
  }, [page, search, role]);

  const totalPages = Math.ceil(total / limit);

  const handleLogout = async () => {
    await clearAuthCookies();
    router.push("/login");
  };

  const handleDelete = async (userId: string) => {
    setLoading(true);
    const result = await deleteUser(userId);
    if (result?.success) {
      toast.success("User deleted successfully!");
      const res = await fetchUsers(page, limit, search, role);
      if (res) {
        setUsers(res.data);
        setTotal(res.total);
      }
    } else {
      toast.error("Failed to delete user");
    }
    setLoading(false);
  };

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-blue-50">
        <p className="text-gray-600 text-lg">Checking access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 p-10">
      
      
      
{/* Header */}
<div className="flex justify-between items-center mb-10">
  <h1 className="text-4xl font-extrabold text-green-700 tracking-tight">
    👩‍⚕️ Admin Dashboard – User Management
  </h1>
  <div className="flex items-center gap-4">
    {/* Back Button (blue, icon only, right side) */}
    <ArrowLeftIcon className="w-5 h-5" />
    <Button
      onClick={() => router.back()}
      className="bg-blue-500 text-white hover:bg-blue-600 rounded-full p-2 shadow-sm"
    >
      <span className="text-xl">⬅</span>
    </Button>
    <Button
      onClick={handleLogout}
      className="bg-red-600 text-white hover:bg-red-700 rounded-lg px-5 py-2 shadow-md"
    >
      Logout
    </Button>
  </div>
</div>







      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 border border-green-300 rounded-lg px-4 py-2 shadow-sm 
                    focus:ring-2 focus:ring-green-500 focus:outline-none 
                    bg-green-50 text-gray-800 placeholder-gray-500"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-40 border border-green-300 rounded-lg px-4 py-2 shadow-sm 
                    focus:ring-2 focus:ring-green-500 focus:outline-none 
                    bg-green-50 text-gray-800"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
          <option value="nurse">Nurse</option>
        </select>
      </div>


      {/* Loading Spinner */}
      {loading && (
        <div className="text-center text-gray-600 mb-4 animate-pulse">
          Loading users...
        </div>
      )}

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-100">
            <tr>
              <th className="p-4 border-b font-semibold text-gray-800">Name</th>
              <th className="p-4 border-b font-semibold text-gray-800">Email</th>
              <th className="p-4 border-b font-semibold text-gray-800">Role</th>
              <th className="p-4 border-b font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-green-50 transition-colors"
              >
                <td className="p-4 border-b text-gray-700">{user.name}</td>
                <td className="p-4 border-b text-gray-700">{user.email}</td>
                <td className="p-4 border-b text-gray-700">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="p-4 border-b flex gap-2">
                  <Button
                    onClick={() => router.push(`/admin/users/${user._id}`)}
                    className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-1 shadow-sm"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => router.push(`/admin/users/${user._id}/edit`)}
                    className="bg-yellow-500 text-black hover:bg-yellow-600 rounded-md px-4 py-1 shadow-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white hover:bg-red-600 rounded-md px-4 py-1 shadow-sm"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg px-4 py-2 shadow-sm ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ⬅ Previous
        </Button>
        <span className="font-medium text-gray-700 text-lg">
          Page {page} of {totalPages || 1}
        </span>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
          className={`bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg px-4 py-2 shadow-sm ${
            page >= totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next ➡
        </Button>
      </div>
    </main>
  );
}

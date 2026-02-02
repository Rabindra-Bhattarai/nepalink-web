"use client";

import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "@/lib/actions/admin-actions";
import { Button } from "../../(auth)/_components/ui/Button";
import { useRouter } from "next/navigation";
import { clearAuthCookies } from "@/lib/cookie";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const router = useRouter();

  useEffect(() => {
    async function loadUsers() {
      const res = await fetchUsers(page, limit);
      if (res) {
        setUsers(res.data);
        setTotal(res.total);
      }
    }
    loadUsers();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  const handleLogout = async () => {
    await clearAuthCookies();
    router.push("/login");
  };

  const handleDelete = async (userId: string) => {
    const result = await deleteUser(userId);
    if (result?.success) {
      // Refresh users after deletion
      const res = await fetchUsers(page, limit);
      if (res) {
        setUsers(res.data);
        setTotal(res.total);
      }
    } else {
      console.error("Failed to delete user");
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">Admin: User Management</h1>
        <Button
          onClick={handleLogout}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </Button>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3 border-b font-semibold text-gray-800">Name</th>
              <th className="p-3 border-b font-semibold text-gray-800">Email</th>
              <th className="p-3 border-b font-semibold text-gray-800">Role</th>
              <th className="p-3 border-b font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-green-50 transition-colors">
                <td className="p-3 border-b text-gray-700">{user.name}</td>
                <td className="p-3 border-b text-gray-700">{user.email}</td>
                <td className="p-3 border-b capitalize text-gray-700">{user.role}</td>
                <td className="p-3 border-b flex gap-2">
                  <Button
                    onClick={() => router.push(`/admin/users/${user._id}`)}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => router.push(`/admin/users/${user._id}/edit`)}
                    className="bg-yellow-500 text-black hover:bg-yellow-600"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white hover:bg-red-600"
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
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`bg-gray-200 text-gray-800 hover:bg-gray-300 ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </Button>
        <span className="font-medium text-gray-700">
          Page {page} of {totalPages || 1}
        </span>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
          className={`bg-gray-200 text-gray-800 hover:bg-gray-300 ${
            page >= totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </Button>
      </div>
    </main>
  );
}

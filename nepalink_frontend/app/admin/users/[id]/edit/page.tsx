"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`/api/admin/users/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();

        if (!res.ok || !result.success) {
          setError(result.message || "User not found");
          setLoading(false);
          return;
        }

        setUser(result.data);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to fetch user");
        setLoading(false);
      }
    }

    if (id) loadUser();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        toast.error(result.message || "Failed to update user");
        return;
      }

      toast.success("User updated successfully!");
      router.push("/admin/users"); // ✅ redirect to Manage Users list
    } catch (err: any) {
      toast.error("Error updating user");
    }
  }

  if (loading) return <p className="text-gray-600">Loading user...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 p-8 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
        {/* Back Icon */}
        <button
          onClick={() => router.push("/admin/users")}
          className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-3xl font-bold text-green-700 mb-6">Edit User</h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <div>
            <label className="block font-semibold text-green-600">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block font-semibold text-green-600">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block font-semibold text-green-600">Phone</label>
            <input
              type="text"
              name="phone"
              defaultValue={user.phone}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block font-semibold text-green-600">Role</label>
            <select
              name="role"
              defaultValue={user.role}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-green-400"
            >
              <option value="nurse">Nurse</option>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-green-600">Profile Photo</label>
            <input
              type="file"
              name="photo"
              className="w-full border rounded p-2"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {(preview || user.imageUrl) && (
              <img
                src={preview || `/uploads/${user.imageUrl}`}
                alt="User Photo"
                className="w-24 h-24 object-cover rounded-full mt-2 shadow-md"
              />
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

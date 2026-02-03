"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // icon library

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p className="text-gray-600">Loading user...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 p-8 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
        {/* Back Icon in top-right */}
        <button
          onClick={() => router.push("/admin/users")}
          className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">User Details</h1>

        {/* Profile Photo at Top */}
        {user.imageUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${user.imageUrl}`}
              alt="User Photo"
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
          </div>
        )}

        {/* User Info */}
        <div className="space-y-4 text-gray-700">
          <p><span className="font-semibold text-green-600">Name:</span> {user.name}</p>
          <p><span className="font-semibold text-green-600">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-green-600">Role:</span> {user.role}</p>
          <p><span className="font-semibold text-green-600">Phone:</span> {user.phone}</p>
        </div>
      </div>
    </main>
  );
}

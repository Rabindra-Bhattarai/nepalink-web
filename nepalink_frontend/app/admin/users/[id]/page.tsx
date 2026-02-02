"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }
    if (id) loadUser();
  }, [id]);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="border p-4 rounded">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}

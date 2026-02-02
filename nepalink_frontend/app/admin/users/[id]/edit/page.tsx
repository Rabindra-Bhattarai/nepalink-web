"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    async function loadUser() {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      }
    }
    if (id) loadUser();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);

    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      router.push(`/admin/users/${id}`);
    } else {
      alert("Failed to update user");
    }
  }

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}

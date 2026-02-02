"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CreateUserPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    if (image) formData.append("image", image);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      router.push("/admin/users");
    } else {
      alert("Failed to create user");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <Button type="submit">Create User</Button>
      </form>
    </div>
  );
}

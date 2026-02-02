"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../(auth)/_components/ui/Button";
import { Input } from "../../../(auth)/_components/ui/Input";

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
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 flex flex-col items-center p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Create New User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            label="Name"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            label="Email"
          />

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded focus:ring-2 focus:ring-green-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Profile Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="border p-2 rounded"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 text-white hover:bg-green-700 font-semibold py-2 rounded-lg shadow-md"
          >
            Create User
          </Button>
        </form>
      </div>
    </main>
  );
}

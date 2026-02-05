"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../(auth)/_components/ui/Button";
import { Input } from "../../../(auth)/_components/ui/Input";

export default function CreateUserPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("phone", phone);
    formData.append("password", password);
    if (image) formData.append("photo", image);

    const res = await fetch("http://localhost:3000/api/admin/users", {
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
        {/* Header with Back button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Create New User</h1>
          <Button
            onClick={() => router.back()}
            className="bg-blue-500 text-white hover:bg-blue-600 rounded-full p-2 shadow-sm"
          >
            <span className="text-xl">⬅</span>
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
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
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            label="Phone"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            label="Password"
          />

          {/* Role Selector */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-green-300 bg-green-50 text-gray-800 p-2 rounded focus:ring-2 focus:ring-green-400"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="nurse">Nurse</option>
            </select>
          </div>

          {/* Profile Image Input */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Profile Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="border border-green-300 bg-green-50 text-gray-800 p-2 rounded focus:ring-2 focus:ring-green-400"
              accept="image/*"
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

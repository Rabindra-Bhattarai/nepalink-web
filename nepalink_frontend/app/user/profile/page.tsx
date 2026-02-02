"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../(auth)/_components/ui/Button";
import { Input } from "../../(auth)/_components/ui/Input";

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      }
    }
    loadUser();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?._id) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (image) formData.append("image", image);

    const res = await fetch(`/api/auth/${user._id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      router.refresh(); // reload profile page with updated data
    } else {
      alert("Failed to update profile");
    }
  }

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" label={""} />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" label={""} />
        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}

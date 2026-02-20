"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import UserHeader from "../[id]/components/userHeader";
import UserProfileCard from "./components/userProfileCard";
import InfoBlock from "./components/infoBlock";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  imageUrl?: string;
  createdAt?: string;
};

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users/${id}`,
          { method: "GET", credentials: "include" }
        );
        const result = await res.json();

        if (!res.ok || !result.success) {
          setError(result.message || "User not found");
          setLoading(false);
          return;
        }

        setUser(result.data);
        setLoading(false);
      } catch {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    }

    if (id) loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (!user) return null; // ✅ guard against null

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header with back + edit */}
        <UserHeader id={id as string} />

        {/* Profile card with image + role */}
        <UserProfileCard user={user} id={id as string} />

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <InfoBlock icon="mail" label="Primary Email" value={user.email} />
          <InfoBlock
            icon="phone"
            label="Contact Number"
            value={user.phone || "No phone linked"}
          />
          <InfoBlock
            icon="shield"
            label="System Permissions"
            value={`${user.role?.charAt(0).toUpperCase() + user.role?.slice(1)} Access Level`}
          />
          <InfoBlock
            icon="calendar"
            label="Onboarding Date"
            value={
              user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Unknown"
            }
          />
        </div>

        {/* Footer */}
        <p className="text-center mt-10 text-slate-400 text-xs font-medium tracking-widest uppercase">
          Confidential Medical Personnel Record • NepaLink
        </p>
      </div>
    </main>
  );
}

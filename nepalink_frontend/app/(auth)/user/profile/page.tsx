"use client";
import { useEffect, useState } from "react";
import { fetchMemberProfile, updateMemberProfile } from "@/lib/api/member";
import UserSidebar from "../components/UserSidebar";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchMemberProfile("USER_OBJECT_ID"); // replace with logged-in user._id
        setProfile(data);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      const updated = await updateMemberProfile("USER_OBJECT_ID", profile);
      setProfile(updated);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fcfdfd]">
        <p className="text-slate-500 animate-pulse font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <UserSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Profile</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <label className="block mb-2 text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            value={profile?.name || ""}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="border p-2 rounded w-full mb-4"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </main>
    </div>
  );
}

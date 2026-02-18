"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/api/axios";
import { API } from "@/lib/api/endpoints";
import { getAuthToken, getUserData, setUserData } from "@/lib/cookie";
import { Camera, User, Phone, Mail, ShieldCheck, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserData();
      setUser(data);
    };
    fetchUser();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      setLoading(true);
      setError(null);
      const token = await getAuthToken();
      const res = await axiosInstance.put(`${API.USERS}/${user._id}/profile-pic`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data.data);
      await setUserData(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile picture");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    };

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const token = await getAuthToken();
      const res = await axiosInstance.put(`${API.USERS}/${user._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.data);
      await setUserData(res.data.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="flex items-center justify-center min-h-100">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Personal Information</h1>
        <p className="text-slate-500 mt-1">Manage your account details and medical identity.</p>
      </header>

      {/* Profile Identity Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 h-32 w-full relative" />
        
        <div className="px-8 pb-8">
          <div className="relative -top-12 flex flex-col md:flex-row md:items-end gap-6">
            {/* Avatar Upload */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl border-4 border-white bg-slate-100 overflow-hidden shadow-xl">
                <img
                  src={`/uploads/${user.imageUrl || "default-profile.png"}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-xl shadow-lg cursor-pointer hover:bg-blue-700 transition-all group-hover:scale-110">
                <Camera size={18} />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            <div className="md:mb-2 space-y-1">
              <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={14} />
                Verified Member ID
              </div>
            </div>
          </div>

          {/* Error/Success Feedback */}
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 mb-6">{error}</div>}
          {success && <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm border border-emerald-100 mb-6 font-bold">✓ Profile updated successfully</div>}

          {/* Form */}
          <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-blue-600" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                style={{ color: "#0f172a" }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900! font-semibold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone size={16} className="text-blue-600" /> Phone Number
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={user.phone}
                style={{ color: "#0f172a" }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900! font-semibold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="e.g. +1 234 567 890"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail size={16} className="text-slate-400" /> Email Address
              </label>
              <input
                type="email"
                disabled
                value={user.email || "patient@healthcare.com"}
                style={{ color: "#475569" }}
                className="w-full p-3 bg-slate-100 border border-slate-200 rounded-2xl text-slate-600! cursor-not-allowed italic font-medium"
              />
              <p className="text-[10px] text-slate-500 font-medium">Email cannot be changed online for security reasons.</p>
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-fit bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                {loading ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
}
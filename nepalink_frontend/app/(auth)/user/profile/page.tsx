"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/api/axios";
import { API } from "@/lib/api/endpoints";
import { getAuthToken, getUserData, setUserData } from "@/lib/cookie";
import { getUserById } from "@/lib/api/user";
import { Camera, ShieldCheck, Loader2 } from "lucide-react";
import ProfileForm from "./components/ProfileForm";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ✅ Fetch user by ID from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getAuthToken();
        const userData = await getUserData();

        if (!userData?._id) {
          setError("User ID not found in cookie");
          return;
        }

        const res = await getUserById(userData._id);
        setUser(res.data); // backend returns { success, data }
        await setUserData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load user profile");
      }
    };
    fetchUser();
  }, []);

  // ✅ Handle avatar upload (frontend now matches backend)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const formData = new FormData();
    formData.append("photo", e.target.files[0]); // backend expects "photo"

    try {
      setLoading(true);
      setError(null);
      const token = await getAuthToken();
      const res = await axiosInstance.post(`${API.USERS}/${user._id}/upload`, formData, {
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

  // ✅ Handle profile update
  const handleUpdateProfile = async (formData: { name: string; phone: string }) => {
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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

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
              <div className="w-32 h-32 rounded-3xl border-4 border-white bg-slate-100 overflow-hidden shadow-xl flex items-center justify-center">
                {user.imageUrl ? (
                  <img
                    src={`http://localhost:3000/uploads/${user.imageUrl}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-slate-400 text-sm italic">No photo uploaded</span>
                )}
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

          {/* Profile Form Component */}
          <ProfileForm
            user={user}
            onSubmit={handleUpdateProfile}
            loading={loading}
            error={error}
            success={success}
          />
        </div>
      </div>
    </div>
  );
}

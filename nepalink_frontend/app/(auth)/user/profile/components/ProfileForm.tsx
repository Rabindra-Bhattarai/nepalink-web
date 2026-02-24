"use client";

import { useState } from "react";
import { User, Phone, Mail, Loader2 } from "lucide-react";

interface ProfileFormProps {
  user: any;
  onSubmit: (formData: { name: string; phone: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export default function ProfileForm({ user, onSubmit, loading, error, success }: ProfileFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    };
    await onSubmit(formData);
  };

  return (
    <div>
      {/* Error/Success Feedback */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 mb-6">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm border border-emerald-100 mb-6 font-bold">
          ✓ Profile updated successfully
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <User size={16} className="text-blue-600" /> Full Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
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
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
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
            className="w-full p-3 bg-slate-100 border border-slate-200 rounded-2xl cursor-not-allowed italic font-medium text-slate-900"
          />
          <p className="text-[10px] text-slate-500 font-medium">
            Email cannot be changed online for security reasons.
          </p>
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
  );
}

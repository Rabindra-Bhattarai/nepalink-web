"use client";

import { Mail, Phone, User as UserIcon } from "lucide-react";

export default function UserForm({ user, id }: { user: any; id: string }) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-normal text-slate-900 mb-8 flex items-center gap-2">
          <UserIcon size={20} className="text-green-800" />
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2 px-1">
              Full Legal Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.name}
              className="w-full bg-white border border-slate-300 rounded-xl p-4 focus:border-green-800 text-slate-900 font-normal transition-all outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2 px-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                className="w-full bg-white border border-slate-300 rounded-xl p-4 pl-12 focus:border-green-800 text-slate-900 font-normal transition-all outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2 px-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="text"
                name="phone"
                defaultValue={user?.phone}
                className="w-full bg-white border border-slate-300 rounded-xl p-4 pl-12 focus:border-green-800 text-slate-900 font-normal transition-all outline-none"
              />
            </div>
          </div>

          {/* Role */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2 px-1">
              System Authority
            </label>
            <select
              name="role"
              defaultValue={user?.role}
              className="w-full bg-white border border-slate-300 rounded-xl p-4 focus:border-green-800 text-slate-900 font-normal transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="nurse">Nurse (Practitioner)</option>
              <option value="member">Member (Access)</option>
              <option value="admin">Administrator (Control)</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            Internal ID: {String(id).slice(-8)}
          </span>
          <p className="text-[10px] text-slate-500 font-normal italic">
            Secure Sync Active
          </p>
        </div>
      </div>
    </div>
  );
}

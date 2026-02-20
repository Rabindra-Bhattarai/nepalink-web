"use client";

import { User as UserIcon, BadgeCheck } from "lucide-react";

export default function UserProfileCard({ user, id }: { user: any; id: string }) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-green-600 via-green-500 to-blue-600 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="px-6 md:px-12 pb-12">
        <div className="relative -mt-20 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="relative">
            <div className="w-40 h-40 bg-white p-2 rounded-4xl shadow-2xl">
              <div className="w-full h-full rounded-[1.75rem] bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-100">
                {user.imageUrl ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${user.imageUrl}`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={50} className="text-slate-300" />
                )}
              </div>
            </div>
            <div
              className="absolute bottom-3 right-3 bg-green-500 border-4 border-white w-7 h-7 rounded-full shadow-lg"
              title="Account Active"
            >
              <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25"></span>
            </div>
          </div>

          <div className="flex-1 md:pb-2">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
              <BadgeCheck className="text-blue-500" size={24} />
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-4 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider border ${
                  user.role === "admin"
                    ? "bg-purple-50 text-purple-700 border-purple-100"
                    : user.role === "nurse"
                    ? "bg-blue-50 text-blue-700 border-blue-100"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {user.role}
              </span>
              <span className="px-4 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-green-50 text-green-700 border border-green-100">
                ID: {String(user._id).slice(-6).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

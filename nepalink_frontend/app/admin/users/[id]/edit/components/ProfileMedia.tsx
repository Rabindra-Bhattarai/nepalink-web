"use client";

import { Camera, User as UserIcon, ShieldAlert } from "lucide-react";

export default function ProfileMedia({
  user,
  preview,
  handlePreview,
}: {
  user: any;
  preview: string | null;
  handlePreview: (file: File) => void;
}) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-center">
        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-6">
          Profile Media
        </span>

        <div className="relative group">
          <div className="w-44 h-44 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
            {preview || user?.imageUrl ? (
              <img
                src={
                  preview ||
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${user.imageUrl}`
                }
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon size={64} className="text-slate-300" />
            )}
          </div>
          <label className="absolute -bottom-2 -right-2 bg-green-800 text-white p-3.5 rounded-xl shadow-md cursor-pointer hover:bg-green-900 transition-all">
            <Camera size={22} />
            <input
              type="file"
              name="photo"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePreview(file);
              }}
            />
          </label>
        </div>

        <div className="mt-8 w-full p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-slate-800 mb-1">
            <ShieldAlert size={16} />
            <span className="text-[11px] font-medium uppercase">
              Access Alert
            </span>
          </div>
          <p className="text-[11px] text-slate-600 font-normal leading-relaxed">
            Changing user roles updates dashboard permissions immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

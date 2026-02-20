"use client";

import { ArrowLeft, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/(auth)/_components/ui/Button";

export default function UserHeader({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={() => router.push("/admin/users")}
        className="flex items-center gap-2 text-slate-500 hover:text-green-700 font-semibold transition group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Personnel Directory</span>
      </button>

      <Button
        onClick={() => router.push(`/admin/users/${id}/edit`)}
        className="bg-green border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95"
      >
        <Edit2 size={16} /> <span className="text-sm font-bold">Edit Profile</span>
      </Button>
    </div>
  );
}

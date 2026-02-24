"use client";

import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/(auth)/_components/ui/Button";

export default function EditHeader({
  id,
  isUpdating,
}: {
  id: string;
  isUpdating: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <button
          onClick={() => router.push("/admin/users")}
          className="flex items-center gap-2 text-slate-600 hover:text-green-800 font-medium mb-2 transition"
        >
          <ArrowLeft size={18} /> Back to Directory
        </button>
        <h1 className="text-2xl md:text-3xl font-normal text-slate-900 tracking-tight">
          Edit Professional Profile
        </h1>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={() => router.back()}
          className="bg-slate-200 text-slate-900 hover:bg-slate-300 px-6 rounded-xl font-medium shadow-none transition-all"
        >
          Cancel
        </Button>

        <Button
          form="edit-user-form"
          type="submit"
          disabled={isUpdating}
          className="bg-green-800 text-white hover:bg-green-900 px-8 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm"
        >
          {isUpdating ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <Save size={18} />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

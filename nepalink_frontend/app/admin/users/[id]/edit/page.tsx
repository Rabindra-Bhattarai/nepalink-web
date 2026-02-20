"use client";

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useUserForm } from "@/hooks/useUserForm";
import EditHeader from "./components/EditHeader";
import ProfileMedia from "./components/ProfileMedia";
import UserForm from "./components/UserForm";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const {
    user,
    loading,
    error,
    preview,
    isUpdating,
    handlePreview,
    updateUser,
  } = useUserForm(id as string);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await updateUser(formData);
      toast.success("Medical profile updated!");
      router.push(`/admin/users/${id}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-green-700 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#FDFDFD] p-4 md:p-8 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <EditHeader id={id as string} isUpdating={isUpdating} />
        <form
          id="edit-user-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <ProfileMedia
            user={user}
            preview={preview}
            handlePreview={handlePreview}
          />
          <UserForm user={user} id={id as string} />
        </form>
      </div>
    </main>
  );
}

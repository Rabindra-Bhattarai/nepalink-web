"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Save, 
  Loader2,
  Mail,
  Phone,
  ShieldAlert
} from "lucide-react";
import { Button } from "../../../../(auth)/_components/ui/Button";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`/api/admin/users/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();

        if (!res.ok || !result.success) {
          setError(result.message || "User not found");
          setLoading(false);
          return;
        }

        setUser(result.data);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to fetch user");
        setLoading(false);
      }
    }

    if (id) loadUser();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        toast.error(result.message || "Failed to update user");
        return;
      }

      toast.success("Medical profile updated!");
      router.push("/admin/users");
    } catch (err: any) {
      toast.error("Error updating user");
    } finally {
      setIsUpdating(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white antialiased">
      <Loader2 className="w-8 h-8 text-green-700 animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FDFDFD] p-4 md:p-8 antialiased text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
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
            {/* CANCEL BUTTON: Added !text-slate-900 and !font-medium to stop white bleeding */}
            <Button
              type="button"
              onClick={() => router.back()}
              className="bg-blue border border-slate-400 text-slate-900! hover:bg-slate-50 hover:text-black! px-6 rounded-xl font-medium! shadow-none transition-all antialiased"
            >
              Cancel
            </Button>

            {/* SAVE BUTTON: Explicitly forced !text-white */}
            <Button
              form="edit-user-form"
              type="submit"
              disabled={isUpdating}
              className="bg-green-800 text-white! hover:bg-green-900 px-8 rounded-xl font-medium! flex items-center gap-2 transition-all antialiased shadow-sm"
            >
              {isUpdating ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={18} />}
              Save Changes
            </Button>
          </div>


        </div>

        <form id="edit-user-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar: Profile Photo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-center">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-6 antialiased">
                Profile Media
              </span>
              
              <div className="relative group">
                <div className="w-44 h-44 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                  {(preview || user?.imageUrl) ? (
                    <img
                      src={preview || `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${user.imageUrl}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={64} className="text-slate-300" />
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
                      if (file) setPreview(URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>
              
              <div className="mt-8 w-full p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-800 mb-1">
                    <ShieldAlert size={16} />
                    <span className="text-[11px] font-medium uppercase">Access Alert</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-normal leading-relaxed antialiased">
                    Changing user roles updates dashboard permissions immediately.
                  </p>
              </div>
            </div>
          </div>

          {/* Main Content: Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-normal text-slate-900 mb-8 flex items-center gap-2 antialiased">
                <User size={20} className="text-green-800" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2 px-1 antialiased">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.name}
                    className="w-full bg-white border border-slate-300 rounded-xl p-4 focus:border-green-800 text-slate-900 font-normal transition-all outline-none antialiased"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2 px-1 antialiased">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.email}
                      className="w-full bg-white border border-slate-300 rounded-xl p-4 pl-12 focus:border-green-800 text-slate-900 font-normal transition-all outline-none antialiased"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2 px-1 antialiased">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      name="phone"
                      defaultValue={user?.phone}
                      className="w-full bg-white border border-slate-300 rounded-xl p-4 pl-12 focus:border-green-800 text-slate-900 font-normal transition-all outline-none antialiased"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2 px-1 antialiased">
                    System Authority
                  </label>
                  <select
                    name="role"
                    defaultValue={user?.role}
                    className="w-full bg-white border border-slate-300 rounded-xl p-4 focus:border-green-800 text-slate-900 font-normal transition-all outline-none appearance-none cursor-pointer antialiased"
                  >
                    <option value="nurse">Nurse (Practitioner)</option>
                    <option value="member">Member (Access)</option>
                    <option value="admin">Administrator (Control)</option>
                  </select>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Internal ID: {String(id).slice(-8)}</span>
                <p className="text-[10px] text-slate-500 font-normal italic antialiased">Secure Sync Active</p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </main>
  );
}
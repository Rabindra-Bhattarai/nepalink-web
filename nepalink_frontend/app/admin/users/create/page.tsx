"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../(auth)/_components/ui/Button";
import { Input } from "../../../(auth)/_components/ui/Input";
import { ArrowLeft, UserPlus, Camera, ShieldCheck, User } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateUserPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Client-side validation
    if (!name || !email || !password) {
      toast.error("Name, email, and password are required.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (phone && !/^\+?\d{7,15}$/.test(phone)) {
      toast.error("Invalid phone number format.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("phone", phone);
    formData.append("password", password);
    if (image) formData.append("photo", image);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("New user onboarded successfully!");
        router.push("/admin/users");
      } else {
        toast.error(result.message || "Failed to create user. Please check all fields.");
      }
    } catch {
      toast.error("A server error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-green-700 transition font-medium"
          >
            <ArrowLeft size={20} />
            <span>Return</span>
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-slate-900">Add New Users</h1>
            <p className="text-sm text-slate-500">Registering new personnel for NepaLink</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar Upload */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center">
              <label className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">Profile Photo</label>
              <div className="relative group cursor-pointer">
                <div className="w-40 h-40 rounded-full border-4 border-slate-50 bg-slate-100 overflow-hidden flex items-center justify-center transition-all group-hover:border-green-100">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User size={60} className="text-slate-300" />
                  )}
                </div>
                <label className="absolute bottom-1 right-1 bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-green-700 transition-transform active:scale-90">
                  <Camera size={20} />
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <p className="mt-6 text-xs text-slate-400 text-center leading-relaxed">
                Accepted formats: JPG, PNG. <br /> Max size 2MB.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center gap-3 text-green-700 mb-2 font-bold">
                <ShieldCheck size={20} />
                <span className="text-sm">Access Control</span>
              </div>
              <p className="text-xs text-green-600/80 leading-relaxed">
                Assigning a role determines the permissions and dashboard views this user will have access to.
              </p>
            </div>
          </div>

          {/* Right Column: User Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Legal Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rabindra Bhattarai"
                    className="w-full bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-green-500"
                    required label={""}                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rabindra@gmail.com"
                    className="bg-slate-50 border-none rounded-xl"
                    required label={""}                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977-XXXXXXXXXX"
                    className="bg-slate-50 border-none rounded-xl" label={""}                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Assign System Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-50 text-slate-700 p-3 rounded-xl border-none focus:ring-2 focus:ring-green-500 font-medium"
                  >
                    <option value="member">Member (Standard)</option>
                    <option value="admin">Admin (System Access)</option>
                    <option value="nurse">Nurse (Medical Access)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Initial Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-slate-50 border-none rounded-xl"
                    required label={""}                  />
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-50 flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-green-600 text-white hover:bg-green-700 py-3 rounded-xl font-bold shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? "Creating..." : (
                    <>
                      <UserPlus size={18} /> Create Account
                    </>
                  )}
                                  </Button>
                <Button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-amber-50 text-slate-500 hover:bg-slate-200 rounded-xl font-bold transition-all"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

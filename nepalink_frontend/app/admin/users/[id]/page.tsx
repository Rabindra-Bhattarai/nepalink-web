"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  User as UserIcon,
  BadgeCheck,
  Edit2,
  X
} from "lucide-react"; 
import { Button } from "../../../(auth)/_components/ui/Button";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError("Failed to fetch user data");
        setLoading(false);
      }
    }

    if (id) loadUser();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-medium tracking-wide">Fetching Secure Records...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-red-50 max-w-sm">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <X size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Error Occurred</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <Button onClick={() => router.push("/admin/users")} className="w-full bg-slate-900 text-white rounded-xl py-3">
          Back to Directory
        </Button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb Navigation */}
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

        {/* Profile Identity Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Decorative Header */}
          <div className="h-40 bg-linear-to-r from-green-600 via-green-500 to-blue-600 relative">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>

          <div className="px-6 md:px-12 pb-12">
            {/* Avatar & Floating Badge */}
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
                {/* Active Pulse Indicator */}
                <div className="absolute bottom-3 right-3 bg-green-500 border-4 border-white w-7 h-7 rounded-full shadow-lg" title="Account Active">
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25"></span>
                </div>
              </div>
              
              <div className="flex-1 md:pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
                  <BadgeCheck className="text-blue-500" size={24} />
                </div>
                <div className="flex flex-wrap gap-2">
                   <span className={`px-4 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider border ${
                    user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 
                    user.role === 'nurse' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                    'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {user.role}
                  </span>
                  <span className="px-4 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-green-50 text-green-700 border border-green-100">
                    ID: {String(id).slice(-6).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <InfoBlock 
                icon={<Mail size={20} />} 
                label="Primary Email" 
                value={user.email} 
              />
              
              <InfoBlock 
                icon={<Phone size={20} />} 
                label="Contact Number" 
                value={user.phone || "No phone linked"} 
              />
              
              <InfoBlock 
                icon={<ShieldCheck size={20} />} 
                label="System Permissions" 
                value={`${user.role?.charAt(0).toUpperCase() + user.role?.slice(1)} Access Level`} 
              />
              
              <InfoBlock 
                icon={<Calendar size={20} />} 
                label="Onboarding Date" 
                value={new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} 
              />

            </div>
          </div>
        </div>

        <p className="text-center mt-10 text-slate-400 text-xs font-medium tracking-widest uppercase">
          Confidential Medical Personnel Record • NepaLink
        </p>
      </div>
    </main>
  );
}

// Helper component for cleaner code
function InfoBlock({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-5 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
      <div className="p-3 bg-white rounded-2xl text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="font-bold text-slate-800 break-all">{value}</p>
      </div>
    </div>
  );
}
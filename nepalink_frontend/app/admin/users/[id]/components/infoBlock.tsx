"use client";

import { Mail, Phone, ShieldCheck, Calendar } from "lucide-react";

const icons = {
  mail: <Mail size={20} />,
  phone: <Phone size={20} />,
  shield: <ShieldCheck size={20} />,
  calendar: <Calendar size={20} />,
};

export default function InfoBlock({
  icon,
  label,
  value,
}: {
  icon: "mail" | "phone" | "shield" | "calendar";
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-5 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
      <div className="p-3 bg-white rounded-2xl text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
        {icons[icon]}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="font-bold text-slate-800 break-all">{value}</p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { LayoutDashboard, Users } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-green-600">Admin Panel</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(({ name, href, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                active
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-green-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 border-t border-slate-200 text-xs text-slate-400">
        NepaLink • Admin Access
      </div>
    </aside>
  );
}

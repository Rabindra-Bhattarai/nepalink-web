"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/user/dashboard" },
  { name: "Bookings", href: "/user/bookings" },
  { name: "Activities", href: "/user/activities" },
  { name: "Profile", href: "/user/profile" },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Member Panel</h2>
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md ${
                pathname.startsWith(item.href)
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}

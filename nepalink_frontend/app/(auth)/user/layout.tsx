"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthCookies } from "@/lib/cookie";

const navItems = [
  { name: "Dashboard", href: "/user/dashboard" },
  { name: "Bookings", href: "/user/bookings" },
  { name: "Activities", href: "/user/activities" },
  { name: "Profile", href: "/user/profile" },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    // ✅ Clear cookies on server
    await clearAuthCookies();

    // ✅ Redirect to login
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Member Panel</h2>
        
        <nav className="flex flex-col space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-auto px-3 py-2 text-left rounded-md text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all border border-transparent hover:border-red-900"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full transform transition-all animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900">Wait a moment!</h3>
            <p className="text-gray-600 mt-2">
              Are you sure you want to log out of your session?
            </p>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Stay here
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-lg shadow-red-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

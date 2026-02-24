// "use client";

// import { useState, useEffect, useTransition } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { clearAuthCookies } from "@/lib/cookie";
// import { getMyContracts, getAssignedContracts } from "@/lib/api/contracts";
// import { getUserData } from "@/lib/api/member";
// import { 
//   LayoutDashboard, 
//   Stethoscope, 
//   CalendarCheck, 
//   Activity, 
//   MessageSquare, 
//   UserCircle, 
//   LogOut,
//   ShieldPlus 
// } from "lucide-react";

// export default function UserLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [chatHref, setChatHref] = useState<string>("/user/chat");

//   // Fetch contract data for the Chat link
//   useEffect(() => {
//     const fetchContract = async () => {
//       try {
//         const user = await getUserData();
//         let contracts = user?.role === "member" 
//           ? await getMyContracts() 
//           : await getAssignedContracts();

//         if (contracts && contracts.length > 0) {
//           const active = contracts.find((c: any) => c.status?.toLowerCase() === "active");
//           const target = active || contracts[0];
//           setChatHref(`/user/chat/${target._id}`);
//         }
//       } catch (err) {
//         console.error("Failed to fetch contracts:", err);
//       }
//     };
//     fetchContract();
//   }, []);

//   const navItems = [
//     { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
//     { name: "Caregiver", href: "/user/nurses", icon: Stethoscope },
//     { name: "Bookings", href: "/user/bookings", icon: CalendarCheck },
//     { name: "Activities", href: "/user/activities", icon: Activity },
//     { name: "Chat", href: chatHref, icon: MessageSquare },
//     { name: "Profile", href: "/user/profile", icon: UserCircle },
//   ];

//   const handleLogout = async () => {
//     await clearAuthCookies();
//     router.push("/login");
//   };

//   // Custom navigation to trigger the top loading bar
//   const handleNavClick = (e: React.MouseEvent, href: string) => {
//     if (pathname === href) return;
//     e.preventDefault();
//     startTransition(() => {
//       router.push(href);
//     });
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F8FAFC]">
//       {/* 🚀 Top Progress Bar (Visible during route transitions) */}
//       {isPending && (
//         <div className="fixed top-0 left-0 right-0 h-1 z-100 bg-blue-50 overflow-hidden">
//           <div className="h-full bg-blue-600 animate-progress w-full"></div>
//         </div>
//       )}

//       {/* Sidebar */}
//       <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed top-0 left-0 h-screen z-40 shadow-sm">
//         {/* Logo Section */}
//         <div className="p-8">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-100 transition-transform hover:scale-105">
//               <ShieldPlus className="text-white" size={24} />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold tracking-tight text-slate-800 leading-none">CarePulse</h2>
//               <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Health Management</span>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex flex-col space-y-1.5 px-4 flex-1">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname.startsWith(item.href);
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={(e) => handleNavClick(e, item.href)}
//                 className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
//                   isActive
//                     ? "bg-blue-50 text-blue-700 font-semibold shadow-sm shadow-blue-50/50"
//                     : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
//                 }`}
//               >
//                 <Icon 
//                   size={20} 
//                   className={`transition-colors ${isActive ? "text-blue-600" : "group-hover:text-slate-900"}`} 
//                 />
//                 <span className="text-[15px]">{item.name}</span>
//                 {isActive && (
//                   <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shadow-sm shadow-blue-400"></div>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Logout Section at the Bottom */}
//         <div className="p-4 mt-auto border-t border-slate-50 bg-slate-50/30">
//           <button
//             onClick={() => setShowConfirm(true)}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group"
//           >
//             <div className="p-2 rounded-lg group-hover:bg-red-100 transition-colors">
//               <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
//             </div>
//             <span className="font-medium">Sign Out</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <main 
//         className={`flex-1 ml-72 min-h-screen transition-all duration-500 ${
//           isPending ? "opacity-40 blur-[1px] pointer-events-none" : "opacity-100 blur-0"
//         }`}
//       >
//         <div key={pathname} className="p-8 max-w-7xl mx-auto animate-page-in">
//           {children}
//         </div>
//       </main>

//       {/* Medical-style Logout Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-110 p-4">
//           <div className="bg-white rounded-4xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-100 animate-in zoom-in-95 fade-in duration-200">
//             <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
//               <LogOut size={36} />
//             </div>
//             <h3 className="text-2xl font-bold text-slate-900 leading-tight">Ending Session?</h3>
//             <p className="text-slate-500 mt-3 text-sm leading-relaxed px-2">
//               Are you sure you want to sign out? You will need your credentials to access your patient dashboard again.
//             </p>
//             <div className="flex flex-col gap-3 mt-8">
//               <button
//                 onClick={handleLogout}
//                 className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 active:scale-[0.98] transition-all shadow-lg shadow-red-200"
//               >
//                 Yes, Sign Out
//               </button>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="w-full py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 active:scale-[0.98] transition-all"
//               >
//                 Stay Logged In
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthCookies } from "@/lib/cookie";
import { getMyContracts, getAssignedContracts } from "@/lib/api/contracts";
import { getUserData } from "@/lib/api/member";
import { 
  LayoutDashboard, 
  Stethoscope, 
  CalendarCheck, 
  Activity, 
  MessageSquare, 
  UserCircle, 
  LogOut,
  ShieldPlus 
} from "lucide-react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [chatHref, setChatHref] = useState<string>("/user/chat/placeholder"); // ✅ default safe route

  // Fetch contract data for the Chat link
  useEffect(() => {
    const fetchContract = async () => {
      try {
        const user = await getUserData();
        let contracts = user?.role === "member" 
          ? await getMyContracts() 
          : await getAssignedContracts();

        if (contracts && contracts.length > 0) {
          const active = contracts.find((c: any) => c.status?.toLowerCase() === "active");
          const target = active || contracts[0];
          setChatHref(`/user/chat/${target._id}`);
        }
      } catch (err) {
        console.error("Failed to fetch contracts:", err);
      }
    };
    fetchContract();
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { name: "Caregiver", href: "/user/nurses", icon: Stethoscope },
    { name: "Bookings", href: "/user/bookings", icon: CalendarCheck },
    { name: "Activities", href: "/user/activities", icon: Activity },
    { name: "Chat", href: chatHref, icon: MessageSquare }, // ✅ safe fallback
    { name: "Profile", href: "/user/profile", icon: UserCircle },
  ];

  const handleLogout = async () => {
    await clearAuthCookies();
    router.push("/login");
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (pathname === href) return;
    e.preventDefault();
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 🚀 Top Progress Bar */}
      {isPending && (
        <div className="fixed top-0 left-0 right-0 h-1 z-100 bg-blue-50 overflow-hidden">
          <div className="h-full bg-blue-600 animate-progress w-full"></div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed top-0 left-0 h-screen z-40 shadow-sm">
        {/* Logo */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-100 transition-transform hover:scale-105">
              <ShieldPlus className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-800 leading-none">CarePulse</h2>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Health Management</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-1.5 px-4 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold shadow-sm shadow-blue-50/50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon 
                  size={20} 
                  className={`transition-colors ${isActive ? "text-blue-600" : "group-hover:text-slate-900"}`} 
                />
                <span className="text-[15px]">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shadow-sm shadow-blue-400"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 mt-auto border-t border-slate-50 bg-slate-50/30">
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <div className="p-2 rounded-lg group-hover:bg-red-100 transition-colors">
              <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`flex-1 ml-72 min-h-screen transition-all duration-500 ${
          isPending ? "opacity-40 blur-[1px] pointer-events-none" : "opacity-100 blur-0"
        }`}
      >
        <div key={pathname} className="p-8 max-w-7xl mx-auto animate-page-in">
          {children}
        </div>
      </main>

      {/* Logout Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-110 p-4">
          <div className="bg-white rounded-4xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-100 animate-in zoom-in-95 fade-in duration-200">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <LogOut size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 leading-tight">Ending Session?</h3>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed px-2">
              Are you sure you want to sign out? You will need your credentials to access your patient dashboard again.
            </p>
            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={handleLogout}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 active:scale-[0.98] transition-all shadow-lg shadow-red-200"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 active:scale-[0.98] transition-all"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

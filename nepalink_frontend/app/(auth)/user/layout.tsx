"use client"

import UserSidebar from "@/app/(auth)/user/components/UserSidebar"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <UserSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

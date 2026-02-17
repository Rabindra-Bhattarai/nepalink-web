"use client";
import Link from "next/link";

export default function UserSidebar() {
  return (
    <aside className="w-64 p-4 border-r">
      <nav>
        <ul>
          <li><Link href="/user/dashboard">Dashboard</Link></li>
          <li><Link href="/user/bookings/new">New Booking</Link></li>
          <li><Link href="/user/profile">Profile</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

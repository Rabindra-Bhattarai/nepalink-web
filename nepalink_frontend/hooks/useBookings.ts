"use client";

import { useEffect, useState } from "react";
import { getMyBookings } from "@/lib/api/member";

// Define Booking type based on backend model
export interface Booking {
  _id: string;
  date: string;
  status: "pending" | "accepted" | "declined" | "cancelled";
  nurseId?: { _id: string; name: string; email?: string; role?: string };
  memberId?: { _id: string; name: string; email?: string; role?: string };
  createdAt?: string;
  updatedAt?: string;
}

export function useBookings(options?: { refreshInterval?: number }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getMyBookings();

      // ✅ backend returns { success, data: [...] }
      setBookings(res.data || []);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ stable dependency array
  const refreshInterval = options?.refreshInterval;

  useEffect(() => {
    fetchBookings();

    if (refreshInterval) {
      const interval = setInterval(fetchBookings, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]); // ✅ always one dependency

  return { bookings, loading, error, refresh: fetchBookings };
}

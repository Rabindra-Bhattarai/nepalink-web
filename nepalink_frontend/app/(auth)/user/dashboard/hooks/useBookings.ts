"use client";

import { useState, useEffect } from "react";
import axios from "@/lib/apiClient"; // centralized axios instance
import { Booking } from "@/schemas/bookingSchema"; // type-safe schema

export function useBookings(memberId: string | null) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch bookings for the logged-in member
  async function fetchBookings() {
    if (!memberId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/bookings?memberId=${memberId}`);
      setBookings(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }

  // Create a new booking
  async function createBooking(payload: {
    nurseId: string;
    date: string;
  }) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/bookings", {
        memberId,
        ...payload,
      });
      // refresh after creation
      await fetchBookings();
      return res.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create booking");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, [memberId]);

  return {
    bookings,
    loading,
    error,
    refreshBookings: fetchBookings,
    createBooking,
  };
}

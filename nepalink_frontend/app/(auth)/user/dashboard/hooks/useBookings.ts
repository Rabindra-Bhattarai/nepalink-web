"use client";

import { useState, useEffect } from "react";
import { Booking } from "@/schemas/bookingSchema";
import {
  fetchBookings,
  createBooking as apiCreateBooking,
  updateBookingStatus as apiUpdateBookingStatus,
} from "@/lib/api/booking";

export function useBookings(memberId: string | null) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadBookings() {
    if (!memberId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookings(memberId);
      setBookings(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }

  async function createBooking(payload: { nurseId: string; date: string }) {
    if (!memberId) return;
    setLoading(true);
    setError(null);
    try {
      const newBooking = await apiCreateBooking({ memberId, ...payload });
      await loadBookings();
      return newBooking;
    } catch (err: any) {
      setError(err.message || "Failed to create booking");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateBookingStatus(
    bookingId: string,
    status: "pending" | "accepted" | "declined"
  ) {
    setLoading(true);
    setError(null);
    try {
      const updated = await apiUpdateBookingStatus(bookingId, status);
      await loadBookings();
      return updated;
    } catch (err: any) {
      setError(err.message || "Failed to update booking");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, [memberId]);

  return {
    bookings,
    loading,
    error,
    refreshBookings: loadBookings,
    createBooking,
    updateBookingStatus,
  };
}

import apiClient from "../apiClient";
import { Booking } from "@/schemas/bookingSchema";

export async function fetchBookings(memberId: string) {
  const res = await apiClient.get(`/api/bookings?memberId=${memberId}`);
  return res.data.data as Booking[];
}

export async function createBooking(payload: {
  memberId: string;
  nurseId: string;
  date: string;
}) {
  const res = await apiClient.post("/api/bookings", payload);
  return res.data.data as Booking;
}

export async function updateBookingStatus(
  bookingId: string,
  status: "pending" | "accepted" | "declined"
) {
  const res = await apiClient.patch(`/api/bookings/${bookingId}`, { status });
  return res.data.data as Booking;
}

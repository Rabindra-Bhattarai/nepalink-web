"use client";
export default function BookingCard({ booking }: { booking: any }) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Notes:</strong> {booking.notes}</p>
      <p><strong>Nurse:</strong> {booking.nurse?.name || "Unassigned"}</p>
    </div>
  );
}

import { z } from "zod";

export const BookingSchema = z.object({
  _id: z.string(),
  memberId: z.string(),
  nurseId: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  status: z.enum(["pending", "accepted", "declined"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Booking = z.infer<typeof BookingSchema>;

export const CreateBookingSchema = z.object({
  memberId: z.string().min(1, "Member ID is required"),
  nurseId: z.string().min(1, "Nurse ID is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export const UpdateBookingStatusSchema = z.object({
  status: z.enum(["pending", "accepted", "declined"]),
});

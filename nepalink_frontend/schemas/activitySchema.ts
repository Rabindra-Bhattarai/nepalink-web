import { z } from "zod";

// Activity type aligned with backend Activity model
export const ActivitySchema = z.object({
  _id: z.string(),
  bookingId: z.string(),
  nurseId: z.string(),
  notes: z.string().min(5, "Notes must be at least 5 characters"),
  performedAt: z.string(), // ISO date string
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// TypeScript type inference
export type Activity = z.infer<typeof ActivitySchema>;

// DTO for creating an activity (nurse logs)
export const CreateActivitySchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  nurseId: z.string().min(1, "Nurse ID is required"),
  notes: z.string().min(5, "Notes must be at least 5 characters"),
});

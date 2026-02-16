"use client";

import { useState, useEffect } from "react";
import apiClient from "@/lib/apiClient"; // centralized axios instance
import { Activity, ActivitySchema } from "@/schemas/activitySchema";

export function useActivities(bookingId: string | null) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch activities for a booking
  async function fetchActivities() {
    if (!bookingId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get(`/api/activities/${bookingId}`);
      const parsed = ActivitySchema.array().safeParse(res.data.data);
      if (parsed.success) {
        setActivities(parsed.data);
      } else {
        setError("Invalid activity data received");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch activities");
    } finally {
      setLoading(false);
    }
  }

  // Log a new activity (nurse action)
  async function logActivity(payload: {
    nurseId: string;
    notes: string;
  }) {
    if (!bookingId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post("/api/activities", {
        bookingId,
        ...payload,
      });
      // Refresh after logging
      await fetchActivities();
      return res.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to log activity");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, [bookingId]);

  return {
    activities,
    loading,
    error,
    refreshActivities: fetchActivities,
    logActivity,
  };
}

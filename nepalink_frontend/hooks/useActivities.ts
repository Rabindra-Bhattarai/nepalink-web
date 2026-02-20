"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/api/axios";
import { getAuthToken } from "@/lib/cookie";

export function useActivities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await getAuthToken();
        const res = await axiosInstance.get("/api/member/activities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // backend returns { success: true, data: [...] }
        setActivities(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
}

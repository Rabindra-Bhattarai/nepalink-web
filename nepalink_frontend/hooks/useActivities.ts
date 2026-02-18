"use client";

import { useEffect, useState } from "react";
import { getMyActivities } from "@/lib/api/member";

export function useActivities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await getMyActivities();
        setActivities(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch activities");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return { activities, loading, error };
}

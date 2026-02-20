"use client";

import { useState, useEffect } from "react";
import { fetchAnalytics } from "@/lib/actions/admin-actions";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetchAnalytics();
        if (!res) {
          setError("Failed to load analytics");
          return;
        }
        setAnalytics(res);
      } catch (err: any) {
        setError(err.message || "Error fetching analytics");
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  return { analytics, loading, error };
}

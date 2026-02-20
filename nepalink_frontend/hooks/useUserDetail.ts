"use client";

import { useState, useEffect } from "react";

export function useUserDetail(userId: string | undefined) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      if (!userId) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users/${userId}`,
          { method: "GET", credentials: "include" }
        );
        const result = await res.json();

        if (!res.ok || !result.success) {
          setError(result.message || "User not found");
          setLoading(false);
          return;
        }

        setUser(result.data);
        setLoading(false);
      } catch {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    }
    loadUser();
  }, [userId]);

  return { user, loading, error };
}

"use client";

import { useState, useEffect } from "react";

export function useUserForm(userId: string | undefined) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

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
        setError("Failed to fetch user");
        setLoading(false);
      }
    }
    loadUser();
  }, [userId]);

  async function updateUser(formData: FormData) {
    setIsUpdating(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users/${userId}`,
        { method: "PATCH", body: formData, credentials: "include" }
      );
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to update user");
      }

      return result;
    } finally {
      setIsUpdating(false);
    }
  }

  function handlePreview(file: File) {
    setPreview(URL.createObjectURL(file));
  }

  return { user, loading, error, preview, isUpdating, setPreview, updateUser, handlePreview };
}

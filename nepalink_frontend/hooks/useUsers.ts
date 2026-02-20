"use client";

import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "@/lib/actions/admin-actions";

export function useUsers(initialPage: number = 1, initialLimit: number = 10) {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const res = await fetchUsers(page, limit);
        if (!res) {
          setError("Failed to load users");
          return;
        }
        setUsers(res.data);
        setTotal(res.total);
      } catch (err: any) {
        setError(err.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [page, limit]);

  async function removeUser(id: string) {
    try {
      const res = await deleteUser(id);
      if (res?.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        setTotal((prev) => prev - 1);
        return true;
      }
      throw new Error(res?.message || "Failed to delete user");
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  return { users, page, limit, total, loading, error, setPage, removeUser };
}

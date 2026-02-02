// lib/actions/admin-actions.ts
export async function fetchUsers(page: number = 1, limit: number = 10) {
  try {
    const res = await fetch(`/api/admin/users?page=${page}&limit=${limit}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

export async function fetchUsers(
  page: number = 1,
  limit: number = 10,
  search?: string,
  role?: string
) {
  try {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (search) params.append("name", search);
    if (role) params.append("role", role);

    const res = await fetch(`http://localhost:3000/api/admin/users?${params.toString()}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();

    return {
      data: data.data,
      total: data.total,
      page: data.page,
      limit: data.limit,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

// Delete user
export async function deleteUser(userId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete user");

    const data = await res.json();
    return data; // { success: true, message: "User deleted successfully" }
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
}

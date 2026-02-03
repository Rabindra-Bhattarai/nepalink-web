export async function fetchUsers(page: number = 1, limit: number = 10) {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/users?page=${page}&limit=${limit}`, {
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

// New function for deleting a user
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

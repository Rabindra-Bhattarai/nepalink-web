const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// Fetch all users
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
    if (search) params.append("search", search);
    if (role) params.append("role", role);

    const res = await fetch(`${BASE_URL}/api/admin/users?${params.toString()}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    return {
      data: data.users,                 
      total: data.pagination.total,     
      page: data.pagination.page,
      limit: data.pagination.limit,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

// Delete user
export async function deleteUser(userId: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete user");

    const data = await res.json();
    return data; // { success: true, message: "User deleted" }
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
}

// Fetch analytics
export async function fetchAnalytics() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/analytics`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch analytics");

    const data = await res.json();
    return data.data; // { totalUsers, nurses, members, admins }
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
}

// Fetch bookings
export async function fetchBookings() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/bookings`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch bookings");

    const data = await res.json();
    return data.data; // array of bookings
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return null;
  }
}

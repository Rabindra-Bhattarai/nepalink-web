"use server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

// Fetch all users
export async function fetchUsers(
  page: number = 1,
  limit: number = 10,
  search?: string,
  role?: string
) {
  try {
    const params = new URLSearchParams();
    // Note: We still send these in case you update the backend later
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (search) params.append("search", search);
    if (role) params.append("role", role);

    const res = await fetch(`${BASE_URL}/users?${params.toString()}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    const allUsers = data.data || [];

    // --- MANUAL PAGINATION LOGIC ---
    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Grab only the 10 users for this specific page
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers, 
      pagination: {
        total: allUsers.length, // Total count of all users (e.g., 27)
        page: page,
        limit: limit,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

//  Delete user
export async function deleteUser(userId: string) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete user");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
}


//fetch analysis
export async function fetchAnalytics() { 
  try { 
    const res = await fetch(`${BASE_URL}/admin/analytics`, { 
      method: "GET", 
      credentials: "include", // This tells the browser to send the cookie
      cache: "no-store",
    }); 

    if (!res.ok) {
      // This is where you are seeing the 401 error
      console.warn(`Analytics access denied: ${res.status}`);
      return null; 
    }

    const result = await res.json(); 
    return result.data; 
  } catch (error) { 
    console.error("Analytics fetch failed:", error); 
    return null; 
  }
}

// Fetch bookings
export async function fetchBookings() {
  try {
    const res = await fetch(`${BASE_URL}/admin/bookings`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch bookings");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return null;
  }
}

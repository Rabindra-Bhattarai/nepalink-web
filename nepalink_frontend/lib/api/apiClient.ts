// src/lib/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // backend URL
  withCredentials: true, // send cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach interceptors for auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — redirect to login");
      // You can trigger a redirect here if needed
    }
    return Promise.reject(error);
  }
);

export default apiClient;

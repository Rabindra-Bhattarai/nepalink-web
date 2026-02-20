import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to inject role for web registration
axiosInstance.interceptors.request.use((config) => {
  if (config.url?.includes("/api/auth/register") && config.method === "post") {
    if (config.data && !config.data.role) {
      config.data.role = "member"; // ✅ force role to member for web
    }
  }
  return config;
});

export default axiosInstance;

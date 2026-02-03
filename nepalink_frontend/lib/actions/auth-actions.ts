"use server";
import { register, login } from "../api/auth";
import { cookies } from "next/headers"; // use directly here

export const handleRegister = async (formData: any) => {
  try {
    const res = await register(formData);

    if (res.success) {
      const cookieStore = await cookies();
      cookieStore.set("auth_token", res.token);
      cookieStore.set("user_data", JSON.stringify(res.data));

      return {
        success: true,
        data: res.data,
        message: res.message || "Registration successful",
      };
    }
    return { success: false, message: res.message || "Registration failed" };
  } catch (err: any) {
    console.error("Register API error:", err.message);
    return { success: false, message: err.message };
  }
};

export const handleLogin = async (formData: any) => {
  try {
    const res = await login(formData);

    if (res.success) {
      const cookieStore = await cookies();
      cookieStore.set("auth_token", res.token);
      cookieStore.set("user_data", JSON.stringify(res.data));

      return {
        success: true,
        data: res.data,
        message: res.message || "Login successful",
      };
    }
    return { success: false, message: res.message || "Login failed" };
  } catch (err: any) {
    console.error("Login API error:", err.message);
    return { success: false, message: err.message };
  }
};

"use server";
import { register, login } from "../api/auth";
import { cookies } from "next/headers";
import { setUserData } from "../cookie";

export const handleRegister = async (formData: any) => {
  try {
    const res = await register(formData);

    if (res.success) {
      const cookieStore = await cookies();
      // Store only the token securely
      cookieStore.set("auth_token", res.token, { httpOnly: true, secure: true });

      await setUserData(res.data);

      return {
        success: true,
        data: res.data, // returned to client once, not stored in cookie
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
      // Store only the token securely
      cookieStore.set("auth_token", res.token, { httpOnly: true, secure: true });

      await setUserData(res.data);

      return {
        success: true,
        data: res.data, // returned to client once, not stored in cookie
        message: res.message || "Login successful",
      };
    }
    return { success: false, message: res.message || "Login failed" };
  } catch (err: any) {
    console.error("Login API error:", err.message);
    return { success: false, message: err.message };
  }
};

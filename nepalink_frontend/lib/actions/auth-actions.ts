"use server";
import { register, login } from "../api/auth";
import { setAuthToken, setUserData } from "../cookie";

export const handleRegister = async (formData: any) => {
  try {
    console.log("Calling register API with:", formData);
    const res = await register(formData);
    console.log("Register API response:", res);

    if (res.success) {
      await setAuthToken(res.token);
      await setUserData(res.data);
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
      await setAuthToken(res.token);
      await setUserData(res.data);
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

"use server";

export const handleForgotPassword = async (formData: any) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("Forgot Password API error:", err.message);
    return { success: false, message: err.message || "Request failed" };
  }
};

export const handleResetPassword = async (token: string, password: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("Reset Password API error:", err.message);
    return { success: false, message: err.message || "Request failed" };
  }
};

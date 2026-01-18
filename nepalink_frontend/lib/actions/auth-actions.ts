// server side processesing


"use server";
import { login, register } from "../api/auth";
import { setAuthToken, setUserData } from "../cookie";
export const handleRegister = async (formData: any) => {
    try {
        // how data sent from component to backend api
        const res = await register(formData);
        // component return logic
        if (res.success) {
            return {
                success: true,
                data: res.data,
                message: "Registration successful"
            };
        }
        return { success: false, message: res.message || "Registration failed" };
    } catch (err: Error | any) {
        return { success: false, message: err.message || "Registration failed" };
    }
}

export const handleLogin = async (formData: any) => {
    try {
        const res = await login(formData);
        
        if (res.success) {
            setAuthToken(res.data.token); // set cookie
            setUserData(res.data.user); // set cookie
            return {
                success: true,
                data: res.data,
                message: "Login successful"
            };
        }
        return { success: false, message: res.message || "Login failed" };
    } catch (err: Error | any) {
        return { success: false, message: err.message || "Login failed" };
    }
}
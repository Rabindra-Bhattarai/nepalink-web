import axios from "./axios";
import { API } from "./endpoints";

export const register = async (registerData: any) => {
  try {
    const response = await axios.post(API.AUTH.REGISTER, registerData);
    return response.data;
  } catch (err: any) {
    // Normalize backend error messages
    const rawMessage = err.response?.data?.message;
    const message = Array.isArray(rawMessage)
      ? rawMessage.join(", ")
      : rawMessage || err.message || "Registration failed";

    throw new Error(message);
  }
};

export const login = async (loginData: any) => {
  try {
    const response = await axios.post(API.AUTH.LOGIN, loginData);
    return response.data;
  } catch (err: any) {
    const rawMessage = err.response?.data?.message;
    const message = Array.isArray(rawMessage)
      ? rawMessage.join(", ")
      : rawMessage || err.message || "Login failed";

    throw new Error(message);
  }
};

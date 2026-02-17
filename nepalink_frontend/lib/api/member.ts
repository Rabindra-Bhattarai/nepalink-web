import axiosInstance from "./axios";
import { API } from "./endpoints";

export const fetchCurrentUser = async () => {
  try {
    const res = await axiosInstance.get(API.AUTH.ME);
    return res.data.data;
  } catch (err: any) {
    const rawMessage = err.response?.data?.message;
    throw new Error(rawMessage || err.message || "Failed to fetch current user");
  }
};

export const fetchMemberBookings = async (memberId: string) => {
  try {
    const res = await axiosInstance.get(API.BOOKINGS, { params: { memberId } });
    return res.data;
  } catch (err: any) {
    const rawMessage = err.response?.data?.message;
    throw new Error(rawMessage || err.message || "Failed to fetch bookings");
  }
};

export const fetchCareFeed = async (bookingId: string) => {
  try {
    const res = await axiosInstance.get(`${API.ACTIVITIES}/${bookingId}`);
    return res.data.data;
  } catch (err: any) {
    const rawMessage = err.response?.data?.message;
    throw new Error(rawMessage || err.message || "Failed to fetch care feed");
  }
};

export const fetchMemberProfile = async (memberId: string) => {
  try {
    const res = await axiosInstance.get(`${API.USERS}/${memberId}`);
    return res.data.data;
  } catch (err: any) {
    const rawMessage = err.response?.data?.message;
    throw new Error(rawMessage || err.message || "Failed to fetch profile");
  }
};

export const updateMemberProfile = async (memberId: string, profile: any) => {
  try {
    const res = await axiosInstance.put(`${API.USERS}/${memberId}`, profile);
    return res.data;
  } catch (err: any) {
    const rawMessage = err.response?.data?.message;
    throw new Error(rawMessage || err.message || "Failed to update profile");
  }
};

export const createBooking = async ({ memberId, nurseId, date, notes }: any) => {
  try {
    const res = await axiosInstance.post(API.BOOKINGS, {
      memberId,
      nurseId,
      date,
      notes,
    });
    return res.data;
  } catch (err: any) {
    const rawMessage = err.response?.data?.message;
    throw new Error(rawMessage || err.message || "Failed to create booking");
  }
};

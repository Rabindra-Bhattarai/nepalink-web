import axiosInstance from "./axios";
import { API } from "./endpoints";
import { getAuthToken } from "../cookie";

export const getMyBookings = async () => {
  const token = await getAuthToken();
  const res = await axiosInstance.get(`${API.BOOKINGS}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getMyActivities = async () => {
  const token = await getAuthToken();
  const res = await axiosInstance.get(`${API.ACTIVITIES}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

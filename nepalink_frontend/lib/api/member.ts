import axiosInstance from "./axios";
import { API } from "./endpoints";
import { getAuthToken } from "../cookie";

export const getMyBookings = async () => {
  const token = await getAuthToken();
  const res = await axiosInstance.get(API.BOOKINGS, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getMyActivities = async () => {
  const token = await getAuthToken();
  const res = await axiosInstance.get(API.ACTIVITIES.MEMBER, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createBooking = async ({
  nurseId,
  date,
}: {
  nurseId: string;
  date: string;
}) => {
  const token = await getAuthToken();
  const res = await axiosInstance.post(
    API.BOOKINGS,
    { nurseId, date },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const cancelBooking = async (id: string) => {
  const token = await getAuthToken();
  const res = await axiosInstance.put(
    `${API.BOOKINGS}/${id}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

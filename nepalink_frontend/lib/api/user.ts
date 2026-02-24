import axiosInstance from "./axios";
import { API } from "./endpoints";
import { getAuthToken } from "../cookie";

export const getUserById = async (userId: string) => {
  const token = await getAuthToken();
  const res = await axiosInstance.get(`${API.USERS}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProfile = async (userId: string, data: any) => {
  const token = await getAuthToken();
  const res = await axiosInstance.put(`${API.USERS}/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProfilePic = async (userId: string, file: File) => {
  const token = await getAuthToken();
  const formData = new FormData();
  formData.append("file", file);

  const res = await axiosInstance.put(`${API.USERS}/${userId}/profile-pic`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

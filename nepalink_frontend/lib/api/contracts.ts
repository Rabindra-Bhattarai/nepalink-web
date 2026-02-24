import axiosInstance from "./axios";
import { API } from "./endpoints";
import { getAuthToken } from "../cookie";

export const getMyContracts = async () => {
  const token = await getAuthToken();
  const res = await axiosInstance.get("/contracts/my", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data; // backend wraps in { success, data }
};

export const getAssignedContracts = async () => {
  const token = await getAuthToken();
  const res = await axiosInstance.get("/contracts/assigned", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

//  Instead of GET /contracts/:id, filter from list
export const getContractById = async (id: string, role: string) => {
  const contracts =
    role === "member" ? await getMyContracts() : await getAssignedContracts();
  return contracts.find((c: any) => c._id === id);
};

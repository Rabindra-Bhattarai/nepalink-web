"use server";

import { updateProfile, updateProfilePic } from "../api/user";

export const updateProfileAction = async (userId: string, data: any) => {
  try {
    return await updateProfile(userId, data);
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

export const updateProfilePicAction = async (userId: string, file: File) => {
  try {
    return await updateProfilePic(userId, file);
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

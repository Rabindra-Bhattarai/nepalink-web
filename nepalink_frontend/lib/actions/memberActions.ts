"use server";

import { getMyBookings, getMyActivities } from "../api/member";

export const fetchBookingsAction = async () => {
  try {
    return await getMyBookings();
  } catch (err: any) {
    console.error("Error fetching bookings:", err.message);
    return { success: false, message: err.message };
  }
};

export const fetchActivitiesAction = async () => {
  try {
    return await getMyActivities();
  } catch (err: any) {
    console.error("Error fetching activities:", err.message);
    return { success: false, message: err.message };
  }
};

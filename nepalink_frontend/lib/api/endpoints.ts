export const API = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    ME: "/auth/me",
  },
  BOOKINGS: "/bookings",
  ACTIVITIES: {
    CREATE: "/activities",
    UPDATE_STATUS: (id: string) => `/activities/${id}/status`,
    MEMBER: "/activities/my",
    NURSE: "/activities/assigned",
  },
  USERS: "/users",
  MEMBERS: {
    BOOKINGS: "/members/bookings",
  },
};

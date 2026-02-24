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
  CONTRACTS: {
    BY_ID: (id: string) => `/contracts/${id}`,
  },
  CHAT: {
    MESSAGES: (contractId: string) => `/chat/${contractId}`,
    SEND: (contractId: string) => `/chat/${contractId}/message`,
    MARK_READ: (contractId: string) => `/chat/${contractId}/read`,
  }, 
};

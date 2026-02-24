"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api/axios";
import { API } from "@/lib/api/endpoints";

export function useChat(contractId: string, token: string) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(API.CHAT.MESSAGES(contractId), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data.data || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [contractId, token]);

  return { messages, setMessages };
}

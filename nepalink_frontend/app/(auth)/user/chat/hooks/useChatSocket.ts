// chat/hooks/useChatSocket.ts
import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export function useChatSocket(contractId: string, token: string, onMessage: (msg: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token || !contractId) return;

    socketRef.current = io("http://localhost:3000", {
      auth: { token },
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current.emit("joinRoom", { contractId });

    socketRef.current.on("receiveMessage", (msg) => {
      onMessage(msg);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [contractId, token]); // Reconnect only if token or contractId changes

  // Use useCallback to prevent unnecessary re-renders in children
  const sendMessage = useCallback((receiverId: string, message: string) => {
    socketRef.current?.emit("sendMessage", { contractId, receiverId, message });
  }, [contractId]);

  return { sendMessage };
}
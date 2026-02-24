// ChatWindow.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { useChat } from "./hooks/useChat";
import { useChatSocket } from "./hooks/useChatSocket";
import { Send, User } from "lucide-react"; // Install lucide-react for better icons

export default function ChatWindow({ contractId, token, receiverId, currentUserId, nurse }: any) {
  const { messages, setMessages } = useChat(contractId, token);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { sendMessage } = useChatSocket(contractId, token, (msg) => {
    setMessages((prev: any[]) => [...prev, msg]);
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(receiverId, text);
    // Optimistic UI update: you can add the msg locally here too if backend doesn't broadcast to sender
    setText("");
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-50 border rounded-xl overflow-hidden shadow-lg m-4 h-[calc(100vh-2rem)]">
      {/* 🏥 Polished Header */}
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={nurse?.profilePic || "/default-avatar.png"}
              alt={nurse?.name}
              className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <p className="font-bold text-slate-800 leading-tight">{nurse?.name}</p>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Primary Nurse</p>
          </div>
        </div>
      </div>

      {/* 💬 Scrollable Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((msg: any) => (
          <MessageBubble
            key={msg._id}
            msg={msg}
            isMine={msg.senderId?._id === currentUserId || msg.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ⌨️ Polished Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none px-3 py-1 text-slate-800"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-xl transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
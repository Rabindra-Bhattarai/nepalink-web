// MessageBubble.tsx
import React from "react";

export default function MessageBubble({ msg, isMine }: { msg: any; isMine: boolean }) {
  const formattedTime = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-3 shadow-sm transition-all ${
          isMine
            ? "bg-blue-600 text-white rounded-2xl rounded-tr-none"
            : "bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-none"
        }`}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
        <div 
          className={`flex items-center gap-1 mt-1 text-[10px] ${
            isMine ? "text-blue-100 justify-end" : "text-slate-400 justify-start"
          }`}
        >
          {formattedTime}
          {isMine && <span>✓✓</span>}
        </div>
      </div>
    </div>
  );
}
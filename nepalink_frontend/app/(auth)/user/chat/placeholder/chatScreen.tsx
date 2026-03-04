"use client";

import { useState } from "react";

export default function PracticeChatScreen() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-10">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Practice Chat Screen</h1>
        <div
          data-testid="chat-box"
          className="border border-slate-200 rounded-lg p-3 h-48 overflow-y-auto mb-4"
        >
          {messages.length === 0 ? (
            <p className="text-slate-400 text-sm">No messages yet</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className="text-slate-700 text-sm mb-2">
                {msg}
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-slate-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

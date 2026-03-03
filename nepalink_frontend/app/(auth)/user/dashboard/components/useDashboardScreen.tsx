"use client";

import { useState } from "react";

export default function PracticeUserDashboard() {
  const [notifications, setNotifications] = useState<string[]>([
    "Welcome back!",
    "Your booking is confirmed.",
  ]);
  const [tasks, setTasks] = useState<string[]>(["Finish report", "Call nurse"]);

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Practice User Dashboard</h1>

        <section>
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-slate-400">No notifications</p>
          ) : (
            <ul>
              {notifications.map((note, idx) => (
                <li key={idx} className="text-slate-700">{note}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-slate-400">No tasks</p>
          ) : (
            <ul>
              {tasks.map((task, idx) => (
                <li key={idx} className="text-slate-700">{task}</li>
              ))}
            </ul>
          )}
        </section>

        <button
          onClick={() => setNotifications([])}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Clear Notifications
        </button>
        <button
          onClick={() => setTasks([])}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Clear Tasks
        </button>
      </div>
    </div>
  );
}

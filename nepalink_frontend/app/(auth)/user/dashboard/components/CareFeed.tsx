"use client";

import { useActivities } from "@/app/(auth)/user/dashboard/hooks/useActivities";
import { Activity } from "@/schemas/activitySchema";

interface CareFeedProps {
  bookingId: string | null;
}

export default function CareFeed({ bookingId }: CareFeedProps) {
  const { activities, loading, error, refreshActivities } = useActivities(bookingId);

  if (!bookingId) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <p className="text-slate-500 text-sm">No caregiver session selected.</p>
      </div>
    );
  }

  if (loading) {
    return <p className="text-slate-500 text-sm">Loading care feed...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Error: {error}
        <button
          onClick={refreshActivities}
          className="ml-2 text-sky-600 underline text-xs"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <p className="text-slate-500 text-sm">No activity updates yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-6">
        Care Feed
      </h3>
      <div className="space-y-6">
        {activities.map((activity: Activity) => (
          <div key={activity._id} className="flex gap-4">
            <div className="w-2 h-2 rounded-full mt-1.5 bg-sky-500" />
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none">
                {activity.notes}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Nurse: {activity.nurseId}
              </p>
              <p className="text-[10px] text-slate-300 mt-1 font-bold uppercase">
                {new Date(activity.performedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

type Activity = {
  _id: string;
  notes: string;
  nurseId?: { name: string };
  performedAt: string;
};

export default function ActivityList({ activities }: { activities: Activity[] }) {
  if (!activities || activities.length === 0) {
    return <p className="text-gray-500">No activities found.</p>;
  }

  return (
    <ul className="space-y-3">
      {activities.map((a) => (
        <li
          key={a._id}
          className="border p-3 rounded-md"
        >
          <p className="font-medium">{a.notes}</p>
          <p className="text-sm text-gray-600">
            Nurse: {a.nurseId?.name || "Unknown"} —{" "}
            {new Date(a.performedAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}

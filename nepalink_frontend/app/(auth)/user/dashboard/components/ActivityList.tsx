export default function ActivityList({ activities }: { activities: any[] }) {
  if (!activities?.length) return <p className="text-sky-300 italic py-4">No care logs recorded.</p>;

  return (
    <ul className="space-y-4">
      {activities.map((a) => (
        <li key={a._id} className="group p-4 rounded-2xl bg-white border border-sky-50 hover:border-blue-200 transition-all shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="font-bold text-blue-900 leading-tight">
              {a.notes || a.description || "Routine Checkup"}
            </p>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
              a.status === 'completed' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
            }`}>
              {a.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-sky-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Nurse: {typeof a.nurseId === "object" ? a.nurseId?.name : "Staff"} 
            <span className="text-sky-200">•</span>
            {new Date(a.performedAt || a.date).toLocaleDateString()}
          </div>
        </li>
      ))}
    </ul>
  );
}
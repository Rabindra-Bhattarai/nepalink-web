export default function BookingStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    accepted: "bg-emerald-50 text-emerald-700 border-emerald-100",
    declined: "bg-rose-50 text-rose-700 border-rose-100",
    cancelled: "bg-gray-100 text-gray-600 border-gray-200",
    completed: "bg-blue-50 text-blue-700 border-blue-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${
        styles[status] || "bg-slate-100 text-slate-500 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

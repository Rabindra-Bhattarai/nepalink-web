import StatusBadge from "./StatusBadge";

export default function BookingList({ bookings }: { bookings: any[] }) {
  if (!bookings?.length) return <p className="p-6 text-slate-400 text-center">No bookings found.</p>;

  return (
    <div className="divide-y divide-slate-100">
      {bookings.map((b) => (
        <div key={b._id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-600 flex flex-col items-center justify-center text-white shadow-lg shadow-blue-200">
                <span className="text-[10px] font-bold uppercase leading-none">{new Date(b.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-lg font-bold leading-none">{new Date(b.date).getDate()}</span>
            </div>
            <div>
              <p className="font-bold text-slate-800">Nursing Visit</p>
              <p className="text-sm text-slate-500">Nurse: {b.nurseId?.name || "Pending..."}</p>
            </div>
          </div>
          <StatusBadge status={b.status} />
        </div>
      ))}
    </div>
  );
}
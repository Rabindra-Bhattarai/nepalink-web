export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    accepted: "bg-emerald-50 text-emerald-700 border-emerald-100",
    declined: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}
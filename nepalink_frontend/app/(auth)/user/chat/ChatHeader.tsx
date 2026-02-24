export default function ChatHeader({ nurse }: { nurse: any }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b bg-white shadow-sm">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
        {nurse?.name?.charAt(0) || "N"}
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-900">{nurse?.name || "Nurse"}</h2>
        <p className="text-sm text-slate-500">{nurse?.email}</p>
      </div>
    </div>
  );
}

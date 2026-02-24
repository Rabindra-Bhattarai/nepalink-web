export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      {/* Medical-style Pulse Loader */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
        <div className="relative bg-white border-2 border-blue-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
          <svg
            className="w-10 h-10 text-blue-600 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-800">Synchronizing...</h3>
        <p className="text-sm text-slate-500">Retrieving your health data</p>
      </div>
    </div>
  );
}
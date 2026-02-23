"use client";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend
} from "recharts";

// Clinical Blue Palette
const BLUE_SHADES = ["#1d4ed8", "#60a5fa", "#bfdbfe"];

export function ActivityChart({ data }: { data: any[] }) {
  // 1. Logic for Status Pie Chart (Monochromatic Blue)
  const statusCounts = ["completed", "pending", "cancelled"].map((status) => ({
    name: status,
    value: data.filter((a) => a.status === status).length,
  }));

  // 2. Logic for Vitals Gauge (Latest Data)
  const latest = data[0] || {};
  const systolic = latest.bloodPressure || 120;
  const heartRate = latest.heartRate || 72;

  // 3. Logic for Overall Vital Balance (Radar Chart)
  // We normalize these values so they fit on a similar scale for the "Shape"
  const radarData = [
    { subject: 'Pulse', A: latest.heartRate || 70, fullMark: 150 },
    { subject: 'Systolic', A: latest.bloodPressure || 120, fullMark: 200 },
    { subject: 'SpO2', A: latest.spo2 || 98, fullMark: 100 },
    { subject: 'Temp', A: (latest.temperature || 36.6) * 2, fullMark: 100 }, // Scaled for radar
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Row: Gauges and Overall Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: The Gauges (Based on your image) */}
        <div className="lg:col-span-2 bg-white rounded-4xl border border-blue-50 shadow-sm p-6">
          <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live Telemetry
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <GaugeChart value={systolic} max={200} label="Systolic" />
              <div className="text-center mt-2">
                <p className="text-lg font-black text-blue-900 leading-none">{systolic}<span className="text-[10px] ml-1 text-sky-400">mmHg</span></p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase mt-1">Normal Range</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <GaugeChart value={heartRate} max={160} label="Pulse" />
              <div className="text-center mt-2">
                <p className="text-lg font-black text-blue-900 leading-none">{heartRate}<span className="text-[10px] ml-1 text-sky-400">bpm</span></p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase mt-1">Normal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Vital Balance (Radar) */}
        <div className="bg-white rounded-4xl border border-blue-50 shadow-sm p-6 flex flex-col items-center">
          <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-4">Vital Balance</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e0f2fe" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#60a5fa', fontSize: 10, fontWeight: 'bold' }} />
                <Radar
                  name="Current Vitals"
                  dataKey="A"
                  stroke="#1d4ed8"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-blue-400 font-medium text-center px-4">
            Visual map of overall physiological stability across all metrics.
          </p>
        </div>
      </div>

      {/* Bottom Row: Status Distribution */}
      <div className="bg-white rounded-4xl border border-blue-50 shadow-sm p-8 flex flex-col md:flex-row items-center justify-around gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-black text-blue-950">Care Distribution</h3>
          <p className="text-sm text-sky-500">Summary of activity fulfillment</p>
        </div>
        
        <div className="h-48 w-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusCounts}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {statusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BLUE_SHADES[index % BLUE_SHADES.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-black text-blue-900">{data.length}</span>
            <span className="text-[8px] font-bold text-blue-400 uppercase">Total</span>
          </div>
        </div>

        <div className="flex gap-6">
          {statusCounts.map((s, i) => (
            <div key={s.name} className="flex flex-col items-center">
               <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: BLUE_SHADES[i] }} />
               <span className="text-[10px] font-black text-blue-900 uppercase tracking-tighter">{s.name}</span>
               <span className="text-sm font-bold text-sky-600">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable Gauge Component (Semi-Circle)
 */
function GaugeChart({ value, max, label }: { value: number, max: number, label: string }) {
  const data = [
    { value: value },
    { value: max - value },
    { value: max }, 
  ];

  return (
    <div className="w-full h-28 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={[
              { value: max * 0.3, color: "#ef4444" }, // Critical Zone
              { value: max * 0.3, color: "#f59e0b" }, // Caution Zone
              { value: max * 0.4, color: "#10b981" }, // Healthy Zone
            ]}
            cx="50%" cy="100%" innerRadius={40} outerRadius={55} stroke="none"
          >
            {[0,1,2].map((i) => <Cell key={i} fill={["#ef4444", "#f59e0b", "#10b981"][i]} />)}
          </Pie>
          <Pie
            dataKey="value"
            startAngle={180} endAngle={0} data={data}
            cx="50%" cy="100%" innerRadius={0} outerRadius={60} stroke="none"
          >
             <Cell fill="#1e3a8a" /> {/* The Needle pointer */}
             <Cell fill="transparent" />
             <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-black text-blue-300 uppercase tracking-widest">{label}</span>
    </div>
  );
}
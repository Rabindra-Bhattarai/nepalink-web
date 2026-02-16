"use client";

import { TrendingUp, AlertCircle } from "lucide-react";

interface VitalStatsProps {
  healthScore?: number; // optional score (0–100)
  summary?: string;     // optional summary text
}

export default function VitalStats({
  healthScore = 85,
  summary = "Based on nurse updates and vitals, your parent's health is stable.",
}: VitalStatsProps) {
  return (
    <div className="bg-linear-to-br from-sky-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-sky-200">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sky-100 text-sm font-medium">Recent Health Score</p>
        <TrendingUp size={20} className="text-sky-200" />
      </div>

      <div className="flex items-baseline gap-2">
        <h2 className="text-5xl font-black">{healthScore}</h2>
        <span className="text-sky-200 font-bold">/100</span>
      </div>

      <p className="mt-4 text-xs text-sky-100 leading-relaxed">{summary}</p>

      {healthScore < 60 && (
        <div className="flex items-center gap-2 mt-4 text-red-200 text-xs font-bold">
          <AlertCircle size={16} /> Alert: Health score is low, please review vitals.
        </div>
      )}
    </div>
  );
}

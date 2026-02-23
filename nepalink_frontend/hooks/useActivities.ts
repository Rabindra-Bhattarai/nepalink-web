"use client";

import { useState, useEffect } from "react";
import { getMyActivities } from "@/lib/api/member";

export interface Activity {
  _id: string;
  description?: string;          // optional, for flexibility
  notes?: string;                // optional, for logs
  date: string;                  // main timestamp field
  performedAt?: string;          // optional, for chart/timeline
  status: "pending" | "completed" | "cancelled";
  nurseId?: { name?: string; email?: string; role?: string } | string;
  memberId?: { name?: string; email?: string; role?: string } | string;
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    spo2?: number;
  };
  dailyCare?: {
    meals?: string;
    hydration?: string;
    hygiene?: string;
    mobility?: string;
    sleepQuality?: string;
  };
  medicalTracking?: {
    medication?: string;
    painLevel?: number;
    woundCondition?: string;
    bowelBladder?: string;
  };
  collaboration?: {
    suppliesInventory?: string;
    shiftSummary?: string;
    parentInstructions?: string;
    significantEvents?: string;
  };
  safetyVerification?: {
    equipmentCheck?: string;
    emergencyContactSync?: boolean;
    jointSignature?: boolean;
  };
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await getMyActivities();
      // backend returns { success: true, data: [...] }
      setActivities(res.data || []);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch activities"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return { activities, loading, error, refresh: fetchActivities };
}

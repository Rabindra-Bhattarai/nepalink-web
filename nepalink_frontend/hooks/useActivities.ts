"use client";

import { useState, useEffect } from "react";
import { getMyActivities } from "@/lib/api/member";

export interface Activity {
  _id: string;
  description?: string;
  notes?: string;
  date: string;
  performedAt?: string;
  status: "pending" | "completed" | "cancelled";
  nurseId?: { _id?: string; name?: string; email?: string; role?: string } | string;
  memberId?: { _id?: string; name?: string; email?: string; role?: string } | string;
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

      // Debug log to confirm response shape
      console.log("Activities API response:", res);

      // If backend returns { success: true, data: [...] }
      if (Array.isArray(res.data)) {
        setActivities(res.data);
      } else if (Array.isArray(res.data?.data)) {
        setActivities(res.data.data);
      } else {
        setActivities([]);
      }
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

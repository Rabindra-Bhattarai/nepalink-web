"use client";
import { useState } from "react";
import axios from "axios";

// Define the form data type
interface NurseActivityFormData {
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    spo2: string;
  };
  dailyCare: {
    meals: string;
    hydration: string;
    hygiene: string;
    mobility: string;
    sleepQuality: string;
  };
  medicalTracking: {
    medication: string;
    painLevel: string;
    woundCondition: string;
    bowelBladder: string;
  };
  collaboration: {
    suppliesInventory: string;
    shiftSummary: string;
    parentInstructions: string;
    significantEvents: string;
  };
  safetyVerification: {
    equipmentCheck: string;
    emergencyContactSync: boolean;
    jointSignature: boolean;
  };
  status: string;
}

export default function NurseActivityForm({
  activityId,
  onUpdated,
}: {
  activityId: string;
  onUpdated: () => void;
}) {
  const [formData, setFormData] = useState<NurseActivityFormData>({
    vitalSigns: { bloodPressure: "", heartRate: "", temperature: "", spo2: "" },
    dailyCare: { meals: "", hydration: "", hygiene: "", mobility: "", sleepQuality: "" },
    medicalTracking: { medication: "", painLevel: "", woundCondition: "", bowelBladder: "" },
    collaboration: { suppliesInventory: "", shiftSummary: "", parentInstructions: "", significantEvents: "" },
    safetyVerification: { equipmentCheck: "", emergencyContactSync: false, jointSignature: false },
    status: "completed",
  });

  // Restrict section to valid keys
  type SectionKey = keyof NurseActivityFormData;

  const handleChange = <T extends SectionKey>(
    section: T,
    field: keyof NurseActivityFormData[T],
    value: any
  ) => {
    setFormData((prev) => {
      const sectionData = prev[section] as Record<string, any>; // 👈 cast to object
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/activities/${activityId}/status`,
        {
          status: formData.status,
          vitalSigns: formData.vitalSigns,
          dailyCare: formData.dailyCare,
          medicalTracking: formData.medicalTracking,
          collaboration: formData.collaboration,
          safetyVerification: formData.safetyVerification,
        },
        { withCredentials: true }
      );
      onUpdated();
    } catch (err: any) {
      console.error("Failed to update activity:", err.response?.data || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl border shadow-sm"
    >
      <h2 className="text-lg font-bold">Nurse Activity Update</h2>

      {/* Vital Signs */}
      <div>
        <h3 className="font-semibold">Vital Signs</h3>
        <input
          placeholder="Blood Pressure"
          value={formData.vitalSigns.bloodPressure}
          onChange={(e) => handleChange("vitalSigns", "bloodPressure", e.target.value)}
        />
        <input
          placeholder="Heart Rate"
          type="number"
          value={formData.vitalSigns.heartRate}
          onChange={(e) => handleChange("vitalSigns", "heartRate", e.target.value)}
        />
        <input
          placeholder="Temperature"
          type="number"
          value={formData.vitalSigns.temperature}
          onChange={(e) => handleChange("vitalSigns", "temperature", e.target.value)}
        />
        <input
          placeholder="SpO₂"
          type="number"
          value={formData.vitalSigns.spo2}
          onChange={(e) => handleChange("vitalSigns", "spo2", e.target.value)}
        />
      </div>

      {/* Daily Care */}
      <div>
        <h3 className="font-semibold">Daily Care</h3>
        <input
          placeholder="Meals"
          value={formData.dailyCare.meals}
          onChange={(e) => handleChange("dailyCare", "meals", e.target.value)}
        />
        <input
          placeholder="Hydration"
          value={formData.dailyCare.hydration}
          onChange={(e) => handleChange("dailyCare", "hydration", e.target.value)}
        />
        <input
          placeholder="Hygiene"
          value={formData.dailyCare.hygiene}
          onChange={(e) => handleChange("dailyCare", "hygiene", e.target.value)}
        />
        <input
          placeholder="Mobility"
          value={formData.dailyCare.mobility}
          onChange={(e) => handleChange("dailyCare", "mobility", e.target.value)}
        />
        <input
          placeholder="Sleep Quality"
          value={formData.dailyCare.sleepQuality}
          onChange={(e) => handleChange("dailyCare", "sleepQuality", e.target.value)}
        />
      </div>

      {/* Medical Tracking */}
      <div>
        <h3 className="font-semibold">Medical Tracking</h3>
        <input
          placeholder="Medication"
          value={formData.medicalTracking.medication}
          onChange={(e) => handleChange("medicalTracking", "medication", e.target.value)}
        />
        <input
          placeholder="Pain Level (1-10)"
          type="number"
          value={formData.medicalTracking.painLevel}
          onChange={(e) => handleChange("medicalTracking", "painLevel", e.target.value)}
        />
        <input
          placeholder="Wound Condition"
          value={formData.medicalTracking.woundCondition}
          onChange={(e) => handleChange("medicalTracking", "woundCondition", e.target.value)}
        />
        <input
          placeholder="Bowel & Bladder"
          value={formData.medicalTracking.bowelBladder}
          onChange={(e) => handleChange("medicalTracking", "bowelBladder", e.target.value)}
        />
      </div>

      {/* Collaboration */}
      <div>
        <h3 className="font-semibold">Collaboration</h3>
        <input
          placeholder="Supplies Inventory"
          value={formData.collaboration.suppliesInventory}
          onChange={(e) => handleChange("collaboration", "suppliesInventory", e.target.value)}
        />
        <input
          placeholder="Shift Summary"
          value={formData.collaboration.shiftSummary}
          onChange={(e) => handleChange("collaboration", "shiftSummary", e.target.value)}
        />
        <input
          placeholder="Parent Instructions"
          value={formData.collaboration.parentInstructions}
          onChange={(e) => handleChange("collaboration", "parentInstructions", e.target.value)}
        />
        <input
          placeholder="Significant Events"
          value={formData.collaboration.significantEvents}
          onChange={(e) => handleChange("collaboration", "significantEvents", e.target.value)}
        />
      </div>

      {/* Safety & Verification */}
      <div>
        <h3 className="font-semibold">Safety & Verification</h3>
        <input
          placeholder="Equipment Check"
          value={formData.safetyVerification.equipmentCheck}
          onChange={(e) => handleChange("safetyVerification", "equipmentCheck", e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={formData.safetyVerification.emergencyContactSync}
            onChange={(e) =>
              handleChange("safetyVerification", "emergencyContactSync", e.target.checked)
            }
          />
          Emergency Contact Sync
        </label>
        <label>
          <input
            type="checkbox"
            checked={formData.safetyVerification.jointSignature}
            onChange={(e) =>
              handleChange("safetyVerification", "jointSignature", e.target.checked)
            }
          />
          Joint Digital Signature
        </label>
      </div>

      <button
        type="submit"
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Save Activity
      </button>
    </form>
  );
}

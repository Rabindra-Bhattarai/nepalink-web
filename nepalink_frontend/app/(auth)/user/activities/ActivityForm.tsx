"use client";
import { useState } from "react";
import axios from "axios";
import { 
  Activity, Heart, Coffee, Pill, Users, ShieldCheck, 
  Calendar, ClipboardX, Save, PlusCircle, AlertCircle 
} from "lucide-react";

export default function ActivityForm({ onCreated }: { onCreated: () => void }) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Structured fields state (keeping your existing logic)
  const [vitalSigns, setVitalSigns] = useState({ bloodPressure: "", heartRate: "", temperature: "", spo2: "" });
  const [dailyCare, setDailyCare] = useState({ meals: "", hydration: "", hygiene: "", mobility: "", sleepQuality: "" });
  const [medicalTracking, setMedicalTracking] = useState({ medication: "", painLevel: "", woundCondition: "", bowelBladder: "" });
  const [collaboration, setCollaboration] = useState({ suppliesInventory: "", shiftSummary: "", parentInstructions: "", significantEvents: "" });
  const [safetyVerification, setSafetyVerification] = useState({ equipmentCheck: "", emergencyContactSync: false, jointSignature: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/activities", {
        description, date, vitalSigns, dailyCare, medicalTracking, collaboration, safetyVerification,
      }, { withCredentials: true });
      
      // Reset logic
      setDescription("");
      setDate("");
      onCreated();
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all";
  const labelStyle = "block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-4xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2.5 rounded-2xl text-emerald-600">
            <PlusCircle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">New Activity Log</h2>
            <p className="text-xs text-slate-500 font-medium">Document care coordination and clinical observations</p>
          </div>
        </div>
        <div className="hidden md:block">
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">Caregiver Entry</span>
        </div>
      </div>

      {/* --- BASIC INFO & DESCRIPTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className={labelStyle}>Primary Observation / Description</label>
          <textarea
            placeholder="Describe the overall status of the patient..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputStyle} h-24 resize-none`}
            required
          />
        </div>
        <div>
          <label className={labelStyle}>Date & Time of Care</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${inputStyle} pl-10`}
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* --- VITAL SIGNS --- */}
        <section className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-rose-600 mb-2">
            <Heart size={18} />
            <h3 className="font-bold text-sm uppercase tracking-wide">Vital Signs</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>BP (Systolic/Dia)</label>
              <input placeholder="120/80" value={vitalSigns.bloodPressure} className={inputStyle}
                onChange={(e) => setVitalSigns({ ...vitalSigns, bloodPressure: e.target.value })} />
            </div>
            <div>
              <label className={labelStyle}>Heart Rate (BPM)</label>
              <input placeholder="72" type="number" value={vitalSigns.heartRate} className={inputStyle}
                onChange={(e) => setVitalSigns({ ...vitalSigns, heartRate: e.target.value })} />
            </div>
            <div>
              <label className={labelStyle}>Temp (°C)</label>
              <input placeholder="36.6" type="number" step="0.1" value={vitalSigns.temperature} className={inputStyle}
                onChange={(e) => setVitalSigns({ ...vitalSigns, temperature: e.target.value })} />
            </div>
            <div>
              <label className={labelStyle}>SpO₂ (%)</label>
              <input placeholder="98" type="number" value={vitalSigns.spo2} className={inputStyle}
                onChange={(e) => setVitalSigns({ ...vitalSigns, spo2: e.target.value })} />
            </div>
          </div>
        </section>

        {/* --- DAILY CARE --- */}
        <section className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Coffee size={18} />
            <h3 className="font-bold text-sm uppercase tracking-wide">Daily Living (ADLs)</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Meals" value={dailyCare.meals} className={inputStyle} onChange={(e) => setDailyCare({ ...dailyCare, meals: e.target.value })} />
            <input placeholder="Hydration" value={dailyCare.hydration} className={inputStyle} onChange={(e) => setDailyCare({ ...dailyCare, hydration: e.target.value })} />
            <input placeholder="Hygiene" value={dailyCare.hygiene} className={inputStyle} onChange={(e) => setDailyCare({ ...dailyCare, hygiene: e.target.value })} />
            <input placeholder="Mobility" value={dailyCare.mobility} className={inputStyle} onChange={(e) => setDailyCare({ ...dailyCare, mobility: e.target.value })} />
            <input placeholder="Sleep" className={`${inputStyle} col-span-2`} value={dailyCare.sleepQuality} onChange={(e) => setDailyCare({ ...dailyCare, sleepQuality: e.target.value })} />
          </div>
        </section>

        {/* --- MEDICAL TRACKING --- */}
        <section className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Pill size={18} />
            <h3 className="font-bold text-sm uppercase tracking-wide">Medical Tracking</h3>
          </div>
          <div className="space-y-3">
            <input placeholder="Medication Administered" value={medicalTracking.medication} className={inputStyle} onChange={(e) => setMedicalTracking({ ...medicalTracking, medication: e.target.value })} />
            <div className="flex gap-4">
              <input placeholder="Pain Level (1-10)" type="number" value={medicalTracking.painLevel} className={inputStyle} onChange={(e) => setMedicalTracking({ ...medicalTracking, painLevel: e.target.value })} />
              <input placeholder="Wound Condition" value={medicalTracking.woundCondition} className={inputStyle} onChange={(e) => setMedicalTracking({ ...medicalTracking, woundCondition: e.target.value })} />
            </div>
          </div>
        </section>

        {/* --- COLLABORATION --- */}
        <section className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Users size={18} />
            <h3 className="font-bold text-sm uppercase tracking-wide">Coordination</h3>
          </div>
          <div className="space-y-3">
            <input placeholder="Supplies Inventory" value={collaboration.suppliesInventory} className={inputStyle} onChange={(e) => setCollaboration({ ...collaboration, suppliesInventory: e.target.value })} />
            <input placeholder="Parent Instructions" value={collaboration.parentInstructions} className={inputStyle} onChange={(e) => setCollaboration({ ...collaboration, parentInstructions: e.target.value })} />
          </div>
        </section>
      </div>

      {/* --- SAFETY & SUBMIT --- */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap gap-6">
           <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-none bg-white/20 checked:bg-emerald-500 transition-all" checked={safetyVerification.emergencyContactSync}
                onChange={(e) => setSafetyVerification({ ...safetyVerification, emergencyContactSync: e.target.checked })} />
              <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Emergency Contacts Synced</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-none bg-white/20 checked:bg-emerald-500 transition-all" checked={safetyVerification.jointSignature}
                onChange={(e) => setSafetyVerification({ ...safetyVerification, jointSignature: e.target.checked })} />
              <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Digital Signature Ready</span>
           </label>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-900 px-8 py-3.5 rounded-xl font-black transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
        >
          {loading ? "Saving..." : <><Save size={18} /> Save Daily Log</>}
        </button>
      </div>
    </form>
  );
}
"use client";

import { useState } from "react";

export default function PracticeNurseForm() {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !specialty) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-center">
        <h2 className="text-xl font-bold mb-2">Nurse Registered</h2>
        <p className="text-slate-600">Name: {name}</p>
        <p className="text-slate-600">Specialty: {specialty}</p>
        <button
          onClick={() => {
            setName("");
            setSpecialty("");
            setSubmitted(false);
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Register Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl shadow space-y-4 max-w-md mx-auto"
    >
      <h1 className="text-2xl font-bold text-slate-800">Practice Nurse Form</h1>

      <div>
        <label htmlFor="nurse-name" className="block text-sm font-medium text-slate-700">
          Nurse Name
        </label>
        <input
          id="nurse-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter nurse name"
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="nurse-specialty" className="block text-sm font-medium text-slate-700">
          Specialty
        </label>
        <input
          id="nurse-specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          placeholder="Enter specialty"
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={!name || !specialty}
        className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:bg-slate-300"
      >
        Register Nurse
      </button>
    </form>
  );
}

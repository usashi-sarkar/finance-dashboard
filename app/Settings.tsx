"use client";

import { useApp } from "./context/AppContext";

export default function Settings() {
  const {
    name,
    setName,
    currency,
    setCurrency,
    darkMode,
    setDarkMode,
  } = useApp();

  // 💾 SAVE
  const handleSave = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("currency", currency);
    localStorage.setItem("darkMode", String(darkMode));

    alert("Settings Saved ✅");
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg text-white">

      <h2 className="text-2xl font-semibold mb-6">Settings ⚙️</h2>

      {/* 👤 PROFILE */}
      <div className="mb-6">
        <p className="text-gray-400 mb-2">Profile Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
        />
      </div>

      {/* 💱 CURRENCY */}
      <div className="mb-6">
        <p className="text-gray-400 mb-2">Currency</p>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
        >
          <option value="₹">₹ INR</option>
          <option value="$">$ USD</option>
          <option value="€">€ EUR</option>
        </select>
      </div>

      {/* 🌙 DARK MODE */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-300">Dark Mode</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            darkMode ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              darkMode ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
      >
        Save Settings
      </button>
    </div>
  );
}
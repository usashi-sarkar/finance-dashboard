"use client";

import { useState } from "react";
import Chart from "./Chart";
import Transactions from "./Transactions";
import Analytics from "./Analytics";
import ExpenseChart from "./ExpenseChart";
import SettingsPage from "./Settings";
import { useApp } from "./context/AppContext";

import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Settings,
  Wallet,
  TrendingUp,
  TrendingDown,
  Hash,
  Calendar,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const { currency, name } = useApp();

  // 🔥 TRANSACTIONS
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Netflix", amount: -499, date: "2026-04-01", status: "Completed", category: "Entertainment" },
    { id: 2, name: "Salary", amount: 25000, date: "2026-04-01", status: "Received", category: "Income" },
    { id: 3, name: "Food", amount: -1200, date: "2026-04-02", status: "Completed", category: "Food" },
    { id: 4, name: "Shopping", amount: -2000, date: "2026-04-03", status: "Completed", category: "Shopping" },
  ]);

  // ✅ FIXED TYPE
  const limits: Record<string, number> = {
    Food: 2000,
    Shopping: 3000,
    Entertainment: 1500,
  };

  // 🔥 CALCULATIONS
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const balance = income - expenses;

  // 🔥 CATEGORY SPENDING (SAFE)
  const categorySpending: Record<string, number> = transactions.reduce(
    (acc, t) => {
      if (t.amount < 0 && t.category) {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      }
      return acc;
    },
    {} as Record<string, number>
  );

  // ⚠️ ALERT
  const alerts = Object.keys(limits).filter(
    (cat) => (categorySpending[cat] || 0) > limits[cat]
  );

  // 📅 MONTHLY REPORT (SORTED)
  const monthlyData: Record<string, number> = transactions.reduce(
    (acc, t) => {
      const month = t.date.slice(0, 7);
      acc[month] = (acc[month] || 0) + t.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedMonths = Object.keys(monthlyData).sort();

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#1e293b] p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-blue-400">FinDash 💰</h1>

        <p className="text-sm text-gray-400 mb-8 mt-2">
          Welcome, {name}
        </p>

        <ul className="space-y-5 text-gray-300">

          <li onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 cursor-pointer ${activeTab === "dashboard" ? "text-blue-400 font-semibold" : "hover:text-blue-400"}`}>
            <LayoutDashboard size={18} /> Dashboard
          </li>

          <li onClick={() => setActiveTab("transactions")}
            className={`flex items-center gap-2 cursor-pointer ${activeTab === "transactions" ? "text-blue-400 font-semibold" : "hover:text-blue-400"}`}>
            <CreditCard size={18} /> Transactions
          </li>

          <li onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 cursor-pointer ${activeTab === "analytics" ? "text-blue-400 font-semibold" : "hover:text-blue-400"}`}>
            <BarChart3 size={18} /> Analytics
          </li>

          <li onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 cursor-pointer ${activeTab === "settings" ? "text-blue-400 font-semibold" : "hover:text-blue-400"}`}>
            <Settings size={18} /> Settings
          </li>

        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 overflow-y-auto">

        {activeTab === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold mb-6">
              Finance Dashboard
            </h1>

            {/* CARDS */}
            <div className="grid grid-cols-3 gap-6">

              <div className="bg-[#1e293b] p-6 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Total Balance</p>
                  <h2 className="text-3xl font-bold mt-2">
                    {currency}{balance}
                  </h2>
                </div>
                <Wallet />
              </div>

              <div className="bg-[#1e293b] p-6 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Total Income</p>
                  <h2 className="text-3xl font-bold text-green-400 mt-2">
                    {currency}{income}
                  </h2>
                </div>
                <TrendingUp />
              </div>

              <div className="bg-[#1e293b] p-6 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Total Expenses</p>
                  <h2 className="text-3xl font-bold text-red-400 mt-2">
                    {currency}{expenses}
                  </h2>
                </div>
                <TrendingDown />
              </div>

            </div>

            {/* ALERT */}
            {alerts.length > 0 && (
              <div className="mt-4 bg-red-500/20 text-red-400 p-4 rounded-xl">
                ⚠️ Overspending in: {alerts.join(", ")}
              </div>
            )}

            {/* INSIGHTS */}
            <div className="mt-8 bg-[#1e293b] p-6 rounded-2xl">
              <h2 className="text-lg font-semibold mb-6">Insights</h2>

              <div className="grid grid-cols-3 gap-6">

                <div className="bg-[#0f172a] p-4 rounded-xl flex items-center gap-4">
                  <TrendingUp />
                  <div>
                    <p className="text-gray-400 text-sm">Highest Spending</p>
                    <h3 className="font-bold">
                      {
                        transactions
                          .filter((t) => t.amount < 0)
                          .sort((a, b) => a.amount - b.amount)[0]?.name || "N/A"
                      }
                    </h3>
                  </div>
                </div>

                <div className="bg-[#0f172a] p-4 rounded-xl flex items-center gap-4">
                  <Hash />
                  <div>
                    <p className="text-gray-400 text-sm">Transactions</p>
                    <h3 className="font-bold">{transactions.length}</h3>
                  </div>
                </div>

                <div className="bg-[#0f172a] p-4 rounded-xl flex items-center gap-4">
                  <Calendar />
                  <div>
                    <p className="text-gray-400 text-sm">Balance Status</p>
                    <h3 className="font-bold">
                      {balance > 0 ? "Profit 📈" : "Loss 📉"}
                    </h3>
                  </div>
                </div>

              </div>
            </div>

            {/* MONTHLY REPORT */}
            <div className="mt-6 bg-[#1e293b] p-4 rounded-xl">
              <h3 className="mb-2 font-semibold">Monthly Report</h3>
              {sortedMonths.map((m) => (
                <p key={m}>
                  {m} → {currency}{monthlyData[m]}
                </p>
              ))}
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-2 gap-6 mt-8">

              <div className="bg-[#1e293b] p-6 rounded-2xl">
                <h2 className="mb-4">Income vs Expenses</h2>
                <Chart />
              </div>

              <ExpenseChart transactions={transactions} />

            </div>
          </>
        )}

        {activeTab === "transactions" && (
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )}

        {activeTab === "analytics" && (
          <Analytics transactions={transactions} />
        )}

        {activeTab === "settings" && (
          <SettingsPage />
        )}

      </div>
    </div>
  );
}
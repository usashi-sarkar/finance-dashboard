"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics({ transactions }: any) {

  // 🧠 Calculate totals dynamically
  const income = transactions
    .filter((t: any) => t.amount > 0)
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t: any) => t.amount < 0)
    .reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0);

  const balance = income - expenses;

  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-6 text-gray-700">
        Financial Analytics
      </h2>

      {/* 🔥 Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Total Income</p>
          <h3 className="text-xl font-bold text-green-600">
            ₹{income}
          </h3>
        </div>

        <div className="bg-red-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Total Expenses</p>
          <h3 className="text-xl font-bold text-red-600">
            ₹{expenses}
          </h3>
        </div>

        <div className="bg-blue-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Net Balance</p>
          <h3 className="text-xl font-bold text-blue-600">
            ₹{balance}
          </h3>
        </div>
      </div>

      {/* 📊 Pie Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
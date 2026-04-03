"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function ExpenseChart({ transactions }: any) {
  const expenseData = transactions
    .filter((t: any) => t.amount < 0)
    .reduce((acc: any, t: any) => {
      const key = t.category || "Other";
      acc[key] = (acc[key] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const data = Object.keys(expenseData).map((key) => ({
    name: key,
    value: expenseData[key],
  }));

  const COLORS = ["#3b82f6", "#f59e0b", "#22c55e", "#ec4899", "#8b5cf6"];

  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Expense Categories
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
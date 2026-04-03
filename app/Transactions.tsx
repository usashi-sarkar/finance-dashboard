"use client";

import { useState } from "react";
import { useApp } from "./context/AppContext";

export default function Transactions({ transactions, setTransactions }: any) {
  const { currency } = useApp();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 📅 DATE FILTER
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ➕ FORM STATE
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  // ➕ ADD TRANSACTION
  const addTransaction = () => {
    if (!name || !amount) return;

    const newTransaction = {
      id: Date.now(),
      name,
      amount:
        type === "expense" ? -Math.abs(Number(amount)) : Number(amount),
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
      category,
    };

    setTransactions([newTransaction, ...transactions]);

    setName("");
    setAmount("");
    setType("expense");
    setCategory("Food");
  };

  // ❌ DELETE
  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t: any) => t.id !== id));
  };

  // 🔍 FILTER LOGIC
  const filteredData = transactions
    .filter((t: any) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t: any) => {
      if (filter === "income") return t.amount > 0;
      if (filter === "expense") return t.amount < 0;
      return true;
    })
    .filter((t: any) => {
      if (!startDate || !endDate) return true;
      return t.date >= startDate && t.date <= endDate;
    });

  return (
    <div className="mt-6 bg-[#1e293b] p-6 rounded-2xl shadow-lg text-white">

      <h2 className="text-xl font-semibold mb-6">Transactions</h2>

      {/* ➕ ADD FORM */}
      <div className="grid grid-cols-5 gap-3 mb-6">

        <input
          type="text"
          placeholder="Name"
          className="p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* 🏷️ CATEGORY */}
        <select
          className="p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Bills</option>
        </select>

        <button
          onClick={addTransaction}
          className="bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className="grid grid-cols-4 gap-3 mb-6">

        <input
          type="text"
          placeholder="Search..."
          className="p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* 📅 DATE FILTER */}
        <input
          type="date"
          className="p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="p-2 bg-[#0f172a] border border-gray-600 rounded-lg"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* 📊 TABLE */}
      <table className="w-full text-left text-gray-300">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-700">
            <th className="pb-3">Name</th>
            <th className="pb-3">Category</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Amount</th>
            <th className="pb-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((t: any) => (
            <tr
              key={t.id}
              className="border-b border-gray-700 hover:bg-[#0f172a] transition"
            >
              <td className="py-3">{t.name}</td>
              <td>{t.category || "—"}</td>
              <td>{t.date}</td>

              <td
                className={
                  t.amount > 0
                    ? "text-green-400 font-semibold"
                    : "text-red-400 font-semibold"
                }
              >
                {t.amount > 0
                  ? `+${currency}${t.amount}`
                  : `-${currency}${Math.abs(t.amount)}`}
              </td>

              <td>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredData.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
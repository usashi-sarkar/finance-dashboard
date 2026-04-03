"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<any>(null);

export function AppProvider({ children }: any) {
  const [name, setName] = useState("User");
  const [currency, setCurrency] = useState("₹");
  const [darkMode, setDarkMode] = useState(true);

  // 🔥 Load from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedCurrency = localStorage.getItem("currency");
    const savedDark = localStorage.getItem("darkMode");

    if (savedName) setName(savedName);
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedDark) setDarkMode(savedDark === "true");
  }, []);

  // 🔥 Apply dark mode globally
  useEffect(() => {
    document.body.style.background = darkMode ? "#0f172a" : "#f3f4f6";
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        currency,
        setCurrency,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
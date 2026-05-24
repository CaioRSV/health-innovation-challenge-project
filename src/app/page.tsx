"use client";

import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import PacienteView from "../components/PacienteView";
import FarmaceuticoView from "../components/FarmaceuticoView";
import GestorView from "../components/GestorView";

export default function Home() {
  const [activeView, setActiveView] = useState("paciente");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    if (savedTheme) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <>
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      {activeView === "paciente" && (
        <PacienteView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      )}
      {activeView === "farmaceutico" && (
        <FarmaceuticoView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      )}
      {activeView === "gestor" && <GestorView />}
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import PacienteView from "../components/PacienteView";
import FarmaceuticoView from "../components/FarmaceuticoView";
import GestorView from "../components/GestorView";
import ProjetoView from "../components/ProjetoView";
import { useAppStore } from "../store/AppStore";

export default function Home() {
  const [activeView, setActiveView] = useState("paciente");
  const { isDarkMode, setIsDarkMode } = useAppStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      {activeView === "paciente" && <PacienteView />}
      {activeView === "farmaceutico" && <FarmaceuticoView />}
      {activeView === "gestor" && <GestorView />}
      {activeView === "projeto" && <ProjetoView />}
    </>
  );
}

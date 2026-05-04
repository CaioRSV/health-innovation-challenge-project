"use client";

import React, { useState } from "react";
import Navigation from "../components/Navigation";
import PacienteView from "../components/PacienteView";
import FarmaceuticoView from "../components/FarmaceuticoView";
import GestorView from "../components/GestorView";

export default function Home() {
  const [activeView, setActiveView] = useState("paciente");

  return (
    <>
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      {activeView === "paciente" && <PacienteView />}
      {activeView === "farmaceutico" && <FarmaceuticoView />}
      {activeView === "gestor" && <GestorView />}
    </>
  );
}

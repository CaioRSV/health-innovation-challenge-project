import React from "react";

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Navigation({ activeView, setActiveView }: NavigationProps) {
  return (
    <nav className="top-nav">
      <div className="logo-area">
        <img src="/conecta-farma_logo-2.png" alt="Conecta Farma Logo" className="logo-icon" />
        <div className="logo-text">
          <span>CONECTA</span>FARMA
        </div>
        <span
          style={{
            background: "#feda1522",
            color: "#feda15",
            border: "1px solid #feda1540",
            borderRadius: "4px",
            padding: "2px 8px",
            fontSize: "10px",
            fontWeight: 800,
            marginLeft: "4px",
          }}
        >
          PE
        </span>
      </div>
      <div className="user-tabs">
        <button
          className={`user-tab ${activeView === "paciente" ? "active" : ""}`}
          onClick={() => setActiveView("paciente")}
        >
          👤 Paciente
        </button>
        <button
          className={`user-tab ${activeView === "farmaceutico" ? "active" : ""}`}
          onClick={() => setActiveView("farmaceutico")}
        >
          🩺 Farmacêutico
        </button>
        <button
          className={`user-tab ${activeView === "gestor" ? "active" : ""}`}
          onClick={() => setActiveView("gestor")}
        >
          🏛 Gestor
        </button>
      </div>
    </nav>
  );
}

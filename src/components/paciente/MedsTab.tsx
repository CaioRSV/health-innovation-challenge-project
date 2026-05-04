import React, { useState } from "react";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  stock: number;
  reserved: boolean;
}

const initialMeds: Medicine[] = [
  {
    id: "m1",
    name: "Losartana Potássica",
    dosage: "50mg",
    stock: 120,
    reserved: false,
  },
  {
    id: "m2",
    name: "Cloridrato de Metformina",
    dosage: "500mg",
    stock: 45,
    reserved: false,
  },
  {
    id: "m3",
    name: "Omeprazol",
    dosage: "20mg",
    stock: 0,
    reserved: false,
  },
  {
    id: "m4",
    name: "Dipirona Monoidratada",
    dosage: "500mg",
    stock: 200,
    reserved: false,
  },
  {
    id: "m5",
    name: "Simvastatina",
    dosage: "20mg",
    stock: 10,
    reserved: false,
  },
];

export default function MedsTab() {
  const [meds, setMeds] = useState<Medicine[]>(initialMeds);

  const handleReserve = (id: string) => {
    setMeds((prevMeds) =>
      prevMeds.map((med) => {
        if (med.id === id && med.stock > 0 && !med.reserved) {
          return { ...med, stock: med.stock - 1, reserved: true };
        }
        return med;
      })
    );
  };

  return (
    <>
      <div className="card" style={{ border: "none", boxShadow: "none", padding: "0 0 16px 0", background: "transparent" }}>
        <div style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "16px", fontWeight: 800, marginBottom: "4px" }}>
          Farmácia Digital
        </div>
        <div style={{ fontSize: "12px", color: "var(--gray-500)" }}>
          Consulte o estoque e reserve seus medicamentos na unidade mais próxima.
        </div>
      </div>

      <div className="card">
        <div className="card-title">💊 Medicamentos Disponíveis</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {meds.map((med) => (
            <div key={med.id} className="med-item" style={{ flexDirection: "column", alignItems: "stretch", padding: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="med-icon" style={{ background: "var(--blue-pale)", color: "var(--blue)" }}>
                  💊
                </div>
                <div className="med-info">
                  <div className="med-name">{med.name}</div>
                  <div className="med-dose">{med.dosage}</div>
                </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--gray-100)" }}>
                <div>
                  <div style={{ fontSize: "10px", color: "var(--gray-500)", fontWeight: 700 }}>ESTOQUE NA UNIDADE</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: med.stock > 0 ? "var(--green)" : "var(--red)" }}>
                    {med.stock > 0 ? `${med.stock} caixas` : "Indisponível"}
                  </div>
                </div>
                <button
                  className={`btn ${med.reserved ? "btn-outline" : "btn-primary"} btn-sm`}
                  style={{ opacity: med.stock === 0 && !med.reserved ? 0.5 : 1, cursor: med.stock === 0 && !med.reserved ? "not-allowed" : "pointer" }}
                  disabled={med.stock === 0 || med.reserved}
                  onClick={() => handleReserve(med.id)}
                >
                  {med.reserved ? "✓ Reservado" : "Reservar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

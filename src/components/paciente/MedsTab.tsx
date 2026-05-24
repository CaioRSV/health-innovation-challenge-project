import React, { useState } from "react";
import { Medicine } from "../../types";
import { RegistrationData } from "../PacienteView";

interface MedsTabProps {
  meds: Medicine[];
  setMeds: React.Dispatch<React.SetStateAction<Medicine[]>>;
  registration?: RegistrationData | null;
}

export default function MedsTab({ meds, setMeds, registration }: MedsTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStockDescription = (med: Medicine) => {
    if (!med.stock || med.stock <= 0) return "Indisponível";

    if (med.info.categoria === "Injetável") {
      return `${med.stock} doses`;
    } else if (med.info.categoria === "Oral") {
      const comprimidos = med.stock;
      const cartelas = Math.floor(comprimidos / 15);
      if (cartelas > 1) {
        return `${comprimidos} comprimidos (${cartelas} cartelas)`;
      } else {
        return `${comprimidos} comprimidos`;
      }
    } else {
      return `${med.stock} unidades`;
    }
  };

  const handleReserve = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMeds((prevMeds) =>
      prevMeds.map((med) => {
        if (med.id === id && med.stock > 0 && !med.reserved) {
          return { ...med, stock: med.stock - 1, reserved: true };
        }
        return med;
      })
    );
  };

  const selectedMed = meds.find(m => m.id === expandedId);

  // Se houver um medicamento selecionado, renderizamos a página de detalhes "por cima" 
  // (mas dentro do fluxo normal da tela, com margin negativa para preencher a tela)
  if (selectedMed) {
    return (
      <div style={{
        margin: "-16px",
        background: "var(--gray-50)",
        minHeight: "calc(100% + 32px)",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.2s ease"
      }}>
        {/* Header do Modal */}
        <div style={{
          background: "linear-gradient(135deg, var(--nav-bg) 0%, var(--blue) 100%)",
          padding: "24px 20px 32px 20px",
          position: "relative",
          color: "white"
        }}>
          <button
            onClick={() => setExpandedId(null)}
            style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", cursor: "pointer", color: "white" }}
          >
            ×
          </button>
          <div style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "var(--yellow)", marginBottom: "8px", marginTop: "16px" }}>
            Guia do Paciente
          </div>
          <h1 style={{ fontSize: "24px", fontFamily: "'Poppins', sans-serif", fontWeight: 800, margin: "0 0 8px 0", lineHeight: 1.2 }}>
            {selectedMed.name}
          </h1>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>
            {selectedMed.dosage} • {selectedMed.info.categoria}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div style={{
          background: "var(--white)",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          marginTop: "-20px",
          padding: "32px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>

          {/* O Que É */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--blue-pale)", color: "var(--blue-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                ℹ️
              </div>
              <h2 style={{ fontSize: "18px", fontFamily: "'Poppins', sans-serif", fontWeight: 700, margin: 0, color: "var(--blue-dark)" }}>
                Como funciona?
              </h2>
            </div>
            <p style={{ fontSize: "14px", color: "var(--gray-700)", lineHeight: "1.7", margin: 0 }}>
              {selectedMed.info.descricao}
            </p>
          </div>

          {/* Grid de Detalhes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {selectedMed.info.detalhes.map((det, idx) => (
              <div key={idx} style={{ background: "var(--blue-pale)", borderLeft: "4px solid var(--blue-light)", borderRadius: "10px", padding: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--blue)", marginBottom: "4px" }}>
                  {det.label}
                </div>
                <div style={{ fontSize: "13px", color: "var(--gray-800)", lineHeight: "1.5" }}>
                  {det.value}
                </div>
              </div>
            ))}
          </div>

          {/* Alertas */}
          {selectedMed.info.alerta && (
            <div style={{ background: "var(--yellow-light)", border: "2px solid var(--yellow)", borderRadius: "14px", padding: "18px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "28px", flexShrink: 0 }}>💛</div>
              <div style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--gray-900)" }}>
                {selectedMed.info.alerta}
              </div>
            </div>
          )}

          {/* Rodízio (Insulina) */}
          {selectedMed.info.rodizio && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                 <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--yellow-light)", color: "var(--yellow-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                  🔄
                </div>
                <h2 style={{ fontSize: "18px", fontFamily: "'Poppins', sans-serif", fontWeight: 700, margin: 0, color: "var(--blue-dark)" }}>
                  Rodízio de Aplicação
                </h2>
              </div>
              <div style={{ background: "var(--gray-50)", border: "1px solid var(--gray-200)", borderRadius: "14px", padding: "20px" }}>
                <p style={{ fontSize: "14px", color: "var(--gray-700)", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                  Aplicar sempre no mesmo ponto causa <strong>lipodistrofia</strong> (endurecimento) que prejudica a absorção da insulina. Use o rodízio para garantir eficácia!
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ background: "var(--yellow)", color: "var(--blue-dark)", fontSize: "12px", fontWeight: 800, padding: "6px 12px", borderRadius: "8px" }}>Braços (parte externa)</div>
                  <div style={{ background: "var(--yellow)", color: "var(--blue-dark)", fontSize: "12px", fontWeight: 800, padding: "6px 12px", borderRadius: "8px" }}>Abdômen (lateral)</div>
                  <div style={{ background: "var(--yellow)", color: "var(--blue-dark)", fontSize: "12px", fontWeight: 800, padding: "6px 12px", borderRadius: "8px" }}>Coxas (frente/lateral)</div>
                  <div style={{ background: "var(--yellow)", color: "var(--blue-dark)", fontSize: "12px", fontWeight: 800, padding: "6px 12px", borderRadius: "8px" }}>Glúteos</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Lista Principal de Medicamentos (se não houver nenhum selecionado para ver o guia)
  return (
    <>
      <div className="card" style={{ border: "none", boxShadow: "none", padding: "0 0 16px 0", background: "transparent" }}>
        <div style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "16px", fontWeight: 800, marginBottom: "4px" }}>
          {registration?.role === "cuidador" ? `Farmacoterapia de ${registration.patientName}` : "Minha Farmacoterapia Digital"}
        </div>
        <div style={{ fontSize: "12px", color: "var(--gray-500)" }}>
          Aprenda mais sobre o seu tratamento.
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          {registration?.role === "cuidador" ? `💊 Medicamentos de ${registration.patientName}` : "💊 Meus Medicamentos"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {meds.map((med) => (
            <div
              key={med.id}
              className="med-item"
              style={{ flexDirection: "column", alignItems: "stretch", padding: "12px", border: "1px solid var(--gray-100)", transition: "all 0.2s", background: "var(--white)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="med-icon" style={{
                  background: med.info.categoria === "Injetável" ? "var(--blue-pale)" : "var(--gray-100)",
                  color: med.info.categoria === "Injetável" ? "var(--blue)" : "var(--gray-500)",
                  width: "44px", height: "44px"
                }}>
                  {med.info.categoria === "Injetável" ? "💉" : "💊"}
                </div>
                <div className="med-info" style={{ flex: 1 }}>
                  <div style={{ fontSize: "10px", fontWeight: 800, color: med.info.categoria === "Injetável" ? "var(--blue)" : "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>
                    {med.info.categoria}
                  </div>
                  <div className="med-name" style={{ fontSize: "14px" }}>{med.name}</div>
                  <div className="med-dose">{med.dosage}</div>
                </div>

                {/* Botão Saiba mais fica ao lado das informações básicas */}
                <button
                  className="btn btn-primary btn-sm"
                  style={{ padding: "8px 16px", fontSize: "11px", borderRadius: "30px", flexShrink: 0 }}
                  onClick={() => setExpandedId(med.id)}
                >
                  📖 Saiba mais
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid var(--gray-100)" }}>
                <div>
                  <div style={{ fontSize: "10px", color: "var(--gray-500)", fontWeight: 700, textTransform: "uppercase" }}>
                    {med.info.categoria === "Injetável" ? "Doses disponíveis (injetável)" : "Doses disponíveis (comprimidos)"}
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: med.stock > 0 ? "var(--green)" : "var(--red)" }}>
                    {getStockDescription(med)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

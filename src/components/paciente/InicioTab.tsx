import React, { useState } from "react";

export default function InicioTab() {
  const [medsDone, setMedsDone] = useState<Record<string, boolean>>({
    med1: true,
    med2: true,
    med3: false,
  });

  const toggleMed = (id: string) => {
    setMedsDone((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Adesão hoje */}
      <div className="card">
        <div className="card-title">📊 Adesão de Hoje</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div
            style={{
              fontFamily: "var(--font-sora), sans-serif",
              fontSize: "28px",
              fontWeight: 800,
              color: "var(--blue)",
            }}
          >
            67%
          </div>
          <div style={{ flex: 1 }}>
            <div className="progress-bar">
              <div className="progress-fill yellow" style={{ width: "67%" }}></div>
            </div>
            <div style={{ fontSize: "10px", color: "var(--gray-500)", marginTop: "4px" }}>
              2 de 3 tomados
            </div>
          </div>
        </div>
        <div className="alert-strip warning">⏰ Falta 1 medicamento do dia</div>
      </div>

      {/* Medicamentos */}
      <div className="card">
        <div className="card-title">💊 Medicamentos do Dia</div>
        <div className="med-item">
          <div className="med-icon" style={{ background: "#dbeafe" }}>
            💙
          </div>
          <div className="med-info">
            <div className="med-name">Metotrexato 25mg</div>
            <div className="med-dose">1 comp · 1x/semana · Manhã</div>
          </div>
          <div
            className={`med-check ${medsDone["med1"] ? "done" : ""}`}
            onClick={() => toggleMed("med1")}
          >
            {medsDone["med1"] ? "✓" : "○"}
          </div>
        </div>
        <div className="med-item">
          <div className="med-icon" style={{ background: "#dcfce7" }}>
            🟢
          </div>
          <div className="med-info">
            <div className="med-name">Ácido Fólico 5mg</div>
            <div className="med-dose">1 comp · Diário · Manhã</div>
          </div>
          <div
            className={`med-check ${medsDone["med2"] ? "done" : ""}`}
            onClick={() => toggleMed("med2")}
          >
            {medsDone["med2"] ? "✓" : "○"}
          </div>
        </div>
        <div className="med-item" style={{ borderColor: medsDone["med3"] ? "#86efac" : "#fde68a" }}>
          <div className="med-icon" style={{ background: "#fef3c7" }}>
            ⚠️
          </div>
          <div className="med-info">
            <div className="med-name">Adalimumabe 40mg</div>
            <div className="med-dose">Injeção subcutânea · Quinzenal</div>
          </div>
          <div
            className={`med-check ${medsDone["med3"] ? "done" : ""}`}
            onClick={() => toggleMed("med3")}
          >
            {medsDone["med3"] ? "✓" : "○"}
          </div>
        </div>
      </div>

      {/* Próxima consulta */}
      <div className="teleconsulta-card">
        <div className="tc-title">🎥 Próxima Teleconsulta</div>
        <div className="tc-next">Com Farm. Ana Beatriz</div>
        <div className="tc-time">Seg, 28 Abr · 14h</div>
        <button
          className="btn btn-yellow btn-sm"
          style={{ alignSelf: "flex-start", borderRadius: "8px" }}
        >
          Entrar na consulta
        </button>
      </div>

      {/* Guia do Medicamento */}
      <div className="guide-card">
        <div className="guide-title">📖 Guia do Medicamento</div>
        <div className="guide-sub">Metotrexato — entenda o seu tratamento</div>
        <button className="guide-btn">Ver guia interativo →</button>
      </div>

      {/* Chat */}
      <div className="card" style={{ border: "2px solid var(--blue-pale)" }}>
        <div className="card-title">💬 Chat com Farmacêutico</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div
            style={{
              background: "var(--gray-100)",
              borderRadius: "12px 12px 12px 2px",
              padding: "8px 12px",
              fontSize: "11px",
              maxWidth: "85%",
            }}
          >
            Olá Maria! Vi que você relatou náusea ontem. Está melhorando?
          </div>
          <div
            style={{
              background: "var(--blue)",
              color: "white",
              borderRadius: "12px 12px 2px 12px",
              padding: "8px 12px",
              fontSize: "11px",
              maxWidth: "85%",
              alignSelf: "flex-end",
            }}
          >
            Sim, melhorou bastante obrigada! 😊
          </div>
        </div>
        <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
          <input
            placeholder="Digite sua dúvida..."
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--gray-200)",
              fontSize: "11px",
              fontFamily: "var(--font-nunito), sans-serif",
            }}
          />
          <button className="btn btn-primary btn-sm">➤</button>
        </div>
      </div>

      {/* Histórico de adesão semanal */}
      <div className="card">
        <div className="card-title">📈 Adesão da Semana</div>
        <div className="mini-chart">
          <div className="bar" style={{ height: "60%", background: "var(--green)" }}></div>
          <div className="bar" style={{ height: "100%", background: "var(--green)" }}></div>
          <div className="bar" style={{ height: "80%", background: "var(--blue-light)" }}></div>
          <div className="bar" style={{ height: "100%", background: "var(--green)" }}></div>
          <div className="bar" style={{ height: "40%", background: "var(--yellow-dark)" }}></div>
          <div className="bar" style={{ height: "100%", background: "var(--green)" }}></div>
          <div className="bar" style={{ height: "67%", background: "var(--yellow-dark)" }}></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <span style={{ fontSize: "9px", color: "var(--gray-500)" }}>Seg</span>
          <span style={{ fontSize: "9px", color: "var(--gray-500)" }}>Ter</span>
          <span style={{ fontSize: "9px", color: "var(--gray-500)" }}>Qua</span>
          <span style={{ fontSize: "9px", color: "var(--gray-500)" }}>Qui</span>
          <span style={{ fontSize: "9px", color: "var(--gray-500)" }}>Sex</span>
          <span style={{ fontSize: "9px", color: "var(--gray-500)" }}>Sáb</span>
          <span style={{ fontSize: "9px", color: "var(--gray-500)" }}>Dom</span>
        </div>
      </div>

      {/* Efeitos adversos */}
      <div className="card">
        <div className="card-title">🚨 Relatar Efeito Adverso</div>
        <div style={{ fontSize: "11px", color: "var(--gray-500)", marginBottom: "10px" }}>
          Sentiu algo diferente? Avise o farmacêutico.
        </div>
        <div className="chip-row">
          <div className="chip">😴 Cansaço</div>
          <div className="chip">🤢 Náusea</div>
          <div className="chip">🔴 Dor</div>
          <div className="chip">😵 Tontura</div>
          <div className="chip">+ Outro</div>
        </div>
      </div>
    </>
  );
}

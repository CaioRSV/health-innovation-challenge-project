import React, { useState } from "react";
import { useAppStore } from "../store/AppStore";

export default function GestorView() {
  const { pacientes, farmaceuticosAtivos: farmaceuticos, setFarmaceuticosAtivos: setFarmaceuticos, candidatos, setCandidatos } = useAppStore();

  const [searchType, setSearchType] = useState<"paciente" | "farmaceutico">("paciente");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<{ type: "paciente" | "farmaceutico", data: any } | null>(null);

  const handleApprove = (candidato: any) => {
    setCandidatos(prev => prev.filter(c => c.id !== candidato.id));
    setFarmaceuticos(prev => [...prev, {
      id: candidato.id,
      nome: candidato.nome,
      crf: candidato.crf,
      farmacia: candidato.farmacia,
      avaliacao: "Novo",
      pacientes: 0
    }]);
  };

  const handleReject = (id: number) => {
    setCandidatos(prev => prev.filter(c => c.id !== id));
  };

  const filteredPacientes = pacientes.filter(p =>
    p.nome.toLowerCase().includes(searchQuery.toLowerCase()) || p.cpf.includes(searchQuery)
  );

  const filteredFarmaceuticos = farmaceuticos.filter(f =>
    f.nome.toLowerCase().includes(searchQuery.toLowerCase()) || f.crf.includes(searchQuery)
  );

  return (
    <div className="view active">
      <div
        className="hero-strip"
        style={{ background: "linear-gradient(135deg, var(--nav-bg) 0%, var(--blue) 100%)" }}
      >
        <div className="hero-title">
          Painel <span>Gestão CEAF</span> 🏛
        </div>
        <div className="hero-sub">
          Assistência Farmacêutica · Secretaria de Saúde de PE · Visão consolidada da plataforma em todo o estado
        </div>
        <div className="hero-tags">
          <div className="hero-tag">3.847 pacientes CEAF</div>
          <div className="hero-tag">Dados atualizados: hoje</div>
        </div>
      </div>

      <div className="app-shell" style={{ flexDirection: "column", gap: "24px" }}>
        {/* KPI Row & Lookup Table */}
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* KPI Row */}
          <div
            style={{
              flex: 2,
              minWidth: "400px",
              background: "var(--white)",
              borderRadius: "var(--radius)",
              padding: "24px",
              border: "1px solid var(--gray-100)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="panel-title">📈 Indicadores Populacionais — Abril 2026</div>
            <div className="dashboard-grid">
              <div className="kpi-card">
                <div className="kpi-num">3.847</div>
                <div className="kpi-label">Pacientes Ativos</div>
                <div className="kpi-delta">↑ +4,2% vs mar</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-num">84</div>
                <div className="kpi-label">Profissionais ativos</div>
                <div className="kpi-delta">↑ +2 vs mar</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-num" style={{ color: "var(--red)" }}>
                  312
                </div>
                <div className="kpi-label">Pacientes em risco</div>
                <div className="kpi-delta">↓ -8% vs mar</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-num">1.204</div>
                <div className="kpi-label">Teleconsultas/mês</div>
                <div className="kpi-delta">↑ +18% vs mar</div>
              </div>
            </div>
          </div>

          {/* Lookup Table */}
          <div
            style={{
              flex: "1 1 400px",
              background: "var(--white)",
              borderRadius: "var(--radius)",
              padding: "24px",
              border: "1px solid var(--gray-100)",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="panel-title">🔍 Consulta de Cadastros</div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <button
                className={`btn ${searchType === "paciente" ? "btn-primary" : "btn-outline"}`}
                style={{ flex: 1, padding: "8px", fontSize: "12px" }}
                onClick={() => setSearchType("paciente")}
              >
                Pacientes
              </button>
              <button
                className={`btn ${searchType === "farmaceutico" ? "btn-primary" : "btn-outline"}`}
                style={{ flex: 1, padding: "8px", fontSize: "12px" }}
                onClick={() => setSearchType("farmaceutico")}
              >
                Farmacêuticos
              </button>
            </div>

            <input
              type="text"
              placeholder={`Buscar por ${searchType === "paciente" ? "nome ou CPF" : "nome ou CRF"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid var(--gray-300)",
                background: "var(--white)",
                color: "var(--gray-900)",
                marginBottom: "16px",
                fontFamily: "inherit",
                fontSize: "13px",
                boxSizing: "border-box"
              }}
            />

            <div style={{ flex: 1, overflowY: "auto", maxHeight: "300px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {searchType === "paciente" ? (
                filteredPacientes.length > 0 ? (
                  filteredPacientes.map(p => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPerson({ type: "paciente", data: p })}
                      style={{ padding: "12px", border: "1px solid var(--gray-100)", borderRadius: "8px", background: "var(--gray-50)", cursor: "pointer", transition: "all 0.2s" }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--gray-800)" }}>{p.nome}</div>
                      <div style={{ fontSize: "11px", color: "var(--gray-500)", marginBottom: "6px" }}>CPF: {p.cpf}</div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        <span className={`badge ${p.status === "Ativo" ? "badge-green" : p.status === "Em Risco" ? "badge-yellow" : "badge-gray"}`}>{p.status}</span>
                        <span className={`badge ${p.risco === "Alto" ? "badge-red" : p.risco === "Médio" ? "badge-yellow" : "badge-blue"}`}>Risco {p.risco}</span>
                        <span className="badge" style={{ background: "var(--blue-pale)", color: "var(--blue-dark)" }}>{p.medicamento}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: "center", color: "var(--gray-500)", fontSize: "12px", padding: "20px" }}>Nenhum paciente encontrado.</div>
                )
              ) : (
                filteredFarmaceuticos.length > 0 ? (
                  filteredFarmaceuticos.map(f => (
                    <div
                      key={f.id}
                      onClick={() => setSelectedPerson({ type: "farmaceutico", data: f })}
                      style={{ padding: "12px", border: "1px solid var(--gray-100)", borderRadius: "8px", background: "var(--gray-50)", cursor: "pointer", transition: "all 0.2s" }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--gray-800)" }}>{f.nome}</div>
                      <div style={{ fontSize: "11px", color: "var(--gray-500)", marginBottom: "6px" }}>CRF: {f.crf}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px", color: "var(--gray-700)" }}>
                        <div>🏥 <strong>Farmácia:</strong> {f.farmacia}</div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>👥 <strong>Pacientes:</strong> {f.pacientes}</span>
                          <span>⭐ <strong>{f.avaliacao}</strong></span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: "center", color: "var(--gray-500)", fontSize: "12px", padding: "20px" }}>Nenhum farmacêutico encontrado.</div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Análise de Currículos */}
        <div style={{
          background: "var(--white)",
          borderRadius: "var(--radius)",
          padding: "24px",
          border: "1px solid var(--gray-100)",
          boxShadow: "var(--shadow-sm)",
        }}>
          <div className="panel-title">📋 Análise de Novos Currículos (Farmacêuticos)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {candidatos.length > 0 ? candidatos.map(cand => (
              <div key={cand.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px", background: "var(--gray-50)", borderRadius: "8px", border: "1px solid var(--gray-100)",
                flexWrap: "wrap", gap: "16px"
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--gray-800)" }}>{cand.nome}</div>
                  <div style={{ fontSize: "12px", color: "var(--gray-500)", marginBottom: "4px" }}>CRF: {cand.crf} | {cand.farmacia}</div>
                  <div style={{ fontSize: "13px", color: "var(--gray-700)" }}>🎓 {cand.formacao}</div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="btn btn-outline" style={{ borderColor: "var(--red)", color: "var(--red)" }} onClick={() => handleReject(cand.id)}>Rejeitar</button>
                  <button className="btn btn-primary" style={{ background: "var(--green)", borderColor: "var(--green)" }} onClick={() => handleApprove(cand)}>Aprovar</button>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: "center", color: "var(--gray-500)", padding: "20px", fontSize: "14px" }}>Nenhum currículo pendente para análise.</div>
            )}
          </div>
        </div>
      </div>

      {selectedPerson && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }} onClick={() => setSelectedPerson(null)}>
          <div style={{
            background: "var(--white)",
            borderRadius: "var(--radius)",
            padding: "24px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "var(--shadow-lg)",
            position: "relative"
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPerson(null)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "var(--gray-400)", lineHeight: 1 }}
            >
              ×
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: selectedPerson.type === "paciente" ? "var(--blue-pale)" : "var(--green-pale, #dcfce7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                overflow: "hidden",
                border: `2px solid ${selectedPerson.type === "paciente" ? "var(--blue)" : "var(--green)"}`
              }}>
                {selectedPerson.type === "paciente" ? "👤" : "⚕️"}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", color: "var(--gray-800)" }}>{selectedPerson.data.nome}</h3>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--gray-500)" }}>
                  {selectedPerson.type === "paciente" ? `CPF: ${selectedPerson.data.cpf}` : `CRF: ${selectedPerson.data.crf}`}
                </p>
              </div>
            </div>

            {selectedPerson.type === "paciente" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "8px 0", borderBottom: "1px solid var(--gray-50)" }}>
                  <span style={{ color: "var(--gray-500)" }}>Status</span>
                  <span className={`badge ${selectedPerson.data.status === "Ativo" ? "badge-green" : selectedPerson.data.status === "Em Risco" ? "badge-yellow" : "badge-gray"}`}>{selectedPerson.data.status}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "8px 0", borderBottom: "1px solid var(--gray-50)" }}>
                  <span style={{ color: "var(--gray-500)" }}>Risco Clínico</span>
                  <span className={`badge ${selectedPerson.data.risco === "Alto" ? "badge-red" : selectedPerson.data.risco === "Médio" ? "badge-yellow" : "badge-blue"}`}>{selectedPerson.data.risco}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "8px 0" }}>
                  <span style={{ color: "var(--gray-500)" }}>Medicamento CEAF</span>
                  <span style={{ fontWeight: 600, color: "var(--blue-dark)" }}>{selectedPerson.data.medicamento}</span>
                </div>

                <div style={{ marginTop: "12px", padding: "16px", background: "var(--gray-50)", borderRadius: "8px" }}>
                  <div style={{ fontSize: "12px", color: "var(--gray-500)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700 }}>Métricas Recentes</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                    <div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-800)" }}>85%</div>
                      <div style={{ fontSize: "11px", color: "var(--gray-500)" }}>Adesão Estimada</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-800)" }}>Há 12 dias</div>
                      <div style={{ fontSize: "11px", color: "var(--gray-500)" }}>Última Retirada</div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" style={{ marginTop: "8px", width: "100%" }}>
                  Ver Prontuário Completo
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "8px 0", borderBottom: "1px solid var(--gray-50)" }}>
                  <span style={{ color: "var(--gray-500)" }}>Farmácia</span>
                  <span style={{ fontWeight: 600 }}>{selectedPerson.data.farmacia}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "8px 0", borderBottom: "1px solid var(--gray-50)" }}>
                  <span style={{ color: "var(--gray-500)" }}>Pacientes Vinculados</span>
                  <span style={{ fontWeight: 600, color: "var(--blue)" }}>{selectedPerson.data.pacientes} pacientes</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "8px 0" }}>
                  <span style={{ color: "var(--gray-500)" }}>Avaliação Média</span>
                  <span style={{ fontWeight: 600, color: "var(--yellow-dark)" }}>⭐ {selectedPerson.data.avaliacao}</span>
                </div>

                <div style={{ marginTop: "12px", padding: "16px", background: "var(--gray-50)", borderRadius: "8px" }}>
                  <div style={{ fontSize: "12px", color: "var(--gray-500)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700 }}>Especialidade & Engajamento</div>
                  <div style={{ fontSize: "13px", color: "var(--gray-800)", marginTop: "4px" }}>
                    Especialista em Cuidado CEAF e Farmácia Clínica. Alta taxa de resolução de interações medicamentosas.
                  </div>
                </div>
                <button className="btn btn-primary" style={{ marginTop: "8px", width: "100%" }}>
                  Ver Relatório de Atendimentos
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

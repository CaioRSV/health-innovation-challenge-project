import React, { useState } from "react";

const MOCK_PACIENTES = [
  { id: 1, nome: "João Silva", cpf: "111.222.333-44", status: "Ativo", medicamento: "Adalimumabe", risco: "Alto" },
  { id: 2, nome: "Maria Oliveira", cpf: "555.666.777-88", status: "Em Risco", medicamento: "Infliximabe", risco: "Médio" },
  { id: 3, nome: "Carlos Santos", cpf: "999.000.111-22", status: "Ativo", medicamento: "Etanercepte", risco: "Baixo" },
];

const MOCK_FARMACEUTICOS = [
  { id: 1, nome: "Dra. Ana Costa", crf: "1234/PE", farmacia: "Farmácia Central", avaliacao: "4.9/5", pacientes: 124 },
  { id: 2, nome: "Dr. Pedro Alves", crf: "5678/PE", farmacia: "Farmácia Zona Sul", avaliacao: "4.7/5", pacientes: 89 },
  { id: 3, nome: "Dra. Júlia Lima", crf: "9012/PE", farmacia: "Farmácia Metropolitana", avaliacao: "4.8/5", pacientes: 156 },
];

export default function GestorView() {
  const [searchType, setSearchType] = useState<"paciente" | "farmaceutico">("paciente");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<{ type: "paciente" | "farmaceutico", data: any } | null>(null);

  const filteredPacientes = MOCK_PACIENTES.filter(p =>
    p.nome.toLowerCase().includes(searchQuery.toLowerCase()) || p.cpf.includes(searchQuery)
  );

  const filteredFarmaceuticos = MOCK_FARMACEUTICOS.filter(f =>
    f.nome.toLowerCase().includes(searchQuery.toLowerCase()) || f.crf.includes(searchQuery)
  );

  return (
    <div className="view active">
      <div
        className="hero-strip"
        style={{ background: "linear-gradient(135deg, #1a3f72 0%, #28599c 60%, #4a7ec4 100%)" }}
      >
        <div className="hero-title">
          Painel <span>Gestão CEAF</span> 🏛
        </div>
        <div className="hero-sub">
          Assistência Farmacêutica · Secretaria de Saúde de PE · Visão consolidada da plataforma em todo o estado
        </div>
        <div className="hero-tags">
          <div className="hero-tag">12 farmácias integradas</div>
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
              background: "white",
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
              background: "white",
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

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {/* Risco */}
          <div className="panel-card" style={{ minWidth: "300px", flex: 1 }}>
            <div className="panel-title">🔴 Matriz de Risco</div>
            <div className="risk-row" style={{ background: "var(--red-light)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div className="risk-indicator" style={{ background: "var(--red)" }}></div>
                <span>Clínico (teleconsulta, alertas)</span>
              </div>
              <div className="badge badge-red">Alto</div>
            </div>
            <div className="risk-row" style={{ background: "var(--red-light)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div className="risk-indicator" style={{ background: "var(--red)" }}></div>
                <span>Dados (LGPD / privacidade)</span>
              </div>
              <div className="badge badge-red">Alto</div>
            </div>
            <div className="risk-row" style={{ background: "#fffbeb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div className="risk-indicator" style={{ background: "var(--yellow-dark)" }}></div>
                <span>Tecnológico (infraestrutura)</span>
              </div>
              <div className="badge badge-yellow">Médio</div>
            </div>
            <div className="risk-row" style={{ background: "#fffbeb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div className="risk-indicator" style={{ background: "var(--yellow-dark)" }}></div>
                <span>Uso do paciente (letramento)</span>
              </div>
              <div className="badge badge-yellow">Médio</div>
            </div>
            <div className="risk-row" style={{ background: "#fffbeb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div className="risk-indicator" style={{ background: "var(--yellow-dark)" }}></div>
                <span>Institucional (integração)</span>
              </div>
              <div className="badge badge-yellow">Médio</div>
            </div>
            <div
              style={{
                marginTop: "12px",
                padding: "10px",
                background: "var(--blue-pale)",
                borderRadius: "8px",
                fontSize: "11px",
                color: "var(--blue-dark)",
                lineHeight: 1.5,
              }}
            >
              <strong>Mitigações ativas:</strong> criptografia LGPD, autenticação segura, rastreabilidade
              de acessos e controle de permissões por perfil.
            </div>
          </div>

          {/* Monetização / Orçamento */}
          <div className="panel-card" style={{ minWidth: "300px", flex: 1 }}>
            <div className="panel-title">💰 Modelo de Negócio</div>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dbeafe" }}>
                  📜
                </div>
                <div>
                  <div className="feat-title">Licitação por Inexigibilidade</div>
                  <div className="feat-desc">Solução exclusiva para o SUS-PE. Contratação direta com a Secretaria de Saúde.</div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dcfce7" }}>
                  💊
                </div>
                <div>
                  <div className="feat-title">Redução de desperdício CEAF</div>
                  <div className="feat-desc">Menos medicamentos não retirados = retorno financeiro indireto ao estado.</div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#fef3c7" }}>
                  🏥
                </div>
                <div>
                  <div className="feat-title">Menos internações</div>
                  <div className="feat-desc">Maior adesão → menos complicações clínicas → menos custos hospitalares.</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "14px" }}>
              <div className="section-label">Orçamento estimado</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "6px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    padding: "8px 12px",
                    background: "var(--gray-50)",
                    borderRadius: "8px",
                    border: "1px solid var(--gray-100)",
                  }}
                >
                  <span style={{ fontWeight: 700 }}>App + Web</span>
                  <span style={{ color: "var(--blue)", fontWeight: 800 }}>R$ 300k – 600k</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    padding: "8px 12px",
                    background: "var(--gray-50)",
                    borderRadius: "8px",
                    border: "1px solid var(--gray-100)",
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Integração sistemas</span>
                  <span style={{ color: "var(--blue)", fontWeight: 800 }}>R$ 100k – 300k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Backlog status */}
          <div className="panel-card" style={{ minWidth: "300px", flex: 1 }}>
            <div className="panel-title">📋 Status do Backlog</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  <span>🔴 Must Have (MVP)</span>
                  <span style={{ color: "var(--green)" }}>7/9</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill green" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  <span>🔵 Should Have</span>
                  <span style={{ color: "var(--blue)" }}>3/6</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "50%" }}></div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  <span>🟢 Could Have</span>
                  <span style={{ color: "var(--gray-500)" }}>1/5</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill yellow" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  <span>🟣 Won't Have (v1)</span>
                  <span style={{ color: "var(--gray-300)" }}>—</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "0%" }}></div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <div className="section-label">Won't have — v1</div>
              <div className="chip-row" style={{ marginTop: "8px" }}>
                <div className="chip" style={{ background: "#fce7f3", color: "#9d174d" }}>
                  IA Avançada
                </div>
                <div className="chip" style={{ background: "#fce7f3", color: "#9d174d" }}>
                  Big Data
                </div>
                <div className="chip" style={{ background: "#fce7f3", color: "#9d174d" }}>
                  Integração Nacional
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swimlane description */}
        <div className="panel-card">
          <div className="panel-title">🔄 Fluxo TO-BE — Cuidado não termina na dispensação</div>
          <div style={{ display: "flex", gap: "0", overflowX: "auto", paddingBottom: "8px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "120px", padding: "0 12px" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--blue-pale)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--blue)" }}>👤</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-700)" }}>Cadastro</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)" }}>Integrado ao sistema estadual</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px" }}>→</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "120px", padding: "0 12px" }}>
              <div style={{ width: "44px", height: "44px", background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--green)" }}>🧑‍⚕️</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-700)" }}>1ª Consulta</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)" }}>Farmacêutico + paciente</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px" }}>→</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "120px", padding: "0 12px" }}>
              <div style={{ width: "44px", height: "44px", background: "#fef3c7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--yellow-dark)" }}>💊</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-700)" }}>Dispensação</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)" }}>Mensal CEAF</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px" }}>→</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "120px", padding: "0 12px" }}>
              <div style={{ width: "44px", height: "44px", background: "#ffe4e6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--red)" }}>📱</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-700)" }}>Monitoramento</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)" }}>Lembretes + adesão</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px" }}>→</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "120px", padding: "0 12px" }}>
              <div style={{ width: "44px", height: "44px", background: "#f3e8ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid #7c3aed" }}>🚨</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-700)" }}>Alertas</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)" }}>Intervenção precoce</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px" }}>→</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "120px", padding: "0 12px" }}>
              <div style={{ width: "44px", height: "44px", background: "#dbeafe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--blue)" }}>📖</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-700)" }}>Educação</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)" }}>Guia do medicamento</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px" }}>→</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "120px", padding: "0 12px" }}>
              <div style={{ width: "44px", height: "44px", background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--green)" }}>🎥</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-700)" }}>Teleconsulta</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)" }}>Seguimento contínuo</div>
            </div>
          </div>
          <div
            style={{
              marginTop: "16px",
              padding: "12px 16px",
              background: "linear-gradient(135deg, var(--blue-pale), #f0fdf4)",
              borderRadius: "10px",
              border: "1px solid #bfdbfe",
            }}
          >
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--blue-dark)",
              }}
            >
              ⭐ Diferencial:
            </span>
            <span style={{ fontSize: "12px", color: "var(--gray-700)" }}>
              {" "}
              O cuidado não termina na dispensação. A plataforma integra <strong>dispensação + acompanhamento clínico + educação em saúde</strong> em um único ecossistema.
            </span>
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
            background: "white",
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

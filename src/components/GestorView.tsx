import React from "react";

export default function GestorView() {
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
        {/* KPI Row */}
        <div
          style={{
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
              <div className="kpi-label">Pacientes ativos CEAF</div>
              <div className="kpi-delta">↑ +4,2% vs mar</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-num">81%</div>
              <div className="kpi-label">Taxa de adesão geral</div>
              <div className="kpi-delta">↑ +6pp vs mar</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-num" style={{ color: "var(--green)" }}>
                R$240k
              </div>
              <div className="kpi-label">Redução desperdício</div>
              <div className="kpi-delta">↑ acumulado 2026</div>
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
            <div className="kpi-card">
              <div className="kpi-num" style={{ color: "var(--green)" }}>
                -23%
              </div>
              <div className="kpi-label">Atend. presencial evitado</div>
              <div className="kpi-delta">Impacto digital</div>
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
    </div>
  );
}

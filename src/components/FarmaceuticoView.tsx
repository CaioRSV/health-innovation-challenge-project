import React, { useState } from "react";

export default function FarmaceuticoView() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="view active">
      <div className="hero-strip" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1a3f72 100%)" }}>
        <div className="hero-title">
          Dashboard — <span>Farm. Ana Beatriz</span> 🩺
        </div>
        <div className="hero-sub">Farmácia Metropolitana · CEAF Pernambuco · Turno: Manhã 07h–13h</div>
        <div className="hero-tags">
          <div className="hero-tag">48 pacientes ativos</div>
          <div className="hero-tag">⚠️ 3 alertas críticos</div>
          <div className="hero-tag">📅 2 consultas hoje</div>
        </div>
      </div>

      <div className="app-shell">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {!isFullscreen && (
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => setIsFullscreen(true)}
              style={{ alignSelf: "flex-start", zIndex: 10 }}
            >
              📱 Modo Mobile
            </button>
          )}
          <div className={`phone-frame ${isFullscreen ? 'fullscreen' : ''}`}>
          <div className="phone-notch">
            <div className="phone-notch" style={{ margin: 0 }}>
              <div className="notch-speaker"></div>
              <div className="notch-cam"></div>
            </div>
          </div>
          <div className="phone-screen">
            <div
              className="screen-header"
              style={{ background: "linear-gradient(135deg, var(--blue-dark), #1a3f72)" }}
            >
              <div className="screen-status">
                <span>09:41</span>
                <div className="status-icons">
                  {isFullscreen && (
                    <span 
                      style={{ cursor: "pointer", marginRight: "8px", fontSize: "14px", color: "white" }} 
                      onClick={() => setIsFullscreen(false)}
                      title="Sair do Modo Mobile"
                    >
                      ↙️
                    </span>
                  )}
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>
              <div className="screen-title">Meus Pacientes</div>
              <div className="screen-subtitle">48 ativos · 3 alertas críticos</div>
            </div>

            <div className="screen-body">
              {/* KPIs */}
              <div className="stats-row">
                <div className="stat-box">
                  <div className="stat-num" style={{ color: "var(--green)" }}>
                    82%
                  </div>
                  <div className="stat-label">Adesão média</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num" style={{ color: "var(--red)" }}>
                    5
                  </div>
                  <div className="stat-label">Em risco</div>
                </div>
              </div>

              {/* Alertas críticos */}
              <div className="card" style={{ border: "1px solid #fca5a5" }}>
                <div className="card-title">🚨 Alertas Clínicos</div>
                <div className="alert-patient red">
                  <div>
                    <div className="ap-name">Carlos M., 58a</div>
                    <div className="ap-reason">Não retirou medicamento há 45 dias</div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <div className="badge badge-red">Crítico</div>
                  </div>
                </div>
                <div className="alert-patient yellow">
                  <div>
                    <div className="ap-name">Ana P., 63a</div>
                    <div className="ap-reason">Relatou efeito adverso grave ontem</div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <div className="badge badge-yellow">Atenção</div>
                  </div>
                </div>
                <div className="alert-patient yellow">
                  <div>
                    <div className="ap-name">João S., 72a</div>
                    <div className="ap-reason">Adesão: 40% esta semana</div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <div className="badge badge-yellow">Atenção</div>
                  </div>
                </div>
              </div>

              {/* Lista de pacientes */}
              <div className="card">
                <div className="card-title">👥 Pacientes Recentes</div>
                <div className="patient-item">
                  <div className="avatar" style={{ background: "var(--blue)" }}>
                    MS
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", fontWeight: 700 }}>Maria Silva, 51a</div>
                    <div style={{ fontSize: "10px", color: "var(--gray-500)" }}>
                      Artrite Reumatoide · Metotrexato
                    </div>
                  </div>
                  <div>
                    <div className="badge badge-green">92%</div>
                  </div>
                </div>
                <div className="patient-item">
                  <div className="avatar" style={{ background: "#7c3aed" }}>
                    RT
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", fontWeight: 700 }}>Roberto T., 66a</div>
                    <div style={{ fontSize: "10px", color: "var(--gray-500)" }}>
                      Diabetes T2 · Insulina Glargina
                    </div>
                  </div>
                  <div>
                    <div className="badge badge-yellow">71%</div>
                  </div>
                </div>
                <div className="patient-item">
                  <div className="avatar" style={{ background: "#dc2626" }}>
                    LF
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", fontWeight: 700 }}>Luísa F., 44a</div>
                    <div style={{ fontSize: "10px", color: "var(--gray-500)" }}>
                      Esclerose Múltipla · Interferon
                    </div>
                  </div>
                  <div>
                    <div className="badge badge-red">38%</div>
                  </div>
                </div>
              </div>

              {/* Agenda */}
              <div className="card">
                <div className="card-title">📅 Agenda de Hoje</div>
                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: "var(--blue-pale)" }}>
                    🎥
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">Teleconsulta — Maria Silva</div>
                    <div className="timeline-desc">Revisão farmacoterapêutica mensal</div>
                    <div className="timeline-time">14h00 · 30 min</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: "#dcfce7" }}>
                    💬
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">Consulta presencial — João S.</div>
                    <div className="timeline-desc">1ª dispensação Adalimumabe</div>
                    <div className="timeline-time">16h30 · 45 min</div>
                  </div>
                </div>
              </div>

              {/* Intervenções */}
              <div className="card">
                <div className="card-title">📝 Prontuário Farmacêutico</div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--gray-700)",
                    marginBottom: "6px",
                  }}
                >
                  Maria Silva — Última intervenção
                </div>
                <div
                  style={{
                    background: "var(--gray-50)",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "11px",
                    color: "var(--gray-700)",
                    lineHeight: 1.5,
                    border: "1px solid var(--gray-100)",
                  }}
                >
                  Paciente relatou náusea após uso do MTX. Orientada a tomar após refeição. Reforçada
                  importância do ácido fólico. Adesão boa (92%). Sem alteração de conduta.
                </div>
                <button className="btn btn-outline btn-sm btn-full" style={{ marginTop: "10px" }}>
                  + Nova Intervenção
                </button>
              </div>

              {/* Adesão geral */}
              <div className="card">
                <div className="card-title">📊 Adesão da Carteira</div>
                <div className="mini-chart">
                  <div className="bar" style={{ height: "75%", background: "var(--blue-light)" }}></div>
                  <div className="bar" style={{ height: "88%", background: "var(--green)" }}></div>
                  <div className="bar" style={{ height: "82%", background: "var(--green)" }}></div>
                  <div className="bar" style={{ height: "65%", background: "var(--yellow-dark)" }}></div>
                  <div className="bar" style={{ height: "90%", background: "var(--green)" }}></div>
                  <div className="bar" style={{ height: "78%", background: "var(--blue-light)" }}></div>
                  <div className="bar" style={{ height: "82%", background: "var(--green)" }}></div>
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
            </div>

            <div className="bottom-nav">
              <div className="nav-item active">
                <div className="nav-icon">🏠</div>
                <div className="nav-label">Início</div>
                <div className="nav-dot"></div>
              </div>
              <div className="nav-item">
                <div className="nav-icon">👥</div>
                <div className="nav-label">Pacientes</div>
              </div>
              <div className="nav-item">
                <div className="nav-icon">📅</div>
                <div className="nav-label">Agenda</div>
              </div>
              <div className="nav-item">
                <div className="nav-icon">🚨</div>
                <div className="nav-label">Alertas</div>
              </div>
              <div className="nav-item">
                <div className="nav-icon">📋</div>
                <div className="nav-label">Prontuário</div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Side */}
        <div className="side-panel">
          <div className="panel-card">
            <div className="panel-title">🩺 Funcionalidades do Farmacêutico</div>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#ffe4e6" }}>
                  🚨
                </div>
                <div>
                  <div className="feat-title">Alertas Clínicos Automáticos</div>
                  <div className="feat-desc">
                    Notificações por baixa adesão, falta de retirada, relato de efeito adverso e intervalo
                    irregular
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dbeafe" }}>
                  📊
                </div>
                <div>
                  <div className="feat-title">Dashboard do Farmacêutico</div>
                  <div className="feat-desc">
                    Indicadores de adesão, pacientes de risco e intervenções realizadas em tempo real
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dcfce7" }}>
                  📋
                </div>
                <div>
                  <div className="feat-title">Prontuário Farmacêutico Digital</div>
                  <div className="feat-desc">
                    Evolução clínica, intervenções e histórico de atendimento por paciente (SOAP)
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#fef3c7" }}>
                  📅
                </div>
                <div>
                  <div className="feat-title">Agenda de Teleconsultas</div>
                  <div className="feat-desc">
                    Gestão de horários, confirmação automática e integração com videochamada nativa
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#f3e8ff" }}>
                  💊
                </div>
                <div>
                  <div className="feat-title">Visualização da Farmacoterapia</div>
                  <div className="feat-desc">
                    Lista completa do paciente com posologia, histórico de dispensação e aderência
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dbeafe" }}>
                  🚚
                </div>
                <div>
                  <div className="feat-title">Status de Dispensação</div>
                  <div className="feat-desc">
                    Acompanhamento das retiradas mensais e renovações de receita por paciente
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-title">🔗 Interoperabilidade</div>
            <div className="int-tag">🏥 Sistema Hórus / GAAP (Pernambuco)</div>
            <div className="int-tag">🆔 Farmácia Digital PE</div>
            <div className="int-tag">📋 RNDS (Rede Nacional de Dados em Saúde)</div>
            <div className="int-tag">📱 Meu SUS Digital</div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--gray-500)",
                marginTop: "8px",
                lineHeight: 1.5,
              }}
            >
              Dados sincronizados automaticamente. Nenhum cadastro duplo — o farmacêutico vê tudo em um
              só lugar.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

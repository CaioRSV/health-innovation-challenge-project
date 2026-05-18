import React, { useState } from "react";

export default function FarmaceuticoView() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("inicio");

  // Mocks based on PacienteView data
  const mariaMeds = [
    { name: "Sinvastatina", dose: "20mg · Oral", freq: "Uso Diário" },
    { name: "AAS Protect", dose: "100mg · Oral", freq: "Uso Diário" }
  ];

  const renderInicio = () => (
    <>
      {/* KPIs */}
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-num" style={{ color: "var(--green)" }}>82%</div>
          <div className="stat-label">Adesão média</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: "var(--red)" }}>5</div>
          <div className="stat-label">Em risco</div>
        </div>
      </div>

      {/* Alertas Rápidos */}
      <div className="card" style={{ border: "1px solid #fca5a5" }}>
        <div className="card-title">🚨 Alertas Recentes</div>
        <div className="alert-patient yellow">
          <div>
            <div className="ap-name">Maria Silva, 51a</div>
            <div className="ap-reason">Relato de Náusea via IA Tira-Dúvidas</div>
          </div>
          <div style={{ marginLeft: "auto" }}><div className="badge badge-yellow">Atenção</div></div>
        </div>
        <div className="alert-patient red">
          <div>
            <div className="ap-name">Carlos M., 58a</div>
            <div className="ap-reason">Não retirou CEAF há 45 dias</div>
          </div>
          <div style={{ marginLeft: "auto" }}><div className="badge badge-red">Crítico</div></div>
        </div>
      </div>

      {/* Agenda Resumo */}
      <div className="card">
        <div className="card-title">📅 Próximos Atendimentos</div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: "var(--blue-pale)" }}>🎥</div>
          <div className="timeline-content">
            <div className="timeline-title">Teleconsulta — Maria Silva</div>
            <div className="timeline-time">Hoje · 14h00</div>
          </div>
        </div>
      </div>
    </>
  );

  const renderPacientes = () => (
    <>
      <div style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
        <input type="text" placeholder="Buscar paciente por nome ou CPF..." style={{ flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--gray-200)", fontSize: "12px" }} />
      </div>
      <div className="card">
        <div className="card-title">👥 Meus Pacientes Ativos</div>
        <div className="patient-item" onClick={() => setActiveTab("prontuario")} style={{ cursor: "pointer", border: "1px solid var(--blue-pale)", background: "var(--gray-50)" }}>
          <div className="avatar" style={{ background: "transparent", fontSize: "24px" }}>👩🏽‍🦱</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--blue-dark)" }}>Maria Silva, 51a</div>
            <div style={{ fontSize: "10px", color: "var(--gray-500)" }}>Dislipidemia · Prevenção Secundária</div>
          </div>
          <div><div className="badge badge-green">100% Adesão Hoje</div></div>
        </div>
        <div className="patient-item">
          <div className="avatar" style={{ background: "#7c3aed" }}>RT</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", fontWeight: 700 }}>Roberto T., 66a</div>
            <div style={{ fontSize: "10px", color: "var(--gray-500)" }}>Diabetes T2 · Insulina Glargina</div>
          </div>
          <div><div className="badge badge-yellow">71%</div></div>
        </div>
        <div className="patient-item">
          <div className="avatar" style={{ background: "#dc2626" }}>LF</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", fontWeight: 700 }}>Luísa F., 44a</div>
            <div style={{ fontSize: "10px", color: "var(--gray-500)" }}>Esclerose Múltipla · Interferon</div>
          </div>
          <div><div className="badge badge-red">38%</div></div>
        </div>
      </div>
    </>
  );

  const renderAgenda = () => (
    <>
      <div className="card">
        <div className="card-title">📅 Agenda — Segunda, 28 Abr</div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: "var(--blue-pale)" }}>🎥</div>
          <div className="timeline-content">
            <div className="timeline-title">Teleconsulta — Maria Silva</div>
            <div className="timeline-desc">Acompanhamento e ajuste de rotina CEAF</div>
            <div className="timeline-time">14h00 · 30 min</div>
            <button className="btn btn-primary btn-sm" style={{ marginTop: "8px" }}>Iniciar Videochamada</button>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: "#dcfce7" }}>💬</div>
          <div className="timeline-content">
            <div className="timeline-title">Consulta Presencial — João S.</div>
            <div className="timeline-desc">1ª dispensação Adalimumabe</div>
            <div className="timeline-time">16h30 · 45 min</div>
          </div>
        </div>
      </div>
    </>
  );

  const renderAlertas = () => (
    <>
      <div className="card">
        <div className="card-title">🚨 Central de Alertas</div>
        <div style={{ fontSize: "11px", color: "var(--gray-500)", marginBottom: "12px" }}>Alertas gerados automaticamente pelo sistema e pelo Tira-Dúvidas IA.</div>
        
        <div className="alert-patient yellow">
          <div>
            <div className="ap-name">Maria Silva 👩🏽‍🦱</div>
            <div className="ap-reason"><b>Tira-Dúvidas IA:</b> Paciente relatou sentir náuseas pela manhã, questionando possível efeito adverso.</div>
          </div>
          <div style={{ marginLeft: "auto" }}><div className="badge badge-yellow">IA Report</div></div>
        </div>

        <div className="alert-patient red">
          <div>
            <div className="ap-name">Carlos M., 58a</div>
            <div className="ap-reason"><b>Sistema:</b> Paciente não compareceu para retirar medicamento CEAF há 45 dias.</div>
          </div>
          <div style={{ marginLeft: "auto" }}><div className="badge badge-red">Adesão Crítica</div></div>
        </div>
      </div>
    </>
  );

  const renderProntuario = () => (
    <>
      <div className="card" style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--blue-pale)", border: "none" }}>
        <div style={{ fontSize: "32px" }}>👩🏽‍🦱</div>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--blue-dark)" }}>Maria Silva</div>
          <div style={{ fontSize: "11px", color: "var(--gray-600)" }}>51 anos · CEAF Ativo · Adesão: 100%</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">💊 Farmacoterapia Atual</div>
        {mariaMeds.map(med => (
          <div key={med.name} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--gray-100)", padding: "8px 0" }}>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700 }}>{med.name}</div>
              <div style={{ fontSize: "10px", color: "var(--gray-500)" }}>{med.dose}</div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--blue)", display: "flex", alignItems: "center" }}>
              {med.freq}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">📝 Evolução Farmacêutica (SOAP)</div>
        <div style={{ background: "var(--gray-50)", borderRadius: "8px", padding: "10px", fontSize: "11px", color: "var(--gray-700)", lineHeight: 1.5, border: "1px solid var(--gray-100)" }}>
          <b style={{ color: "var(--blue-dark)" }}>S:</b> Paciente relatou náusea via Tira-Dúvidas IA.<br/>
          <b style={{ color: "var(--blue-dark)" }}>O:</b> Adesão reportada de 100% no app.<br/>
          <b style={{ color: "var(--blue-dark)" }}>A:</b> Possível efeito adverso leve comum no início do tratamento.<br/>
          <b style={{ color: "var(--blue-dark)" }}>P:</b> Teleconsulta agendada para acompanhar e orientar sobre ingestão junto às refeições.
        </div>
        <button className="btn btn-outline btn-sm btn-full" style={{ marginTop: "10px" }}>+ Nova Evolução</button>
      </div>
    </>
  );

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
              <div className="screen-title">
                {activeTab === "inicio" ? "Painel Geral" : 
                 activeTab === "pacientes" ? "Meus Pacientes" :
                 activeTab === "agenda" ? "Agenda" :
                 activeTab === "alertas" ? "Alertas Clínicos" : "Prontuário"}
              </div>
              <div className="screen-subtitle">Farm. Ana Beatriz</div>
            </div>

            <div className="screen-body">
              <div key={activeTab} className="tab-content">
                {activeTab === "inicio" && renderInicio()}
                {activeTab === "pacientes" && renderPacientes()}
                {activeTab === "agenda" && renderAgenda()}
                {activeTab === "alertas" && renderAlertas()}
                {activeTab === "prontuario" && renderProntuario()}
              </div>
            </div>

            <div className="bottom-nav">
              <div className={`nav-item ${activeTab === "inicio" ? "active" : ""}`} onClick={() => setActiveTab("inicio")}>
                <div className="nav-icon">🏠</div>
                <div className="nav-label">Início</div>
                {activeTab === "inicio" && <div className="nav-dot"></div>}
              </div>
              <div className={`nav-item ${activeTab === "pacientes" ? "active" : ""}`} onClick={() => setActiveTab("pacientes")}>
                <div className="nav-icon">👥</div>
                <div className="nav-label">Pacientes</div>
                {activeTab === "pacientes" && <div className="nav-dot"></div>}
              </div>
              <div className={`nav-item ${activeTab === "agenda" ? "active" : ""}`} onClick={() => setActiveTab("agenda")}>
                <div className="nav-icon">📅</div>
                <div className="nav-label">Agenda</div>
                {activeTab === "agenda" && <div className="nav-dot"></div>}
              </div>
              <div className={`nav-item ${activeTab === "alertas" ? "active" : ""}`} onClick={() => setActiveTab("alertas")}>
                <div className="nav-icon">🚨</div>
                <div className="nav-label">Alertas</div>
                {activeTab === "alertas" && <div className="nav-dot"></div>}
              </div>
              <div className={`nav-item ${activeTab === "prontuario" ? "active" : ""}`} onClick={() => setActiveTab("prontuario")}>
                <div className="nav-icon">📋</div>
                <div className="nav-label">Prontuário</div>
                {activeTab === "prontuario" && <div className="nav-dot"></div>}
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

"use client";

import React from "react";

export default function ProjetoView() {
  return (
    <div className="view active" style={{ animation: "fadeIn 0.25s ease-out" }}>
      {/* HERO STRIP */}
      <div
        className="hero-strip"
        style={{ background: "linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)" }}
      >
        <div className="hero-title">
          💡 Ideação do <span>Projeto</span>
        </div>
        <div className="hero-sub">
          Roadmap tecnológico, viabilidade financeira, matriz de riscos e jornada de cuidado TO-BE do Conecta Farma
        </div>
        <div className="hero-tags">
          <div className="hero-tag" style={{ background: "var(--yellow)", color: "#0f172a" }}>⭐ MVP Conecta Farma</div>
          <div className="hero-tag">📋 5 Fases de Implantação</div>
          <div className="hero-tag">🛡️ Segurança LGPD & RNDS</div>
        </div>
      </div>

      <div className="app-shell" style={{ flexDirection: "column", gap: "24px" }}>
        
        {/* TOP ROW: KPIs & ROADMAP OVERVIEW */}
        <div
          style={{
            background: "var(--white)",
            borderRadius: "var(--radius)",
            padding: "24px",
            border: "1px solid var(--gray-100)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div className="panel-title">🚀 Indicadores do Planejamento Estratégico</div>
          <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "12px" }}>
            <div className="kpi-card" style={{ borderLeft: "4px solid var(--blue)" }}>
              <div className="kpi-num">Fase 1</div>
              <div className="kpi-label">Status: MVP Completo</div>
              <div className="kpi-delta" style={{ color: "var(--green)" }}>100% Homologado</div>
            </div>
            <div className="kpi-card" style={{ borderLeft: "4px solid var(--green)" }}>
              <div className="kpi-num">78%</div>
              <div className="kpi-label">Backlog Concluído (Must Have)</div>
              <div className="kpi-delta" style={{ color: "var(--blue)" }}>7 de 9 Requisitos</div>
            </div>
            <div className="kpi-card" style={{ borderLeft: "4px solid var(--yellow-dark)" }}>
              <div className="kpi-num">Médio</div>
              <div className="kpi-label">Classificação de Risco Geral</div>
              <div className="kpi-delta" style={{ color: "var(--gray-500)" }}>Ações de Mitigação Mapeadas</div>
            </div>
            <div className="kpi-card" style={{ borderLeft: "4px solid var(--red)" }}>
              <div className="kpi-num">Inexigível</div>
              <div className="kpi-label">Modelo de Contratação</div>
              <div className="kpi-delta" style={{ color: "var(--blue)" }}>Inovação SUS PE</div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: RISK MATRIX & BUSINESS MODEL & BACKLOG ROADMAP */}
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          
          {/* Risco */}
          <div className="panel-card" style={{ minWidth: "320px", flex: 1 }}>
            <div className="panel-title">🔴 Matriz de Risco do Projeto</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
              
              <div className="risk-row" style={{ background: "var(--red-light)", padding: "10px 12px", borderRadius: "var(--radius-xs)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div className="risk-indicator" style={{ background: "var(--red)" }}></div>
                  <span style={{ fontWeight: 600 }}>Risco Clínico</span>
                </div>
                <div className="badge badge-red">Alto</div>
              </div>
              <div style={{ fontSize: "11px", color: "var(--gray-500)", paddingLeft: "20px", marginTop: "-4px", marginBottom: "4px" }}>
                Garantia de segurança nas teleconsultas e integridade dos alertas de adesão.
              </div>

              <div className="risk-row" style={{ background: "var(--red-light)", padding: "10px 12px", borderRadius: "var(--radius-xs)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div className="risk-indicator" style={{ background: "var(--red)" }}></div>
                  <span style={{ fontWeight: 600 }}>Dados & Privacidade (LGPD)</span>
                </div>
                <div className="badge badge-red">Alto</div>
              </div>
              <div style={{ fontSize: "11px", color: "var(--gray-500)", paddingLeft: "20px", marginTop: "-4px", marginBottom: "4px" }}>
                Exposição de prontuários SOAP. Mitigado com criptografia e perfis de acesso restritos.
              </div>

              <div className="risk-row" style={{ background: "var(--yellow-light)", padding: "10px 12px", borderRadius: "var(--radius-xs)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div className="risk-indicator" style={{ background: "var(--yellow-dark)" }}></div>
                  <span style={{ fontWeight: 600 }}>Risco Tecnológico</span>
                </div>
                <div className="badge badge-yellow">Médio</div>
              </div>
              <div style={{ fontSize: "11px", color: "var(--gray-500)", paddingLeft: "20px", marginTop: "-4px", marginBottom: "4px" }}>
                Integração de dados com barramentos legados (Horus, GAAP-PE) e sincronização.
              </div>

              <div className="risk-row" style={{ background: "var(--yellow-light)", padding: "10px 12px", borderRadius: "var(--radius-xs)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div className="risk-indicator" style={{ background: "var(--yellow-dark)" }}></div>
                  <span style={{ fontWeight: 600 }}>Letramento Digital</span>
                </div>
                <div className="badge badge-yellow">Médio</div>
              </div>
              <div style={{ fontSize: "11px", color: "var(--gray-500)", paddingLeft: "20px", marginTop: "-4px", marginBottom: "4px" }}>
                Dificuldade de idosos/cuidadores usarem o app. Solucionado com design acessível e Modo Cuidador.
              </div>

              <div className="risk-row" style={{ background: "var(--yellow-light)", padding: "10px 12px", borderRadius: "var(--radius-xs)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div className="risk-indicator" style={{ background: "var(--yellow-dark)" }}></div>
                  <span style={{ fontWeight: 600 }}>Risco Institucional</span>
                </div>
                <div className="badge badge-yellow">Médio</div>
              </div>
              <div style={{ fontSize: "11px", color: "var(--gray-500)", paddingLeft: "20px", marginTop: "-4px" }}>
                Adesão dos farmacêuticos da rede estadual PE à nova ferramenta digital.
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
                <strong>Mitigações ativas:</strong> Criptografia de ponta a ponta, auditoria de logs LGPD, treinamentos presenciais para farmacêuticos do CEAF e interface simplificada (tamanho de fonte aumentado no Modo Acessibilidade).
              </div>
            </div>
          </div>

          {/* Modelo de Negócio */}
          <div className="panel-card" style={{ minWidth: "320px", flex: 1 }}>
            <div className="panel-title">💰 Viabilidade & Modelo de Negócio</div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dbeafe" }}>
                  📜
                </div>
                <div>
                  <div className="feat-title">Contratação SUS PE</div>
                  <div className="feat-desc">Contratação pública via licitação ou inexigibilidade baseada na exclusividade do ecossistema integrado para a rede estadual.</div>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dcfce7" }}>
                  🏥
                </div>
                <div>
                  <div className="feat-title">Redução de Despesas</div>
                  <div className="feat-desc">Prevenção ativa de interações medicamentosas e melhora na adesão farmacológica reduzem internações secundárias no SUS.</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "14px" }}>
              <div className="section-label" style={{ fontWeight: 700, fontSize: "12px", color: "var(--gray-700)", marginBottom: "8px" }}>Orçamento Estimado do Projeto</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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
                  <span style={{ fontWeight: 700 }}>Desenvolvimento (App + Web)</span>
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
                  <span style={{ fontWeight: 700 }}>Integração RNDS / Barramento PE</span>
                  <span style={{ color: "var(--blue)", fontWeight: 800 }}>R$ 100k – 300k</span>
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
                  <span style={{ fontWeight: 700 }}>Infraestrutura em Nuvem (Anual)</span>
                  <span style={{ color: "var(--blue)", fontWeight: 800 }}>R$ 50k – 120k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Backlog status */}
          <div className="panel-card" style={{ minWidth: "320px", flex: 1 }}>
            <div className="panel-title">📋 Status do Backlog & Roadmap</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
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
                  <span>🔴 Must Have (Requisitos do MVP)</span>
                  <span style={{ color: "var(--green)" }}>7/9 Concluídos</span>
                </div>
                <div className="progress-bar" style={{ background: "var(--gray-100)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div className="progress-fill green" style={{ width: "78%", background: "var(--green)", height: "100%" }}></div>
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
                  <span>🔵 Should Have (Desejáveis)</span>
                  <span style={{ color: "var(--blue)" }}>3/6 Concluídos</span>
                </div>
                <div className="progress-bar" style={{ background: "var(--gray-100)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div className="progress-fill" style={{ width: "50%", background: "var(--blue)", height: "100%" }}></div>
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
                  <span>🟢 Could Have (Melhorias Futuras)</span>
                  <span style={{ color: "var(--gray-500)" }}>1/5 Concluídos</span>
                </div>
                <div className="progress-bar" style={{ background: "var(--gray-100)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div className="progress-fill yellow" style={{ width: "20%", background: "var(--yellow-dark)", height: "100%" }}></div>
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
                  <span>🟣 Won't Have (Fase 2 / Futuro)</span>
                  <span style={{ color: "var(--gray-300)" }}>—</span>
                </div>
                <div className="progress-bar" style={{ background: "var(--gray-100)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div className="progress-fill" style={{ width: "0%", background: "var(--gray-300)", height: "100%" }}></div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <div className="section-label" style={{ fontWeight: 700, fontSize: "11px", color: "var(--gray-500)" }}>Escopo Futuro (Fase 2)</div>
              <div className="chip-row" style={{ marginTop: "8px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <div className="chip" style={{ background: "#fce7f3", color: "#9d174d", padding: "4px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}>
                  🧠 IA Diagnóstico
                </div>
                <div className="chip" style={{ background: "#fce7f3", color: "#9d174d", padding: "4px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}>
                  📊 Big Data Regional
                </div>
                <div className="chip" style={{ background: "#fce7f3", color: "#9d174d", padding: "4px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}>
                  🌐 Integração E-SUS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: TO-BE USER JOURNEY SWIMLANE */}
        <div className="panel-card" style={{ width: "100%" }}>
          <div className="panel-title">🔄 Jornada de Cuidado TO-BE — O Ciclo do Acompanhamento Ativo</div>
          <div style={{ fontSize: "11px", color: "var(--gray-500)", marginBottom: "16px" }}>
            Mapeamento do fluxo contínuo de cuidado digital, expandindo a assistência para além do balcão de dispensação do CEAF.
          </div>
          
          <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "12px", scrollbarWidth: "thin" }}>
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "140px", padding: "12px", background: "var(--gray-50)", borderRadius: "8px", border: "1px solid var(--gray-100)" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--blue-pale)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--blue)" }}>👤</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-800)" }}>1. Cadastro</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)", lineHeight: "1.3" }}>Integrado ao Horus e Farmácia Digital PE</div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px", fontWeight: "bold" }}>➔</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "140px", padding: "12px", background: "var(--gray-50)", borderRadius: "8px", border: "1px solid var(--gray-100)" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--green)" }}>🧑‍⚕️</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-800)" }}>2. Consulta Inicial</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)", lineHeight: "1.3" }}>Avaliação farmacoterapêutica física/remota</div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px", fontWeight: "bold" }}>➔</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "140px", padding: "12px", background: "var(--gray-50)", borderRadius: "8px", border: "1px solid var(--gray-100)" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--yellow-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--yellow-dark)" }}>💊</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-800)" }}>3. Dispensação</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)", lineHeight: "1.3" }}>Retirada mensal com registro digital no app</div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px", fontWeight: "bold" }}>➔</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "140px", padding: "12px", background: "var(--gray-50)", borderRadius: "8px", border: "1px solid var(--gray-100)" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--red-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--red)" }}>📱</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-800)" }}>4. Monitoramento</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)", lineHeight: "1.3" }}>Notificações de doses e checklist de adesão</div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px", fontWeight: "bold" }}>➔</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "140px", padding: "12px", background: "var(--gray-50)", borderRadius: "8px", border: "1px solid var(--gray-100)" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--blue-pale)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--blue)" }}>🚨</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-800)" }}>5. Alertas & Chat</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)", lineHeight: "1.3" }}>Aviso automático ao farmacêutico se falhar adesão</div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", color: "var(--gray-300)", fontSize: "20px", fontWeight: "bold" }}>➔</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "140px", padding: "12px", background: "var(--gray-50)", borderRadius: "8px", border: "1px solid var(--gray-100)" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "2px solid var(--green)" }}>🎥</div>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--gray-800)" }}>6. Teleconsulta</div>
              <div style={{ textAlign: "center", fontSize: "10px", color: "var(--gray-500)", lineHeight: "1.3" }}>Acompanhamento clínico remoto agendado</div>
            </div>

          </div>
          
          <div
            style={{
              marginTop: "16px",
              padding: "14px 16px",
              background: "linear-gradient(135deg, var(--blue-pale), var(--green-light))",
              borderRadius: "10px",
              border: "1px solid var(--blue-light)",
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
              ⭐ Diferencial Conecta Farma PE:
            </span>
            <span style={{ fontSize: "12.5px", color: "var(--gray-700)", lineHeight: "1.4" }}>
              {" "}
              Ao contrário das soluções isoladas de farmácia, o Conecta Farma cobre todo o fluxo do paciente crônico, integrando a <strong>dispensação de medicamentos CEAF, teleassistência direta com farmacêuticos clínicos e engajamento adaptado para cuidadores</strong>.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

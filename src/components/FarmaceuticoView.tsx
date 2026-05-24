import React, { useState } from "react";

interface FarmaceuticoViewProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function FarmaceuticoView({ isDarkMode, setIsDarkMode }: FarmaceuticoViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("inicio");

  const [profile, setProfile] = useState({ name: "Farm. Ana Beatriz", avatar: "" });

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 0 || !parts[0]) return "FA";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const [selectedDate, setSelectedDate] = useState("2026-04-28");

  const datesList = [
    { value: "2026-04-27", label: "Domingo, 27 Abr" },
    { value: "2026-04-28", label: "Segunda, 28 Abr" },
    { value: "2026-04-29", label: "Terça, 29 Abr" },
    { value: "2026-04-30", label: "Quarta, 30 Abr" },
    { value: "2026-05-01", label: "Quinta, 01 Mai" }
  ];

  // State of scheduled appointments
  const [agendamentos, setAgendamentos] = useState([
    {
      id: "a1",
      date: "2026-04-28",
      time: "14:00",
      patient: "Maria Silva",
      description: "Acompanhamento e ajuste de rotina CEAF",
      status: "ready",
      duration: 30
    },
    {
      id: "a2",
      date: "2026-04-28",
      time: "16:00",
      patient: "Roberto T.",
      description: "Acompanhamento de terapia guiada",
      status: "scheduled",
      duration: 30
    }
  ]);

  const timeSlots = ["14:00", "14:30", "15:00", "15:30", "16:00"];

  // Chat Inbox states for Alertas tab
  const [chats, setChats] = useState([
    {
      id: "c1",
      patient: "Maria Silva",
      type: "sintoma",
      title: "🤢 Relato de Enjoo / Náusea",
      timestamp: "10:30",
      status: "pending",
      details: "Sinto isso depois de tomar o Losartana pela manhã",
      messages: [
        { sender: "bot", text: "Olá, Maria Silva! Sou o Assistente Conecta Farma. Como posso te ajudar hoje?" },
        { sender: "user", text: "1. Relatar Sintomas" },
        { sender: "bot", text: "Selecione o sintoma que você está sentindo..." },
        { sender: "user", text: "1. 🤢 Enjoo / Náusea" },
        { sender: "bot", text: "Você selecionou: 🤢 Enjoo / Náusea. Deseja acrescentar mais detalhes?" },
        { sender: "user", text: "Sinto isso depois de tomar o Losartana pela manhã" },
        { sender: "bot", text: "✅ Relato Enviado com sucesso! Seu relato foi inserido no prontuário. Um farmacêutico foi alertado." }
      ]
    },
    {
      id: "c2",
      patient: "Roberto T.",
      type: "suporte",
      title: "🩺 Dúvida sobre Dosagem",
      timestamp: "09:15",
      status: "unread",
      details: "Posso tomar Sinvastatina com o estômago vazio?",
      messages: [
        { sender: "bot", text: "Olá, Roberto T.! Como posso ajudar hoje?" },
        { sender: "user", text: "2. Dúvidas & Ajuda (Falar com Profissional)" },
        { sender: "bot", text: "Selecione a categoria de ajuda..." },
        { sender: "user", text: "1. 🩺 Tirar dúvida sobre dosagem" },
        { sender: "bot", text: "Digite sua dúvida de dosagem:" },
        { sender: "user", text: "Posso tomar Sinvastatina com o estômago vazio?" },
        { sender: "bot", text: "Mensagem encaminhada para um profissional da área, aguarde o contato..." }
      ]
    },
    {
      id: "c3",
      patient: "Carlos M.",
      type: "alerta",
      title: "🚨 Adesão Crítica (Falta de Retirada)",
      timestamp: "Ontem",
      status: "pending",
      details: "Paciente não comparece para retirar medicamento CEAF há 45 dias.",
      messages: [
        { sender: "system", text: "Alerta de Sistema: Carlos M. está sem retirar medicamento CEAF por mais de 45 dias." }
      ]
    }
  ]);

  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [chatInputText, setChatInputText] = useState("");

  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [pacientesList, setPacientesList] = useState([
    {
      id: "p1",
      name: "Maria Silva",
      age: 51,
      condition: "Dislipidemia · Prevenção Secundária",
      compliance: "100% Adesão Hoje",
      complianceClass: "green",
      meds: [
        { name: "Sinvastatina", dose: "20mg · Oral", freq: "Uso Diário" },
        { name: "AAS Protect", dose: "100mg · Oral", freq: "Uso Diário" }
      ],
      soap: {
        s: "Paciente relatou náusea via canal de suporte.",
        o: "Adesão reportada de 100% no app.",
        a: "Possível efeito adverso leve comum no início do tratamento.",
        p: "Teleconsulta agendada para acompanhar e orientar sobre ingestão junto às refeições."
      }
    },
    {
      id: "p2",
      name: "Roberto T.",
      age: 66,
      condition: "Diabetes T2 · Insulina Glargina",
      compliance: "71%",
      complianceClass: "yellow",
      meds: [
        { name: "Insulina Glargina", dose: "10 UI · Injetável", freq: "Uso Diário (Noite)" }
      ],
      soap: {
        s: "Sem queixas de dor ou desconforto na aplicação.",
        o: "Adesão média de 71% nos últimos 7 dias.",
        a: "Adesão moderada. Rodízio de aplicação correto.",
        p: "Reforçar a importância de tomar todos os dias no mesmo horário."
      }
    },
    {
      id: "p3",
      name: "Luísa F.",
      age: 44,
      condition: "Esclerose Múltipla · Interferon",
      compliance: "38%",
      complianceClass: "red",
      meds: [
        { name: "Interferon beta-1a", dose: "30mcg · Injetável", freq: "Uso Semanal (3x/semana)" }
      ],
      soap: {
        s: "Esqueceu duas doses na última semana devido a sintomas gripais pós-aplicação.",
        o: "Baixa adesão (38%) reportada no app.",
        a: "Não adesão secundária aos efeitos colaterais gripais do medicamento.",
        p: "Orientar sobre o uso de paracetamol profilático antes da injeção para mitigar febre/calafrios."
      }
    }
  ]);

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
            <div className="ap-reason">Relato de Náusea via canal de suporte</div>
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
        <div className="card-title">📅 Próximos Atendimentos ({datesList.find(d => d.value === selectedDate)?.label.split(',')[1].trim()})</div>
        {agendamentos.filter(a => a.date === selectedDate).length === 0 ? (
          <div style={{ fontSize: "11px", color: "var(--gray-500)" }}>Nenhum atendimento agendado para este dia.</div>
        ) : (
          agendamentos.filter(a => a.date === selectedDate).map(appt => (
            <div key={appt.id} className="timeline-item">
              <div className="timeline-dot" style={{ background: "var(--blue-pale)" }}>🎥</div>
              <div className="timeline-content">
                <div className="timeline-title">Teleconsulta — {appt.patient}</div>
                <div className="timeline-time">Hoje · {appt.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );

  const renderPacientes = () => {
    if (selectedPatientId) {
      const patient = pacientesList.find(p => p.id === selectedPatientId);
      if (!patient) {
        setSelectedPatientId(null);
        return null;
      }

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", animation: "fadeIn 0.2s ease" }}>
          {/* Profile header with X close button to the right */}
          <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--blue-pale)", border: "none", padding: "14px 16px" }}>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--blue-dark)" }}>{patient.name}</div>
              <div style={{ fontSize: "11px", color: "var(--gray-500)" }}>{patient.age} anos · CEAF Ativo · Adesão: {patient.compliance}</div>
            </div>
            <button
              onClick={() => setSelectedPatientId(null)}
              style={{
                background: "rgba(0,0,0,0.05)",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: "bold",
                color: "var(--blue-dark)",
                fontSize: "18px",
                lineHeight: "1"
              }}
              title="Voltar para lista"
            >
              ×
            </button>
          </div>

          {/* Farmacoterapia */}
          <div className="card">
            <div className="card-title">💊 Farmacoterapia Atual</div>
            {patient.meds.map(med => (
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

          {/* SOAP Evolution */}
          <div className="card">
            <div className="card-title">📝 Evolução Farmacêutica (SOAP)</div>
            <div style={{ background: "var(--gray-50)", borderRadius: "8px", padding: "10px", fontSize: "11px", color: "var(--gray-700)", lineHeight: 1.5, border: "1px solid var(--gray-100)" }}>
              <b style={{ color: "var(--blue-dark)" }}>S:</b> {patient.soap.s}<br />
              <b style={{ color: "var(--blue-dark)" }}>O:</b> {patient.soap.o}<br />
              <b style={{ color: "var(--blue-dark)" }}>A:</b> {patient.soap.a}<br />
              <b style={{ color: "var(--blue-dark)" }}>P:</b> {patient.soap.p}
            </div>
            <button
              className="btn btn-outline btn-sm btn-full"
              style={{ marginTop: "10px" }}
              onClick={() => {
                const s = prompt("Subjetivo (S):", patient.soap.s);
                const o = prompt("Objetivo (O):", patient.soap.o);
                const a = prompt("Avaliação (A):", patient.soap.a);
                const p = prompt("Plano (P):", patient.soap.p);

                if (s !== null || o !== null || a !== null || p !== null) {
                  setPacientesList(prev => prev.map(pt => {
                    if (pt.id === patient.id) {
                      return {
                        ...pt,
                        soap: {
                          s: s !== null ? s : pt.soap.s,
                          o: o !== null ? o : pt.soap.o,
                          a: a !== null ? a : pt.soap.a,
                          p: p !== null ? p : pt.soap.p
                        }
                      };
                    }
                    return pt;
                  }));
                }
              }}
            >
              + Nova Evolução
            </button>
          </div>
        </div>
      );
    }

    const filteredPatients = pacientesList.filter(pt =>
      pt.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <>
        <div style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar paciente por nome..."
            style={{ flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--gray-200)", fontSize: "12px", background: "var(--white)", color: "var(--gray-900)" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{ padding: "8px 12px", border: "1px solid var(--gray-200)", borderRadius: "8px", background: "var(--gray-50)", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}
            >
              Limpar
            </button>
          )}
        </div>
        <div className="card">
          <div className="card-title">👥 Meus Pacientes Ativos</div>
          {filteredPatients.length === 0 ? (
            <div style={{ fontSize: "12px", color: "var(--gray-500)", textAlign: "center", padding: "20px" }}>
              Nenhum paciente encontrado para "{searchQuery}"
            </div>
          ) : (
            filteredPatients.map(pt => (
              <div
                key={pt.id}
                className="patient-item"
                onClick={() => setSelectedPatientId(pt.id)}
                style={{ cursor: "pointer", border: "1px solid var(--gray-100)", background: "var(--white)", transition: "all 0.2s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = "var(--blue-light)"}
                onMouseOut={e => e.currentTarget.style.borderColor = "var(--gray-100)"}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--blue-dark)" }}>{pt.name}, {pt.age}a</div>
                  <div style={{ fontSize: "10px", color: "var(--gray-500)" }}>{pt.condition}</div>
                </div>
                <div>
                  <div className={`badge badge-${pt.complianceClass}`}>
                    {pt.compliance}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  const renderAgenda = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Minipassagem de dias ou mini-calendário de topo */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--white)", padding: "12px", borderRadius: "10px", border: "1px solid var(--gray-200)" }}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: selectedDate === datesList[0].value ? "var(--gray-300)" : "var(--gray-600)" }}
            onClick={() => {
              const idx = datesList.findIndex(d => d.value === selectedDate);
              if (idx > 0) setSelectedDate(datesList[idx - 1].value);
            }}
            disabled={selectedDate === datesList[0].value}
          >
            ◀
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--blue-dark)" }}>
              {datesList.find(d => d.value === selectedDate)?.label}
            </div>
            <div style={{ fontSize: "10px", color: "var(--gray-500)", marginTop: "2px" }}>5 horários (Gaps de 30m)</div>
          </div>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: selectedDate === datesList[datesList.length - 1].value ? "var(--gray-300)" : "var(--gray-600)" }}
            onClick={() => {
              const idx = datesList.findIndex(d => d.value === selectedDate);
              if (idx < datesList.length - 1) setSelectedDate(datesList[idx + 1].value);
            }}
            disabled={selectedDate === datesList[datesList.length - 1].value}
          >
            ▶
          </button>
        </div>

        {/* Day selection chips */}
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
          {datesList.map(d => {
            const isSel = d.value === selectedDate;
            const apptCount = agendamentos.filter(a => a.date === d.value).length;
            return (
              <div
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "20px",
                  background: isSel ? "var(--blue)" : "var(--gray-100)",
                  color: isSel ? "white" : "var(--gray-700)",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  border: isSel ? "1px solid var(--blue)" : "1px solid var(--gray-200)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <span>{d.label.split(',')[0]}</span>
                {apptCount > 0 && (
                  <span style={{
                    background: isSel ? "white" : "var(--blue)",
                    color: isSel ? "var(--blue)" : "white",
                    borderRadius: "50%",
                    fontSize: "9px",
                    width: "14px",
                    height: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800
                  }}>
                    {apptCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Lista de Slots (Calendário Diário) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {timeSlots.map((slotTime) => {
            const appt = agendamentos.find(a => a.time === slotTime && a.date === selectedDate);

            return (
              <div
                key={slotTime}
                style={{
                  display: "flex",
                  gap: "12px",
                  background: "var(--white)",
                  borderRadius: "10px",
                  padding: "12px",
                  border: appt ? "1px solid var(--blue-light)" : "1px dashed var(--gray-200)",
                  alignItems: "stretch",
                  boxShadow: appt ? "0 2px 6px rgba(59, 130, 246, 0.03)" : "none"
                }}
              >
                {/* Time Indicator */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: "48px",
                  borderRight: "1px solid var(--gray-100)",
                  paddingRight: "10px"
                }}>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--blue-dark)" }}>{slotTime}</span>
                  <span style={{ fontSize: "8px", color: "var(--gray-400)", marginTop: "2px" }}>30 min</span>
                </div>

                {/* Slot Content */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  {appt ? (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--gray-900)" }}>
                          Teleconsulta — {appt.patient}
                        </span>
                        <span style={{ fontSize: "8px", padding: "1px 5px", borderRadius: "10px", background: appt.status === "ready" ? "var(--green-pale)" : "var(--blue-pale)", color: appt.status === "ready" ? "var(--green)" : "var(--blue)", fontWeight: 700 }}>
                          {appt.status === "ready" ? "● Iniciar" : "Agendado"}
                        </span>
                      </div>
                      <div style={{ fontSize: "10px", color: "var(--gray-500)", marginBottom: "6px" }}>
                        {appt.description}
                      </div>

                      <div style={{ display: "flex", gap: "6px" }}>
                        {appt.status === "ready" ? (
                          <button
                            className="btn btn-primary btn-sm"
                            style={{ padding: "4px 8px", fontSize: "10px", borderRadius: "15px" }}
                            onClick={() => alert(`Iniciando teleconsulta com ${appt.patient}...`)}
                          >
                            🎥 Iniciar Chamada
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline btn-sm"
                            style={{ padding: "4px 8px", fontSize: "10px", borderRadius: "15px" }}
                            onClick={() => setActiveTab("prontuario")}
                          >
                            📋 Prontuário
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "var(--gray-400)", fontStyle: "italic" }}>
                        🟢 Disponível
                      </span>
                      <button
                        style={{
                          background: "var(--gray-50)",
                          border: "1px solid var(--gray-200)",
                          borderRadius: "15px",
                          padding: "3px 8px",
                          fontSize: "9px",
                          color: "var(--gray-600)",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                        onClick={() => {
                          const patientName = prompt("Nome do paciente para agendar:");
                          if (patientName) {
                            setAgendamentos(prev => [...prev, {
                              id: `a_${Date.now()}`,
                              date: selectedDate,
                              time: slotTime,
                              patient: patientName,
                              description: "Acompanhamento geral de tratamento",
                              status: "scheduled",
                              duration: 30
                            }].sort((a, b) => a.time.localeCompare(b.time)));
                          }
                        }}
                      >
                        + Reservar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAlertas = () => {
    if (openChatId) {
      const activeChat = chats.find(c => c.id === openChatId);
      if (!activeChat) {
        setOpenChatId(null);
        return null;
      }

      const handleSendReply = () => {
        if (!chatInputText.trim()) return;

        // Add message to chat history
        setChats(prev => prev.map(c => {
          if (c.id === openChatId) {
            return {
              ...c,
              status: "resolved",
              messages: [
                ...c.messages,
                { sender: "pharmacist", text: chatInputText }
              ]
            };
          }
          return c;
        }));
        setChatInputText("");
      };

      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 10px)",
          margin: "-16px",
          background: "var(--gray-50)",
          animation: "fadeIn 0.2s ease"
        }}>
          {/* Chat Header */}
          <div style={{
            background: "linear-gradient(135deg, var(--nav-bg) 0%, var(--blue) 100%)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "white",
            boxShadow: "var(--shadow-sm)",
            zIndex: 5
          }}>
            <button
              onClick={() => setOpenChatId(null)}
              style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
            >
              ◀
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 800 }}>{activeChat.patient}</div>
              <div style={{ fontSize: "10px", opacity: 0.9 }}>{activeChat.title}</div>
            </div>
            <span style={{ fontSize: "10px", background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "10px" }}>
              {activeChat.status === "resolved" ? "Respondido" : "Pendente"}
            </span>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}>
            {activeChat.messages.map((msg, index) => {
              const isPharmacist = msg.sender === "pharmacist";
              const isSystem = msg.sender === "system" || msg.sender === "bot";

              if (isSystem) {
                return (
                  <div key={index} style={{ alignSelf: "center", maxWidth: "90%", background: "var(--gray-200)", color: "var(--gray-700)", padding: "6px 12px", borderRadius: "12px", fontSize: "11px", textAlign: "center", border: "1px solid var(--gray-300)" }}>
                    <strong>{msg.sender === "bot" ? "🤖 Assistente:" : "⚙️ Sistema:"}</strong> {msg.text}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  style={{
                    alignSelf: isPharmacist ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px"
                  }}
                >
                  <div style={{
                    background: isPharmacist ? "var(--blue)" : "var(--white)",
                    color: isPharmacist ? "white" : "var(--gray-900)",
                    padding: "10px 14px",
                    borderRadius: isPharmacist ? "16px 0 16px 16px" : "0 16px 16px 16px",
                    border: isPharmacist ? "none" : "1px solid var(--gray-200)",
                    fontSize: "12.5px",
                    lineHeight: "1.4",
                    boxShadow: "var(--shadow-sm)"
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <div style={{
            padding: "10px 16px",
            background: "var(--white)",
            borderTop: "1px solid var(--gray-200)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxSizing: "border-box"
          }}>
            <input
              type="text"
              value={chatInputText}
              onChange={e => setChatInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleSendReply();
              }}
              placeholder="Responder ao paciente..."
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "20px",
                border: "1px solid var(--gray-300)",
                fontSize: "12px",
                outline: "none",
                background: "var(--gray-50)",
                color: "var(--gray-900)"
              }}
            />
            <button
              onClick={handleSendReply}
              disabled={!chatInputText.trim()}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: chatInputText.trim() ? "var(--blue)" : "var(--gray-300)",
                color: "white",
                border: "none",
                cursor: chatInputText.trim() ? "pointer" : "default",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              ➔
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ fontSize: "11px", color: "var(--gray-500)", marginBottom: "4px" }}>
          Clique em qualquer chamado ou alerta abaixo para ver o histórico do chat do paciente e responder em tempo real.
        </div>
        {chats.map(c => {
          let badgeColor = "var(--blue)";
          let badgeText = "Mensagem";
          if (c.type === "sintoma") {
            badgeColor = "var(--yellow-dark)";
            badgeText = "⚠️ Sintoma";
          } else if (c.type === "alerta") {
            badgeColor = "var(--red)";
            badgeText = "🚨 Alerta Crítico";
          } else if (c.type === "suporte") {
            badgeColor = "var(--blue)";
            badgeText = "🩺 Suporte";
          }

          return (
            <div
              key={c.id}
              onClick={() => setOpenChatId(c.id)}
              style={{
                background: "var(--white)",
                border: `1px solid ${c.status === "unread" ? "var(--blue-light)" : "var(--gray-200)"}`,
                borderRadius: "10px",
                padding: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: c.status === "unread" ? "0 2px 8px rgba(59, 130, 246, 0.05)" : "none"
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--blue)"}
              onMouseOut={e => e.currentTarget.style.borderColor = c.status === "unread" ? "var(--blue-light)" : "var(--gray-200)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--blue-dark)" }}>
                  {c.patient}
                </span>
                <span style={{ fontSize: "8px", color: "var(--gray-400)" }}>{c.timestamp}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "10px", background: badgeColor + "20", color: badgeColor, fontWeight: "bold" }}>
                  {badgeText}
                </span>
                {c.status === "unread" && (
                  <span style={{ fontSize: "8px", background: "var(--blue)", color: "white", padding: "1px 5px", borderRadius: "10px", fontWeight: "bold" }}>
                    Novo
                  </span>
                )}
              </div>
              <div style={{ fontSize: "11px", color: "var(--gray-700)", lineHeight: "1.4" }}>
                <strong>{c.title}:</strong> "{c.details}"
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--gray-100)", paddingTop: "8px", marginTop: "4px" }}>
                <span style={{ fontSize: "10px", color: "var(--blue)", fontWeight: "bold" }}>
                  {c.status === "resolved" ? "✓ Visualizar Histórico" : "💬 Abrir Chat & Responder ➔"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // renderPerfil was extracted into a separate component at the bottom of the file to comply with React Rules of Hooks.

  // renderProntuario was removed and merged inline inside renderPacientes

  return (
    <div className="view active">
      <div className="hero-strip" style={{ background: "linear-gradient(135deg, var(--nav-bg) 0%, var(--blue) 100%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div className="avatar" style={{ background: "rgba(255,255,255,0.2)", color: "white", width: "48px", height: "48px", fontSize: profile.avatar ? "28px" : "18px" }}>
            {profile.avatar || getInitials(profile.name)}
          </div>
          <div className="hero-title" style={{ margin: 0 }}>
            Dashboard — <span>{profile.name}</span> 🩺
          </div>
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
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsFullscreen(true)}
                style={{ alignSelf: "flex-start", zIndex: 10 }}
              >
                📱 Modo Mobile
              </button>
              <button
                className={`btn ${isDarkMode ? "btn-yellow" : "btn-outline"} btn-sm`}
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{ alignSelf: "flex-start", zIndex: 10 }}
              >
                ♿ Modo Acessibilidade
              </button>
            </div>
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
                style={{ background: "linear-gradient(135deg, var(--nav-bg) 0%, var(--blue) 100%)" }}
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
                    activeTab === "pacientes"
                      ? (selectedPatientId ? "Prontuário" : "Meus Pacientes") :
                      activeTab === "agenda" ? "Agenda" :
                        activeTab === "alertas" ? "Chat Clínico" : "Meu Perfil"}
                </div>
                <div className="screen-subtitle">{profile.name}</div>
              </div>

              <div className="screen-body">
                <div key={activeTab} className="tab-content">
                  {activeTab === "inicio" && renderInicio()}
                  {activeTab === "pacientes" && renderPacientes()}
                  {activeTab === "agenda" && renderAgenda()}
                  {activeTab === "alertas" && renderAlertas()}
                  {activeTab === "perfil" && (
                    <FarmaceuticoPerfilTab
                      profile={profile}
                      setProfile={setProfile}
                      isDarkMode={isDarkMode}
                      setIsDarkMode={setIsDarkMode}
                      getInitials={getInitials}
                    />
                  )}
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
                  <div className="nav-icon">❗</div>
                  <div className="nav-label">Chat</div>
                  {activeTab === "alertas" && <div className="nav-dot"></div>}
                </div>
                <div className={`nav-item ${activeTab === "perfil" ? "active" : ""}`} onClick={() => setActiveTab("perfil")}>
                  <div className="nav-icon">👤</div>
                  <div className="nav-label">Perfil</div>
                  {activeTab === "perfil" && <div className="nav-dot"></div>}
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
                    Gestão de horários, confirmação automática e integração com videochamada online
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

interface FarmaceuticoPerfilTabProps {
  profile: { name: string; avatar: string };
  setProfile: React.Dispatch<React.SetStateAction<{ name: string; avatar: string }>>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  getInitials: (name: string) => string;
}

function FarmaceuticoPerfilTab({ profile, setProfile, isDarkMode, setIsDarkMode, getInitials }: FarmaceuticoPerfilTabProps) {
  const [editingName, setEditingName] = useState(profile.name);
  const [editingAvatar, setEditingAvatar] = useState(profile.avatar);
  const [showAvatarSelect, setShowAvatarSelect] = useState(false);

  const availableAvatars = [
    "👩🏽‍⚕️", "👨🏻‍⚕️", "👩🏼‍🦳", "👨🏻", "👩🏽‍🦱", "👨🏿‍🦲", "🧑🏽", "👵🏼", "🧔🏻‍♂️", "🧕🏽",
    "👤", "🩺", "🧪", "💊", "🌸", "⭐", "💙", "🦁"
  ];

  const handleSaveProfile = () => {
    setProfile({ name: editingName, avatar: editingAvatar });
    setShowAvatarSelect(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeIn 0.2s ease" }}>

      {/* SEÇÃO 1: PERFIL */}
      <div className="card">
        <div className="card-title">👤 Meu Perfil Profissional</div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginTop: "12px" }}>

          <div style={{ position: "relative" }}>
            <div
              onClick={() => setShowAvatarSelect(!showAvatarSelect)}
              style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "var(--blue-pale)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: editingAvatar ? "40px" : "28px", cursor: "pointer",
                border: "3px solid var(--blue-light)", position: "relative",
                color: "var(--blue-dark)", fontWeight: 800
              }}
            >
              {editingAvatar || getInitials(editingName || "Farmacêutico")}
              <div style={{
                position: "absolute", bottom: "-4px", right: "-4px",
                background: "var(--white)", borderRadius: "50%", width: "28px", height: "28px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)", fontSize: "12px"
              }}>
                ✏️
              </div>
            </div>

            {showAvatarSelect && (
              <div style={{
                position: "absolute", top: "90px", left: "50%", transform: "translateX(-50%)",
                background: "var(--white)", padding: "12px", borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 100,
                display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px",
                width: "220px"
              }}>
                {/* Opção para usar iniciais */}
                <div
                  onClick={() => { setEditingAvatar(""); setShowAvatarSelect(false); }}
                  style={{
                    fontSize: "14px", cursor: "pointer", padding: "4px",
                    background: editingAvatar === "" ? "var(--blue-pale)" : "var(--gray-100)",
                    borderRadius: "8px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--blue-dark)"
                  }}
                  title="Usar Iniciais"
                >
                  {getInitials(editingName || "FA")}
                </div>
                {availableAvatars.map(av => (
                  <div
                    key={av}
                    onClick={() => { setEditingAvatar(av); setShowAvatarSelect(false); }}
                    style={{
                      fontSize: "24px", cursor: "pointer", padding: "4px",
                      background: editingAvatar === av ? "var(--blue-pale)" : "transparent",
                      borderRadius: "8px", textAlign: "center"
                    }}
                  >
                    {av}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ width: "100%" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>
              NOME DE EXIBIÇÃO
            </label>
            <input
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--gray-200)", background: "var(--white)", color: "var(--gray-900)", fontFamily: "inherit", fontSize: "14px", outline: "none" }}
            />
          </div>

          <button className="btn btn-primary btn-full" onClick={handleSaveProfile} style={{ marginTop: "4px", borderRadius: "30px" }}>
            Atualizar Perfil
          </button>
        </div>
      </div>

      {/* SEÇÃO 2: TEMA E ACESSIBILIDADE */}
      <div className="card">
        <div className="card-title">🌓 Tema / Acessibilidade</div>
        <div style={{ fontSize: "11px", color: "var(--gray-500)", marginBottom: "12px", lineHeight: "1.4" }}>
          Escolha o tema visual do aplicativo. O Modo Acessibilidade utiliza o tema escuro para facilitar a leitura.
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className={`btn btn-sm btn-full ${!isDarkMode ? "btn-primary" : "btn-outline"}`}
            onClick={() => setIsDarkMode(false)}
            style={{ borderRadius: "20px" }}
            type="button"
          >
            ☀️ Claro
          </button>
          <button
            className={`btn btn-sm btn-full ${isDarkMode ? "btn-yellow" : "btn-outline"}`}
            onClick={() => setIsDarkMode(true)}
            style={{ borderRadius: "20px" }}
            type="button"
          >
            🌙 Escuro (Acessibilidade)
          </button>
        </div>
      </div>

      {/* SEÇÃO 3: CREDENCIAIS PROFISSIONAIS */}
      <div className="card">
        <div className="card-title">🩺 Registro & Unidade</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "var(--gray-700)", marginTop: "8px" }}>
          <div><strong>Registro CRF:</strong> CRF-PE 12943</div>
          <div><strong>Unidade de Atendimento:</strong> Farmácia Metropolitana (Recife)</div>
          <div><strong>Especialidade:</strong> Farmácia Clínica e Atenção Farmacêutica</div>
        </div>
      </div>

    </div>
  );
}

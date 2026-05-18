import React, { useState } from "react";
import { Medicine } from "../../types";

interface InicioTabProps {
  meds: Medicine[];
  medsDone: Record<string, boolean>;
  setMedsDone: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onNavigate?: (tab: string) => void;
}

export default function InicioTab({ meds, medsDone, setMedsDone, onNavigate }: InicioTabProps) {
  const dailyMeds = meds.filter((m) => m.isDaily);

  const toggleMed = (id: string) => {
    setMedsDone((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalMeds = dailyMeds.length;
  const takenMeds = dailyMeds.filter((m) => medsDone[m.id]).length;
  const percentage = totalMeds > 0 ? Math.round((takenMeds / totalMeds) * 100) : 0;
  const missingMeds = totalMeds - takenMeds;

  let progressColorClass = "red";
  if (percentage === 100) progressColorClass = "green";
  else if (percentage >= 50) progressColorClass = "yellow";

  const [scheduledTeleconsulta, setScheduledTeleconsulta] = useState<{ doctor: string, date: string } | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const availableDays = [
    { label: "Seg", date: "28 Abr" },
    { label: "Ter", date: "29 Abr" },
    { label: "Qua", date: "30 Abr" },
  ];
  const availableTimes = ["09:00", "14:00", "16:00"];
  const availableDoctors = ["Farm. Ana Beatriz", "Farm. Carlos Eduardo", "Farm. Juliana Costa"];

  const handleSchedule = () => {
    if (!selectedDoctor) return;
    const dayLabel = availableDays.find(d => d.date === selectedDay)?.label;
    setScheduledTeleconsulta({ doctor: selectedDoctor, date: `${dayLabel}, ${selectedDay} · ${selectedTime}` });
    setShowScheduleModal(false);
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
              color: percentage === 100 ? "var(--green)" : "var(--blue)",
            }}
          >
            {percentage}%
          </div>
          <div style={{ flex: 1 }}>
            <div className="progress-bar">
              <div className={`progress-fill ${progressColorClass}`} style={{ width: `${percentage}%` }}></div>
            </div>
            <div style={{ fontSize: "10px", color: "var(--gray-500)", marginTop: "4px" }}>
              {takenMeds} de {totalMeds} tomados
            </div>
          </div>
        </div>
        {totalMeds === 0 ? (
          <div className="alert-strip info">Nenhum medicamento diário cadastrado</div>
        ) : missingMeds === 0 ? (
          <div className="alert-strip success">✅ Todos os medicamentos tomados hoje!</div>
        ) : missingMeds === 1 ? (
          <div className="alert-strip warning">⏰ Falta 1 medicamento do dia</div>
        ) : (
          <div className="alert-strip danger">⏰ Faltam {missingMeds} medicamentos do dia</div>
        )}
      </div>

      {/* Medicamentos */}
      <div className="card">
        <div className="card-title">💊 Medicamentos do Dia</div>
        {dailyMeds.length === 0 ? (
          <div style={{ fontSize: "12px", color: "var(--gray-500)", textAlign: "center", padding: "10px" }}>
            Nenhum medicamento de uso diário.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {dailyMeds.map((med) => {
              const isDone = medsDone[med.id];
              return (
                <div
                  key={med.id}
                  className="med-item"
                  style={{ borderColor: isDone ? "#86efac" : "var(--gray-100)" }}
                >
                  <div className="med-icon" style={{
                    background: med.info.categoria === "Injetável" ? "#E3F2FD" : "var(--gray-50)",
                    color: med.info.categoria === "Injetável" ? "#1E88E5" : "var(--gray-600)"
                  }}>
                    {med.info.categoria === "Injetável" ? "💉" : "💊"}
                  </div>
                  <div className="med-info">
                    <div className="med-name">{med.name}</div>
                    <div className="med-dose">{med.dosage} · {med.info.categoria}</div>
                  </div>
                  <div
                    className={`med-check ${isDone ? "done" : ""}`}
                    onClick={() => toggleMed(med.id)}
                  >
                    {isDone ? "✓" : "○"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Agendamento de Teleconsulta */}
      {!scheduledTeleconsulta ? (
        <div className="teleconsulta-card" style={{ background: "var(--blue-pale)", border: "1px dashed var(--blue)" }}>
          <div className="tc-title" style={{ color: "var(--blue-dark)" }}>📅 Agendar Teleconsulta</div>
          <div style={{ fontSize: "12px", color: "var(--blue-dark)", opacity: 0.85, marginBottom: "12px", lineHeight: "1.4" }}>
            Converse com um farmacêutico especialista sobre o seu tratamento, tire dúvidas e ajuste sua rotina sem sair de casa.
          </div>

          {showScheduleModal ? (
            <div style={{ background: "var(--gray-50)", padding: "16px", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "16px", border: "1px solid var(--gray-200)", marginTop: "8px" }}>
              
              {/* 1. Escolha o Dia */}
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--gray-500)", marginBottom: "8px" }}>1. ESCOLHA O DIA</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {availableDays.map(day => (
                    <div 
                      key={day.date}
                      onClick={() => { setSelectedDay(day.date); setSelectedTime(""); setSelectedDoctor(""); }}
                      style={{ 
                        flex: 1, padding: "10px 4px", borderRadius: "8px", textAlign: "center", cursor: "pointer",
                        border: selectedDay === day.date ? "2px solid var(--blue)" : "1px solid var(--gray-200)",
                        background: selectedDay === day.date ? "var(--blue)" : "var(--gray-100)",
                        color: selectedDay === day.date ? "white" : "var(--gray-700)",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ fontSize: "10px", fontWeight: selectedDay === day.date ? 800 : 700 }}>{day.label}</div>
                      <div style={{ fontSize: "13px", fontWeight: selectedDay === day.date ? 800 : 800 }}>{day.date.split(' ')[0]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Escolha o Horário */}
              {selectedDay && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--gray-500)", marginBottom: "8px" }}>2. HORÁRIO ({selectedDay})</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {availableTimes.map(time => (
                      <div 
                        key={time}
                        onClick={() => { setSelectedTime(time); setSelectedDoctor(""); }}
                        style={{ 
                          flex: 1, padding: "8px", borderRadius: "8px", textAlign: "center", cursor: "pointer", fontSize: "12px", fontWeight: 700,
                          border: selectedTime === time ? "2px solid var(--blue)" : "1px solid var(--gray-200)",
                          background: selectedTime === time ? "var(--blue)" : "var(--gray-100)",
                          color: selectedTime === time ? "white" : "var(--gray-700)",
                          transition: "all 0.2s"
                        }}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Escolha o Profissional */}
              {selectedTime && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--gray-500)", marginBottom: "8px" }}>3. PROFISSIONAL</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {availableDoctors.map(doc => (
                      <div 
                        key={doc}
                        onClick={() => setSelectedDoctor(doc)}
                        style={{ 
                          padding: "10px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px",
                          border: selectedDoctor === doc ? "2px solid var(--blue)" : "1px solid var(--gray-200)",
                          background: selectedDoctor === doc ? "var(--blue)" : "var(--gray-100)",
                          color: selectedDoctor === doc ? "white" : "var(--gray-700)",
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: selectedDoctor === doc ? "white" : "var(--gray-200)", color: selectedDoctor === doc ? "var(--blue)" : "inherit", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", transition: "all 0.2s" }}>
                          🧑‍⚕️
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 700 }}>
                          {doc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button className="btn btn-primary btn-full" onClick={handleSchedule} disabled={!selectedDoctor} style={{ opacity: !selectedDoctor ? 0.5 : 1, borderRadius: "24px" }}>
                  Confirmar
                </button>
                <button className="btn btn-full" style={{ background: "var(--gray-300)", color: "var(--gray-800)", borderRadius: "24px" }} onClick={() => {
                  setShowScheduleModal(false);
                  setSelectedDay("");
                  setSelectedTime("");
                  setSelectedDoctor("");
                }}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              style={{ alignSelf: "flex-start", borderRadius: "8px" }}
              onClick={() => setShowScheduleModal(true)}
            >
              Ver horários disponíveis
            </button>
          )}
        </div>
      ) : (
        <div className="teleconsulta-card">
          <div className="tc-title">🎥 Próxima Teleconsulta</div>
          <div className="tc-next">Com {scheduledTeleconsulta.doctor}</div>
          <div className="tc-time">{scheduledTeleconsulta.date}</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="btn btn-yellow btn-sm"
              style={{ borderRadius: "8px" }}
            >
              Entrar na consulta
            </button>
            <button
              className="btn btn-sm"
              style={{ background: "rgba(255,255,255,0.2)", color: "white", borderRadius: "8px" }}
              onClick={() => {
                if (confirm("Deseja cancelar este agendamento?")) {
                  setScheduledTeleconsulta(null);
                  setSelectedDay("");
                  setSelectedTime("");
                  setSelectedDoctor("");
                }
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Chat Redirection */}
      <div
        className="card"
        style={{ border: "2px solid var(--blue-pale)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        onClick={() => onNavigate && onNavigate("chat")}
      >
        <div>
          <div className="card-title" style={{ marginBottom: "4px" }}>💬 Tira-dúvidas IA</div>
          <div style={{ fontSize: "12px", color: "var(--gray-600)" }}>Pergunte sobre seus medicamentos e tratamento 24/7.</div>
        </div>
        <div style={{ fontSize: "20px", color: "var(--blue)" }}>➔</div>
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

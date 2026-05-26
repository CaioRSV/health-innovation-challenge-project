"use client";

import React, { useState, useEffect } from "react";
import InicioTab from "./paciente/InicioTab";
import MedsTab from "./paciente/MedsTab";
import GuiaTab from "./paciente/GuiaTab";
import ChatTab from "./paciente/ChatTab";
import PerfilTab from "./paciente/PerfilTab";
import { Medicine } from "../types";
import { useAppStore } from "../store/AppStore";

export interface RegistrationData {
  role: "paciente" | "cuidador";
  userName: string;
  patientName: string;
  userDob: string;
  patientDob: string;
  height: string;
  weight: string;
  clinicalCondition: string;
  meds: { name: string; dosage: string; via: "Oral" | "Injetável" | "Insumo"; time: string }[];
}

interface CadastroScreenProps {
  onComplete: (data: RegistrationData) => void;
}

function CadastroScreen({ onComplete }: CadastroScreenProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"paciente" | "cuidador">("paciente");
  
  // Fields
  const [userName, setUserName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [userDob, setUserDob] = useState("");
  const [patientDob, setPatientDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [clinicalCondition, setClinicalCondition] = useState("");

  // Meds list
  const [medsList, setMedsList] = useState<{ name: string; dosage: string; via: "Oral" | "Injetável" | "Insumo"; time: string }[]>([]);
  const [medName, setMedName] = useState("");
  const [medDosage, setMedDosage] = useState("");
  const [medVia, setMedVia] = useState<"Oral" | "Injetável" | "Insumo">("Oral");
  const [medTime, setMedTime] = useState("");

  const handleAddMed = () => {
    if (!medName.trim() || !medDosage.trim() || !medTime.trim()) return;
    setMedsList(prev => [...prev, { name: medName, dosage: medDosage, via: medVia, time: medTime }]);
    setMedName("");
    setMedDosage("");
    setMedTime("");
  };

  const handleRemoveMed = (index: number) => {
    setMedsList(prev => prev.filter((_, idx) => idx !== index));
  };

  const isProfileValid = () => {
    if (role === "paciente") {
      return userName.trim() !== "" && userDob !== "" && height !== "" && weight !== "" && clinicalCondition.trim() !== "";
    } else {
      return userName.trim() !== "" && patientName.trim() !== "" && userDob !== "" && patientDob !== "" && height !== "" && weight !== "" && clinicalCondition.trim() !== "";
    }
  };

  const handleSubmit = () => {
    onComplete({
      role,
      userName,
      patientName: role === "paciente" ? userName : patientName,
      userDob,
      patientDob: role === "paciente" ? userDob : patientDob,
      height,
      weight,
      clinicalCondition,
      meds: medsList
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--gray-50)" }}>
      {/* Header */}
      <div className="screen-header" style={{ background: "linear-gradient(135deg, var(--nav-bg) 0%, var(--blue) 100%)", padding: "16px 20px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, opacity: 0.9, marginBottom: "4px" }}>Passo {step} de 4</div>
        <div className="screen-title" style={{ fontSize: "18px" }}>Cadastro de Perfil</div>
      </div>

      {/* Wizard Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", animation: "fadeIn 0.2s ease" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 800, color: "var(--gray-900)", textAlign: "center", marginBottom: "8px" }}>
              Como você deseja utilizar o aplicativo?
            </h3>
            
            <div 
              onClick={() => setRole("paciente")}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: `2px solid ${role === "paciente" ? "var(--blue)" : "var(--gray-200)"}`,
                background: role === "paciente" ? "var(--blue-pale)" : "var(--white)",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>👤</div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--gray-900)" }}>Sou o Paciente</div>
              <div style={{ fontSize: "11px", color: "var(--gray-500)", marginTop: "4px" }}>
                Vou gerenciar meu próprio tratamento e registrar meus medicamentos diários.
              </div>
            </div>

            <div 
              onClick={() => setRole("cuidador")}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: `2px solid ${role === "cuidador" ? "var(--blue)" : "var(--gray-200)"}`,
                background: role === "cuidador" ? "var(--blue-pale)" : "var(--white)",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>🧑‍🤝‍🧑</div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--gray-900)" }}>Sou Cuidador / Familiar</div>
              <div style={{ fontSize: "11px", color: "var(--gray-500)", marginTop: "4px" }}>
                Vou gerenciar e confirmar as tomadas de medicamentos de um paciente sob minha responsabilidade.
              </div>
            </div>

            <button 
              className="btn btn-primary btn-full"
              style={{ marginTop: "16px", borderRadius: "30px" }}
              onClick={() => setStep(2)}
            >
              Avançar
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", animation: "fadeIn 0.2s ease" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 800, color: "var(--gray-900)", marginBottom: "4px" }}>
              Informações do Perfil
            </h3>

            {role === "paciente" ? (
              <>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>SEU NOME COMPLETO</label>
                  <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Digite seu nome..." style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "13px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>DATA DE NASCIMENTO</label>
                  <input type="date" value={userDob} onChange={e => setUserDob(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "13px", outline: "none" }} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>SEU NOME (CUIDADOR)</label>
                  <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Digite seu nome..." style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "13px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>SUA DATA DE NASCIMENTO</label>
                  <input type="date" value={userDob} onChange={e => setUserDob(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "13px", outline: "none" }} />
                </div>
                <div style={{ borderTop: "1px dashed var(--gray-200)", marginTop: "8px", paddingTop: "8px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>NOME DO PACIENTE</label>
                  <input type="text" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Nome de quem você cuida..." style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "13px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>DATA DE NASCIMENTO DO PACIENTE</label>
                  <input type="date" value={patientDob} onChange={e => setPatientDob(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "13px", outline: "none" }} />
                </div>
              </>
            )}

            <div>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>ALTURA DO PACIENTE (CM)</label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Ex: 172" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "13px", outline: "none" }} />
            </div>
            
            <div>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>PESO DO PACIENTE (KG)</label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 68" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "13px", outline: "none" }} />
            </div>

            <div>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>CONDIÇÃO CLÍNICA PRINCIPAL</label>
              <input type="text" value={clinicalCondition} onChange={e => setClinicalCondition(e.target.value)} placeholder="Ex: Diabetes Tipo 1, Hipertensão..." style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "13px", outline: "none" }} />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <button className="btn btn-outline btn-full" style={{ borderRadius: "30px" }} onClick={() => setStep(1)}>Voltar</button>
              <button className="btn btn-primary btn-full" style={{ borderRadius: "30px" }} disabled={!isProfileValid()} onClick={() => setStep(3)}>Avançar</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", animation: "fadeIn 0.2s ease" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 800, color: "var(--gray-900)", marginBottom: "4px" }}>
              Cadastrar Medicamentos
            </h3>
            <p style={{ fontSize: "11px", color: "var(--gray-500)", marginTop: "-6px" }}>
              Insira os medicamentos de uso diário do paciente.
            </p>

            <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", padding: "14px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <label style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>NOME DO MEDICAMENTO</label>
                <input type="text" value={medName} onChange={e => setMedName(e.target.value)} placeholder="Ex: Losartana..." style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "12px", outline: "none" }} />
              </div>
              
              <div>
                <label style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>DOSE / CONCENTRAÇÃO</label>
                <input type="text" value={medDosage} onChange={e => setMedDosage(e.target.value)} placeholder="Ex: 50mg, 10 UI..." style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "12px", outline: "none" }} />
              </div>

              <div>
                <label style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>VIA DE ADMINISTRAÇÃO</label>
                <select value={medVia} onChange={e => setMedVia(e.target.value as any)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "12px", outline: "none" }}>
                  <option value="Oral">Oral</option>
                  <option value="Injetável">Injetável</option>
                  <option value="Insumo">Insumo</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", marginBottom: "4px", display: "block" }}>HORÁRIO DE TOMADA</label>
                <input type="time" value={medTime} onChange={e => setMedTime(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--gray-300)", background: "var(--white)", color: "var(--gray-900)", fontSize: "12px", outline: "none" }} />
              </div>

              <button 
                className="btn btn-yellow btn-full btn-sm" 
                style={{ marginTop: "8px", borderRadius: "20px" }}
                disabled={!medName.trim() || !medDosage.trim() || !medTime.trim()}
                onClick={handleAddMed}
              >
                + Adicionar na lista
              </button>
            </div>

            {/* List of added meds */}
            {medsList.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--gray-500)" }}>MEDICAMENTOS ADICIONADOS ({medsList.length})</div>
                {medsList.map((m, idx) => (
                  <div key={idx} style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "8px", fontSize: "12px", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <strong>{m.name}</strong> ({m.dosage}) · <span style={{ color: "var(--blue)" }}>{m.via}</span>
                      <div style={{ fontSize: "10px", color: "var(--gray-500)" }}>Horário: {m.time}</div>
                    </div>
                    <button onClick={() => handleRemoveMed(idx)} style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", color: "var(--red)", fontWeight: "bold" }}>×</button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <button className="btn btn-outline btn-full" style={{ borderRadius: "30px" }} onClick={() => setStep(2)}>Voltar</button>
              <button className="btn btn-primary btn-full" style={{ borderRadius: "30px" }} disabled={medsList.length === 0} onClick={() => setStep(4)}>Avançar</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", animation: "fadeIn 0.2s ease" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 800, color: "var(--gray-900)", textAlign: "center", marginBottom: "4px" }}>
              Confirmar Dados do Cadastro
            </h3>

            <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <div><strong>Perfil:</strong> {role === "paciente" ? "Paciente" : "Cuidador / Familiar"}</div>
              {role === "cuidador" && <div><strong>Cuidador:</strong> {userName}</div>}
              <div><strong>Paciente:</strong> {role === "paciente" ? userName : patientName}</div>
              <div><strong>Condição Clínica:</strong> {clinicalCondition}</div>
              <div><strong>Altura / Peso:</strong> {height} cm / {weight} kg</div>
              
              <div style={{ borderTop: "1px dashed var(--gray-200)", paddingTop: "10px", marginTop: "4px" }}>
                <strong>Medicamentos cadastrados:</strong>
                <ul style={{ paddingLeft: "18px", marginTop: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {medsList.map((m, idx) => (
                    <li key={idx}>
                      {m.name} - {m.dosage} ({m.via}) às {m.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <button className="btn btn-outline btn-full" style={{ borderRadius: "30px" }} onClick={() => setStep(3)}>Voltar</button>
              <button className="btn btn-primary btn-full" style={{ borderRadius: "30px" }} onClick={handleSubmit}>Concluir Cadastro</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function PacienteView() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    pacienteProfile,
    setPacienteProfile,
    meds,
    setMeds,
    medsDone,
    setMedsDone,
    hasCompletedRegistration,
    setHasCompletedRegistration,
    isDarkMode,
    setIsDarkMode
  } = useAppStore();

  const handleCadastroComplete = (data: RegistrationData) => {
    setPacienteProfile({
      name: data.role === "paciente" ? data.userName : data.patientName,
      avatar: "",
      dob: data.role === "paciente" ? data.userDob : data.patientDob,
      height: data.height,
      weight: data.weight,
      clinicalCondition: data.clinicalCondition
    });

    // Generate initial meds
    const generatedMeds: Medicine[] = data.meds.map((m, idx) => ({
      id: `m_${idx}_${Date.now()}`,
      name: m.name,
      dosage: m.dosage,
      stock: m.via === "Injetável" ? 15 : 45,
      reserved: false,
      isDaily: true,
      info: {
        categoria: m.via,
        descricao: `Medicamento cadastrado para tratamento de ${data.clinicalCondition}.`,
        detalhes: [
          { label: "Horário", value: m.time },
          { label: "Via de administração", value: m.via }
        ]
      }
    }));

    setMeds(generatedMeds);
    
    const initialDone: Record<string, boolean> = {};
    generatedMeds.forEach(m => {
      initialDone[m.id] = false;
    });
    setMedsDone(initialDone);
    
    setHasCompletedRegistration(true);
  };

  const handleResetRegistration = () => {
    if (confirm("Deseja apagar o cadastro atual e reiniciar o aplicativo?")) {
      setHasCompletedRegistration(false);
      setMeds([]);
      setMedsDone({});
      setPacienteProfile({ name: "Paciente", avatar: "" });
      setActiveTab("inicio");
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 0 || !parts[0]) return "PA";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const nameToDisplay = pacienteProfile.name || "Paciente";

  return (
    <div className="view active">
      <div className="hero-strip">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div className="avatar" style={{ background: "rgba(255,255,255,0.2)", color: "white", width: "48px", height: "48px", fontSize: pacienteProfile.avatar ? "28px" : "18px" }}>
            {pacienteProfile.avatar || getInitials(nameToDisplay)}
          </div>
          <div className="hero-title" style={{ margin: 0 }}>
            Olá, <span>{nameToDisplay}</span>
          </div>
        </div>
        <div className="hero-sub">
          Bem-vinda ao Conecta Farma. Aqui você não está sozinha no seu tratamento — acompanhamos você todos os dias.
        </div>
        <div className="hero-tags">
          <div className="hero-tag">💊 CEAF Ativo</div>
          <div className="hero-tag">🟢 {meds.length} medicamentos</div>
        </div>
      </div>

      <div className="app-shell">
        {/* PHONE */}
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
              {hasCompletedRegistration && (
                <button
                  className="btn btn-sm"
                  onClick={handleResetRegistration}
                  style={{ alignSelf: "flex-start", zIndex: 10, background: "var(--red)", color: "white" }}
                >
                  🔄 Reiniciar Cadastro
                </button>
              )}
            </div>
          )}
          <div className={`phone-frame ${isFullscreen ? 'fullscreen' : ''}`}>
            <div className="phone-notch">
              <div className="notch-speaker"></div>
              <div className="notch-cam"></div>
            </div>
            
            <div className="phone-screen">
              {!hasCompletedRegistration ? (
                <CadastroScreen onComplete={handleCadastroComplete} />
              ) : (
                <>
                  <div className="screen-header">
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
                      {pacienteProfile.name ? `Minha Farmacoterapia (${pacienteProfile.name})` : "Minha Farmacoterapia"}
                    </div>
                    <div className="screen-subtitle">Hoje, Domingo · 26 abr 2026</div>
                  </div>

                  {/* Body */}
                  <div className="screen-body">
                    <div key={activeTab} className="tab-content">
                      {activeTab === "inicio" && <InicioTab onNavigate={(tab) => setActiveTab(tab)} />}
                      {activeTab === "meds" && <MedsTab />}
                      {activeTab === "guia" && <GuiaTab />}
                      {activeTab === "chat" && <ChatTab />}
                      {activeTab === "perfil" && <PerfilTab onReset={handleResetRegistration} />}
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="bottom-nav">
                    <div className={`nav-item ${activeTab === "inicio" ? "active" : ""}`} onClick={() => setActiveTab("inicio")}>
                      <div className="nav-icon">🏠</div>
                      <div className="nav-label">Início</div>
                      {activeTab === "inicio" && <div className="nav-dot"></div>}
                    </div>
                    <div className={`nav-item ${activeTab === "meds" ? "active" : ""}`} onClick={() => setActiveTab("meds")}>
                      <div className="nav-icon">💊</div>
                      <div className="nav-label">Meds</div>
                      {activeTab === "meds" && <div className="nav-dot"></div>}
                    </div>
                    <div className={`nav-item ${activeTab === "guia" ? "active" : ""}`} onClick={() => setActiveTab("guia")}>
                      <div className="nav-icon">📖</div>
                      <div className="nav-label">Guia</div>
                      {activeTab === "guia" && <div className="nav-dot"></div>}
                    </div>
                    <div className={`nav-item ${activeTab === "chat" ? "active" : ""}`} onClick={() => setActiveTab("chat")}>
                      <div className="nav-icon">💬</div>
                      <div className="nav-label">Chat</div>
                      {activeTab === "chat" && <div className="nav-dot"></div>}
                    </div>
                    <div className={`nav-item ${activeTab === "perfil" ? "active" : ""}`} onClick={() => setActiveTab("perfil")}>
                      <div className="nav-icon">👤</div>
                      <div className="nav-label">Perfil</div>
                      {activeTab === "perfil" && <div className="nav-dot"></div>}
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="side-panel">
          <div className="panel-card">
            <div className="panel-title">🙋 Funcionalidades do Paciente</div>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dbeafe" }}>
                  🔐
                </div>
                <div>
                  <div className="feat-title">Cadastro integrado ao SUS</div>
                  <div className="feat-desc">
                    Login com dados já existentes no sistema estadual (Farmácia Digital PE)
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#fef3c7" }}>
                  🔔
                </div>
                <div>
                  <div className="feat-title">Lembretes inteligentes</div>
                  <div className="feat-desc">
                    Notificações personalizadas com horário, dose e instruções de uso
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#f3e8ff" }}>
                  ✅
                </div>
                <div>
                  <div className="feat-title">Registro de Adesão</div>
                  <div className="feat-desc">
                    Check diário para confirmar uso; gera dashboard de adesão semanal/mensal
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#ffe4e6" }}>
                  🚨
                </div>
                <div>
                  <div className="feat-title">Relato de Efeitos Adversos</div>
                  <div className="feat-desc">
                    Reporte sintomas ao farmacêutico em tempo real com categorias pré-definidas
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dbeafe" }}>
                  📖
                </div>
                <div>
                  <div className="feat-title">Guia do Medicamento CEAF</div>
                  <div className="feat-desc">
                    Bula simplificada e interativa com áudio, vídeo e linguagem acessível
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#dbeafe" }}>
                  🏥
                </div>
                <div>
                  <div className="feat-title">Teleconsulta Farmacêutica</div>
                  <div className="feat-desc">
                    Vídeo, áudio ou chat — agendamento e atendimento na mesma plataforma
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#fef3c7" }}>
                  ♿
                </div>
                <div>
                  <div className="feat-title">Modo Acessibilidade</div>
                  <div className="feat-desc">
                    Voz, Libras, fonte maior — inclusão para idosos, PcD visual e auditiva
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feat-icon" style={{ background: "#f3e8ff" }}>
                  👨‍👩‍👧
                </div>
                <div>
                  <div className="feat-title">Modo Cuidador</div>
                  <div className="feat-desc">
                    Familiar ou responsável pode monitorar e receber alertas pelo mesmo app
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import InicioTab from "./paciente/InicioTab";
import MedsTab from "./paciente/MedsTab";
import GuiaTab from "./paciente/GuiaTab";
import ChatTab from "./paciente/ChatTab";
import PerfilTab from "./paciente/PerfilTab";
import { initialMeds, Medicine } from "../types";

export interface UserProfile {
  name: string;
  avatar: string;
}

export default function PacienteView() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Shared state
  const [profile, setProfile] = useState<UserProfile>({ name: "Maria Silva", avatar: "" });
  const [meds, setMeds] = useState<Medicine[]>(initialMeds);
  const [medsDone, setMedsDone] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    initialMeds.filter(m => m.isDaily).forEach((m, idx) => {
      initial[m.id] = idx < 2;
    });
    return initial;
  });

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="view active">
      <div className="hero-strip">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div className="avatar" style={{ background: "rgba(255,255,255,0.2)", color: "white", width: "48px", height: "48px", fontSize: profile.avatar ? "28px" : "18px" }}>
            {profile.avatar || getInitials(profile.name)}
          </div>
          <div className="hero-title" style={{ margin: 0 }}>
            Olá, <span>{profile.name}</span>
          </div>
        </div>
        <div className="hero-sub">
          Bem-vinda ao Conecta Farma. Aqui você não está sozinha no seu tratamento — acompanhamos você
          todos os dias.
        </div>
        <div className="hero-tags">
          <div className="hero-tag">💊 CEAF Ativo</div>
          <div className="hero-tag">📅 Renovação: 15 Mai</div>
          <div className="hero-tag">🟢 {meds.length} medicamentos</div>
        </div>
      </div>

      <div className="app-shell">
        {/* PHONE */}
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
            <div className="notch-speaker"></div>
            <div className="notch-cam"></div>
          </div>
          <div className="phone-screen">
            {/* Header */}
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
              <div className="screen-title">Minha Farmacoterapia</div>
              <div className="screen-subtitle">Hoje, Domingo · 26 abr 2026</div>
            </div>

            {/* Body */}
            <div className="screen-body">
              <div key={activeTab} className="tab-content">
                {activeTab === "inicio" && <InicioTab meds={meds} medsDone={medsDone} setMedsDone={setMedsDone} onNavigate={(tab) => setActiveTab(tab)} />}
                {activeTab === "meds" && <MedsTab meds={meds} setMeds={setMeds} />}
                {activeTab === "guia" && <GuiaTab />}
                {activeTab === "chat" && <ChatTab profile={profile} />}
                {activeTab === "perfil" && <PerfilTab profile={profile} setProfile={setProfile} meds={meds} setMeds={setMeds} setMedsDone={setMedsDone} />}
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
                <div className="feat-icon" style={{ background: "#dcfce7" }}>
                  💊
                </div>
                <div>
                  <div className="feat-title">Minha Farmacoterapia</div>
                  <div className="feat-desc">
                    Lista completa com posologia, orientações e histórico de dispensação do CEAF
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
                <div className="feat-icon" style={{ background: "#dcfce7" }}>
                  🎥
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

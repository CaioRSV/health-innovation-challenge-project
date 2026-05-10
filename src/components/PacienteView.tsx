"use client";

import React, { useState } from "react";
import InicioTab from "./paciente/InicioTab";
import MedsTab from "./paciente/MedsTab";
import GuiaTab from "./paciente/GuiaTab";
import ChatTab from "./paciente/ChatTab";
import PerfilTab from "./paciente/PerfilTab";

export default function PacienteView() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="view active">
      <div className="hero-strip">
        <div className="hero-title">
          Olá, <span>Maria Silva</span> 👋
        </div>
        <div className="hero-sub">
          Bem-vinda ao Conecta Farma. Aqui você não está sozinha no seu tratamento — acompanhamos você
          todos os dias.
        </div>
        <div className="hero-tags">
          <div className="hero-tag">💊 CEAF Ativo</div>
          <div className="hero-tag">📅 Renovação: 15 Mai</div>
          <div className="hero-tag">🟢 3 medicamentos</div>
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
                {activeTab === "inicio" && <InicioTab />}
                {activeTab === "meds" && <MedsTab />}
                {activeTab === "guia" && <GuiaTab />}
                {activeTab === "chat" && <ChatTab />}
                {activeTab === "perfil" && <PerfilTab />}
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

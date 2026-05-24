import React, { useState } from "react";
import { Medicine } from "../../types";
import { RegistrationData } from "../PacienteView";

interface UserProfile {
  name: string;
  avatar: string;
}

interface PerfilTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  meds: Medicine[];
  setMeds: React.Dispatch<React.SetStateAction<Medicine[]>>;
  setMedsDone: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  registration?: RegistrationData | null;
  onReset?: () => void;
}

const availableAvatars = [
  "👩🏽‍🦱", "👩🏼‍🦳", "👨🏻", "👨🏿‍🦲", "🧑🏽", "👧🏻", "👦🏾", "👵🏼", "🧔🏻‍♂️", "🧕🏽", 
  "👤", "🗣️", "🐱", "🐶", "🦊", "🐼", "🐻", "🦁", 
  "🌸", "🍀", "💎", "⭐", "🔥", "💙", "🌈", "💊"
];

const predeterminedMeds: Medicine[] = [
  {
    id: "p1",
    name: "Sinvastatina",
    dosage: "20mg",
    stock: 30,
    reserved: false,
    isDaily: true,
    info: {
      categoria: "Oral",
      descricao: "Medicamento usado para reduzir os níveis de colesterol e triglicerídeos no sangue.",
      detalhes: [
        { label: "⏱️ Uso", value: "Tomar à noite, após o jantar." }
      ]
    }
  },
  {
    id: "p2",
    name: "AAS Protect",
    dosage: "100mg",
    stock: 60,
    reserved: false,
    isDaily: true,
    info: {
      categoria: "Oral",
      descricao: "Afina o sangue e previne a formação de coágulos nos vasos sanguíneos.",
      detalhes: [
        { label: "🍽️ Dica", value: "Tomar junto com as refeições para evitar irritação no estômago." }
      ]
    }
  },
  {
    id: "p3",
    name: "Glibenclamida",
    dosage: "5mg",
    stock: 45,
    reserved: false,
    isDaily: true,
    info: {
      categoria: "Oral",
      descricao: "Antidiabético que estimula o pâncreas a produzir mais insulina.",
      detalhes: [
        { label: "⏱️ Uso", value: "Tomar cerca de 30 minutos antes das refeições." },
      ],
      alerta: "Risco de hipoglicemia se pular refeições. Leve sempre um sachê de açúcar ou bala consigo."
    }
  }
];

export default function PerfilTab({ profile, setProfile, meds, setMeds, setMedsDone, isDarkMode, setIsDarkMode, registration, onReset }: PerfilTabProps) {
  const [editingName, setEditingName] = useState(profile.name);
  const [editingAvatar, setEditingAvatar] = useState(profile.avatar);
  const [showAvatarSelect, setShowAvatarSelect] = useState(false);
  const [showAddMed, setShowAddMed] = useState(false);

  const handleSaveProfile = () => {
    setProfile({ name: editingName, avatar: editingAvatar });
    setShowAvatarSelect(false);
  };

  const toggleDaily = (id: string) => {
    setMeds((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newIsDaily = !m.isDaily;
          if (!newIsDaily) {
            setMedsDone((prevDone) => {
              const newDone = { ...prevDone };
              delete newDone[id];
              return newDone;
            });
          }
          return { ...m, isDaily: newIsDaily };
        }
        return m;
      })
    );
  };

  const deleteMed = (id: string) => {
    if (confirm("Remover este medicamento?")) {
      setMeds((prev) => prev.filter((m) => m.id !== id));
      setMedsDone((prevDone) => {
        const newDone = { ...prevDone };
        delete newDone[id];
        return newDone;
      });
    }
  };

  const addMed = (med: Medicine) => {
    setMeds((prev) => [...prev, med]);
    setShowAddMed(false);
  };

  const medsToAdd = predeterminedMeds.filter(
    (pMed) => !meds.some((m) => m.id === pMed.id)
  );

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      
      {/* SEÇÃO 1: PERFIL */}
      <div className="card">
        <div className="card-title">👤 Meu Perfil</div>
        
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
              {editingAvatar || getInitials(editingName || "User")}
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
                  {getInitials(editingName || "User")}
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
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--gray-200)", background: "var(--white)", color: "var(--gray-900)", fontFamily: "var(--font-nunito)", fontSize: "16px" }}
            />
          </div>

          <button className="btn btn-primary btn-full" onClick={handleSaveProfile} style={{ marginTop: "4px", borderRadius: "30px" }}>
            Atualizar Perfil
          </button>
        </div>
      </div>

      {/* SEÇÃO 1.2: DADOS CLÍNICOS (Apenas se cadastrado) */}
      {registration && (
        <div className="card">
          <div className="card-title">📋 Informações Clínicas</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px", fontSize: "13px", color: "var(--gray-700)" }}>
            <div>
              <strong>Modo de Uso:</strong> {registration.role === "cuidador" ? "Cuidador / Responsável" : "Paciente"}
            </div>
            {registration.role === "cuidador" ? (
              <>
                <div>
                  <strong>Cuidador:</strong> {registration.userName} <span style={{ color: "var(--gray-500)", fontSize: "11px" }}>(Nasc. {registration.userDob})</span>
                </div>
                <div>
                  <strong>Paciente:</strong> {registration.patientName} <span style={{ color: "var(--gray-500)", fontSize: "11px" }}>(Nasc. {registration.patientDob})</span>
                </div>
              </>
            ) : (
              <div>
                <strong>Paciente:</strong> {registration.userName} <span style={{ color: "var(--gray-500)", fontSize: "11px" }}>(Nasc. {registration.userDob})</span>
              </div>
            )}
            <div style={{ borderTop: "1px dashed var(--gray-100)", paddingTop: "8px", marginTop: "4px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", display: "block" }}>ALTURA DO PACIENTE</span>
                <strong>{registration.height} cm</strong>
              </div>
              <div>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", display: "block" }}>PESO DO PACIENTE</span>
                <strong>{registration.weight} kg</strong>
              </div>
            </div>
            <div style={{ borderTop: "1px dashed var(--gray-100)", paddingTop: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", display: "block" }}>CONDIÇÃO CLÍNICA</span>
              <strong>{registration.clinicalCondition}</strong>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 1.5: ACESSIBILIDADE E TEMA */}
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
          >
            ☀️ Claro
          </button>
          <button 
            className={`btn btn-sm btn-full ${isDarkMode ? "btn-yellow" : "btn-outline"}`}
            onClick={() => setIsDarkMode(true)}
            style={{ borderRadius: "20px" }}
          >
            🌙 Escuro (Acessibilidade)
          </button>
        </div>
      </div>

      {/* SEÇÃO 2: MEDICAMENTOS */}
      <div className="card">
        <div className="card-title" style={{ justifyContent: "space-between", display: "flex" }}>
          <span>{registration?.role === "cuidador" ? `💊 Medicamentos de ${registration.patientName}` : "💊 Meus Medicamentos"}</span>
          <button className="btn btn-yellow btn-sm" onClick={() => setShowAddMed(!showAddMed)}>
            {showAddMed ? "Cancelar" : "+ Adicionar"}
          </button>
        </div>
        <div style={{ fontSize: "11px", color: "var(--gray-500)", marginBottom: "16px", lineHeight: "1.4" }}>
          {registration?.role === "cuidador"
            ? `Gerencie o tratamento de ${registration.patientName}. Medicamentos marcados como "Uso Diário" aparecem no checklist diário na aba Início.`
            : "Gerencie seu tratamento. Medicamentos marcados como \"Uso Diário\" aparecem no seu checklist diário na aba Início."}
        </div>

        {/* Modal/Lista para Adicionar Novos Medicamentos */}
        {showAddMed && (
          <div style={{ background: "var(--yellow-light)", border: "1px solid var(--yellow)", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--yellow-dark)", marginBottom: "12px" }}>
              Selecione o medicamento para adicionar:
            </div>
            {medsToAdd.length === 0 ? (
              <div style={{ fontSize: "12px", color: "var(--gray-500)" }}>Todos os medicamentos disponíveis já foram adicionados.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {medsToAdd.map(m => (
                  <div key={m.id} style={{ background: "var(--white)", padding: "10px 14px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 800 }}>{m.name}</div>
                      <div style={{ fontSize: "11px", color: "var(--gray-500)" }}>{m.dosage}</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => addMed(m)} style={{ borderRadius: "20px" }}>
                      Adicionar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {meds.length === 0 ? (
            <div style={{ fontSize: "12px", color: "var(--gray-500)", textAlign: "center", padding: "16px 0" }}>Nenhum medicamento cadastrado.</div>
          ) : (
            meds.map((med) => (
              <div key={med.id} style={{ border: "1px solid var(--gray-200)", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", gap: "10px", background: "var(--white)" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--blue-dark)" }}>{med.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--gray-500)", marginTop: "2px" }}>{med.dosage} • {med.info.categoria}</div>
                  </div>
                  <button 
                    onClick={() => deleteMed(med.id)}
                    style={{ background: "var(--gray-100)", color: "var(--gray-500)", border: "none", borderRadius: "6px", width: "24px", height: "24px", cursor: "pointer", fontWeight: "bold" }}
                    title="Remover Medicamento"
                  >
                    ×
                  </button>
                </div>

                <div style={{ borderTop: "1px dashed var(--gray-100)", paddingTop: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--gray-700)" }}>Uso Diário?</span>
                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative" }}>
                    <input 
                      type="checkbox" 
                      checked={med.isDaily} 
                      onChange={() => toggleDaily(med.id)}
                      style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", cursor: "pointer", zIndex: 10 }}
                    />
                    <div style={{ 
                      width: "36px", height: "20px", 
                      background: med.isDaily ? "var(--green)" : "var(--gray-300)", 
                      borderRadius: "20px", 
                      position: "relative",
                      transition: "0.2s"
                    }}>
                      <div style={{
                        width: "16px", height: "16px",
                        background: "white",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "2px",
                        left: med.isDaily ? "18px" : "2px",
                        transition: "0.2s",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                      }} />
                    </div>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SEÇÃO 3: REINICIAR */}
      {onReset && registration && (
        <div style={{ marginTop: "8px", paddingBottom: "16px" }}>
          <button 
            className="btn btn-full"
            onClick={onReset}
            style={{ 
              background: "var(--red)", 
              color: "white", 
              borderRadius: "30px",
              border: "none",
              fontWeight: "bold",
              padding: "12px",
              cursor: "pointer",
              fontSize: "13px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            🔄 Reiniciar Aplicativo & Cadastro
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Medicine, initialMeds } from "../types";

export interface UserProfile {
  name: string;
  avatar: string;
  cpf?: string;
  crf?: string;
  farmacia?: string;
  dob?: string;
  height?: string;
  weight?: string;
  clinicalCondition?: string;
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user" | "paciente" | "farmaceutico" | "system";
  text: string;
  timestamp: string;
  options?: { label: string; value: string }[];
}

export interface Teleconsulta {
  id: string;
  doctor: string;
  date: string;
  time: string;
}

export interface Candidato {
  id: number;
  nome: string;
  crf: string;
  farmacia: string;
  formacao: string;
  status: string;
}

export interface FarmaceuticoMock {
  id: number;
  nome: string;
  crf: string;
  farmacia: string;
  avaliacao: string;
  pacientes: number;
}

export interface PacienteMock {
  id: number;
  nome: string;
  cpf: string;
  status: string;
  medicamento: string;
  risco: string;
}

export interface ChatInboxMock {
  id: string;
  patient: string;
  type: string;
  title: string;
  timestamp: string;
  status: string;
  details: string;
  messages: { sender: string; text: string }[];
}

export interface AgendamentoMock {
  id: string;
  date: string;
  time: string;
  patient: string;
  description: string;
  status: string;
  duration: number;
}

interface AppStoreContextType {
  // Profiles
  pacienteProfile: UserProfile;
  setPacienteProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  
  farmaceuticoProfile: UserProfile;
  setFarmaceuticoProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;

  // Meds
  meds: Medicine[];
  setMeds: (meds: Medicine[] | ((prev: Medicine[]) => Medicine[])) => void;
  
  medsDone: Record<string, boolean>;
  setMedsDone: (medsDone: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;

  // Chat/Alertas
  chatMessages: ChatMessage[];
  setChatMessages: (msgs: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;

  // Agendamentos
  teleconsultas: Teleconsulta[];
  setTeleconsultas: (tcs: Teleconsulta[] | ((prev: Teleconsulta[]) => Teleconsulta[])) => void;

  // Gestor Data
  candidatos: Candidato[];
  setCandidatos: (cands: Candidato[] | ((prev: Candidato[]) => Candidato[])) => void;
  
  farmaceuticosAtivos: FarmaceuticoMock[];
  setFarmaceuticosAtivos: (farms: FarmaceuticoMock[] | ((prev: FarmaceuticoMock[]) => FarmaceuticoMock[])) => void;

  hasCompletedRegistration: boolean;
  setHasCompletedRegistration: (val: boolean | ((prev: boolean) => boolean)) => void;

  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;

  pacientes: PacienteMock[];
  setPacientes: (p: PacienteMock[] | ((prev: PacienteMock[]) => PacienteMock[])) => void;

  farmaciaChats: ChatInboxMock[];
  setFarmaciaChats: (c: ChatInboxMock[] | ((prev: ChatInboxMock[]) => ChatInboxMock[])) => void;

  farmaciaAgendamentos: AgendamentoMock[];
  setFarmaciaAgendamentos: (a: AgendamentoMock[] | ((prev: AgendamentoMock[]) => AgendamentoMock[])) => void;
}

const AppStoreContext = createContext<AppStoreContextType | undefined>(undefined);

const INITIAL_CANDIDATOS: Candidato[] = [
  { id: 101, nome: "Dr. Marcos Silva", crf: "1122/PE", farmacia: "Farmácia São João", formacao: "UFPE - Especialista em Farmácia Clínica", status: "Pendente" },
  { id: 102, nome: "Dra. Sofia Mendes", crf: "3344/PE", farmacia: "Farmácia Vida", formacao: "UPE - Mestrado em Saúde Pública", status: "Pendente" },
];

const INITIAL_FARMACEUTICOS: FarmaceuticoMock[] = [
  { id: 1, nome: "Dra. Ana Costa", crf: "1234/PE", farmacia: "Farmácia Central", avaliacao: "4.9/5", pacientes: 124 },
  { id: 2, nome: "Dr. Pedro Alves", crf: "5678/PE", farmacia: "Farmácia Zona Sul", avaliacao: "4.7/5", pacientes: 89 },
  { id: 3, nome: "Dra. Júlia Lima", crf: "9012/PE", farmacia: "Farmácia Metropolitana", avaliacao: "4.8/5", pacientes: 156 },
];

const INITIAL_PACIENTES: PacienteMock[] = [
  { id: 1, nome: "João Silva", cpf: "111.222.333-44", status: "Ativo", medicamento: "Adalimumabe", risco: "Alto" },
  { id: 2, nome: "Maria Oliveira", cpf: "555.666.777-88", status: "Em Risco", medicamento: "Infliximabe", risco: "Médio" },
  { id: 3, nome: "Carlos Santos", cpf: "999.000.111-22", status: "Ativo", medicamento: "Etanercepte", risco: "Baixo" },
];

export const AppStoreProvider = ({ children }: { children: ReactNode }) => {
  const [pacienteProfile, setPacienteProfile] = useLocalStorage<UserProfile>("app_pacienteProfile", {
    name: "João Silva",
    avatar: "",
    cpf: "111.222.333-44",
    dob: "1985-04-12",
    height: "175",
    weight: "80",
    clinicalCondition: "Diabetes Tipo 1"
  });

  const [farmaceuticoProfile, setFarmaceuticoProfile] = useLocalStorage<UserProfile>("app_farmaceuticoProfile", {
    name: "Dra. Ana Costa",
    avatar: "",
    crf: "1234/PE",
    farmacia: "Farmácia Central"
  });

  const [meds, setMeds] = useLocalStorage<Medicine[]>("app_meds", initialMeds);
  const [medsDone, setMedsDone] = useLocalStorage<Record<string, boolean>>("app_medsDone", {});
  
  const [chatMessages, setChatMessages] = useLocalStorage<ChatMessage[]>("app_chatMessages", [
    { 
      id: "welcome", 
      sender: "bot", 
      text: "Olá! Sou o Assistente Conecta Farma. Como posso te ajudar hoje?\n\nDigite o número correspondente ou clique em uma opção:", 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: [
        { label: "1. Relatar Sintomas", value: "1" },
        { label: "2. Dúvidas & Ajuda (Falar com Profissional)", value: "2" },
        { label: "3. Informações / FAQ", value: "3" }
      ]
    }
  ]);

  const [teleconsultas, setTeleconsultas] = useLocalStorage<Teleconsulta[]>("app_teleconsultas", [
    { id: "tc1", doctor: "Dra. Ana Costa", date: "2026-05-30", time: "14:30" }
  ]);

  const [candidatos, setCandidatos] = useLocalStorage<Candidato[]>("app_candidatos", INITIAL_CANDIDATOS);
  const [farmaceuticosAtivos, setFarmaceuticosAtivos] = useLocalStorage<FarmaceuticoMock[]>("app_farmaceuticosAtivos", INITIAL_FARMACEUTICOS);
  const [hasCompletedRegistration, setHasCompletedRegistration] = useLocalStorage<boolean>("app_hasCompletedRegistration", false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>("app_isDarkMode", false);
  const [pacientes, setPacientes] = useLocalStorage<PacienteMock[]>("app_pacientes", INITIAL_PACIENTES);

  const [farmaciaChats, setFarmaciaChats] = useLocalStorage<ChatInboxMock[]>("app_farmaciaChats", [
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

  const [farmaciaAgendamentos, setFarmaciaAgendamentos] = useLocalStorage<AgendamentoMock[]>("app_farmaciaAgendamentos", [
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

  return (
    <AppStoreContext.Provider value={{
      pacienteProfile, setPacienteProfile,
      farmaceuticoProfile, setFarmaceuticoProfile,
      meds, setMeds,
      medsDone, setMedsDone,
      chatMessages, setChatMessages,
      teleconsultas, setTeleconsultas,
      candidatos, setCandidatos,
      farmaceuticosAtivos, setFarmaceuticosAtivos,
      hasCompletedRegistration, setHasCompletedRegistration,
      isDarkMode, setIsDarkMode,
      pacientes, setPacientes,
      farmaciaChats, setFarmaciaChats,
      farmaciaAgendamentos, setFarmaciaAgendamentos
    }}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within an AppStoreProvider");
  }
  return context;
};

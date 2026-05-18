export interface MedicineInfo {
  categoria: "Oral" | "Injetável" | "Insumo";
  descricao: string;
  detalhes: { label: string; value: string }[];
  alerta?: string;
  rodizio?: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  stock: number;
  reserved: boolean;
  isDaily: boolean; // NOVO: indica se é medicamento de uso diário
  info: MedicineInfo;
}

export const initialMeds: Medicine[] = [
  {
    id: "m6",
    name: "Insulina NPH (Humana)",
    dosage: "100 UI/mL",
    stock: 25,
    reserved: false,
    isDaily: true,
    info: {
      categoria: "Injetável",
      descricao: "A Insulina NPH tem ação intermediária e é essencial no tratamento do Diabetes Mellitus. Sua aplicação diária é obrigatória, substituindo a produção natural do pâncreas para garantir que a glicose entre nas células.",
      detalhes: [
        { label: "🧠 Causa", value: "Autoimune — o próprio corpo destrói as células do pâncreas" },
        { label: "👶 Quem afeta", value: "Principalmente crianças e jovens (DM1), ou progressão de DM2" },
        { label: "💉 Tratamento", value: "Insulina diária obrigatória. Ação prolongada basal." },
        { label: "📊 Controle", value: "Glicemia capilar ou sensor + ajuste de dose + dieta" },
      ],
      alerta: "Para os pais: Seu filho não desenvolveu diabetes por comer muito doce. É uma doença autoimune — ninguém tem culpa. O foco agora é controle e rodízio!",
      rodizio: true,
    }
  },
  {
    id: "m1",
    name: "Losartana Potássica",
    dosage: "50mg",
    stock: 120,
    reserved: false,
    isDaily: true,
    info: {
      categoria: "Oral",
      descricao: "Medicamento anti-hipertensivo usado para tratar pressão alta e ajudar a proteger os rins, muito comum em pacientes diabéticos.",
      detalhes: [
        { label: "❤️ Indicação", value: "Hipertensão arterial e insuficiência cardíaca" },
        { label: "⏱️ Uso", value: "Uso contínuo e diário. Tomar com água." },
      ],
      alerta: "Nunca interrompa o uso abruptamente, mesmo que a sua pressão pareça normal."
    }
  },
  {
    id: "m2",
    name: "Cloridrato de Metformina",
    dosage: "500mg",
    stock: 45,
    reserved: false,
    isDaily: true,
    info: {
      categoria: "Oral",
      descricao: "Medicamento antidiabético oral que ajuda a reduzir o nível de açúcar no sangue. Reduz a produção de glicose no fígado.",
      detalhes: [
        { label: "🩺 Indicação", value: "Diabetes Tipo 2, Síndrome dos Ovários Policísticos" },
        { label: "🍽️ Dica", value: "Tomar durante ou após as refeições para evitar desconforto gástrico." },
      ]
    }
  },
  {
    id: "m3",
    name: "Adalimumabe",
    dosage: "40mg",
    stock: 2,
    reserved: false,
    isDaily: false, // Quinzenal
    info: {
      categoria: "Injetável",
      descricao: "Medicamento biológico usado para tratar doenças autoimunes graves.",
      detalhes: [
        { label: "⏱️ Uso", value: "Injeção subcutânea quinzenal." },
      ]
    }
  }
];

import React, { useState, useEffect, useRef } from "react";

interface UserProfile {
  name: string;
  avatar: string;
}

interface ChatTabProps {
  profile?: UserProfile;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: { label: string; value: string }[];
}

const getInitialMessages = (name: string): ChatMessage[] => [
  {
    id: "welcome",
    sender: "bot",
    text: `Olá, ${name}! Sou o Assistente Conecta Farma. Como posso te ajudar hoje?\n\nDigite o número correspondente ou clique em uma opção:`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    options: [
      { label: "1. Relatar Sintomas", value: "1" },
      { label: "2. Dúvidas & Ajuda (Falar com Profissional)", value: "2" },
      { label: "3. Informações / FAQ", value: "3" }
    ]
  }
];

export default function ChatTab({ profile = { name: "Paciente", avatar: "" } }: ChatTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(profile.name));
  const [conversationState, setConversationState] = useState<"menu" | "sintomas_opcao" | "sintomas_detalhes" | "suporte_opcao" | "faq_opcao">("menu");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      processBotResponse(text);
    }, 1200);
  };

  const processBotResponse = (userText: string) => {
    const textNorm = userText.trim().toLowerCase();
    const currentTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Command to return to menu
    if (textNorm === "menu" || textNorm === "cancelar" || textNorm === "voltar" || textNorm === "6") {
      setConversationState("menu");
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Retornamos ao menu principal. Como posso te ajudar hoje?",
          timestamp: currentTimestamp,
          options: [
            { label: "1. Relatar Sintomas", value: "1" },
            { label: "2. Dúvidas & Ajuda (Falar com Profissional)", value: "2" },
            { label: "3. Informações / FAQ", value: "3" }
          ]
        }
      ]);
      return;
    }

    if (conversationState === "menu") {
      if (textNorm === "1" || textNorm.includes("sintoma") || textNorm.includes("relatar")) {
        setConversationState("sintomas_opcao");
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Selecione o sintoma que você está sentindo:\n\nDigite o número ou clique na opção:",
            timestamp: currentTimestamp,
            options: [
              { label: "1. 🤢 Enjoo / Náusea", value: "nausea" },
              { label: "2. 😵 Tontura / Vertigem", value: "tontura" },
              { label: "3. 😴 Cansaço excessivo", value: "cansaco" },
              { label: "4. 🤯 Dor de cabeça", value: "cefaleia" },
              { label: "5. 🔴 Manchas na pele / Coceira", value: "pele" },
              { label: "6. ◀ Voltar ao Menu", value: "menu" }
            ]
          }
        ]);
      } else if (textNorm === "2" || textNorm.includes("falar") || textNorm.includes("profissional") || textNorm.includes("ajuda") || textNorm.includes("duvida")) {
        setConversationState("suporte_opcao");
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Selecione a categoria de ajuda:\n\nDigite o número ou clique na opção:",
            timestamp: currentTimestamp,
            options: [
              { label: "1. 🩺 Tirar dúvida sobre dosagem", value: "dosagem" },
              { label: "2. 📅 Dificuldade com agendamento", value: "agendamento" },
              { label: "3. 🚚 Problema na retirada (CEAF)", value: "ceaf" },
              { label: "4. ◀ Voltar ao Menu", value: "menu" }
            ]
          }
        ]);
      } else if (textNorm === "3" || textNorm.includes("faq") || textNorm.includes("informac") || textNorm.includes("dúvida") || textNorm.includes("duvida")) {
        setConversationState("faq_opcao");
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Selecione a sua dúvida para respondermos:\n\nDigite o número ou clique na opção:",
            timestamp: currentTimestamp,
            options: [
              { label: "1. Como renovar receita?", value: "faq_receita" },
              { label: "2. Horário da teleconsulta?", value: "faq_horario" },
              { label: "3. Como funciona a retirada?", value: "faq_retirada" },
              { label: "4. ◀ Voltar ao Menu", value: "menu" }
            ]
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Mensagem encaminhada para um profissional da área, aguarde o contato ou clique em uma das opções abaixo:",
            timestamp: currentTimestamp,
            options: [
              { label: "1. Relatar Sintomas", value: "1" },
              { label: "2. Dúvidas & Ajuda (Falar com Profissional)", value: "2" },
              { label: "3. Informações / FAQ", value: "3" }
            ]
          }
        ]);
      }
    } else if (conversationState === "sintomas_opcao") {
      const optionsMap: Record<string, string> = {
        "1": "🤢 Enjoo / Náusea",
        "2": "😵 Tontura / Vertigem",
        "3": "😴 Cansaço excessivo",
        "4": "🤯 Dor de cabeça",
        "5": "🔴 Manchas na pele / Coceira",
        "nausea": "🤢 Enjoo / Náusea",
        "tontura": "😵 Tontura / Vertigem",
        "cansaco": "😴 Cansaço excessivo",
        "cefaleia": "🤯 Dor de cabeça",
        "pele": "🔴 Manchas na pele / Coceira"
      };

      const selected = optionsMap[textNorm];
      if (selected) {
        setSelectedSymptom(selected);
        setConversationState("sintomas_detalhes");
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: `Você selecionou: *${selected}*.\n\nDeseja acrescentar mais detalhes ou descrever o que está sentindo?\n\nDigite sua descrição ou clique na opção abaixo para enviar diretamente:`,
            timestamp: currentTimestamp,
            options: [
              { label: "Não, enviar relato agora", value: "skip" },
              { label: "◀ Voltar", value: "voltar_sintomas" }
            ]
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Mensagem encaminhada para um profissional da área, aguarde o contato ou clique em uma das opções de sintomas abaixo:",
            timestamp: currentTimestamp,
            options: [
              { label: "1. 🤢 Enjoo / Náusea", value: "nausea" },
              { label: "2. 😵 Tontura / Vertigem", value: "tontura" },
              { label: "3. 😴 Cansaço excessivo", value: "cansaco" },
              { label: "4. 🤯 Dor de cabeça", value: "cefaleia" },
              { label: "5. 🔴 Manchas na pele / Coceira", value: "pele" },
              { label: "6. ◀ Voltar ao Menu", value: "menu" }
            ]
          }
        ]);
      }
    } else if (conversationState === "sintomas_detalhes") {
      if (textNorm === "voltar_sintomas") {
        setConversationState("sintomas_opcao");
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Escolha o sintoma que você está sentindo:",
            timestamp: currentTimestamp,
            options: [
              { label: "1. 🤢 Enjoo / Náusea", value: "nausea" },
              { label: "2. 😵 Tontura / Vertigem", value: "tontura" },
              { label: "3. 😴 Cansaço excessivo", value: "cansaco" },
              { label: "4. 🤯 Dor de cabeça", value: "cefaleia" },
              { label: "5. 🔴 Manchas na pele / Coceira", value: "pele" },
              { label: "6. ◀ Voltar ao Menu", value: "menu" }
            ]
          }
        ]);
        return;
      }

      const detailsText = textNorm === "skip" || textNorm === "nao" || textNorm === "não" ? "" : userText;
      const descPart = detailsText ? `\n\nDetalhes adicionados: "${detailsText}"` : "";

      setConversationState("menu");
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: `✅ *Relato Enviado com sucesso!*\n\nSintoma registrado: *${selectedSymptom}*${descPart}\n\nSeu relato foi inserido no prontuário. Um farmacêutico foi alertado. Em caso de reações graves, procure a unidade de saúde mais próxima.\n\nRetornamos ao menu principal:`,
          timestamp: currentTimestamp,
          options: [
            { label: "1. Relatar Sintomas", value: "1" },
            { label: "2. Dúvidas & Ajuda (Falar com Profissional)", value: "2" },
            { label: "3. Informações / FAQ", value: "3" }
          ]
        }
      ]);
    } else if (conversationState === "suporte_opcao") {
      const optionsMap: Record<string, string> = {
        "1": "🩺 Tirar dúvida sobre dosagem",
        "2": "📅 Dificuldade com agendamento",
        "3": "🚚 Problema na retirada (CEAF)",
        "dosagem": "🩺 Tirar dúvida sobre dosagem",
        "agendamento": "📅 Dificuldade com agendamento",
        "ceaf": "🚚 Problema na retirada (CEAF)"
      };

      const selected = optionsMap[textNorm];
      if (selected) {
        setConversationState("menu");
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: `✅ *Solicitação Registrada!*\n\nCategoria: *${selected}*\n\nUm farmacêutico analisará sua solicitação e entrará em contato em breve.\n\nRetornando ao menu principal:`,
            timestamp: currentTimestamp,
            options: [
              { label: "1. Relatar Sintomas", value: "1" },
              { label: "2. Dúvidas & Ajuda (Falar com Profissional)", value: "2" },
              { label: "3. Informações / FAQ", value: "3" }
            ]
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Mensagem encaminhada para um profissional da área, aguarde o contato ou clique em uma das opções de ajuda abaixo:",
            timestamp: currentTimestamp,
            options: [
              { label: "1. 🩺 Tirar dúvida sobre dosagem", value: "dosagem" },
              { label: "2. 📅 Dificuldade com agendamento", value: "agendamento" },
              { label: "3. 🚚 Problema na retirada (CEAF)", value: "ceaf" },
              { label: "4. ◀ Voltar ao Menu", value: "menu" }
            ]
          }
        ]);
      }
    } else if (conversationState === "faq_opcao") {
      const faqs: Record<string, string> = {
        "1": "Para renovar sua receita, é necessário enviar um novo laudo de solicitação de medicamento (LME) preenchido pelo médico juntamente com a receita atualizada. Isso pode ser feito no app na aba Perfil ou diretamente na unidade do CEAF.",
        "2": "Para ver o horário de sua teleconsulta agendada, basta ir na aba Início. O botão para entrar na sala virtual ficará ativo 15 minutos antes do horário marcado.",
        "3": "A retirada de medicamentos do CEAF ocorre mensalmente. Certifique-se de comparecer na data agendada portando seu documento oficial com foto e o cartão do SUS.",
        "faq_receita": "Para renovar sua receita, é necessário enviar um novo laudo de solicitação de medicamento (LME) preenchido pelo médico juntamente com a receita atualizada. Isso pode ser feito no app na aba Perfil ou diretamente na unidade do CEAF.",
        "faq_horario": "Para ver o horário de sua teleconsulta agendada, basta ir na aba Início. O botão para entrar na sala virtual ficará ativo 15 minutos antes do horário marcado.",
        "faq_retirada": "A retirada de medicamentos do CEAF ocorre mensalmente. Certifique-se de comparecer na data agendada portando seu documento oficial com foto e o cartão do SUS."
      };

      if (textNorm === "faq_retry" || textNorm.includes("outra") || textNorm === "5") {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Selecione a sua dúvida:\n\nDigite o número ou clique na opção:",
            timestamp: currentTimestamp,
            options: [
              { label: "1. Como renovar receita?", value: "faq_receita" },
              { label: "2. Horário da teleconsulta?", value: "faq_horario" },
              { label: "3. Como funciona a retirada?", value: "faq_retirada" },
              { label: "4. ◀ Voltar ao Menu", value: "menu" }
            ]
          }
        ]);
        return;
      }

      const selectedAnswer = faqs[textNorm];
      if (selectedAnswer) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: `${selectedAnswer}\n\nDeseja tirar outra dúvida ou voltar ao menu principal?`,
            timestamp: currentTimestamp,
            options: [
              { label: "Ver outras dúvidas", value: "faq_retry" },
              { label: "◀ Voltar ao Menu Principal", value: "menu" }
            ]
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Mensagem encaminhada para um profissional da área, aguarde o contato ou selecione uma das opções abaixo:",
            timestamp: currentTimestamp,
            options: [
              { label: "1. Como renovar receita?", value: "faq_receita" },
              { label: "2. Horário da teleconsulta?", value: "faq_horario" },
              { label: "3. Como funciona a retirada?", value: "faq_retirada" },
              { label: "4. ◀ Voltar ao Menu", value: "menu" }
            ]
          }
        ]);
      }
    }
  };

  const formatText = (text: string) => {
    // Basic markdown for bold (*text* -> <strong>text</strong>)
    return text.split("\n").map((line, idx) => {
      let formatted = line;
      // Match bold tags
      const regex = /\*(.*?)\*/g;
      formatted = formatted.replace(regex, "<strong>$1</strong>");
      return <div key={idx} style={{ minHeight: "16px" }}>{formatted}</div>;
    });
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "calc(100% - 10px)",
      margin: "-16px",
      background: "var(--gray-50)",
      animation: "fadeIn 0.3s ease"
    }}>

      {/* Bot Chat Header */}
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
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px"
        }}>
          🤖
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "13px", fontWeight: 800 }}>Conecta Farma Bot</div>
          <div style={{ fontSize: "10px", opacity: 0.9, display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }}></span>
            Online
          </div>
        </div>
        <button
          onClick={() => {
            if (confirm("Deseja reiniciar a conversa?")) {
              setMessages(getInitialMessages(profile.name));
              setConversationState("menu");
            }
          }}
          style={{ background: "none", border: "none", color: "white", fontSize: "16px", cursor: "pointer", opacity: 0.8 }}
          title="Reiniciar chat"
        >
          🔄
        </button>
      </div>

      {/* Messages Thread Container */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "14px"
      }}>
        {messages.map((msg) => {
          const isBot = msg.sender === "bot";
          return (
            <div
              key={msg.id}
              style={{
                alignSelf: isBot ? "flex-start" : "flex-end",
                maxWidth: "85%",
                display: "flex",
                flexDirection: "column",
                gap: "2px"
              }}
            >
              {/* Message bubble */}
              <div style={{
                background: isBot
                  ? "var(--white)"
                  : "var(--blue-pale)", // Light green for user in dark/light mode matches blue-pale/green themes
                color: "var(--gray-900)",
                padding: "10px 14px",
                borderRadius: isBot ? "0px 16px 16px 16px" : "16px 0px 16px 16px",
                border: isBot ? "1px solid var(--gray-100)" : "1px solid var(--blue-light)",
                boxShadow: "var(--shadow-sm)",
                fontSize: "12.5px",
                lineHeight: "1.5",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
              }}>
                {formatText(msg.text)}

                {/* Timestamp */}
                <div style={{
                  fontSize: "9px",
                  color: "var(--gray-500)",
                  textAlign: "right",
                  marginTop: "4px"
                }}>
                  {msg.timestamp} {!isBot && <span style={{ color: "#3b82f6" }}>✓✓</span>}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{
            alignSelf: "flex-start",
            background: "var(--white)",
            border: "1px solid var(--gray-100)",
            padding: "10px 14px",
            borderRadius: "0px 16px 16px 16px",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}>
            <span style={{ fontSize: "11px", color: "var(--gray-500)", fontWeight: 700 }}>Digitando...</span>
            <div style={{ display: "flex", gap: "2px" }}>
              <span className="dot" style={{ width: "4px", height: "4px", background: "var(--gray-500)", borderRadius: "50%", animation: "bounce 1.4s infinite ease-in-out both" }}></span>
              <span className="dot" style={{ width: "4px", height: "4px", background: "var(--gray-500)", borderRadius: "50%", animation: "bounce 1.4s infinite ease-in-out both", animationDelay: "0.2s" }}></span>
              <span className="dot" style={{ width: "4px", height: "4px", background: "var(--gray-500)", borderRadius: "50%", animation: "bounce 1.4s infinite ease-in-out both", animationDelay: "0.4s" }}></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies (Pill Buttons under latest Bot message) */}
      {lastMessage && lastMessage.sender === "bot" && lastMessage.options && !isTyping && (
        <div style={{
          padding: "10px 16px 6px 16px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          background: "rgba(0,0,0,0.02)",
          borderTop: "1px solid var(--gray-100)"
        }}>
          {lastMessage.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(opt.label)}
              style={{
                background: "var(--white)",
                border: "1px solid var(--blue-light)",
                borderRadius: "20px",
                padding: "8px 14px",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--blue)",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--blue-pale)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "var(--white)";
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div style={{
        padding: "10px 16px",
        background: "var(--white)",
        borderTop: "1px solid var(--gray-100)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxSizing: "border-box"
      }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(inputText);
            }
          }}
          placeholder="Digite sua resposta..."
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "24px",
            border: "1px solid var(--gray-200)",
            background: "var(--gray-50)",
            color: "var(--gray-900)",
            fontFamily: "inherit",
            fontSize: "13px",
            outline: "none"
          }}
        />
        <button
          onClick={() => handleSendMessage(inputText)}
          disabled={!inputText.trim()}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: inputText.trim() ? "var(--blue)" : "var(--gray-300)",
            color: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: inputText.trim() ? "pointer" : "default",
            fontSize: "14px",
            transition: "background 0.2s"
          }}
        >
          ➔
        </button>
      </div>

    </div>
  );
}

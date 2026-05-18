import React, { useState, useRef, useEffect } from "react";

interface UserProfile {
  name: string;
  avatar: string;
}

interface ChatTabProps {
  profile?: UserProfile; // Optional in case it hasn't been fully passed down initially
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export default function ChatTab({ profile = { name: "Paciente", avatar: "👤" } }: ChatTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: `Olá, ${profile.name.split(" ")[0]}! Sou a IA Tira-Dúvidas do Conecta Farma. Estou aqui para responder perguntas rápidas sobre seus medicamentos, horários e interações. Como posso ajudar hoje?`,
      time: "09:41",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para o fim quando houver nova mensagem
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Respostas simuladas dinâmicas do bot
    setTimeout(() => {
      let botResponse = "Entendi. Como sou uma demonstração, não tenho acesso à base médica completa. Na versão final, eu forneceria orientações precisas ou te conectaria a um farmacêutico humano!";
      
      const lowerInput = userMsg.text.toLowerCase();
      if (lowerInput.includes("esqueci") || lowerInput.includes("atrasei")) {
        botResponse = "Esquecer uma dose acontece! A regra geral é: se estiver muito perto do horário da próxima dose, pule a esquecida. Se não, tome assim que lembrar. Qual medicamento você esqueceu?";
      } else if (lowerInput.includes("náusea") || lowerInput.includes("enjoo") || lowerInput.includes("dor")) {
        botResponse = "Sinto muito que você esteja sentindo isso. Alguns medicamentos podem causar esse efeito. Você gostaria que eu registrasse isso como um possível Efeito Adverso no seu prontuário para a próxima consulta?";
      } else if (lowerInput.includes("obrigad")) {
        botResponse = "Por nada! Estou sempre aqui se precisar. 😊";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "calc(100% + 32px)", 
      margin: "-16px", 
      background: "var(--gray-50)", 
      overflow: "hidden" 
    }}>
      {/* Header do Chat */}
      <div style={{ 
        position: "sticky",
        top: 0,
        background: "white", 
        padding: "16px", 
        display: "flex", 
        alignItems: "center", 
        gap: "12px", 
        borderBottom: "1px solid var(--gray-200)", 
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)", 
        zIndex: 10 
      }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--blue-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
          🤖
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--blue-dark)" }}>Tira-Dúvidas IA</div>
          <div style={{ fontSize: "11px", color: "var(--green)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)", display: "inline-block" }}></span> Online agora
          </div>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div style={{ 
        flex: 1, 
        overflowY: "auto", 
        padding: "16px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px" 
      }}>
        <div style={{ fontSize: "10px", color: "var(--gray-400)", textAlign: "center", marginBottom: "8px" }}>
          Suas mensagens são confidenciais e protegidas.
        </div>
        
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", flexDirection: isUser ? "row-reverse" : "row", maxWidth: "85%" }}>
                <div style={{ flexShrink: 0, fontSize: "16px" }}>
                  {isUser ? profile.avatar : "🤖"}
                </div>
                <div style={{ 
                  background: isUser ? "var(--blue)" : "white", 
                  color: isUser ? "white" : "var(--gray-800)",
                  padding: "12px 14px", 
                  borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  border: isUser ? "none" : "1px solid var(--gray-200)"
                }}>
                  {msg.text}
                </div>
              </div>
              <div style={{ fontSize: "10px", color: "var(--gray-400)", padding: isUser ? "0 30px 0 0" : "0 0 0 30px" }}>
                {msg.time}
              </div>
            </div>
          );
        })}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div style={{ 
        position: "sticky",
        bottom: 0,
        padding: "12px 16px", 
        background: "white", 
        borderTop: "1px solid var(--gray-200)", 
        display: "flex", 
        gap: "10px", 
        alignItems: "center",
        paddingBottom: "24px", // Extra padding for mobile feel
        zIndex: 10
      }}>
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escreva sua dúvida..."
          style={{ 
            flex: 1, 
            padding: "12px 16px", 
            borderRadius: "24px", 
            border: "1px solid var(--gray-300)", 
            outline: "none", 
            fontSize: "13px", 
            fontFamily: "var(--font-nunito)", 
            background: "var(--gray-50)" 
          }}
        />
        <button 
          onClick={handleSend}
          disabled={!inputValue.trim()}
          style={{ 
            background: inputValue.trim() ? "var(--blue)" : "var(--gray-300)", 
            color: "white", 
            border: "none", 
            borderRadius: "50%", 
            width: "40px", 
            height: "40px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            cursor: inputValue.trim() ? "pointer" : "not-allowed", 
            transition: "0.2s"
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

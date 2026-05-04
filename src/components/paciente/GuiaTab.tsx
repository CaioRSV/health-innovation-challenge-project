import React from "react";

export default function GuiaTab() {
  return (
    <>
      <div className="card" style={{ border: "none", boxShadow: "none", padding: "0 0 16px 0", background: "transparent" }}>
        <div style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "16px", fontWeight: 800, marginBottom: "4px" }}>
          Como Funciona o Conecta Farma?
        </div>
        <div style={{ fontSize: "12px", color: "var(--gray-500)" }}>
          Um guia rápido para você aproveitar ao máximo todas as funcionalidades do aplicativo.
        </div>
      </div>

      <div className="card" style={{ marginBottom: "14px" }}>
        <div className="card-title">📖 Guia Rápido</div>
        
        <div className="feature-list">
          <div className="feature-item" style={{ background: "transparent", padding: "8px 0", border: "none", borderBottom: "1px solid var(--gray-100)", borderRadius: 0 }}>
            <div className="feat-icon" style={{ background: "var(--blue-pale)", color: "var(--blue)", fontSize: "14px" }}>
              🏠
            </div>
            <div>
              <div className="feat-title">Início (Dashboard)</div>
              <div className="feat-desc" style={{ fontSize: "10px" }}>
                Acompanhe a sua adesão ao tratamento, marque quais medicamentos você já tomou no dia e veja suas próximas teleconsultas.
              </div>
            </div>
          </div>
          
          <div className="feature-item" style={{ background: "transparent", padding: "8px 0", border: "none", borderBottom: "1px solid var(--gray-100)", borderRadius: 0 }}>
            <div className="feat-icon" style={{ background: "var(--green-light)", color: "var(--green)", fontSize: "14px" }}>
              💊
            </div>
            <div>
              <div className="feat-title">Meds (Farmácia Digital)</div>
              <div className="feat-desc" style={{ fontSize: "10px" }}>
                Verifique a disponibilidade dos seus medicamentos na unidade de saúde e faça reservas antes de sair de casa.
              </div>
            </div>
          </div>

          <div className="feature-item" style={{ background: "transparent", padding: "8px 0", border: "none", borderBottom: "1px solid var(--gray-100)", borderRadius: 0 }}>
            <div className="feat-icon" style={{ background: "#fef3c7", color: "var(--yellow-dark)", fontSize: "14px" }}>
              💬
            </div>
            <div>
              <div className="feat-title">Chat com Farmacêutico</div>
              <div className="feat-desc" style={{ fontSize: "10px" }}>
                Converse diretamente com o profissional de saúde para tirar dúvidas sobre o seu tratamento ou relatar sintomas.
              </div>
            </div>
          </div>
          
          <div className="feature-item" style={{ background: "transparent", padding: "8px 0", border: "none", borderRadius: 0 }}>
            <div className="feat-icon" style={{ background: "var(--red-light)", color: "var(--red)", fontSize: "14px" }}>
              🚨
            </div>
            <div>
              <div className="feat-title">Relato de Efeitos Adversos</div>
              <div className="feat-desc" style={{ fontSize: "10px" }}>
                No Início, você encontra atalhos para avisar ao seu farmacêutico caso sinta náusea, cansaço ou outras reações.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="guide-card" style={{ background: "linear-gradient(135deg, var(--green) 0%, #16a34a 100%)" }}>
        <div className="guide-title">Dúvidas Frequentes</div>
        <div className="guide-sub">Acesse a central de ajuda completa</div>
        <button className="guide-btn" style={{ background: "white", color: "var(--green)" }}>Acessar FAQ →</button>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    q: "O que é adequação NR12 e minha empresa precisa disso?",
    a: "A NR12 é a Norma Regulamentadora que define requisitos mínimos de segurança para máquinas e equipamentos. Se sua empresa possui máquinas industriais, a adequação é obrigatória por lei. O não cumprimento pode gerar multas, interdições e, principalmente, acidentes de trabalho. Realizamos um diagnóstico completo e cuidamos de todo o processo de adequação."
  },
  {
    q: "Quanto tempo leva um projeto de automação industrial?",
    a: "O prazo varia de acordo com a complexidade do projeto. Projetos simples de painel ou adequação de uma máquina podem ser concluídos em 2 a 4 semanas. Projetos complexos com múltiplos painéis, integração de redes industriais e sistemas de segurança podem levar de 2 a 6 meses. Após o diagnóstico inicial, fornecemos um cronograma detalhado."
  },
  {
    q: "Vocês atendem fora do Rio Grande do Sul?",
    a: "Sim! Embora nossa base seja em Passo Fundo/RS, atendemos clientes em todo o Brasil. Entre em contato e verificaremos a viabilidade do atendimento na sua região."
  },
  {
    q: "Qual é a diferença entre NR10 e NR12?",
    a: "A NR10 trata da segurança em instalações e serviços elétricos — aplica-se a quem trabalha com eletricidade (manutenção, operação de painéis, etc.). A NR12 foca na segurança de máquinas e equipamentos — aplica-se a qualquer empresa que opere máquinas industriais. Muitos projetos exigem adequação a ambas as normas simultaneamente."
  },
  {
    q: "Vocês emitem ART (Anotação de Responsabilidade Técnica)?",
    a: "Sim. Todos os projetos que exigem ART são devidamente registrados junto ao CREA com a Anotação de Responsabilidade Técnica, garantindo respaldo legal e técnico para sua empresa."
  },
  {
    q: "Como funciona o suporte após a entrega do projeto?",
    a: "Oferecemos suporte técnico pós-entrega via WhatsApp, telefone e acesso remoto para diagnósticos rápidos. Também disponibilizamos contratos de manutenção preventiva para garantir a continuidade e desempenho do sistema a longo prazo."
  }
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full px-4 py-[120px] section-bg-default" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(227,107,41,0.3)] bg-[rgba(227,107,41,0.08)] text-accent text-sm font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Dúvidas frequentes
          </div>
          
          <div className="flex flex-col gap-1 items-center">
            <div className="flex flex-wrap justify-center gap-[0.25em]">
              <TextReveal
                text="Perguntas"
                className="font-display-section font-light text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight"
                textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
              />
              <TextReveal
                text="frequentes."
                className="font-display-section font-black text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tighter"
                textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
                delay={0.1}
              />
            </div>
          </div>
          <div className="section-divider mt-5 mb-0" />
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? "bg-white border-[rgba(227,107,41,0.3)] shadow-[0_8px_30px_rgba(227,107,41,0.08)]" 
                    : "bg-white/70 border-[rgba(44,45,94,0.08)] hover:border-[rgba(44,45,94,0.15)] hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`font-display-section text-[18px] md:text-[20px] font-bold transition-colors duration-300 ${isOpen ? "text-accent" : "text-primary"}`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-accent text-white rotate-90" : "bg-[rgba(44,45,94,0.05)] text-primary"}`}>
                    {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 font-body text-[16px] text-[rgba(44,45,94,0.7)] leading-relaxed border-t border-[rgba(227,107,41,0.1)] mt-2">
                        <div className="pt-6">
                          {faq.a}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

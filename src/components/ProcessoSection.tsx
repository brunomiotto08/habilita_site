import React from "react";
import { motion } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";

const steps = [
  {
    num: "01",
    title: "Diagnóstico técnico",
    desc: "Visita técnica, levantamento de necessidades e análise do processo produtivo do cliente.",
  },
  {
    num: "02",
    title: "Engenharia detalhada",
    desc: "Desenvolvimento do projeto elétrico, escolha de componentes e programação dos sistemas.",
  },
  {
    num: "03",
    title: "Execução com precisão",
    desc: "Montagem e integração com organização, padronização e segurança em cada etapa.",
  },
  {
    num: "04",
    title: "Testes e validação",
    desc: "Testes funcionais, ajustes finos e validação do sistema em ambiente de produção real.",
  },
  {
    num: "05",
    title: "Suporte contínuo",
    desc: "Documentação completa, treinamento da equipe e suporte técnico pós-entrega.",
  }
];

export const ProcessoSection = () => {
  return (
    <section className="relative w-full px-4 py-[120px] section-bg-default" id="processo">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(227,107,41,0.3)] bg-[rgba(227,107,41,0.08)] text-accent text-sm font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Como trabalhamos
          </div>
          
          <div className="flex flex-col gap-1 items-center">
            <div className="flex flex-wrap justify-center gap-[0.25em]">
              <TextReveal
                text="Da"
                className="font-display-section font-light text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight"
                textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
              />
              <TextReveal
                text="análise"
                className="font-display-section font-black text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tighter"
                textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
                delay={0.1}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-[0.25em]">
              <TextReveal
                text="à"
                className="font-display-section font-light text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight"
                textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
                delay={0.2}
              />
              <TextReveal
                text="entrega."
                className="font-display-section font-black text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tighter"
                textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
                delay={0.3}
              />
            </div>
          </div>
          <div className="section-divider mt-5 mb-0" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[rgba(227,107,41,0.2)] to-transparent z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/60 border-2 border-[rgba(227,107,41,0.2)] flex items-center justify-center font-display-section font-bold text-xl text-accent mb-6 group-hover:scale-110 group-hover:border-accent transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_rgba(227,107,41,0.3)]">
                {step.num}
              </div>
              <h3 className="font-display-section text-[20px] font-bold text-primary mb-3">
                {step.title}
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-[rgba(44,45,94,0.65)] px-2">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

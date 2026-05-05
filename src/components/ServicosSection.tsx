import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Zap, ShieldCheck, Wrench, Settings2 } from "lucide-react";
import { TextReveal } from "./ui/TextReveal";
import { BentoCard } from "./ui/BentoCard";
import { springEntrance } from "../lib/animations";

const servicos = [
  {
    id: "automacao",
    icon: Cpu,
    title: "Automação Industrial",
    description: "Sistemas lógicos programáveis, controle de processos e integração de chão de fábrica para máxima eficiência e precisão.",
    className: "md:col-span-7 md:row-span-1",
  },
  {
    id: "paineis",
    icon: Zap,
    title: "Painéis Elétricos",
    description: "Montagem de quadros de comando e distribuição com componentes de altíssima confiabilidade.",
    className: "md:col-span-5 md:row-span-1",
  },
  {
    id: "nr10",
    icon: ShieldCheck,
    title: "Adequação NR10/NR12",
    description: "Projetos rigorosos de segurança em máquinas e equipamentos, garantindo conformidade total e proteção à vida.",
    className: "md:col-span-5 md:row-span-1",
  },
  {
    id: "manutencao",
    icon: Wrench,
    title: "Manutenção Preventiva",
    description: "Monitoramento contínuo e intervenções programadas para zero downtime na sua linha de produção.",
    className: "md:col-span-7 md:row-span-1",
  },
  {
    id: "projetos",
    icon: Settings2,
    title: "Projetos Customizados",
    description: "Desenvolvimento sob medida de soluções mecânicas e elétricas integradas para desafios únicos da sua planta.",
    className: "md:col-span-12 md:row-span-1 md:min-h-[220px]",
  },
];

export const ServicosSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="servicos" className="pt-[40px] pb-[100px] px-4 max-w-7xl mx-auto relative z-20">
      <div className="mb-10">
        {/* Eyebrow Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(44,45,94,0.05)] border border-[rgba(44,45,94,0.1)] mb-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={springEntrance}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-display-label text-[rgba(44,45,94,0.85)] tracking-widest text-[10px]">
            O QUE FAZEMOS
          </span>
        </motion.div>
        
        <div className="flex flex-col gap-1 drop-shadow-xl">
          <div className="flex flex-wrap gap-[0.25em]">
            <TextReveal
              text="Serviços"
              className="font-display-section font-light text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight"
              textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
            />
            <TextReveal
              text="que movem"
              className="font-display-section font-black text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tighter"
              textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
              delay={0.1}
            />
          </div>
          <div className="flex flex-wrap gap-[0.25em]">
            <TextReveal
              text="a"
              className="font-display-section font-light text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight"
              textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
              delay={0.2}
            />
            <TextReveal
              text="indústria."
              className="font-display-section font-black text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tighter"
              textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
              delay={0.3}
            />
          </div>
        </div>
        <div className="section-divider mt-4 mb-2" />
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto"
      >
        {servicos.map((servico, index) => (
          <BentoCard
            key={servico.id}
            icon={servico.icon}
            title={servico.title}
            description={servico.description}
            className={servico.className}
            glowColor={index % 2 === 0 ? "primary" : "accent"}
          />
        ))}
      </motion.div>
    </section>
  );
};

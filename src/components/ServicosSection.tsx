import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Zap, ShieldCheck, Wrench, Settings2 } from "lucide-react";
import { TextReveal } from "./ui/TextReveal";
import { BentoCard } from "./ui/BentoCard";
import { springEntrance } from "../lib/animations";
// @ts-ignore
import logo from "../assets/img/logo_habilita.svg";

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
        {/* Eyebrow — linha acento */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={springEntrance}
        >
          <div className="w-8 h-[2px] bg-accent rounded-full" />
          <span className="font-display-label text-accent tracking-widest text-[11px] uppercase">
            O que fazemos
          </span>
        </motion.div>

        {/* Título + Logo lado a lado */}
        <div className="flex items-start justify-between gap-6">
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

          {/* Logo colada à direita, alinhada ao fundo do título */}
          <motion.img
            src={logo}
            alt="Habilita Automação"
            className="hidden sm:block h-24 w-auto object-contain object-right shrink-0"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ ...springEntrance, delay: 0.3 }}
          />
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

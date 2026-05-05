import React from "react";
import { motion } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";
import { BentoCard } from "./ui/BentoCard";
import { Cpu, Network, Zap, Shield, Battery, Monitor } from "lucide-react";

const technologies = [
  {
    icon: Cpu,
    title: "OMRON",
    description: "Plataforma NX/NJ com CPUs de segurança IEC 61508 SIL2/SIL3, ideal para automação avançada e safety integrado.",
  },
  {
    icon: Network,
    title: "EtherCAT",
    description: "Protocolo de comunicação industrial com ciclo de atualização abaixo de 1ms, ideal para controle de movimento e sistemas de segurança distribuídos.",
  },
  {
    icon: Zap,
    title: "SIEMENS",
    description: "Soluções com CLPs S7-300/400/1200/1500, SINAMICS e SIRIUS para aplicações industriais de alta complexidade.",
  },
  {
    icon: Shield,
    title: "SCHNEIDER",
    description: "Quadros de distribuição, inversores Altivar e CLPs Modicon para projetos industriais e prediais.",
  },
  {
    icon: Battery,
    title: "ABB",
    description: "Inversores de frequência ACS, soft-starters e disjuntores para controle preciso e proteção de motores industriais.",
  },
  {
    icon: Monitor,
    title: "SCADA",
    description: "Sistemas supervisórios com dashboards em tempo real, registro de eventos, alarmes e integração com sistemas ERP.",
  }
];

export const TecnologiaSection = () => {
  return (
    <section className="relative w-full px-4 py-[120px] section-bg-alt" id="tecnologia">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(227,107,41,0.3)] bg-[rgba(227,107,41,0.08)] text-accent text-sm font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Tecnologia
          </div>

          {/* Título */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-[0.25em]">
              <TextReveal
                text="Equipamentos"
                className="font-display-section font-light text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight"
                textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
              />
            </div>
            <div className="flex flex-wrap gap-[0.25em]">
              <TextReveal
                text="e"
                className="font-display-section font-light text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight"
                textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
                delay={0.1}
              />
              <TextReveal
                text="plataformas."
                className="font-display-section font-black text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tighter"
                textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
                delay={0.2}
              />
            </div>
          </div>

          <div className="section-divider mt-4 mb-4" />

          {/* Parágrafo — abaixo do divider, alinhado à esquerda */}
          <p className="font-body text-[18px] text-[rgba(44,45,94,0.65)] max-w-[560px] mt-2">
            Trabalhamos com os fabricantes líderes do mercado industrial, garantindo qualidade, suporte e confiabilidade em todos os projetos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((tech, i) => (
            <div key={i} className="h-full">
              <BentoCard
                title={tech.title}
                description={tech.description}
                icon={tech.icon}
                className="h-full"
                glowColor={i % 2 === 0 ? "primary" : "accent"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

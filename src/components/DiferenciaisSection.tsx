import React from "react";
import { motion } from "framer-motion";
import { CountUp } from "./ui/CountUp";
import { TextReveal } from "./ui/TextReveal";
import { GlowCard } from "./ui/spotlight-card";
import { springEntrance } from "../lib/animations";

const metricas = [
  { valor: 500, prefix: "+", suffix: "", label: "Projetos Entregues", desc: "em todo o Brasil" },
  { valor: 6,   prefix: "+", suffix: "", label: "Anos de Experiência", desc: "na indústria" },
  { valor: 100, prefix: "",  suffix: "%", label: "Conformidade", desc: "NR10 / NR12" },
  { valor: 15,  prefix: "",  suffix: "+", label: "Especialistas", desc: "no time técnico" },
];

export const DiferenciaisSection = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: springEntrance },
  };

  return (
    <section id="diferenciais" className="bg-primary py-[120px] px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* ── cabeçalho ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={springEntrance}
        >
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] mb-6 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-display-label text-[rgba(255,255,255,0.75)] tracking-widest text-[10px]">
              Diferenciais Habilita
            </span>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-[0.25em]">
            <TextReveal
              text="A Excelência em"
              className="font-display-hero text-[clamp(40px,4vw,56px)] leading-[1.05] pb-1"
              textClassName="font-light tracking-tight bg-gradient-to-br from-white to-[rgba(255,255,255,0.7)] bg-clip-text text-transparent"
            />
            <TextReveal
              text="Números."
              className="font-display-hero text-[clamp(40px,4vw,56px)] leading-[1.05] pb-1"
              textClassName="font-black tracking-tighter bg-gradient-to-br from-[#ffb07a] via-accent to-[#e05a10] bg-clip-text text-transparent"
              delay={0.1}
            />
          </div>
        </motion.div>

        {/* ── cards ── */}
        <motion.div
          className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
        >
          {metricas.map((metrica, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex-1"
            >
              <GlowCard
                glowColor="accent"
                customSize
                className="h-full flex flex-col items-center justify-center gap-1 py-10 px-6 text-center
                  bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]
                  hover:border-accent/40 hover:bg-[rgba(255,255,255,0.07)]
                  transition-all duration-300 group"
              >
                {/* número com glow */}
                <div
                  className="font-display-hero text-[clamp(52px,6vw,76px)] leading-none font-black tracking-tight
                    bg-gradient-to-b from-[#ffd0a8] via-[#f8924a] to-[#d95f10]
                    bg-clip-text text-transparent
                    drop-shadow-[0_0_28px_rgba(227,107,41,0.55)]
                    group-hover:drop-shadow-[0_0_40px_rgba(227,107,41,0.8)]
                    transition-all duration-500"
                >
                  <CountUp
                    to={metrica.valor}
                    prefix={metrica.prefix}
                    suffix={metrica.suffix}
                    duration={1.5}
                  />
                </div>

                {/* label principal */}
                <p className="font-display-section text-[15px] font-semibold text-white mt-1 leading-tight">
                  {metrica.label}
                </p>

                {/* sublabel */}
                <p className="font-body text-[12px] text-[rgba(255,255,255,0.4)] tracking-wide uppercase mt-0.5">
                  {metrica.desc}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

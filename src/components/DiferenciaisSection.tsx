import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
// @ts-ignore
import logo from "../assets/img/logo_habilita.svg";
import { CountUp } from "./ui/CountUp";
import { TextReveal } from "./ui/TextReveal";
import { springEntrance } from "../lib/animations";

const metricas = [
  { valor: 500, prefix: "+", suffix: "", label: "Projetos Entregues", desc: "em todo o Brasil" },
  { valor: 6,   prefix: "+", suffix: "", label: "Anos de Experiência", desc: "na indústria" },
  { valor: 100, prefix: "",  suffix: "%", label: "Conformidade", desc: "NR10 / NR12" },
  { valor: 15,  prefix: "",  suffix: "+", label: "Especialistas", desc: "no time técnico" },
];

/* card com spotlight laranja seguindo o mouse, sem GlowCard */
const MetricCard = ({ metrica, index }: { metrica: typeof metricas[number]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ ...springEntrance, delay: index * 0.1 }}
      className="group relative flex-1 flex flex-col items-center justify-center text-center
        py-10 px-6 rounded-3xl overflow-hidden cursor-default
        border border-[rgba(255,255,255,0.07)]
        hover:border-[rgba(227,107,41,0.35)]
        transition-colors duration-400"
      style={{
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {/* spotlight laranja seguindo o mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(360px circle at ${mouseX.get()}px ${mouseY.get()}px,
            rgba(227,107,41,0.12) 0%, transparent 70%)`,
        }}
      />

      {/* brilho sutil fixo no fundo (sempre visível) */}
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(227,107,41,0.08),transparent)] pointer-events-none" />

      {/* número */}
      <CountUp
        to={metrica.valor}
        prefix={metrica.prefix}
        suffix={metrica.suffix}
        duration={1.5}
        className="relative font-display-hero text-[clamp(52px,6vw,76px)] leading-none font-black tracking-tight
          text-accent
          [filter:drop-shadow(0_0_20px_rgba(227,107,41,0.5))]
          group-hover:[filter:drop-shadow(0_0_36px_rgba(227,107,41,0.85))]
          transition-all duration-500"
      />

      {/* label */}
      <p className="relative font-display-section text-[15px] font-semibold text-white mt-3 leading-tight">
        {metrica.label}
      </p>

      {/* sublabel */}
      <p className="relative font-body text-[11px] text-[rgba(255,255,255,0.38)] tracking-widest uppercase mt-1">
        {metrica.desc}
      </p>
    </motion.div>
  );
};

export const DiferenciaisSection = () => {
  return (
    <section id="diferenciais" className="bg-primary py-[120px] px-4 overflow-hidden relative">
      {/* marca d'água — logo em ghost mode no fundo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="w-[600px] max-w-[80vw] opacity-[0.035]"
          style={{ filter: "invert(1) brightness(2)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* cabeçalho */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={springEntrance}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] mb-6 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-display-label text-[rgba(255,255,255,0.75)] tracking-widest text-[10px]">
              Diferenciais Habilita
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-[0.25em]">
            <TextReveal
              text="A Excelência em"
              className="font-display-hero text-[clamp(40px,4vw,56px)] leading-[1.05] pb-1"
              textClassName="font-light tracking-tight bg-gradient-to-br from-white to-[rgba(255,255,255,0.7)] bg-clip-text text-transparent"
            />
            <TextReveal
              text="Números."
              className="font-display-hero text-[clamp(40px,4vw,56px)] leading-[1.05] pb-1"
              textClassName="font-black tracking-tighter text-accent"
              delay={0.1}
            />
          </div>
        </motion.div>

        {/* grid de métricas */}
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          {metricas.map((metrica, index) => (
            <MetricCard key={index} metrica={metrica} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

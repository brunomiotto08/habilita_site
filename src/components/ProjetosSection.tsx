import React from "react";
import { motion } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GlowCard } from "./ui/spotlight-card";
import { cn } from "../lib/utils";

/* ─────────────────────────────── dados ─────────────────────────────── */
const projects = [
  // Row 1: [2-col] [1-col]
  {
    id: 1,
    badge: "Destaque",
    title: "Adequação NR12 — CLP de Segurança Omron",
    description:
      "Projeto completo de adequação NR12 com CLP NX102-9000 e CPU de segurança NX-SL3500. Mais de 200 pontos de I/O integrados à IHM e comunicação remota entre painéis via EtherCAT (NX-ECC202). Monitoramento de zonas de segurança em conformidade com a Indústria 4.0.",
    highlights: ["Segurança categoria 4", "Redundância de controle", "Comunicação remota"],
    specs: ["CLP NX102-9000", "NX-SL3500 Safety", "EtherCAT", "200+ I/O", "NR12", "IHM"],
    accent: true,
    colSpan: "lg:col-span-2",
  },
  {
    id: 2,
    badge: "Elétrico",
    title: "QGBT 250A e 630A Industrial",
    description:
      "Quadros de Baixa Tensão para instalações industriais de grande porte com reaproveitamento inteligente de materiais do quadro anterior.",
    highlights: [],
    specs: ["250A", "630A", "BT Industrial"],
    accent: false,
    colSpan: "lg:col-span-1",
  },
  // Row 2: [1-col] [2-col]
  {
    id: 3,
    badge: "Rede Industrial",
    title: "EtherCAT Multi-Painel",
    description:
      "Controle distribuído com EtherCAT entre painéis, alta velocidade e expansão total do sistema de segurança com integração entre módulos.",
    highlights: [],
    specs: ["EtherCAT", "Multi-painel", "NX-ECC202"],
    accent: false,
    colSpan: "lg:col-span-1",
  },
  {
    id: 4,
    badge: "Automação",
    title: "SCADA com Supervisão Remota",
    description:
      "Implantação de supervisório SCADA com acesso remoto seguro via VPN industrial. Dashboards em tempo real, relatórios automáticos e rastreabilidade completa do processo produtivo, com histórico de alarmes e eventos.",
    highlights: ["Acesso remoto via VPN", "Rastreabilidade total"],
    specs: ["SCADA", "VPN Industrial", "Dashboards", "Relatórios"],
    accent: false,
    colSpan: "lg:col-span-2",
  },
  // Row 3: [2-col] [1-col]
  {
    id: 5,
    badge: "Projetos Elétricos",
    title: "Dimensionamento e Elaboração de ART",
    description:
      "Projetos elétricos industriais completos — diagramas unifilares, dimensionamento de condutores e proteções, compatibilidade eletromagnética e emissão de ART junto ao CREA. Entrega em conformidade com a NR10 e NBR 5410.",
    highlights: ["Conformidade NR10 e NBR 5410", "Emissão de ART / CREA"],
    specs: ["Unifilar", "Dimensionamento", "NR10", "CREA / ART"],
    accent: false,
    colSpan: "lg:col-span-2",
  },
  {
    id: 6,
    badge: "Retrofit",
    title: "Retrofit de Painéis Elétricos",
    description:
      "Modernização de painéis obsoletos com mínima parada produtiva, adequação normativa e substituição de componentes críticos.",
    highlights: [],
    specs: ["Retrofit", "Modernização", "NR10"],
    accent: false,
    colSpan: "lg:col-span-1",
  },
];

/* ────────────────────────────── card ────────────────────────────────── */
interface CardProps {
  project: (typeof projects)[number];
  index: number;
}

const ProjectCard = ({ project, index }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      /* h-full garante que o div preenche a célula do grid */
      className={cn("h-full", project.colSpan)}
    >
      <GlowCard
        glowColor={project.accent ? "accent" : "primary"}
        customSize
        className={cn(
          "group h-full flex flex-col p-6 border transition-colors duration-300",
          project.accent
            ? "border-[rgba(227,107,41,0.15)] hover:border-accent/40"
            : "border-[rgba(44,45,94,0.08)] hover:border-primary/30"
        )}
      >
        {/* ── linha superior: badge + seta ── */}
        <div className="flex items-start justify-between mb-4">
          <span
            className={cn(
              "inline-block px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-md",
              project.accent
                ? "text-accent border border-[rgba(227,107,41,0.3)] bg-[rgba(227,107,41,0.08)]"
                : "text-primary border border-[rgba(44,45,94,0.15)] bg-[rgba(44,45,94,0.04)]"
            )}
          >
            {project.badge}
          </span>

          <div className="w-8 h-8 rounded-full border border-[rgba(44,45,94,0.1)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0 shrink-0 ml-2">
            <ArrowUpRight className="w-4 h-4 text-[rgba(44,45,94,0.5)]" />
          </div>
        </div>

        {/* ── título ── */}
        <h3
          className={cn(
            "font-display-section leading-snug text-primary mb-3",
            project.accent ? "text-[20px] md:text-[22px]" : "text-[17px] md:text-[19px]"
          )}
        >
          {project.title}
        </h3>

        {/* ── descrição ── */}
        <p className="font-body text-[13px] md:text-[14px] leading-relaxed text-[rgba(44,45,94,0.62)]">
          {project.description}
        </p>

        {/* ── highlights (quando existem) ── */}
        {project.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5 mt-4">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px] text-[rgba(44,45,94,0.68)]">
                <CheckCircle2
                  className={cn(
                    "w-3.5 h-3.5 shrink-0",
                    project.accent ? "text-accent" : "text-primary"
                  )}
                />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* ── spacer — empurra specs pro fundo ── */}
        <div className="flex-1" />

        {/* ── specs ── */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[rgba(44,45,94,0.07)] mt-4">
          {project.specs.map((spec, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[11px] font-medium text-[rgba(44,45,94,0.52)] bg-[rgba(44,45,94,0.04)] rounded-md"
            >
              {spec}
            </span>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
};

/* ─────────────────────────────── section ────────────────────────────── */
export const ProjetosSection = () => {
  return (
    <section className="relative w-full px-4 py-[120px] section-bg-alt" id="projetos">
      <div className="max-w-7xl mx-auto">

        {/* ── cabeçalho ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(227,107,41,0.3)] bg-[rgba(227,107,41,0.08)] text-accent text-sm font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Portfólio
          </div>

          <div className="flex flex-wrap gap-[0.25em] mb-4">
            <TextReveal
              text="Projetos"
              className="font-display-section font-light text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight"
              textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
            />
            <TextReveal
              text="realizados."
              className="font-display-section font-black text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tighter"
              textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
              delay={0.1}
            />
          </div>

          <div className="section-divider mb-4" />

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <p className="font-body text-[18px] text-[rgba(44,45,94,0.65)] max-w-[520px]">
              Cada projeto é uma solução única, desenvolvida com tecnologia de ponta e foco em resultado para a indústria.
            </p>

            {/* mini-stats */}
            <div className="flex gap-5 shrink-0">
              {[
                { value: "+6", label: "anos" },
                { value: "150+", label: "projetos" },
                { value: "100%", label: "conformidade" },
              ].map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="w-px self-stretch bg-[rgba(44,45,94,0.1)]" />}
                  <div className="text-center">
                    <p className="font-display-section text-[28px] font-black text-primary leading-none">{s.value}</p>
                    <p className="font-ui text-[11px] text-[rgba(44,45,94,0.45)] mt-1 uppercase tracking-wider">{s.label}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── bento grid ──
             Layout desktop (3 cols, linha fixa 260px):
               Row 1:  [Card 1 — 2 cols]  [Card 2 — 1 col]
               Row 2:  [Card 3 — 1 col]   [Card 4 — 2 cols]
               Row 3:  [Card 5 — 2 cols]  [Card 6 — 1 col]
        ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

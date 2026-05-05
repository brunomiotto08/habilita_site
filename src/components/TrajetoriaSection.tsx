import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";
import { springGravity, springEntrance } from "../lib/animations";
// @ts-ignore
import logo from "../assets/img/logo_habilita.svg";

const marcos = [
  { ano: "2020", descricao: "Fundação da Habilita Automação e início das operações" },
  { ano: "2021", descricao: "Primeiros grandes contratos e expansão da equipe técnica" },
  { ano: "2022", descricao: "Consolidação no mercado e novos parceiros estratégicos" },
  { ano: "2023", descricao: "Inovação tecnológica e foco em soluções 4.0" },
  { ano: "2024", descricao: "Expansão regional e + de 500 projetos entregues" },
  { ano: "2025", descricao: "Novas vertentes de serviços e crescimento sustentável" },
  { ano: "2026", descricao: "Referência na região em automação e excelência técnica" },
];

const TimelineItem = ({ marco, index }: { marco: any, index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { margin: "-40% 0px -40% 0px" });
  const isEntered = useInView(itemRef, { once: true, amount: 0 });

  return (
    <div ref={itemRef} className="relative pl-12 pb-24 last:pb-0">
      {/* Small active dot */}
      <motion.div
        className="absolute left-[-4px] top-2 w-[8px] h-[8px] rounded-full bg-accent z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      <div className="flex flex-col">
        {isEntered ? (
          <motion.div
            className={`font-display-hero text-[28px] transition-colors duration-300 ${isInView ? "text-accent" : "text-primary"}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={springEntrance}
          >
            {marco.ano}
          </motion.div>
        ) : (
          <div className="text-[28px] opacity-0">{marco.ano}</div>
        )}

        {isEntered && (
          <motion.p
            className="font-body text-[14px] text-[rgba(44,45,94,0.65)] mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...springEntrance, delay: 0.1 }}
          >
            {marco.descricao}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export const TrajetoriaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, springGravity);

  const trackerY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const scaleY = smoothProgress;

  const isSectionInView = useInView(sectionRef, { once: true, amount: 0 });

  return (
    <section ref={sectionRef} id="trajetoria" className="py-[120px] px-4 section-bg-alt">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-16 md:gap-8">

          {/* Left Column */}
          <div className="md:col-span-4 md:sticky md:top-[120px] self-start">
            <div className="mb-6 flex flex-col gap-1 drop-shadow-xl">
              <div className="flex flex-wrap gap-[0.25em]">
                <TextReveal
                  text="+ de 6"
                  className="font-display-hero font-black text-[clamp(40px,5vw,56px)] leading-[1.05] tracking-tighter"
                  textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
                />
                <TextReveal
                  text="Anos"
                  className="font-display-hero font-light text-[clamp(40px,5vw,56px)] leading-[1.05] tracking-tight"
                  textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
                  delay={0.1}
                />
              </div>
              <div className="flex flex-wrap gap-[0.25em]">
                <TextReveal
                  text="de"
                  className="font-display-hero font-light text-[clamp(40px,5vw,56px)] leading-[1.05] tracking-tight"
                  textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
                  delay={0.2}
                />
                <TextReveal
                  text="Experiência."
                  className="font-display-hero font-black text-[clamp(40px,5vw,56px)] leading-[1.05] tracking-tighter"
                  textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
                  delay={0.3}
                />
              </div>
            </div>
            <div className="section-divider mb-6" />
            <motion.p
              className="font-body text-[16px] text-[rgba(44,45,94,0.65)] max-w-[400px]"
              initial={{ opacity: 0, y: 24 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.3, ...springEntrance }}
            >
              Nossa história é marcada por um compromisso inabalável com a excelência técnica. Cada projeto entregue consolida nossa posição como referência no setor industrial.
            </motion.p>

            {/* logo sutil abaixo da descrição */}
            <motion.img
              src={logo}
              alt="Habilita Automação"
              className="mt-10 h-10 w-auto object-contain object-left opacity-20"
              initial={{ opacity: 0, y: 12 }}
              animate={isSectionInView ? { opacity: 0.2, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.5, ...springEntrance }}
            />
          </div>

          {/* Right Column - Timeline */}
          <div className="md:col-span-6 relative pt-4 pl-4 md:pl-16">

            {/* Static Track Line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-16 w-[2px] bg-[rgba(44,45,94,0.15)] rounded-full" />

            {/* Filled Track Line */}
            <motion.div
              className="absolute top-0 bottom-0 left-4 md:left-16 w-[2px] bg-accent rounded-full origin-top"
              style={{ scaleY }}
            />

            {/* Tracker Point */}
            <motion.div
              className="absolute left-[9px] md:left-[57px] w-[14px] h-[14px] rounded-full bg-accent z-30"
              style={{
                top: trackerY,
                y: "-50%",
                boxShadow: "0 0 0 4px rgba(227,107,41,0.2), 0 0 16px rgba(227,107,41,0.3)",
              }}
            />

            {/* Timeline Items */}
            <div className="relative z-10 pt-8 pb-32">
              {marcos.map((marco, index) => (
                <TimelineItem key={index} marco={marco} index={index} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

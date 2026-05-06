import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";
import { springSnappy, springEntrance } from "../lib/animations";
// @ts-ignore
import clpVideo from "../assets/videos/clp-video.mp4";

export const ClpSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isInView = useInView(containerRef, { once: true, amount: 0 });

  const rafId = useRef<number | null>(null);

  // Scrub the video when scroll progress changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!videoRef.current || duration === 0) return;

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = latest * duration;
        }
        rafId.current = null;
      });
    }
  });

  // Fix for iOS/Safari: Ensure video is loaded to get duration reliably
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-[var(--color-background-global)]">
      {/* Sticky container that stays on screen while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Video Layer (LEFT SIDE) */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-start pointer-events-none">
          <div className="relative ml-[10vw] w-[45vw] h-[70vh] flex items-center justify-center">
            <video
              ref={videoRef}
              src={clpVideo}
              className="w-full h-full object-contain opacity-90"
              style={{
                mixBlendMode: "darken", // Floating effect without background borders
              }}
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            />
            {/* Left Edge Fade Overlay (Replaces expensive maskImage) */}
            <div 
              className="absolute inset-y-0 right-0 w-[15%] pointer-events-none"
              style={{ background: "linear-gradient(to left, var(--color-background-global) 0%, transparent 100%)" }}
            />
          </div>
          {/* Subtle Gradient Overlay on the right to protect text legibility */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--color-background-global) 0%, var(--color-background-global) 40%, transparent 70%)"
            }}
          />
        </div>

        {/* Content Layer (RIGHT SIDE) */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-end justify-center h-full">
          <div className="max-w-2xl w-full flex flex-col items-start">
            {/* Eyebrow Label */}
            <motion.div
              className="font-display-label mb-6 text-[rgba(44,45,94,0.8)]"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.1, ...springEntrance }}
            >
              Inteligência de Máquina · Instalação CLP
            </motion.div>

            {/* Main Title */}
            <div className="mb-6 flex flex-col gap-1 drop-shadow-2xl">
              <div className="flex flex-wrap gap-[0.25em]">
                <TextReveal
                  text="Controlador"
                  className="font-display-hero font-light text-[clamp(48px,5vw,80px)] leading-[1.05] tracking-tight"
                  textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
                  delay={0.2}
                  as="h2"
                />
                <TextReveal
                  text="Lógico"
                  className="font-display-hero font-black text-[clamp(48px,5vw,80px)] leading-[1.05] tracking-tighter"
                  textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
                  delay={0.3}
                  as="h2"
                />
              </div>
              <div className="flex flex-wrap gap-[0.25em]">
                <TextReveal
                  text="Programável."
                  className="font-display-hero font-black text-[clamp(48px,5vw,80px)] leading-[1.05] tracking-tighter"
                  textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
                  delay={0.4}
                  as="h2"
                />
              </div>
            </div>

            {/* Subtitle */}
            <motion.p
              className="font-body text-[clamp(16px,1.2vw,20px)] max-w-[500px] mb-10 text-[rgba(44,45,94,0.7)]"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.5, ...springEntrance }}
            >
              Modernize seu chão de fábrica com controladores de última geração. Automação precisa, flexível e projetada para maximizar a sua capacidade produtiva sem interrupções.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.7, ...springEntrance }}
            >
              <motion.button
                className="w-full sm:w-auto bg-primary text-white font-montserrat font-semibold rounded-full px-[32px] py-[16px]"
                whileHover={{ scale: 1.05, backgroundColor: "var(--color-accent)", boxShadow: "0 8px 24px rgba(227,107,41,0.3)" }}
                whileTap={{ scale: 0.97 }}
                transition={springSnappy}
              >
                Detalhes Técnicos
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

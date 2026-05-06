import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";
import { springSnappy, springEntrance } from "../lib/animations";
// @ts-ignore
import heroVideo from "../assets/videos/hero-video.mp4";

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rafId = useRef<number | null>(null);
  const lastTimeUpdate = useRef<number>(0);

  // Scrub the video when scroll progress changes, using scrollYProgress directly
  // avoiding useSpring to prevent excessive micro-updates that freeze the video decoder
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!videoRef.current || duration === 0) return;

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        if (videoRef.current) {
          // Throttling tiny updates can also help if needed, but removing useSpring is the main fix
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
    <section ref={containerRef} className="relative h-[250vh] w-full bg-[var(--color-background-global)]">
      {/* Sticky container that stays on screen while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center">
          <div className="relative ml-[45vw] w-[50vw] h-[75vh] max-w-[1000px] max-h-[800px]">
            <video
              ref={videoRef}
              src={heroVideo}
              className="w-full h-full object-cover opacity-90"
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            />
            {/* Left Edge Fade Overlay (Replaces expensive maskImage) */}
            <div 
              className="absolute inset-y-0 left-0 w-[15%] pointer-events-none"
              style={{ background: "linear-gradient(to right, var(--color-background-global) 0%, transparent 100%)" }}
            />
            {/* Right Edge Fade Overlay */}
            <div 
              className="absolute inset-y-0 right-0 w-[15%] pointer-events-none"
              style={{ background: "linear-gradient(to left, var(--color-background-global) 0%, transparent 100%)" }}
            />
            {/* Small Top Gradient */}
            <div 
              className="absolute top-0 inset-x-0 h-[15%] pointer-events-none"
              style={{ background: "linear-gradient(to bottom, var(--color-background-global) 0%, transparent 100%)" }}
            />
            {/* Strong Bottom Gradient */}
            <div 
              className="absolute bottom-0 inset-x-0 h-[30%] pointer-events-none"
              style={{ background: "linear-gradient(to top, var(--color-background-global) 0%, var(--color-background-global) 15%, transparent 100%)" }}
            />
          </div>
          {/* Global Text Legibility Overlay (Left to Right) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--color-background-global) 0%, var(--color-background-global) 30%, transparent 60%)"
            }}
          />
        </div>

        {/* Gradient Overlay for Bottom Blend */}
        <div 
          className="absolute inset-x-0 bottom-0 h-48 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--color-background-global) 0%, transparent 100%)"
          }}
        />

        {/* Dot Grid Overlay (Subtle) */}
        <div className="absolute inset-0 z-0 hero-dot-grid pointer-events-none opacity-[0.35]" />

        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 flex flex-col items-start justify-center h-full">
          <div className="max-w-2xl w-full pt-10">
            
            {/* Eyebrow Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(44,45,94,0.05)] border border-[rgba(44,45,94,0.1)] mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ...springEntrance }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-display-label text-[rgba(44,45,94,0.85)] tracking-widest text-[10px]">
                Engenharia de Precisão
              </span>
            </motion.div>

            {/* Main Title */}
            <div className="mb-6 flex flex-col gap-1 drop-shadow-2xl">
              <div className="flex flex-wrap gap-[0.25em]">
                <TextReveal
                  text="Automação"
                  className="font-display-hero font-light text-[clamp(36px,4.5vw,64px)] leading-[1.05] tracking-tight"
                  textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
                  delay={0.2}
                  as="h1"
                />
                <TextReveal
                  text="Industrial"
                  className="font-display-hero font-black text-[clamp(36px,4.5vw,64px)] leading-[1.05] tracking-tighter"
                  textClassName="bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent pb-1"
                  delay={0.3}
                  as="h1"
                />
              </div>
              <div className="flex flex-wrap gap-[0.25em]">
                <TextReveal
                  text="no mais alto"
                  className="font-display-hero font-light text-[clamp(36px,4.5vw,64px)] leading-[1.05] tracking-tight"
                  textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
                  delay={0.4}
                  as="h1"
                />
                <TextReveal
                  text="nível."
                  className="font-display-hero font-black text-[clamp(36px,4.5vw,64px)] leading-[1.05] tracking-tighter"
                  textClassName="bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent pb-1"
                  delay={0.5}
                  as="h1"
                />
              </div>
            </div>

            {/* Subtitle */}
            <motion.div
              className="pl-5 border-l-[2px] border-accent/40 mb-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, ...springEntrance }}
            >
              <p className="font-body text-[clamp(15px,1vw,18px)] max-w-[420px] text-[rgba(44,45,94,0.75)] leading-[1.7]">
                Soluções completas em automação, painéis elétricos e normas <strong>NR10/NR12</strong> para indústrias que exigem o máximo.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...springEntrance }}
            >
              <motion.button
                className="w-full sm:w-auto bg-primary text-white font-ui font-semibold text-sm rounded-full px-6 py-3.5 flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.03, backgroundColor: "var(--color-accent)", boxShadow: "0 8px 24px rgba(227,107,41,0.25)" }}
                whileTap={{ scale: 0.97 }}
                transition={springSnappy}
              >
                Conhecer Soluções
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>

              <motion.button
                className="w-full sm:w-auto bg-transparent border border-[rgba(44,45,94,0.2)] text-primary font-ui font-semibold text-sm rounded-full px-6 py-3.5 backdrop-blur-sm hover:bg-[rgba(44,45,94,0.03)]"
                whileHover={{ scale: 1.03, borderColor: "var(--color-primary)" }}
                whileTap={{ scale: 0.97 }}
                transition={springSnappy}
              >
                Falar com Engenheiro
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

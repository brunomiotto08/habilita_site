import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, AnimatePresence } from "framer-motion";
import { CustomCursor } from "./components/ui/CustomCursor";
import { FloatingNavbar } from "./components/FloatingNavbar";
import { HeroSection } from "./components/HeroSection";
import { ServicosSection } from "./components/ServicosSection";
import { ClpSection } from "./components/ClpSection";
import { ProjetosSection } from "./components/ProjetosSection";
import { TrajetoriaSection } from "./components/TrajetoriaSection";
import { ProcessoSection } from "./components/ProcessoSection";
import { TecnologiaSection } from "./components/TecnologiaSection";
import { DiferenciaisSection } from "./components/DiferenciaisSection";
import { FaqSection } from "./components/FaqSection";
import { ContatoSection } from "./components/ContatoSection";
import { Footer } from "./components/Footer";
import { TextReveal } from "./components/ui/TextReveal";
// @ts-ignore
import logo from "./assets/img/logo_habilita.svg";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-primary flex flex-col items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100vh",
        transition: {
          type: "spring",
          stiffness: 60,
          damping: 20,
          mass: 1,
          delay: 0.1 // Just a tiny micro-delay to let the exit trigger smoothly
        }
      }}
    >
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
      >
        <img 
          src={logo} 
          alt="Habilita Automação" 
          className="h-20 w-auto object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </motion.div>
      <div className="text-white font-display-hero text-[clamp(32px,5vw,56px)] flex items-center">
        <TextReveal text="Habilita" delay={0.1} />
        <span className="font-normal ml-2">
          <TextReveal text="Automação" delay={0.1} />
        </span>
      </div>
    </motion.div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Expose lenis globally so navbar can use scrollTo
    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      (window as any).__lenis = null;
      lenis.destroy();
    };
  }, []);

  // Finish loader quickly
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Trigger exit at 1.2s. Total animation completes under 2s.
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {isLoading && <PageLoader onComplete={() => {}} />}
      </AnimatePresence>

      <div className="relative w-full">
        <FloatingNavbar />
        <main>
          <HeroSection />
          <ServicosSection />
          <ClpSection />
          <ProjetosSection />
          <TrajetoriaSection />
          <ProcessoSection />
          <TecnologiaSection />
          <DiferenciaisSection />
          <FaqSection />
          <ContatoSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

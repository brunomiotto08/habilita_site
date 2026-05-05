import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { springSnappy } from "../lib/animations";
// @ts-ignore
import logo from "../assets/img/logo_habilita.svg";

export const FloatingNavbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 60) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const links = [
    { name: "Serviços", href: "#servicos" },
    { name: "Projetos", href: "#projetos" },
    { name: "Processo", href: "#processo" },
    { name: "Trajetória", href: "#trajetoria" },
    { name: "Tecnologia", href: "#tecnologia" },
  ];

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      className="fixed top-[24px] left-1/2 z-[9999] flex items-center rounded-full border border-[rgba(44,45,94,0.15)]"
      style={{
        translateX: "-50%",
        width: "max-content", // This prevents ANY squishing, ever!
        backdropFilter: "blur(20px) saturate(180%)",
        boxShadow: "0 8px 32px rgba(44,45,94,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
      }}
      initial={{ 
        backgroundColor: "rgba(217,216,216,1)", 
        y: -100,
        gap: "48px",
        paddingLeft: "32px",
        paddingRight: "16px",
        paddingTop: "12px",
        paddingBottom: "12px"
      }}
      animate={{
        backgroundColor: "rgba(217,216,216,1)",
        y: 0,
        gap: isScrolled ? "24px" : "48px",
        paddingLeft: isScrolled ? "24px" : "32px",
        paddingRight: isScrolled ? "12px" : "16px",
        paddingTop: isScrolled ? "10px" : "12px",
        paddingBottom: isScrolled ? "10px" : "12px",
      }}
      transition={springSnappy}
    >
      {/* Logo */}
      <div className="flex-shrink-0 cursor-pointer flex items-center gap-1 h-full">
        <div className="font-display-hero text-xl text-primary font-bold tracking-tight">
          <img 
            src={logo} 
            alt="Habilita Automação" 
            className="h-8 w-auto object-contain"
            style={{ mixBlendMode: "darken" }} // Removes light grey background if the user didn't remove it
          />
        </div>
        <span className="font-display-hero text-[18px] leading-none font-medium text-[rgba(44,45,94,0.85)]">Habilita</span>
      </div>

      {/* Links */}
      <motion.div 
        className="hidden md:flex items-center"
        initial={{ gap: "32px" }}
        animate={{ gap: isScrolled ? "20px" : "32px" }}
        transition={springSnappy}
      >
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => scrollTo(link.href)}
            className="relative cursor-pointer py-1 flex items-center bg-transparent border-none outline-none"
            onMouseEnter={() => setHoveredLink(link.name)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <span className="font-ui text-[12px] uppercase tracking-[0.08em] text-[rgba(44,45,94,0.6)] hover:text-primary transition-colors duration-200">
              {link.name}
            </span>
            <AnimatePresence>
              {hoveredLink === link.name && (
                <motion.div
                  className="absolute bottom-[0px] left-0 right-0 h-[2px] bg-accent rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ originX: 0 }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button
        onClick={() => scrollTo("#contato")}
        className="bg-accent text-white rounded-full px-[24px] py-[12px] font-ui text-[13px] leading-none flex items-center justify-center flex-shrink-0 cursor-pointer border-none outline-none"
        whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(227,107,41,0.45)" }}
        whileTap={{ scale: 0.97 }}
        transition={springSnappy}
      >
        Fale Conosco
      </motion.button>
    </motion.div>
  );
};

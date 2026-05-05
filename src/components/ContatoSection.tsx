import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { TextReveal } from "./ui/TextReveal";
import { springSnappy, springEntrance } from "../lib/animations";
// @ts-ignore
import logo from "../assets/img/logo_habilita.svg";

const InputField = ({ label, type = "text", as: Component = "input", ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col mb-4">
      <label className="font-ui text-[13px] text-primary mb-2 ml-1">{label}</label>
      <motion.div
        animate={{
          borderColor: isFocused ? "rgba(227,107,41,0.6)" : "rgba(44,45,94,0.12)",
          boxShadow: isFocused ? "0 0 0 3px rgba(227,107,41,0.12)" : "0 0 0 0px rgba(0,0,0,0)"
        }}
        transition={springSnappy}
        className="rounded-[12px] border bg-[rgba(44,45,94,0.04)] overflow-hidden"
      >
        <Component
          type={type}
          className="w-full bg-transparent px-[16px] py-[14px] font-body text-[15px] text-primary outline-none placeholder:text-[rgba(44,45,94,0.3)]"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </motion.div>
    </div>
  );
};

export const ContatoSection = () => {
  return (
    <section id="contato" className="relative py-[140px] px-4 flex flex-col items-center">
      
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={springEntrance}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-8">
          <img 
            src={logo} 
            alt="Habilita Automação Logo" 
            className="h-16 w-auto object-contain opacity-80"
            style={{ mixBlendMode: "darken" }}
          />
        </div>
        <div className="mb-4 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-[0.25em]">
              <TextReveal
                text="Pronto para"
                className="font-display-hero text-[clamp(40px,6vw,72px)] leading-[1.05] pb-1"
                textClassName="font-light tracking-tight bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent"
              />
              <TextReveal
                text="elevar"
                className="font-display-hero text-[clamp(40px,6vw,72px)] leading-[1.05] pb-1"
                textClassName="font-black tracking-tighter bg-gradient-to-br from-primary to-[#4b4d8c] bg-clip-text text-transparent"
                delay={0.1}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-[0.25em]">
              <TextReveal
                text="sua"
                className="font-display-hero text-[clamp(40px,6vw,72px)] leading-[1.05] pb-1"
                textClassName="font-light tracking-tight bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent"
                delay={0.2}
              />
              <TextReveal
                text="operação?"
                className="font-display-hero text-[clamp(40px,6vw,72px)] leading-[1.05] pb-1"
                textClassName="font-black tracking-tighter bg-gradient-to-br from-accent to-[#f58442] bg-clip-text text-transparent"
                delay={0.3}
              />
            </div>
        </div>
        <p className="font-body text-[18px] text-[rgba(44,45,94,0.65)]">
          Fale com nossa equipe técnica de especialistas.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ delay: 0.2, ...springEntrance }}
        className="w-full max-w-[560px] bg-[rgba(255,255,255,0.6)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.8)] rounded-[24px] p-6 sm:p-12 mb-10"
        style={{ boxShadow: "0 24px 64px rgba(44,45,94,0.05)" }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <InputField label="Nome Completo" placeholder="Ex: João Silva" />
          <InputField label="E-mail Corporativo" type="email" placeholder="joao@empresa.com.br" />
          <InputField label="Como podemos ajudar?" as="textarea" rows={4} placeholder="Descreva brevemente sua necessidade..." />
          
          <motion.button
            className="w-full mt-2 bg-accent text-white font-montserrat font-bold text-[15px] uppercase tracking-[0.08em] rounded-[12px] py-[16px]"
            whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(227,107,41,0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
          >
            Enviar Mensagem
          </motion.button>
        </form>
      </motion.div>

      {/* Direct Contact Links */}
      <motion.div 
        className="flex gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <a href="#" className="flex items-center gap-2 group cursor-pointer">
          <MessageCircle className="w-5 h-5 text-[rgba(44,45,94,0.5)] group-hover:text-accent transition-colors" />
          <span className="font-ui text-[14px] text-[rgba(44,45,94,0.5)] group-hover:text-accent transition-colors">
            WhatsApp
          </span>
        </a>
        <a href="#" className="flex items-center gap-2 group cursor-pointer">
          <Mail className="w-5 h-5 text-[rgba(44,45,94,0.5)] group-hover:text-accent transition-colors" />
          <span className="font-ui text-[14px] text-[rgba(44,45,94,0.5)] group-hover:text-accent transition-colors">
            contato@habilita.com.br
          </span>
        </a>
      </motion.div>

    </section>
  );
};

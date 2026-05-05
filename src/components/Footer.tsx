import React from "react";
// @ts-ignore
import logo from "../assets/img/logo_habilita.svg";

export const Footer = () => {
  return (
    <footer className="bg-[rgba(44,45,94,0.04)] border-t border-[rgba(44,45,94,0.1)] pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">

        {/* Col 1: Logo & Tagline */}
        <div className="flex flex-col md:w-1/3">
          <img
            src={logo}
            alt="Habilita Automação"
            className="h-14 w-auto object-contain object-left mb-4 opacity-90"
          />
          <p className="font-body text-[14px] text-[rgba(44,45,94,0.6)]">
            Engenharia de precisão e soluções completas em automação industrial para quem não aceita meio-termo.
          </p>
        </div>

        {/* Col 2: Links */}
        <div className="flex flex-col md:w-1/3">
          <h4 className="font-ui font-semibold text-[14px] text-primary mb-4 uppercase tracking-widest">Navegação</h4>
          <ul className="flex flex-col gap-3">
            {["Sobre Nós", "Nossos Serviços", "Trajetória", "Contato"].map((link) => (
              <li key={link}>
                <a href="#" className="font-body text-[14px] text-[rgba(44,45,94,0.6)] hover:text-accent transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Social & Contact */}
        <div className="flex flex-col md:w-1/3">
          <h4 className="font-ui font-semibold text-[14px] text-primary mb-4 uppercase tracking-widest">Conectar</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#" className="font-body text-[14px] text-[rgba(44,45,94,0.6)] hover:text-accent transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="font-body text-[14px] text-[rgba(44,45,94,0.6)] hover:text-accent transition-colors">
                Instagram
              </a>
            </li>
            <li className="pt-2">
              <span className="font-body text-[14px] text-[rgba(44,45,94,0.6)]">
                Av. Industrial, 1000 - São Paulo, SP
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[rgba(44,45,94,0.06)] flex flex-col md:flex-row items-center justify-between">
        <span className="font-body text-[12px] text-[rgba(44,45,94,0.4)]">
          &copy; {new Date().getFullYear()} Habilita Automação. Todos os direitos reservados.
        </span>
        <span className="font-body text-[12px] text-[rgba(44,45,94,0.4)] mt-2 md:mt-0">
          Design por Taste Skill
        </span>
      </div>
    </footer>
  );
};

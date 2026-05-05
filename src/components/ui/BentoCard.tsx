import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { springGravity, springSnappy, springEntrance } from "../../lib/animations";
import { cn } from "../../lib/utils";
import { GlowCard } from "./spotlight-card";

interface BentoCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  variants?: Variants; // For parent staggering
  glowColor?: 'primary' | 'accent';
}

export const BentoCard = ({ icon: Icon, title, description, className, variants, glowColor = "primary" }: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for tilt
  const mouseX = useMotionValue(0.5); // 0 to 1
  const mouseY = useMotionValue(0.5); // 0 to 1

  // Springs for smooth return
  const smoothMouseX = useSpring(mouseX, isHovering ? springSnappy : springGravity);
  const smoothMouseY = useSpring(mouseY, isHovering ? springSnappy : springGravity);

  const rotateY = useTransform(smoothMouseX, [0, 1], [-8, 8]);
  const rotateX = useTransform(smoothMouseY, [0, 1], [8, -8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: springEntrance },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      className={cn("perspective-1000 h-full", className)}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          mouseX.set(0.5);
          mouseY.set(0.5);
        }}
        style={{ 
          rotateX, 
          rotateY,
        }}
        whileHover={{ scale: 1.025 }}
        transition={springSnappy}
        className="h-full"
      >
        <GlowCard 
          glowColor={glowColor}
          customSize
          className={cn(
            "h-full flex flex-col justify-between p-8 border-[rgba(255,255,255,0.7)] transition-colors duration-300",
            glowColor === "accent" ? "hover:border-accent/50" : "hover:border-primary/50"
          )}
        >
          <div>
            <motion.div
              className="w-[60px] h-[60px] rounded-[14px] bg-[rgba(44,45,94,0.06)] flex items-center justify-center mb-6 group-hover:bg-[rgba(227,107,41,0.1)] transition-colors duration-300"
              variants={{
                hover: { scale: 1.1 }
              }}
              transition={springSnappy}
            >
              <Icon className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300" />
            </motion.div>
            
            <h3 className="font-display-section text-[clamp(20px,2vw,28px)] mb-3">
              {title}
            </h3>
            <p className="font-body text-[14px] md:text-[15px] line-clamp-3">
              {description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(44,45,94,0.08)] flex items-center">
            <motion.span
              className="font-ui text-[13px] text-[rgba(44,45,94,0.4)] group-hover:text-accent transition-colors duration-300"
              variants={{
                hover: { x: 4 }
              }}
              transition={springSnappy}
            >
              Saiba mais →
            </motion.span>
          </div>
        </GlowCard>
      </motion.div>
    </motion.div>
  );
};

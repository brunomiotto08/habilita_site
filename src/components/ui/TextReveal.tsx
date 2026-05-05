import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { springEntrance } from "../../lib/animations";
import { cn } from "../../lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  textClassName?: string;
  delay?: number;
  as?: React.ElementType;
}

export const TextReveal = ({ text, className, textClassName, delay = 0, as: Component = "h2" }: TextRevealProps) => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { ...springEntrance, duration: 0.5 },
    },
  };

  const lines = text.split("\n");
  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      className={cn("flex flex-col", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      // Prevents parent motion components from interfering with these variants
      inherit={false}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="flex flex-wrap" style={{ overflow: "hidden", paddingBottom: "0.2em" }}>
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="inline-block"
              style={{ overflow: "hidden", paddingBottom: "0.1em", marginRight: "0.25em" }}
            >
              <motion.span
                className={cn("inline-block", textClassName)}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionComponent>
  );
};

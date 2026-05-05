import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const CountUp = ({ to, duration = 1.5, className, prefix = "", suffix = "" }: CountUpProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0 });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      
      const controls = animate(0, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // Exponential ease-out
        onUpdate(value) {
          if (node) {
            // Formatting to string with optional prefix/suffix
            // Handles rounding gracefully
            const roundedValue = Math.round(value);
            // Example: formatting 1000 to "1.000" if needed, but since it's just numbers, let's keep it simple or use locale string
            const displayValue = roundedValue > 999 
              ? roundedValue.toLocaleString("pt-BR") 
              : roundedValue.toString();
              
            node.textContent = `${prefix}${displayValue}${suffix}`;
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, to, duration, prefix, suffix]);

  return (
    <span ref={nodeRef} className={cn(className)}>
      {prefix}0{suffix}
    </span>
  );
};

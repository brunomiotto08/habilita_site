import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "../../hooks/useMousePosition";

export const CustomCursor = () => {
  const mousePosition = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use springs to smooth the cursor animation
  const springConfigDot = { damping: 100, stiffness: 1000, mass: 0.1 };
  const dotX = useSpring(0, springConfigDot);
  const dotY = useSpring(0, springConfigDot);

  // The ring follows with a delay (lerp-like feel)
  const springConfigRing = { damping: 30, stiffness: 150, mass: 0.8 };
  const ringX = useSpring(0, springConfigRing);
  const ringY = useSpring(0, springConfigRing);

  useEffect(() => {
    // Only show cursor when mouse moves
    if (mousePosition.x > 0 || mousePosition.y > 0) {
      setIsVisible(true);
      dotX.set(mousePosition.x);
      dotY.set(mousePosition.y);
      ringX.set(mousePosition.x);
      ringY.set(mousePosition.y);
    }
  }, [mousePosition, dotX, dotY, ringX, ringY]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // Use prefers-reduced-motion to disable custom cursor if needed
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-[10px] h-[10px] bg-primary rounded-full pointer-events-none z-[10000]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "multiply",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "multiply",
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          backgroundColor: isHovering ? "rgba(227,107,41,0.1)" : "transparent",
          borderColor: isHovering ? "#e36b29" : "#2c2d5e",
        }}
        animate={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.8 }}
      />
    </>
  );
};

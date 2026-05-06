import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible]   = useState(false);

  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  // Lag suave — não cola no ponteiro, flutua
  const x = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.35 });
  const y = useSpring(my, { stiffness: 180, damping: 22, mass: 0.35 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(
        t.tagName === "A" || t.tagName === "BUTTON" ||
        !!t.closest("a") || !!t.closest("button")
      );
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [visible, mx, my]);

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    mq.addEventListener("change", () => setReduced(mq.matches));
  }, []);

  if (reduced || !visible) return null;

  return (
    <motion.div
      style={{
        position:     "fixed",
        left:         x,
        top:          y,
        translateX:   "-50%",
        translateY:   "-50%",
        pointerEvents:"none",
        zIndex:       9999,
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference",
      }}
      animate={{
        width:  hovering ? 60 : 24,
        height: hovering ? 60 : 24,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.5 }}
    />
  );
};

import type { Transition, Variants } from "framer-motion";

// Absolute and non-negotiable spring configurations
export const springEntrance: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 20,
  mass: 1.2
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 28,
  mass: 0.8
};

export const springGravity: Transition = {
  type: "spring",
  stiffness: 30,
  damping: 18,
  mass: 2
};

// Common animation variants
export const entranceVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: springEntrance },
};

export const buttonHoverVariants: Variants = {
  hover: { scale: 1.05, transition: springSnappy },
  tap: { scale: 0.97, transition: springSnappy },
};

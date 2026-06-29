export const fade = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 },
} as const;

export const slideUp = {
  animate: { opacity: 1, transform: "translateY(0)" },
  exit: { opacity: 0, transform: "translateY(12px)" },
  initial: { opacity: 0, transform: "translateY(12px)" },
} as const;

export const scaleIn = {
  animate: { opacity: 1, transform: "translateY(0) scale(1)" },
  exit: { opacity: 0, transform: "translateY(8px) scale(0.98)" },
  initial: { opacity: 0, transform: "translateY(8px) scale(0.95)" },
  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
} as const;

export const transitionSoft = {
  duration: 0.2,
  ease: [0.23, 1, 0.32, 1],
} as const;

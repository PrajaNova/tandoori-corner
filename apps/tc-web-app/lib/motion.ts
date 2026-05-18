export const fade = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 },
} as const;

export const slideUp = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  initial: { opacity: 0, y: 20 },
} as const;

export const scaleIn = {
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  initial: { opacity: 0, scale: 0.95, y: 20 },
} as const;

export const transitionSoft = {
  duration: 0.3,
  ease: "easeOut",
} as const;

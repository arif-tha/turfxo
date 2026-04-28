/**
 * Animation configuration for Framer Motion
 * Reusable animation variants and transitions
 */

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
    scale: 1.02,
  },
  transition: { duration: 0.3 },
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

// Glassmorphism shadow effect
export const glassmorphShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.15)';
export const glassmorphBlur = 'backdrop-blur-xl';
export const glassmorphBg = 'bg-white/10';
export const glassmorphBorder = 'border border-white/20';

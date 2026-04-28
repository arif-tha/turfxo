import { motion } from 'framer-motion';

/**
 * Animated wrapper component for scroll-triggered reveal animations
 * Fades in and slides up when scrolled into view
 */
export const ScrollReveal = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '',
  style = {}
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration, 
        ease: 'easeOut' 
      }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered container for animating multiple children with delay
 */
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = '' 
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Individual stagger item for use with StaggerContainer
 */
export const StaggerItem = ({ 
  children, 
  className = '',
  style = {}
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/**
 * Glassmorphism card component with hover effect
 */
export const GlassCard = ({ 
  children, 
  className = '',
  hoverScale = true,
  onClick = null
}) => {
  return (
    <motion.div
      whileHover={hoverScale ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        backdrop-blur-xl 
        bg-white/10 
        border border-white/20 
        rounded-2xl 
        p-6
        hover:bg-white/15
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Animated button with hover glow effect
 */
export const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  glowEffect = true,
  className = '',
  style = {}
}) => {
  const baseClasses = 'font-semibold uppercase tracking-wider transition-all duration-300';
  
  const variants = {
    primary: `${baseClasses} bg-emerald-500 hover:bg-emerald-600 text-white`,
    secondary: `${baseClasses} border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10`,
    ghost: `${baseClasses} text-white hover:text-emerald-400`,
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`
        ${variants[variant]} 
        py-3 px-6 rounded-lg 
        relative overflow-hidden
        ${className}
      `}
      style={style}
    >
      {glowEffect && variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

/**
 * Loading spinner with sports theme
 */
export const SportsLoader = ({ size = 'md' }) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className={`${sizeMap[size]} border-4 border-emerald-500/30 border-t-emerald-500 rounded-full`}
    />
  );
};

/**
 * Scroll progress indicator
 */
export const ScrollProgress = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 origin-left z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 0.25, 0.5, 0.75, 1] }}
      transition={{ duration: 3, ease: 'easeOut' }}
    />
  );
};

/**
 * Image reveal with zoom effect
 */
export const ImageReveal = ({ 
  src, 
  alt = '',
  className = '',
  zoomLevel = 1.1
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={className}
    >
      <motion.img
        src={src}
        alt={alt}
        whileHover={{ scale: zoomLevel }}
        transition={{ duration: 0.5 }}
        className="w-full h-full object-cover rounded-2xl"
      />
    </motion.div>
  );
};

/**
 * Text reveal animation (character by character or word by word)
 */
export const TextReveal = ({ 
  text, 
  className = '',
  byCharacter = false 
}) => {
  const textArray = byCharacter ? text.split('') : text.split(' ');
  
  return (
    <div className={className}>
      {textArray.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          viewport={{ once: true }}
        >
          {item}{byCharacter ? '' : ' '}
        </motion.span>
      ))}
    </div>
  );
};

/**
 * Floating animation for elements
 */
export const FloatingElement = ({ 
  children, 
  duration = 3,
  className = ''
}) => {
  return (
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

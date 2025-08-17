import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

// Smooth scroll reveal for navigation items
export const NavItemReveal = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// Terminal Industries inspired scroll progress indicator
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-bright-yellow z-40 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// Parallax background elements
export const ParallaxBackground = ({ children, offset = 50 }: { children: ReactNode; offset?: number }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);

  return (
    <motion.div style={{ y }} className="absolute inset-0">
      {children}
    </motion.div>
  );
};

// Floating elements with mouse interaction
export const FloatingElement = ({ 
  children, 
  intensity = 1, 
  delay = 0 
}: { 
  children: ReactNode; 
  intensity?: number; 
  delay?: number; 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * intensity,
        y: (e.clientY / window.innerHeight - 0.5) * intensity
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return (
    <motion.div
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay
      }}
    >
      {children}
    </motion.div>
  );
};

// Terminal Industries style section separator
export const SectionSeparator = () => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="w-full h-px bg-gradient-to-r from-transparent via-bright-yellow to-transparent my-20"
    />
  );
};

// Glitch effect for text (Terminal Industries inspired)
export const GlitchText = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={isGlitching ? {
        x: [0, -2, 2, -1, 1, 0],
        textShadow: [
          "0 0 0 transparent",
          "2px 0 0 #ff0000, -2px 0 0 #00ff00",
          "-2px 0 0 #ff0000, 2px 0 0 #00ff00",
          "0 0 0 transparent"
        ]
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0 text-red-500 opacity-80"
            animate={{ x: 2 }}
            transition={{ duration: 0.1 }}
          >
            {children}
          </motion.div>
          <motion.div
            className="absolute inset-0 text-green-500 opacity-80"
            animate={{ x: -2 }}
            transition={{ duration: 0.1 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

// Morphing background grid (Terminal Industries style)
export const MorphingGrid = () => {
  return (
    <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              animate={{
                strokeDasharray: ["0 0", "20 20", "0 0"],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
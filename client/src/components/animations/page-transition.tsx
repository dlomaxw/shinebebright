import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Enhanced page transition inspired by Terminal Industries
export const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <>
      {/* Dark overlay that slides in and out */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          transformOrigin: "left"
        }}
        className="fixed inset-0 bg-bright-black z-50"
      />
      
      {/* Main content transition */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2
        }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
};

// Curtain-style page transition for premium feel
export const CurtainPageTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <>
      {/* Left curtain */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "-100%" }}
        exit={{ x: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="fixed top-0 left-0 w-1/2 h-full bg-bright-black z-50"
      />
      
      {/* Right curtain */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "100%" }}
        exit={{ x: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="fixed top-0 right-0 w-1/2 h-full bg-bright-black z-50"
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.1
        }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
};

// Slide reveal transition like Terminal Industries
export const SlideRevealTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <>
      {/* Sliding overlay */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "100%" }}
        exit={{ x: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="fixed inset-0 bg-gradient-to-r from-bright-black to-bright-yellow z-50"
      />
      
      {/* Secondary overlay for depth */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "100%" }}
        exit={{ x: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.1
        }}
        className="fixed inset-0 bg-bright-black/80 z-40"
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3
        }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
};

export const SectionTransition = ({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideInLeft = ({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideInRight = ({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInUp = ({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, className = "", delay = 0 }: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerChild = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Terminal Industries inspired loading overlay
export const LoadingOverlay = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-bright-black z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-bright-yellow border-t-transparent rounded-full mx-auto mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-bright-yellow font-medium tracking-wider"
            >
              LOADING
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Advanced geometric transition for special pages
export const GeometricTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <>
      {/* Animated geometric shapes */}
      <motion.div
        initial={{ x: "100%", skewX: -45 }}
        animate={{ x: "100%", skewX: -45 }}
        exit={{ x: "-50%", skewX: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="fixed inset-0 bg-bright-yellow z-50"
      />
      
      <motion.div
        initial={{ x: "100%", skewX: -30 }}
        animate={{ x: "100%", skewX: -30 }}
        exit={{ x: "-25%", skewX: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.1
        }}
        className="fixed inset-0 bg-bright-black/90 z-40"
      />
      
      {/* Content with sophisticated entrance */}
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: -50, rotateX: 15 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.4
        }}
        style={{ transformPerspective: 1000 }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
};

// Magnetic cursor effect for interactive elements (inspired by Terminal Industries)
export const MagneticElement = ({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setMousePosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
};
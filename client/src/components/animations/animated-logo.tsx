import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logoPath from "@/assets/bright-logo-correct.png";

interface AnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
}

export const AnimatedLogo = ({ 
  className = "", 
  size = "md", 
  autoPlay = true,
  onAnimationComplete 
}: AnimatedLogoProps) => {
  const [isAnimating, setIsAnimating] = useState(autoPlay);

  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
    xl: "h-24"
  };

  const logoVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        scale: {
          type: "spring",
          damping: 10,
          stiffness: 100
        }
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [0, 0.3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        onAnimationComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, onAnimationComplete]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          variants={glowVariants}
          initial="hidden"
          animate={isAnimating ? "visible" : "hidden"}
          className="absolute inset-0 bg-bright-yellow rounded-full blur-md"
        />
        
        {/* Logo */}
        <motion.img
          src={logoPath}
          alt="Bright Properties Logo"
          variants={logoVariants}
          initial="hidden"
          animate={isAnimating ? "visible" : "hidden"}
          className={`${sizeClasses[size]} w-auto relative z-10`}
          onAnimationComplete={() => {
            if (isAnimating) {
              onAnimationComplete?.();
            }
          }}
        />
      </div>

      {/* Brand Text */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate={isAnimating ? "visible" : "hidden"}
        className="flex flex-col"
      >
        <span className="text-bright-black font-bold text-lg leading-tight">
          BRIGHT
        </span>
        <span className="text-bright-gray text-sm leading-tight">
          Properties
        </span>
      </motion.div>
    </div>
  );
};

export const LogoRevealSequence = ({ onComplete }: { onComplete?: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const sequenceVariants = {
    step0: { scale: 0, opacity: 0 },
    step1: { scale: 1.2, opacity: 0.7 },
    step2: { scale: 1, opacity: 1 },
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 500),
      setTimeout(() => setCurrentStep(2), 1000),
      setTimeout(() => onComplete?.(), 1500),
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <motion.div
        variants={sequenceVariants}
        animate={`step${currentStep}`}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <AnimatedLogo size="xl" autoPlay={true} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: currentStep >= 2 ? 1 : 0, y: currentStep >= 2 ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-bright-gray text-lg"
        >
          Welcome to the Future
        </motion.p>
      </motion.div>
    </div>
  );
};

export const FloatingLogo = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      <AnimatedLogo size="lg" autoPlay={false} />
    </motion.div>
  );
};
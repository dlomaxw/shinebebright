import { ReactNode } from "react";
import { useLocation } from "wouter";
import { PageTransition, SlideRevealTransition, CurtainPageTransition, GeometricTransition } from "./page-transition";

interface TransitionWrapperProps {
  children: ReactNode;
}

// Map routes to specific transition types for variety
const getTransitionForRoute = (pathname: string) => {
  // Admin pages get curtain transition for premium feel
  if (pathname.startsWith('/admin')) {
    return 'curtain';
  }
  
  // Key pages get slide reveal transition like Terminal Industries
  if (['/services', '/portfolio', '/properties', '/contact'].includes(pathname)) {
    return 'slide-reveal';
  }
  
  // Service subpages get curtain transition
  if (pathname.startsWith('/services/')) {
    return 'curtain';
  }
  
  // Special pages get geometric transition for visual impact
  if (['/about', '/watch-demo', '/virtual-tours'].includes(pathname)) {
    return 'geometric';
  }
  
  // Default to enhanced page transition
  return 'default';
};

export const TransitionWrapper = ({ children }: TransitionWrapperProps) => {
  const [location] = useLocation();
  const transitionType = getTransitionForRoute(location);

  switch (transitionType) {
    case 'curtain':
      return <CurtainPageTransition>{children}</CurtainPageTransition>;
    case 'slide-reveal':
      return <SlideRevealTransition>{children}</SlideRevealTransition>;
    case 'geometric':
      return <GeometricTransition>{children}</GeometricTransition>;
    default:
      return <PageTransition>{children}</PageTransition>;
  }
};
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageTransition } from "@/components/animations/page-transition";
import { LogoRevealSequence } from "@/components/animations/animated-logo";

// Layout components
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import RealEstate from "@/pages/real-estate";
import Architecture from "@/pages/architecture";
import InteriorDesign from "@/pages/interior-design";
import Media from "@/pages/media";
import Training from "@/pages/training";
import Portfolio from "@/pages/portfolio";
import Properties from "@/pages/properties";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";
import AdminProjects from "@/pages/admin-projects";
import News from "@/pages/news";
import Comparison from "@/pages/comparison";
import BookService from "@/pages/book-service";
import NotFound from "@/pages/not-found";
import ClientPortal from "@/pages/client-portal";
import VirtualTours from "@/pages/virtual-tours";
import Analytics from "@/pages/analytics";

function Router() {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/services" component={Services} />
              <Route path="/services/real-estate" component={RealEstate} />
              <Route path="/services/architecture" component={Architecture} />
              <Route path="/services/interior-design" component={InteriorDesign} />
              <Route path="/services/media" component={Media} />
              <Route path="/services/training" component={Training} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/properties" component={Properties} />
              <Route path="/contact" component={Contact} />
              <Route path="/admin" component={Admin} />
              <Route path="/admin/projects" component={AdminProjects} />
              <Route path="/news" component={News} />
              <Route path="/comparison" component={Comparison} />
              <Route path="/book-service" component={BookService} />
              <Route path="/client-portal" component={ClientPortal} />
              <Route path="/virtual-tours" component={VirtualTours} />
              <Route path="/analytics" component={Analytics} />
              <Route component={NotFound} />
            </Switch>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [showLogoReveal, setShowLogoReveal] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('bright-has-visited');
    if (hasVisited) {
      setShowLogoReveal(false);
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('bright-has-visited', 'true');
    }
  }, []);

  const handleLogoRevealComplete = () => {
    setShowLogoReveal(false);
  };

  if (showLogoReveal && isFirstVisit) {
    return <LogoRevealSequence onComplete={handleLogoRevealComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

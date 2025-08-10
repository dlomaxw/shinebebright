import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Link } from "wouter";

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200",
    title: "Where Reality Meets",
    highlight: "Immersive Technology",
    description: "Bright delivers seamless experiences that bridge physical spaces and digital innovation across industries.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200",
    title: "Transform Your",
    highlight: "Property Marketing",
    description: "Revolutionary virtual tours and 3D visualizations that showcase properties like never before.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200",
    title: "Architectural",
    highlight: "Visualization Excellence",
    description: "Bringing architectural designs to life with photorealistic renderings and immersive walkthroughs.",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentSlideData.image}
          alt="Hero background"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow mb-6 animate-fade-in">
            {currentSlideData.title}
            <span className="block text-bright-yellow">{currentSlideData.highlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl animate-slide-up">
            {currentSlideData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button asChild className="bg-bright-yellow text-bright-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105">
              <Link href="/services">
                Explore Solutions <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-bright-black transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" /> Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-bright-yellow" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce-slow">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

export default HeroCarousel;

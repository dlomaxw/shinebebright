import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

// Portfolio projects - Currently empty as requested
const portfolioProjects: any[] = [];

// Our property development partners with authentic logos
const propertyDevelopers = [
  {
    id: "1",
    name: "VAAL",
    logo: "/images/developers/vaal_logo.svg",
    website: "https://vaal.co.ug",
    speciality: "Luxury Residential",
    description: "Africa's Gate to Real Estate - Premium developments in Kampala"
  },
  {
    id: "2", 
    name: "HK Properties",
    logo: "/images/developers/hk_properties_logo.png",
    website: "https://hk-properties.com",
    speciality: "Affordable Luxury",
    description: "Quality housing solutions with flexible payment plans"
  },
  {
    id: "3",
    name: "Edifice Properties", 
    logo: "/images/developers/edifice_properties_logo.png",
    website: "https://edificepropertiesug.com",
    speciality: "Modern Living",
    description: "Design-led real estate connecting people & properties perfectly"
  },
  {
    id: "4",
    name: "RF Developers",
    logo: "/images/developers/rf_developers_logo.png",
    website: "https://rfdevelopers.ug", 
    speciality: "Luxury Development",
    description: "Premium luxury real estate development in Uganda"
  },
  {
    id: "5",
    name: "Novus Real Estate",
    logo: "/images/developers/novus_real_estate_logo.jpg",
    website: "https://novusrel.com",
    speciality: "High-End Residential", 
    description: "Doing Well and Doing Good - Icon developments with panoramic views"
  },
  {
    id: "6",
    name: "Saif Real Estate",
    logo: "/images/developers/saif_real_estate_logo.png",
    website: "https://www.saifrealestateuganda.com",
    speciality: "Affordable Housing",
    description: "East African real estate with flexible financing solutions"
  }
];

const categories = [
  "All",
  "Graphics Design and Animation",
  "Branding", 
  "Content Marketing",
  "Social Media Handling",
  "Website Design and Development",
  "Videography and Photography"
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredProjects = portfolioProjects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = searchQuery.length < 2 || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Auto-slide carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(propertyDevelopers.length / 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(propertyDevelopers.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(propertyDevelopers.length / 3)) % Math.ceil(propertyDevelopers.length / 3));
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-bright-black mb-4">Our Portfolio</h1>
            <p className="text-xl text-bright-gray max-w-3xl mx-auto">
              Explore our latest projects and see how we're transforming industries with immersive technology.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-yellow"
              />
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-4 bg-white p-2 rounded-lg shadow-sm">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-bright-yellow text-bright-black" : "text-bright-gray hover:text-bright-black"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Project Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/api/placeholder/400/300?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 p-2 bg-bright-yellow text-bright-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <Badge variant="secondary" className="bg-bright-yellow/10 text-bright-black font-medium">
                        {project.category}
                      </Badge>
                      {project.subcategory && (
                        <Badge variant="outline" className="ml-2 border-bright-yellow/30">
                          {project.subcategory}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-bright-black mb-2 group-hover:text-bright-yellow transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bright-yellow hover:text-bright-black transition-colors duration-300 font-medium flex items-center gap-2"
                      >
                        View Project
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-bright-gray text-lg">
                {searchQuery ? `No projects found for "${searchQuery}"` : "No projects found in this category"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Property Developer Partners Section - Enhanced with Carousel */}
      <section className="py-20 bg-gradient-to-br from-bright-light to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3cdefs%3e%3cpattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"%3e%3ccircle cx="50" cy="50" r="1" fill="%23FFE100" opacity="0.1"/%3e%3c/pattern%3e%3c/defs%3e%3crect width="100%25" height="100%25" fill="url(%23grain)"/%3e%3c/svg%3e')] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-bright-black mb-6 relative">
                Our Trusted Partners
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-bright-yellow rounded-full"></div>
              </h2>
            </div>
            <p className="text-xl text-bright-gray max-w-4xl mx-auto leading-relaxed">
              Collaborating with Uganda's premier real estate developers to deliver exceptional 
              <span className="text-bright-yellow font-semibold"> immersive technology solutions</span> 
              and authentic property experiences.
            </p>
          </div>
          
          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-bright-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Previous partners"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-bright-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next partners"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel */}
            <div className="overflow-hidden mx-12">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(propertyDevelopers.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {propertyDevelopers
                        .slice(slideIndex * 3, slideIndex * 3 + 3)
                        .map((developer, index) => (
                          <div
                            key={developer.id}
                            className="group relative"
                            style={{
                              animationDelay: `${index * 0.2}s`
                            }}
                          >
                            <Card className="h-full bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-500 border-0 group-hover:scale-105 group-hover:-translate-y-2">
                              <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                                {/* Logo Container */}
                                <div className="mb-6">
                                  <div className="h-20 w-full flex items-center justify-center mb-4 relative overflow-hidden rounded-lg bg-gradient-to-br from-bright-light to-white p-4">
                                    <img
                                      src={developer.logo}
                                      alt={`${developer.name} logo`}
                                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-bright-yellow/20 to-bright-yellow/10 rounded-lg text-bright-black font-bold text-lg">${developer.name}</div>`;
                                        }
                                      }}
                                    />
                                    {/* Subtle glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-bright-yellow/0 via-bright-yellow/5 to-bright-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                                  </div>
                                </div>
                                
                                {/* Content */}
                                <div className="space-y-3 flex-grow">
                                  <h3 className="text-xl font-bold text-bright-black group-hover:text-bright-yellow transition-colors duration-300">
                                    {developer.name}
                                  </h3>
                                  <div className="inline-block">
                                    <Badge className="bg-bright-yellow/10 text-bright-black border-bright-yellow/30 px-3 py-1">
                                      {developer.speciality}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-bright-gray leading-relaxed px-2">
                                    {developer.description}
                                  </p>
                                </div>
                                
                                {/* CTA Button */}
                                <div className="mt-6">
                                  <a
                                    href={developer.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-bright-yellow hover:bg-yellow-400 text-bright-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:animate-pulse"
                                  >
                                    Visit Website
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: Math.ceil(propertyDevelopers.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-bright-yellow scale-125 shadow-lg' 
                      : 'bg-bright-gray/40 hover:bg-bright-gray/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-bright-gray mb-6">
              Ready to bring your property development to life with immersive technology?
            </p>
            <Button className="bg-bright-black text-white hover:bg-bright-yellow hover:text-bright-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

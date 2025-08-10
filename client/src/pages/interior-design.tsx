import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/project-card";
import FeatureList from "@/components/feature-list";
import { Button } from "@/components/ui/button";
import { Palette, Home, Lightbulb, Sofa, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

const InteriorDesign = () => {
  const { data: interiorProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", { category: "interior-design" }],
  });

  const features = [
    "Virtual Staging",
    "Interior Visualization", 
    "Space Planning",
    "Furniture Placement",
    "Color Schemes",
    "Material Selection"
  ];

  const benefits = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Virtual Staging",
      description: "Transform empty spaces into beautifully furnished environments to help buyers visualize potential."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design Visualization",
      description: "See your interior design concepts come to life before making any physical changes."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Creative Solutions",
      description: "Explore multiple design options and configurations to find the perfect solution."
    },
    {
      icon: <Sofa className="w-8 h-8" />,
      title: "Furniture Planning",
      description: "Optimize space usage with precise furniture placement and room layout planning."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-bright-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-bright-black mb-6">
                Interior Design <span className="text-bright-yellow">Visualization</span>
              </h1>
              <p className="text-xl text-bright-gray mb-8">
                Transform spaces with virtual staging and interior visualization services that showcase design potential and help clients envision their perfect environment.
              </p>
              
              <FeatureList features={features} />
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold">
                  <Link href="/contact">
                    Get Started <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-bright-black text-bright-black hover:bg-bright-black hover:text-white">
                  <Link href="/portfolio">
                    View Projects
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Interior Design Visualization"
                className="w-full h-96 object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Why Choose Our Interior Design Services?
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Our virtual staging and design visualization services help interior designers and real estate professionals showcase spaces effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-purple-600">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-bright-black mb-2">{benefit.title}</h3>
                <p className="text-bright-gray">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Our Interior Design Services
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Comprehensive interior design visualization solutions for residential and commercial spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Residential Staging",
                description: "Transform empty homes and apartments with beautiful furniture and decor to help them sell faster.",
                features: ["Living room staging", "Bedroom design", "Kitchen visualization", "Bathroom styling"]
              },
              {
                title: "Commercial Spaces",
                description: "Design and visualize office spaces, retail environments, and hospitality venues.",
                features: ["Office layouts", "Retail store design", "Restaurant concepts", "Hotel interiors"]
              },
              {
                title: "Design Concepts",
                description: "Explore multiple design directions and styles before committing to a final approach.",
                features: ["Style exploration", "Color palettes", "Material selection", "Lighting design"]
              },
              {
                title: "Space Planning",
                description: "Optimize room layouts and furniture placement for maximum functionality and appeal.",
                features: ["Floor plan optimization", "Furniture arrangement", "Traffic flow analysis", "Storage solutions"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-bright-black mb-4">{service.title}</h3>
                <p className="text-bright-gray mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-bright-gray">
                      <span className="w-2 h-2 bg-bright-yellow rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Featured Interior Design Projects
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Explore our latest interior design visualization projects and virtual staging solutions.
            </p>
          </div>

          {interiorProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interiorProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Palette className="w-16 h-16 text-bright-gray mx-auto mb-4" />
              <p className="text-bright-gray text-lg">No interior design projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bright-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's create stunning interior visualizations that showcase the full potential of your spaces.
          </p>
          <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
            <Link href="/contact">
              Start Your Interior Design Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default InteriorDesign;

import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/project-card";
import FeatureList from "@/components/feature-list";
import { Button } from "@/components/ui/button";
import { Ruler, Layers, Building, PenTool, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

const Architecture = () => {
  const { data: architectureProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", { category: "architecture" }],
  });

  const features = [
    "Photorealistic Renderings",
    "Architectural Walkthroughs",
    "Building Information Modeling",
    "Design Visualization",
    "Construction Documentation",
    "Project Presentations"
  ];

  const benefits = [
    {
      icon: <Layers className="w-8 h-8" />,
      title: "3D Visualization",
      description: "Transform 2D blueprints into stunning 3D visualizations that bring designs to life."
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Design Communication",
      description: "Help clients and stakeholders visualize the final project before construction begins."
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "BIM Integration",
      description: "Seamlessly integrate with Building Information Modeling workflows and processes."
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: "Precision Modeling",
      description: "Accurate architectural models that maintain design integrity and technical specifications."
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
                Architectural <span className="text-bright-yellow">Visualization</span>
              </h1>
              <p className="text-xl text-bright-gray mb-8">
                Bring architectural designs to life with photorealistic renderings, immersive walkthroughs, and comprehensive visualization services that enhance design communication.
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Architectural Visualization"
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
              Why Choose Our Architectural Services?
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Our advanced visualization techniques help architects communicate ideas more effectively and win more projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-green-600">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-bright-black mb-2">{benefit.title}</h3>
                <p className="text-bright-gray">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Our Visualization Process
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              From initial concepts to final presentations, we follow a structured approach to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Analysis & Planning",
                description: "We review your architectural drawings and understand project requirements."
              },
              {
                step: "02", 
                title: "3D Modeling",
                description: "Our team creates detailed 3D models based on your architectural plans."
              },
              {
                step: "03",
                title: "Rendering & Delivery",
                description: "We produce photorealistic renderings and immersive walkthroughs."
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-bright-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-bright-black font-bold text-lg">{phase.step}</span>
                </div>
                <h3 className="text-xl font-bold text-bright-black mb-4">{phase.title}</h3>
                <p className="text-bright-gray">{phase.description}</p>
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
              Featured Architecture Projects
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Explore our latest architectural visualization projects and see how we bring designs to life.
            </p>
          </div>

          {architectureProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {architectureProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Ruler className="w-16 h-16 text-bright-gray mx-auto mb-4" />
              <p className="text-bright-gray text-lg">No architecture projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bright-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Visualize Your Next Project?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's create stunning visualizations that help you communicate your architectural vision effectively.
          </p>
          <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
            <Link href="/contact">
              Start Your Visualization Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Architecture;

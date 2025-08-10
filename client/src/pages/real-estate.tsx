import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/project-card";
import FeatureList from "@/components/feature-list";
import { Button } from "@/components/ui/button";
import { Building2, Eye, Camera, Home, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

const RealEstate = () => {
  const { data: realEstateProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", { category: "real-estate" }],
  });

  const features = [
    "Virtual Property Tours",
    "3D Floor Plans",
    "Interactive Walkthroughs", 
    "Drone Photography",
    "Virtual Staging",
    "Property Marketing Videos"
  ];

  const benefits = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Enhanced Visualization",
      description: "Allow potential buyers to explore properties remotely with immersive 3D tours."
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Professional Photography",
      description: "High-quality images and videos that showcase properties in the best light."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Virtual Staging",
      description: "Transform empty spaces into beautifully furnished homes to help buyers visualize potential."
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Pre-Construction Sales",
      description: "Sell properties before construction is complete with detailed visualizations."
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
                Real Estate <span className="text-bright-yellow">Visualization</span>
              </h1>
              <p className="text-xl text-bright-gray mb-8">
                Transform property marketing with immersive virtual tours, 3D visualizations, and interactive experiences that help buyers make confident decisions.
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
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Real Estate Visualization"
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
              Why Choose Our Real Estate Solutions?
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Our advanced visualization technologies help real estate professionals sell faster and more effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-bright-black mb-2">{benefit.title}</h3>
                <p className="text-bright-gray">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Featured Real Estate Projects
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Explore our latest real estate visualization projects and see the impact of immersive technology.
            </p>
          </div>

          {realEstateProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {realEstateProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-bright-gray mx-auto mb-4" />
              <p className="text-bright-gray text-lg">No real estate projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-bright-yellow mb-2">85%</div>
              <div className="text-bright-gray">Faster Sales</div>
              <p className="text-sm text-bright-gray mt-2">Properties with virtual tours sell 85% faster than traditional listings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-bright-yellow mb-2">40%</div>
              <div className="text-bright-gray">More Qualified Leads</div>
              <p className="text-sm text-bright-gray mt-2">Virtual tours generate 40% more qualified buyer inquiries</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-bright-yellow mb-2">95%</div>
              <div className="text-bright-gray">Client Satisfaction</div>
              <p className="text-sm text-bright-gray mt-2">Our clients report 95% satisfaction with virtual tour results</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bright-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Revolutionize Your Property Marketing?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's create stunning virtual experiences that help you sell properties faster and more effectively.
          </p>
          <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
            <Link href="/contact">
              Start Your Project Today
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RealEstate;

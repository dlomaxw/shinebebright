import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/project-card";
import FeatureList from "@/components/feature-list";
import { Button } from "@/components/ui/button";
import { Camera, Video, Megaphone, Film, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

const Media = () => {
  const { data: mediaProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", { category: "media" }],
  });

  const features = [
    "Video Production",
    "Motion Graphics",
    "Interactive Content",
    "Brand Storytelling",
    "Commercial Photography",
    "Digital Marketing Content"
  ];

  const benefits = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Professional Video Production",
      description: "High-quality video content that engages audiences and drives results for your brand."
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Commercial Photography",
      description: "Stunning product and commercial photography that showcases your offerings in the best light."
    },
    {
      icon: <Film className="w-8 h-8" />,
      title: "Motion Graphics",
      description: "Dynamic animations and motion graphics that bring your brand story to life."
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Brand Storytelling",
      description: "Compelling narratives that connect with your audience and build brand loyalty."
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
                Media & <span className="text-bright-yellow">Entertainment</span>
              </h1>
              <p className="text-xl text-bright-gray mb-8">
                Create compelling visual content with our comprehensive media production services, from commercial videos to interactive experiences that captivate audiences.
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
                src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Media Production"
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
              Why Choose Our Media Services?
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Our media production expertise helps brands create engaging content that resonates with their target audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-red-600">{benefit.icon}</div>
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
              Our Media Production Services
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Comprehensive media solutions for businesses looking to enhance their visual communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Commercial Videos",
                description: "Professional video production for marketing campaigns, product launches, and brand storytelling.",
                icon: <Video className="w-8 h-8 text-red-600" />
              },
              {
                title: "Product Photography",
                description: "High-quality product photography that showcases your offerings in stunning detail.",
                icon: <Camera className="w-8 h-8 text-red-600" />
              },
              {
                title: "Motion Graphics",
                description: "Dynamic animations and motion graphics for digital marketing and brand communication.",
                icon: <Film className="w-8 h-8 text-red-600" />
              },
              {
                title: "Interactive Content",
                description: "Engaging interactive experiences that captivate audiences and drive engagement.",
                icon: <Megaphone className="w-8 h-8 text-red-600" />
              },
              {
                title: "Brand Campaigns",
                description: "Comprehensive marketing campaigns that tell your brand story across multiple channels.",
                icon: <Video className="w-8 h-8 text-red-600" />
              },
              {
                title: "Content Strategy",
                description: "Strategic content planning and production to maximize your marketing impact.",
                icon: <Camera className="w-8 h-8 text-red-600" />
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-bright-black mb-4">{service.title}</h3>
                <p className="text-bright-gray">{service.description}</p>
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
              Featured Media Projects
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Explore our latest media production projects and see how we help brands create compelling visual content.
            </p>
          </div>

          {mediaProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mediaProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-bright-gray mx-auto mb-4" />
              <p className="text-bright-gray text-lg">No media projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Our media production services span across various industries, each with unique requirements and challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Technology",
              "Healthcare",
              "Real Estate",
              "Fashion & Retail",
              "Food & Beverage",
              "Education",
              "Automotive",
              "Finance"
            ].map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold text-bright-black">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bright-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Compelling Content?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's produce engaging media content that tells your brand story and connects with your audience.
          </p>
          <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
            <Link href="/contact">
              Start Your Media Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Media;

import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/project-card";
import FeatureList from "@/components/feature-list";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Target, Shield, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

const Training = () => {
  const { data: trainingProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", { category: "training" }],
  });

  const features = [
    "VR Training Simulations",
    "Safety Training",
    "Skill Development",
    "Educational Content",
    "Assessment Tools",
    "Progress Tracking"
  ];

  const benefits = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Immersive Learning",
      description: "Create engaging learning experiences that improve knowledge retention and skill development."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety Training",
      description: "Provide safe environments for training dangerous scenarios without real-world risks."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Skill Assessment",
      description: "Accurately measure and track learning progress with built-in assessment tools."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Scalable Solutions",
      description: "Train multiple users simultaneously with consistent, high-quality content delivery."
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
                Immersive <span className="text-bright-yellow">Training Solutions</span>
              </h1>
              <p className="text-xl text-bright-gray mb-8">
                Transform education and training with immersive VR simulations and interactive learning experiences that accelerate skill development and improve retention.
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
                src="https://pixabay.com/get/g81583d29b86438604b85a7b2307ceded434f166158200718b6c81b864a3f453482b06564518757f3c35c7536693e0d05fc2a14ecfb13eeb25d7a32d9b794e918_1280.jpg"
                alt="VR Training"
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
              Why Choose Immersive Training?
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Our immersive training solutions deliver superior learning outcomes through engaging, interactive experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-orange-600">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-bright-black mb-2">{benefit.title}</h3>
                <p className="text-bright-gray">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Categories */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Training Solutions by Industry
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Specialized training programs designed for different industries and learning objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Corporate Training",
                description: "Professional development programs for teams and organizations.",
                features: ["Leadership development", "Sales training", "Customer service", "Compliance training"]
              },
              {
                title: "Safety & Emergency",
                description: "Critical safety training for high-risk environments and emergency situations.",
                features: ["Fire safety protocols", "Emergency evacuation", "Equipment operation", "Hazard recognition"]
              },
              {
                title: "Healthcare Training",
                description: "Medical simulation and training for healthcare professionals.",
                features: ["Surgical procedures", "Patient care", "Medical equipment", "Emergency response"]
              },
              {
                title: "Technical Skills",
                description: "Hands-on technical training for complex machinery and processes.",
                features: ["Equipment maintenance", "Quality control", "Process optimization", "Technical certification"]
              }
            ].map((category, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-bright-black mb-4">{category.title}</h3>
                <p className="text-bright-gray mb-6">{category.description}</p>
                <ul className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
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

      {/* Training Effectiveness Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Training Effectiveness
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Research shows the superior effectiveness of immersive training compared to traditional methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-bright-yellow mb-2">90%</div>
              <div className="text-bright-gray font-semibold mb-2">Information Retention</div>
              <p className="text-sm text-bright-gray">VR training achieves 90% retention vs 10% from reading</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-bright-yellow mb-2">4x</div>
              <div className="text-bright-gray font-semibold mb-2">Faster Learning</div>
              <p className="text-sm text-bright-gray">Trainees learn 4x faster with VR than in traditional classrooms</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-bright-yellow mb-2">275%</div>
              <div className="text-bright-gray font-semibold mb-2">More Confident</div>
              <p className="text-sm text-bright-gray">Employees are 275% more confident applying skills learned in VR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Featured Training Projects
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Explore our latest immersive training projects and see how we're revolutionizing education and skill development.
            </p>
          </div>

          {trainingProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-bright-gray mx-auto mb-4" />
              <p className="text-bright-gray text-lg">No training projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bright-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Training Program?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's create immersive training experiences that accelerate learning and improve performance outcomes.
          </p>
          <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
            <Link href="/contact">
              Start Your Training Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Training;

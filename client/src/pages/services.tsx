import ServiceCard from "@/components/service-card";
import FeatureList from "@/components/feature-list";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { SERVICES } from "@/lib/constants";

const Services = () => {
  const benefits = [
    "Cutting-edge VR/AR technology",
    "Expert team with 6+ years experience",
    "Custom solutions for every industry",
    "Proven ROI and measurable results",
    "End-to-end project management",
    "24/7 technical support"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-bright-black mb-4">
              Our Services
            </h1>
            <p className="text-xl text-bright-gray max-w-3xl mx-auto">
              Comprehensive immersive technology solutions designed to transform your business and enhance customer experiences across all industries.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-bright-black font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
              <Link href="/contact">
                Get Started Today <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Industry Solutions
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Explore our specialized services tailored to meet the unique needs of different industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Our Process
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              From concept to deployment, we follow a proven methodology to ensure project success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We analyze your needs and define project requirements."
              },
              {
                step: "02", 
                title: "Design",
                description: "Our team creates detailed mockups and prototypes."
              },
              {
                step: "03",
                title: "Development",
                description: "We build your solution using cutting-edge technology."
              },
              {
                step: "04",
                title: "Deployment",
                description: "We launch your project and provide ongoing support."
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-bright-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-bright-black font-bold text-lg">{phase.step}</span>
                </div>
                <h3 className="text-xl font-bold text-bright-black mb-2">{phase.title}</h3>
                <p className="text-bright-gray">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bright-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our immersive technology solutions can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
              <Link href="/contact">
                Start Your Project
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-bright-black font-semibold text-lg px-8 py-4">
              <Link href="/portfolio">
                View Our Work
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

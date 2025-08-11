import { useState } from "react";
import { useLocation } from "wouter";
import { ServiceBookingForm } from "@/components/forms/service-booking-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, Clock, Award } from "lucide-react";

const serviceFeatures: Record<string, string[]> = {
  "real-estate": [
    "Virtual property tours and walkthroughs",
    "Interactive 3D property visualization",
    "Virtual staging and furniture placement",
    "Multi-platform VR/AR experiences",
    "Property comparison tools",
    "Custom branding and white-labeling"
  ],
  "architecture": [
    "Detailed 3D architectural modeling",
    "Virtual building walkthroughs",
    "Design iteration and collaboration tools",
    "Material and lighting simulation",
    "Construction progress visualization",
    "Client presentation tools"
  ],
  "interior-design": [
    "Virtual room design and staging",
    "Furniture and décor visualization",
    "Color and material selection tools",
    "Before/after comparisons",
    "Interactive design collaboration",
    "Real-time design modifications"
  ],
  "media": [
    "Immersive storytelling experiences",
    "Virtual event and exhibition spaces",
    "Interactive media presentations",
    "360° video integration",
    "Social VR experiences",
    "Custom content management systems"
  ],
  "training": [
    "Immersive skill-based training modules",
    "Safety training simulations",
    "Assessment and progress tracking",
    "Multi-user collaborative training",
    "Performance analytics dashboard",
    "Custom curriculum development"
  ]
};

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Premier Real Estate",
    service: "Real Estate Visualization",
    quote: "Bright Platform transformed how we showcase properties. Our sales increased by 40% since implementing their VR tours.",
    rating: 5
  },
  {
    name: "Michael Chen",
    company: "Chen Architecture",
    service: "Architectural Visualization",
    quote: "The ability to walk clients through designs before construction has revolutionized our presentation process.",
    rating: 5
  },
  {
    name: "Emma Williams",
    company: "Design Studio Plus",
    service: "Interior Design",
    quote: "Our clients love seeing their spaces come to life in VR. It's made our design process so much more collaborative.",
    rating: 5
  }
];

const stats = [
  { label: "Projects Completed", value: "500+", icon: Award },
  { label: "Happy Clients", value: "200+", icon: Users },
  { label: "Years Experience", value: "5+", icon: Clock },
  { label: "Industry Awards", value: "15+", icon: Star },
];

export default function BookService() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const serviceType = searchParams.get('service') || '';
  
  const [selectedService, setSelectedService] = useState(serviceType);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const serviceInfo: Record<string, { title: string; description: string; icon: string }> = {
    "real-estate": {
      title: "Real Estate Visualization",
      description: "Create immersive property experiences that sell faster",
      icon: "🏠"
    },
    "architecture": {
      title: "Architectural Visualization",
      description: "Bring architectural designs to life with VR/AR",
      icon: "🏗️"
    },
    "interior-design": {
      title: "Interior Design",
      description: "Visualize and stage interior spaces in virtual reality",
      icon: "🏡"
    },
    "media": {
      title: "Media & Entertainment",
      description: "Create engaging immersive media experiences",
      icon: "🎬"
    },
    "training": {
      title: "VR/AR Training",
      description: "Develop effective immersive training solutions",
      icon: "🎓"
    }
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl font-bold text-green-700">
                Booking Submitted Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-gray-600">
                Thank you for your interest in our immersive technology services.
              </p>
              <p className="text-gray-600">
                Our team will review your request and contact you within 24 hours to discuss your project requirements and provide a detailed proposal.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <h3 className="font-semibold text-yellow-800 mb-2">What happens next?</h3>
                <ul className="text-left text-sm text-yellow-700 space-y-1">
                  <li>• Our project manager will call you within 24 hours</li>
                  <li>• We'll schedule a detailed consultation meeting</li>
                  <li>• Receive a customized proposal and timeline</li>
                  <li>• Start bringing your vision to life!</li>
                </ul>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold"
                >
                  Book Another Service
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Immersive Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your business with cutting-edge VR/AR solutions. No payment required to get started - 
            we'll create a custom proposal just for you.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <ServiceBookingForm 
              initialServiceType={selectedService}
              onSuccess={() => setBookingSuccess(true)}
            />
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Service Features */}
            {selectedService && selectedService in serviceInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{serviceInfo[selectedService as keyof typeof serviceInfo].icon}</span>
                    {serviceInfo[selectedService as keyof typeof serviceInfo].title}
                  </CardTitle>
                  <p className="text-gray-600">{serviceInfo[selectedService as keyof typeof serviceInfo].description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {serviceFeatures[selectedService as keyof typeof serviceFeatures]?.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Process Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Our Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-yellow-500 text-black">1</Badge>
                    <div>
                      <h4 className="font-semibold">Submit Request</h4>
                      <p className="text-sm text-gray-600">Tell us about your project needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-yellow-500 text-black">2</Badge>
                    <div>
                      <h4 className="font-semibold">Consultation</h4>
                      <p className="text-sm text-gray-600">We'll schedule a detailed discussion</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-yellow-500 text-black">3</Badge>
                    <div>
                      <h4 className="font-semibold">Custom Proposal</h4>
                      <p className="text-sm text-gray-600">Receive a tailored solution and quote</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-yellow-500 text-black">4</Badge>
                    <div>
                      <h4 className="font-semibold">Development</h4>
                      <p className="text-sm text-gray-600">We bring your vision to life</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>What Our Clients Say</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-yellow-500 pl-4">
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">"{testimonial.quote}"</p>
                    <p className="text-xs font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">
                  Have questions about our services? Our team is ready to help.
                </p>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">Phone:</p>
                  <p>+250 750 421 224</p>
                  <p>+250 785 189 100</p>
                  <p className="font-semibold pt-2">Email:</p>
                  <p>info@bright.platform</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
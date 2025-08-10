import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import brightLogo from "@/assets/bright-logo.svg";

const Footer = () => {
  const services = [
    { name: "Real Estate", href: "/services/real-estate" },
    { name: "Architecture", href: "/services/architecture" },
    { name: "Interior Design", href: "/services/interior-design" },
    { name: "Media & Entertainment", href: "/services/media" },
    { name: "Training", href: "/services/training" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "News & Blog", href: "/news" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "/contact" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ];

  return (
    <footer className="bg-bright-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src={brightLogo} 
                alt="Bright Properties" 
                className="h-8 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6">
              Immersive technology solutions across industries. Virtual reality, 3D visualization, and interactive experiences.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gray-800 rounded-lg hover:bg-bright-yellow hover:text-bright-black transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gray-800 rounded-lg hover:bg-bright-yellow hover:text-bright-black transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gray-800 rounded-lg hover:bg-bright-yellow hover:text-bright-black transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gray-800 rounded-lg hover:bg-bright-yellow hover:text-bright-black transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-bright-yellow transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-bright-yellow transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-bright-yellow mt-1" />
                <div>
                  <p className="text-gray-300 text-sm">1St Floor Shop 4, The Square</p>
                  <p className="text-gray-300 text-sm">Plot 10 Third St, Kampala</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-bright-yellow mt-1" />
                <div>
                  <p className="text-gray-300 text-sm">+250 750 421 224</p>
                  <p className="text-gray-300 text-sm">+250 785 189 100</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-bright-yellow" />
                <p className="text-gray-300">info@brightplatform.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Bright Platform. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-bright-yellow transition-colors text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

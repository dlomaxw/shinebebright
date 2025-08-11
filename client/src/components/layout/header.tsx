import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { AnimatedLogo } from "@/components/animations/animated-logo";
import { motion } from "framer-motion";
import brightLogo from "@/assets/bright-logo-correct.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Properties", href: "/properties" },
    { name: "Watch Demo", href: "/watch-demo" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Real Estate", href: "/services/real-estate" },
    { name: "Architecture", href: "/services/architecture" },
    { name: "Interior Design", href: "/services/interior-design" },
    { name: "Media & Entertainment", href: "/services/media" },
    { name: "Training", href: "/services/training" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <AnimatedLogo size="md" autoPlay={true} />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-bright-yellow"
                    : "text-gray-700 hover:text-bright-yellow"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-gray-700 hover:text-bright-yellow transition-colors font-medium focus:outline-none focus:text-bright-yellow">
                  Services <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64 z-[9999] bg-white border border-gray-200 shadow-lg mt-2" 
                align="start"
                sideOffset={5}
              >
                {services.map((service) => (
                  <DropdownMenuItem key={service.name} asChild>
                    <Link
                      href={service.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bright-yellow transition-colors cursor-pointer"
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/admin"
              className={`font-medium transition-colors ${
                isActive("/admin")
                  ? "text-bright-yellow"
                  : "text-gray-700 hover:text-bright-yellow"
              }`}
            >
              Admin
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold">
              <Link href="/book-service">
                Book Service
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-bright-yellow"
                        : "text-bright-black hover:text-bright-yellow"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-bright-black mb-3">Services</h3>
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-bright-black hover:text-bright-yellow transition-colors py-1 font-medium"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    isActive("/admin")
                      ? "text-bright-yellow"
                      : "text-bright-black hover:text-bright-yellow"
                  }`}
                >
                  Admin
                </Link>

                <Button className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold w-full mt-4">
                  Book Demo
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Header;

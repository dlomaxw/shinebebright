import ContactForm from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

const Contact = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-bright-black mb-4">Get In Touch</h1>
            <p className="text-xl text-bright-gray max-w-3xl mx-auto">
              Ready to transform your business with immersive technology? Let's discuss your project and explore the possibilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <ContactForm />
            
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-bright-black mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bright-yellow rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-bright-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bright-black">Address</h4>
                      <p className="text-bright-gray">8JC3+CPM Third Street, Kampala</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bright-yellow rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-bright-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bright-black">Phone</h4>
                      <p className="text-bright-gray">+256 750 421 224</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bright-yellow rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-bright-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bright-black">Email</h4>
                      <p className="text-bright-gray">info@brightplatform.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bright-yellow rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-bright-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bright-black">Business Hours</h4>
                      <p className="text-bright-gray">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-bright-gray">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Service Booking */}
              <div className="bg-bright-black rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Book Your Service</h3>
                <p className="text-gray-300 mb-6">
                  Ready to get started? Book a consultation to discuss your project and receive a custom proposal.
                </p>
                <Button asChild className="w-full bg-bright-yellow text-bright-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  <Link href="/book-service">
                    Book Service
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-bright-black mb-4">Find Us</h2>
            <p className="text-lg text-bright-gray">
              Visit our office in the heart of Kampala
            </p>
          </div>
          
          <div className="relative bg-gray-100 rounded-xl h-96 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7467845946636!2d32.5839!3d0.3152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc8f8b5b1111%3A0x1234567890abcdef!2sThe%20Square%2C%20Third%20St%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bright Platform Office Location"
              className="rounded-xl"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-bright-yellow" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Bright Platform</p>
                  <p className="text-xs text-gray-600">8JC3+CPM Third Street</p>
                  <p className="text-xs text-gray-600">Kampala, Uganda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

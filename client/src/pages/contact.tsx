import ContactForm from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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
                      <p className="text-bright-gray">1St Floor Shop 4, The Square, Plot 10 Third St, Kampala</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bright-yellow rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-bright-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bright-black">Phone</h4>
                      <p className="text-bright-gray">+1 (123) 456-7890</p>
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
              
              {/* Demo Booking */}
              <div className="bg-bright-black rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Book a Demo</h3>
                <p className="text-gray-300 mb-6">
                  Experience our immersive technology solutions firsthand. Schedule a personalized demo session.
                </p>
                <Button className="w-full bg-bright-yellow text-bright-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Schedule Demo
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
          
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-bright-gray mx-auto mb-4" />
              <p className="text-bright-gray">Interactive map would be displayed here</p>
              <p className="text-sm text-bright-gray mt-2">1St Floor Shop 4, The Square, Plot 10 Third St, Kampala</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

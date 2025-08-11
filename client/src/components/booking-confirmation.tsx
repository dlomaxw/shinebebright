import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Clock, Phone, Mail, Building, User, FileText } from "lucide-react";
import { format } from "date-fns";

interface BookingConfirmationProps {
  booking: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    phone: string;
    serviceType: string;
    servicePackage?: string;
    projectTitle?: string;
    projectDescription?: string;
    budget?: string;
    timeline?: string;
    preferredDate?: string;
    requirements?: string[];
    status: string;
    createdAt: string;
  };
  onClose?: () => void;
}

const serviceTypeLabels = {
  "real-estate": "Real Estate Visualization",
  "architecture": "Architectural Visualization", 
  "interior-design": "Interior Design",
  "media": "Media & Entertainment",
  "training": "VR/AR Training",
};

export function BookingConfirmation({ booking, onClose }: BookingConfirmationProps) {
  const serviceLabel = serviceTypeLabels[booking.serviceType as keyof typeof serviceTypeLabels] || booking.serviceType;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-bright-yellow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-bright-yellow rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-bright-black" />
            </div>
          </div>
          <CardTitle className="text-2xl text-bright-black">
            Booking Confirmed!
          </CardTitle>
          <p className="text-bright-gray">
            Your service booking has been successfully submitted. We'll contact you within 24 hours.
          </p>
        </CardHeader>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-bright-black flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-bright-black mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-bright-gray" />
                  <span className="text-bright-black">{booking.firstName} {booking.lastName}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-bright-gray" />
                  <span className="text-bright-black">{booking.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-bright-gray" />
                  <span className="text-bright-black">{booking.phone}</span>
                </div>
                {booking.company && (
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-bright-gray" />
                    <span className="text-bright-black">{booking.company}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Service Information */}
            <div>
              <h3 className="font-semibold text-bright-black mb-3">Service Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-bright-gray text-sm">Service Type:</span>
                  <div className="mt-1">
                    <Badge className="bg-bright-yellow text-bright-black">
                      {serviceLabel}
                    </Badge>
                  </div>
                </div>
                {booking.servicePackage && (
                  <div>
                    <span className="text-bright-gray text-sm">Package:</span>
                    <p className="text-bright-black capitalize">{booking.servicePackage}</p>
                  </div>
                )}
                {booking.budget && (
                  <div>
                    <span className="text-bright-gray text-sm">Budget Range:</span>
                    <p className="text-bright-black">{booking.budget}</p>
                  </div>
                )}
                {booking.timeline && (
                  <div>
                    <span className="text-bright-gray text-sm">Timeline:</span>
                    <p className="text-bright-black">{booking.timeline}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project Details */}
          {(booking.projectTitle || booking.projectDescription) && (
            <div>
              <h3 className="font-semibold text-bright-black mb-3">Project Details</h3>
              {booking.projectTitle && (
                <div className="mb-2">
                  <span className="text-bright-gray text-sm">Project Title:</span>
                  <p className="text-bright-black font-medium">{booking.projectTitle}</p>
                </div>
              )}
              {booking.projectDescription && (
                <div>
                  <span className="text-bright-gray text-sm">Description:</span>
                  <p className="text-bright-black mt-1">{booking.projectDescription}</p>
                </div>
              )}
            </div>
          )}

          {/* Requirements */}
          {booking.requirements && booking.requirements.length > 0 && (
            <div>
              <h3 className="font-semibold text-bright-black mb-3">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {booking.requirements.map((req, index) => (
                  <Badge key={index} variant="outline" className="text-bright-black">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Booking Status & Date */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-bright-gray" />
                <span className="text-bright-gray text-sm">
                  Submitted: {format(new Date(booking.createdAt), "PPP")}
                </span>
              </div>
              <Badge className={
                booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                "bg-blue-100 text-blue-800"
              }>
                {booking.status}
              </Badge>
            </div>
            {booking.preferredDate && (
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 mr-2 text-bright-gray" />
                <span className="text-bright-gray text-sm">
                  Preferred Date: {format(new Date(booking.preferredDate), "PPP")}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-bright-black">What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-bright-yellow rounded-full mr-3 mt-2"></div>
              <div>
                <p className="font-medium text-bright-black">Initial Review</p>
                <p className="text-bright-gray text-sm">Our team will review your requirements within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-bright-yellow rounded-full mr-3 mt-2"></div>
              <div>
                <p className="font-medium text-bright-black">Project Consultation</p>
                <p className="text-bright-gray text-sm">We'll schedule a call to discuss your project in detail</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-bright-yellow rounded-full mr-3 mt-2"></div>
              <div>
                <p className="font-medium text-bright-black">Proposal & Timeline</p>
                <p className="text-bright-gray text-sm">You'll receive a detailed proposal with timeline and deliverables</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-bright-light">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-bright-black mb-2">Questions?</h3>
          <p className="text-bright-gray mb-4">
            Contact our team for immediate assistance
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="tel:+256750421224" 
              className="flex items-center text-bright-black hover:text-bright-yellow"
            >
              <Phone className="w-4 h-4 mr-1" />
              +256 750 421 224
            </a>
            <a 
              href="mailto:info@brightplatform.rw" 
              className="flex items-center text-bright-black hover:text-bright-yellow"
            >
              <Mail className="w-4 h-4 mr-1" />
              info@brightplatform.rw
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      {onClose && (
        <div className="text-center">
          <Button 
            onClick={onClose}
            className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
          >
            Continue Browsing
          </Button>
        </div>
      )}
    </div>
  );
}
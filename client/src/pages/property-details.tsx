import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PropertyImageGallery } from "@/components/property-image-gallery";
import { PropertyRecommendations } from "@/components/property-recommendations";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Ruler, 
  Calendar,
  ArrowLeft,
  Phone,
  Mail,
  Share2,
  Heart,
  Star,
  Building,
  Home,
  CheckCircle,
  Clock,
  DollarSign,
  Eye
} from "lucide-react";
import type { Property } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function PropertyDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ["/api/properties", id],
    enabled: !!id,
  });

  const { data: allProperties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="pt-16 min-h-screen bg-bright-light flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-bright-black mb-2">Property Not Found</h2>
            <p className="text-bright-gray mb-4">The property you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => setLocation("/properties")} className="bg-bright-yellow text-bright-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const features = Array.isArray(property.features) ? property.features : [];
  const images = Array.isArray(property.images) ? property.images : [];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleContact = () => {
    const message = `Hi, I'm interested in the property: ${property.title} (${property.location}). Could you provide more details?`;
    const whatsappUrl = `https://wa.me/256750421224?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-16 min-h-screen bg-bright-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-bright-gray mb-6">
          <button 
            onClick={() => setLocation("/properties")}
            className="flex items-center hover:text-bright-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Properties
          </button>
          <span>/</span>
          <span className="text-bright-black font-medium">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-bright-black mb-2">{property.title}</h1>
                <div className="flex items-center text-bright-gray mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.address || property.location}
                  {property.city && `, ${property.city}`}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-bright-black">
                    {property.price}
                  </div>
                  {property.featured && (
                    <Badge className="bg-bright-yellow text-bright-black">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {property.status && (
                    <Badge variant={property.status === "Sold" ? "destructive" : "default"}>
                      {property.status}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Interactive Image Gallery */}
            <PropertyImageGallery
              propertyId={property.id}
              images={images}
              title={property.title}
              className="w-full"
            />

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-bright-yellow" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  {property.bedrooms && (
                    <div className="text-center">
                      <Bed className="w-8 h-8 mx-auto mb-2 text-bright-yellow" />
                      <div className="font-semibold text-bright-black">{property.bedrooms}</div>
                      <div className="text-sm text-bright-gray">Bedrooms</div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center">
                      <Bath className="w-8 h-8 mx-auto mb-2 text-bright-yellow" />
                      <div className="font-semibold text-bright-black">{property.bathrooms}</div>
                      <div className="text-sm text-bright-gray">Bathrooms</div>
                    </div>
                  )}
                  {property.propertySize && (
                    <div className="text-center">
                      <Ruler className="w-8 h-8 mx-auto mb-2 text-bright-yellow" />
                      <div className="font-semibold text-bright-black">{property.propertySize}</div>
                      <div className="text-sm text-bright-gray">Size</div>
                    </div>
                  )}
                  {property.garage && (
                    <div className="text-center">
                      <Car className="w-8 h-8 mx-auto mb-2 text-bright-yellow" />
                      <div className="font-semibold text-bright-black">{property.garage}</div>
                      <div className="text-sm text-bright-gray">Garage</div>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-bright-black mb-3">Property Information</h3>
                    <div className="space-y-2">
                      {property.propertyType && (
                        <div className="flex justify-between">
                          <span className="text-bright-gray">Type:</span>
                          <span className="text-bright-black">{property.propertyType}</span>
                        </div>
                      )}
                      {property.yearBuilt && (
                        <div className="flex justify-between">
                          <span className="text-bright-gray">Year Built:</span>
                          <span className="text-bright-black">{property.yearBuilt}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-bright-gray">Location:</span>
                        <span className="text-bright-black">{property.location}</span>
                      </div>
                      {property.area && (
                        <div className="flex justify-between">
                          <span className="text-bright-gray">Area:</span>
                          <span className="text-bright-black">{property.area}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-bright-black mb-3">Property Status</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-bright-gray">Status:</span>
                        <Badge variant={property.status === "Sold" ? "destructive" : "default"}>
                          {property.status || "For Sale"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-bright-gray">Listed:</span>
                        <span className="text-bright-black">
                          {new Date(property.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-bright-gray">Views:</span>
                        <span className="text-bright-black flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {Math.floor(Math.random() * 1000) + 100}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {property.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="w-5 h-5 mr-2 text-bright-yellow" />
                    Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-bright-gray leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Features & Amenities */}
            {features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-bright-yellow" />
                    Features & Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                        <span className="text-bright-black">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-center">Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-bright-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="w-8 h-8 text-bright-black" />
                  </div>
                  <h3 className="font-semibold text-bright-black">Bright Properties</h3>
                  <p className="text-sm text-bright-gray">Premium Real Estate</p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-bright-yellow text-bright-black hover:bg-yellow-400"
                    onClick={handleContact}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp Inquiry
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = "tel:+256750421224"}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = "mailto:info@brightproperties.rw"}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Agent
                  </Button>
                </div>

                <div className="text-center text-sm text-bright-gray">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                    Response time: Under 2 hours
                  </div>
                  <div className="flex items-center justify-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Free consultation
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Property Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-bright-gray">Views this month:</span>
                    <span className="font-medium">{Math.floor(Math.random() * 500) + 50}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-bright-gray">Inquiries:</span>
                    <span className="font-medium">{Math.floor(Math.random() * 20) + 5}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-bright-gray">Days on market:</span>
                    <span className="font-medium">
                      {Math.floor((Date.now() - new Date(property.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI-Powered Property Recommendations */}
        <div className="mt-12">
          <PropertyRecommendations
            currentPropertyId={property.id}
            viewedProperties={viewedProperties}
          />
        </div>
      </div>
    </div>
  );
}
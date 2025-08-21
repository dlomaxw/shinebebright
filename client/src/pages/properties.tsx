import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Ruler, 
  Search,
  Phone,
  Mail,
  Star,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Building2,
  Heart,
  Share2,
  Eye
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Property } from "@shared/schema";
import { getPropertyImage } from "../assets/properties";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured">("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: allProperties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: searchResults = [], isLoading: isSearching } = useQuery<Property[]>({
    queryKey: ["/api/properties/search", { q: searchQuery }],
    enabled: searchQuery.length > 2,
  });

  const displayProperties = searchQuery.length > 2 
    ? searchResults 
    : featuredFilter === "featured" 
      ? allProperties.filter(p => p.featured)
      : allProperties;

  const featuredProperties = allProperties.filter(p => p.featured);

  const nextImage = () => {
    const images = Array.isArray(selectedProperty?.images) ? selectedProperty.images : [];
    if (images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    const images = Array.isArray(selectedProperty?.images) ? selectedProperty.images : [];
    if (images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  const PropertyCard = ({ property, isGrid = true }: { property: Property; isGrid?: boolean }) => {
    const images = Array.isArray(property.images) ? property.images : [];
    const hasImages = images.length > 0;
    const mainImage = hasImages ? getPropertyImage(images[0]) : null;

    return (
      <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-lg ${isGrid ? 'h-full' : 'flex flex-row'}`}>
        <div className={`relative overflow-hidden ${isGrid ? 'h-64' : 'w-80 h-48'}`}>
          {mainImage ? (
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-testid={`property-image-${property.id}`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-bright-light to-bright-yellow/20 flex items-center justify-center">
              <Building2 className="w-16 h-16 text-bright-gray/50" />
            </div>
          )}
          
          {/* Status Badge */}
          {property.status && (
            <Badge 
              className={`absolute top-4 left-4 ${
                property.status === 'Sold Out' ? 'bg-red-500' :
                property.status === 'Pre-Launch' ? 'bg-purple-500' :
                'bg-green-500'
              } text-white`}
              data-testid={`status-${property.id}`}
            >
              {property.status}
            </Badge>
          )}
          
          {/* Featured Badge */}
          {property.featured && (
            <Badge className="absolute top-4 right-4 bg-bright-yellow text-bright-black">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <CardContent className={`p-6 ${isGrid ? '' : 'flex-1'}`}>
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-bright-black group-hover:text-bright-yellow transition-colors" data-testid={`title-${property.id}`}>
              {property.title}
            </h3>
            <span className="text-2xl font-bold text-bright-yellow" data-testid={`price-${property.id}`}>
              {property.price}
            </span>
          </div>

          <div className="flex items-center gap-1 mb-3 text-bright-gray">
            <MapPin className="w-4 h-4" />
            <span className="text-sm" data-testid={`location-${property.id}`}>{property.location}</span>
          </div>

          <p className="text-bright-gray text-sm mb-4 line-clamp-2" data-testid={`description-${property.id}`}>
            {property.description}
          </p>

          {/* Property Details */}
          <div className="flex items-center gap-4 mb-4">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-bright-gray" />
                <span className="text-sm text-bright-gray">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-bright-gray" />
                <span className="text-sm text-bright-gray">{property.bathrooms}</span>
              </div>
            )}
            {property.propertySize && (
              <div className="flex items-center gap-1">
                <Ruler className="w-4 h-4 text-bright-gray" />
                <span className="text-sm text-bright-gray">{property.propertySize}</span>
              </div>
            )}
          </div>

          {/* Features */}
          {(() => {
            const features = Array.isArray(property.features) ? property.features : [];
            return features.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {features.slice(0, 3).map((feature: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            );
          })()}

          <div className="flex gap-2">
            <Dialog onOpenChange={(open) => {
              if (open) {
                setSelectedProperty(property);
                setCurrentImageIndex(0);
              }
            }}>
              <DialogTrigger asChild>
                <Button 
                  className="flex-1 bg-bright-yellow hover:bg-bright-yellow/90 text-bright-black font-semibold"
                  data-testid={`view-details-${property.id}`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button 
              variant="outline" 
              className="border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-bright-black"
              data-testid={`contact-${property.id}`}
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-bright-light/30 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-bright-black to-bright-black/90">
        <div className="absolute inset-0 bg-gradient-to-r from-bright-yellow/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Premium <span className="text-bright-yellow">Properties</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Discover luxury real estate opportunities in Uganda's prime locations. 
            From modern apartments to exclusive developments, find your perfect investment.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-6 h-6 text-bright-gray" />
              <Input
                type="text"
                placeholder="Search properties by location, title, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg bg-white/95 border-0 rounded-full shadow-xl"
                data-testid="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Button
                variant={featuredFilter === "all" ? "default" : "outline"}
                onClick={() => setFeaturedFilter("all")}
                className={featuredFilter === "all" ? "bg-bright-yellow text-bright-black" : ""}
                data-testid="filter-all"
              >
                <Home className="w-4 h-4 mr-2" />
                All Properties ({allProperties.length})
              </Button>
              <Button
                variant={featuredFilter === "featured" ? "default" : "outline"}
                onClick={() => setFeaturedFilter("featured")}
                className={featuredFilter === "featured" ? "bg-bright-yellow text-bright-black" : ""}
                data-testid="filter-featured"
              >
                <Star className="w-4 h-4 mr-2" />
                Featured ({featuredProperties.length})
              </Button>
            </div>
            <div className="text-sm text-bright-gray">
              Showing {displayProperties.length} properties
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading || isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse">
                  <div className="h-64 bg-bright-light"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-bright-light rounded mb-2"></div>
                    <div className="h-3 bg-bright-light rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayProperties.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-bright-gray/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-bright-black mb-2">No Properties Found</h3>
              <p className="text-bright-gray">
                {searchQuery.length > 2 
                  ? "Try adjusting your search terms"
                  : "Check back soon for new listings"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="properties-grid">
              {displayProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Property Details Modal */}
      <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProperty && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-bright-black">
                  {selectedProperty.title}
                </DialogTitle>
                <DialogDescription className="text-bright-gray">
                  {selectedProperty.location}
                </DialogDescription>
              </DialogHeader>

              {/* Image Gallery */}
              {(() => {
                const images = Array.isArray(selectedProperty.images) ? selectedProperty.images : [];
                return images.length > 0 && (
                  <div className="relative mb-6">
                    <div className="relative h-96 rounded-lg overflow-hidden">
                      <img
                        src={getPropertyImage(images[currentImageIndex])}
                        alt={selectedProperty.title}
                        className="w-full h-full object-cover"
                      />
                      {images.length > 1 && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={nextImage}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                    {images.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto">
                        {images.map((image: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                              currentImageIndex === index ? 'border-bright-yellow' : 'border-transparent'
                            }`}
                          >
                            <img
                              src={getPropertyImage(image)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-bright-gray">Price:</span>
                      <span className="font-semibold text-bright-yellow">{selectedProperty.price}</span>
                    </div>
                    {selectedProperty.bedrooms && (
                      <div className="flex justify-between">
                        <span className="text-bright-gray">Bedrooms:</span>
                        <span className="font-semibold">{selectedProperty.bedrooms}</span>
                      </div>
                    )}
                    {selectedProperty.bathrooms && (
                      <div className="flex justify-between">
                        <span className="text-bright-gray">Bathrooms:</span>
                        <span className="font-semibold">{selectedProperty.bathrooms}</span>
                      </div>
                    )}
                    {selectedProperty.propertySize && (
                      <div className="flex justify-between">
                        <span className="text-bright-gray">Size:</span>
                        <span className="font-semibold">{selectedProperty.propertySize}</span>
                      </div>
                    )}
                    {selectedProperty.propertyType && (
                      <div className="flex justify-between">
                        <span className="text-bright-gray">Type:</span>
                        <span className="font-semibold">{selectedProperty.propertyType}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Features & Amenities</h3>
                  {(() => {
                    const features = Array.isArray(selectedProperty.features) ? selectedProperty.features : [];
                    return features.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-bright-yellow rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-bright-gray text-sm">No features listed</p>
                    );
                  })()}
                </div>
              </div>

              {selectedProperty.description && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <p className="text-bright-gray leading-relaxed">{selectedProperty.description}</p>
                </div>
              )}

              {/* Contact Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t">
                <Button className="flex-1 bg-bright-yellow hover:bg-bright-yellow/90 text-bright-black font-semibold">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: +256 750 421 224
                </Button>
                <Button variant="outline" className="border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-bright-black">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Section */}
      <section className="py-16 bg-bright-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your <span className="text-bright-yellow">Dream Property</span>?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our expert team is here to help you find the perfect property investment. 
            Contact us today for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-bright-yellow hover:bg-bright-yellow/90 text-bright-black font-semibold"
              data-testid="contact-call"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +256 750 421 224
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-bright-black"
              data-testid="contact-email"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;
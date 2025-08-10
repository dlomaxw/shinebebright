import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Ruler, 
  Calendar,
  Search,
  Phone,
  Mail,
  ExternalLink,
  Star,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Building
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Property } from "@shared/schema";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured">("all");

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

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-bright-light to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-bright-black mb-6">
            Premium <span className="text-bright-yellow">Properties</span>
          </h1>
          <p className="text-xl text-bright-gray mb-8 max-w-3xl mx-auto">
            Discover luxury real estate opportunities in Uganda's prime locations. 
            From modern apartments to exclusive villas, find your perfect home.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-bright-gray" />
              <Input
                type="text"
                placeholder="Search properties by location, title, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant={featuredFilter === "all" ? "default" : "outline"}
                onClick={() => setFeaturedFilter("all")}
                className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
              >
                All Properties ({allProperties.length})
              </Button>
              <Button
                variant={featuredFilter === "featured" ? "default" : "outline"}
                onClick={() => setFeaturedFilter("featured")}
                className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
              >
                Featured ({featuredProperties.length})
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Highlight */}
      {featuredFilter === "all" && searchQuery.length <= 2 && (
        <section className="py-12 bg-bright-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-bright-black mb-2">
                  <Star className="inline w-8 h-8 text-bright-yellow mr-3" />
                  Featured Properties
                </h2>
                <p className="text-bright-gray">Premium selections handpicked for excellence</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-bright-black">
              {searchQuery.length > 2 ? `Search Results (${displayProperties.length})` : 
               featuredFilter === "featured" ? "Featured Properties" : "All Properties"}
            </h2>
            {searchQuery.length > 2 && (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
                className="text-bright-black border-bright-black hover:bg-bright-black hover:text-white"
              >
                Clear Search
              </Button>
            )}
          </div>

          {isLoading || isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                  <div className="p-6 space-y-4">
                    <div className="bg-gray-300 h-6 rounded"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-300 h-8 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayProperties.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-bright-gray mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-bright-black mb-2">
                No properties found
              </h3>
              <p className="text-bright-gray">
                {searchQuery.length > 2 
                  ? "Try adjusting your search terms"
                  : "No properties match your current filter"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-bright-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact our expert team for personalized assistance and exclusive property viewings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold">
              <a href="tel:0750421224">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-bright-black">
              <a href="mailto:info@brightplatform.com">
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard = ({ property, featured = false }: PropertyCardProps) => {
  const mainImage = Array.isArray(property.images) && property.images.length > 0 
    ? property.images[0] 
    : '/api/placeholder/400/300';



  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 group ${
      featured ? 'ring-2 ring-bright-yellow' : ''
    }`}>
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img 
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/api/placeholder/400/300';
            }}
          />
        </div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-bright-yellow text-bright-black font-semibold">
            {property.status}
          </Badge>
          {featured && (
            <Badge className="bg-bright-black text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 text-bright-black hover:bg-white"
            onClick={() => property.originalUrl && window.open(property.originalUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <CardTitle className="text-xl font-bold text-bright-black mb-2 group-hover:text-bright-yellow transition-colors">
            {property.title}
          </CardTitle>
          
          <div className="flex items-center text-bright-gray mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="text-2xl font-bold text-bright-yellow mb-4">
            {property.price}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {property.bedrooms && (
            <div className="flex items-center text-sm text-bright-gray">
              <Bed className="w-4 h-4 mr-2" />
              <span>{property.bedrooms} Bed</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center text-sm text-bright-gray">
              <Bath className="w-4 h-4 mr-2" />
              <span>{property.bathrooms} Bath</span>
            </div>
          )}
          {property.garage && (
            <div className="flex items-center text-sm text-bright-gray">
              <Car className="w-4 h-4 mr-2" />
              <span>{property.garage} Garage</span>
            </div>
          )}
          {property.propertySize && (
            <div className="flex items-center text-sm text-bright-gray">
              <Ruler className="w-4 h-4 mr-2" />
              <span>{property.propertySize}</span>
            </div>
          )}
          {property.yearBuilt && (
            <div className="flex items-center text-sm text-bright-gray">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{property.yearBuilt}</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        {/* Description */}
        <p className="text-sm text-bright-gray mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Features */}
        {Array.isArray(property.features) && property.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {property.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{property.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <PropertyDetailsDialog property={property}>
          <Button className="w-full bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold">
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </PropertyDetailsDialog>
      </CardContent>
    </Card>
  );
};

// Property Details Dialog Component
interface PropertyDetailsDialogProps {
  property: Property;
  children: React.ReactNode;
}

const PropertyDetailsDialog = ({ property, children }: PropertyDetailsDialogProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Array.isArray(property.images) && property.images.length > 0 
    ? property.images 
    : ['/api/placeholder/400/300'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleExternalLink = () => {
    if (property.originalUrl) {
      window.open(property.originalUrl, '_blank');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-bright-black flex items-center justify-between">
            {property.title}
            {property.originalUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExternalLink}
                className="ml-4"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Original Listing
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={images[currentImageIndex]}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder/400/300';
                }}
              />
            </div>
            
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-bright-yellow ring-2 ring-bright-yellow/30' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/400/300';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-bright-yellow text-bright-black font-semibold">
                  {property.status}
                </Badge>
                {property.featured && (
                  <Badge className="bg-bright-black text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <div className="text-3xl font-bold text-bright-yellow">
                {property.price}
              </div>

              <div className="flex items-center text-bright-gray">
                <MapPin className="w-5 h-5 mr-2" />
                <div>
                  <p className="font-medium">{property.location}</p>
                  <p className="text-sm">{property.address}, {property.city}, {property.country}</p>
                </div>
              </div>

              {/* Property Specifications */}
              <div className="bg-bright-light/30 rounded-lg p-4">
                <h3 className="font-semibold text-bright-black mb-3 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Property Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-2 text-bright-gray" />
                      <span className="text-sm">
                        <strong>{property.bedrooms}</strong> Bedrooms
                      </span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-2 text-bright-gray" />
                      <span className="text-sm">
                        <strong>{property.bathrooms}</strong> Bathrooms
                      </span>
                    </div>
                  )}
                  {property.garage && (
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-2 text-bright-gray" />
                      <span className="text-sm">
                        <strong>{property.garage}</strong> Garage Space
                      </span>
                    </div>
                  )}
                  {property.propertySize && (
                    <div className="flex items-center">
                      <Ruler className="w-4 h-4 mr-2 text-bright-gray" />
                      <span className="text-sm">
                        <strong>{property.propertySize}</strong>
                      </span>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-bright-gray" />
                      <span className="text-sm">
                        Built in <strong>{property.yearBuilt}</strong>
                      </span>
                    </div>
                  )}
                  {property.propertyType && (
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-bright-gray" />
                      <span className="text-sm">
                        <strong>{property.propertyType}</strong>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Description & Features */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-bright-black mb-2">Description</h3>
                <p className="text-bright-gray leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features & Amenities */}
              {Array.isArray(property.features) && property.features.length > 0 && (
                <div>
                  <h3 className="font-semibold text-bright-black mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-bright-yellow rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Details */}
              <div className="bg-bright-light/30 rounded-lg p-4">
                <h3 className="font-semibold text-bright-black mb-3">Location Information</h3>
                <div className="space-y-2">
                  <p><strong>Area:</strong> {property.area}</p>
                  <p><strong>City:</strong> {property.city}</p>
                  <p><strong>Country:</strong> {property.country}</p>
                  {property.address && (
                    <p><strong>Address:</strong> {property.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-bright-black text-white rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Interested in this property?</h3>
            <p className="text-gray-300 mb-4">Contact our expert team for more information and to schedule a viewing.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold">
                <a href="tel:0750421224">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-bright-black">
                <a href="mailto:info@brightplatform.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Properties;
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
  Building,
  Camera
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ImageGallery from "@/components/ImageGallery";
import type { Property } from "@shared/schema";
import { processPropertyImages, getPlaceholderUrl, getPropertyImageUrl, getDeveloperFallbackImage } from "@/lib/image-utils";

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Contact our expert team for personalized assistance and exclusive property viewings.
            </p>
            <p className="text-bright-yellow font-semibold">
              Bright Platform - Leading VR/AR Real Estate Solutions in Uganda
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold text-bright-yellow mb-4">About Bright Platform</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We are Uganda's premier immersive technology company, revolutionizing the real estate industry 
                with cutting-edge VR/AR solutions. Our innovative approach brings properties to life, allowing 
                clients to experience spaces before they exist or visit remotely with unprecedented clarity.
              </p>
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Our Expertise:</h4>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-bright-yellow rounded-full mr-3"></div>
                    Virtual Property Tours & 360° Experiences
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-bright-yellow rounded-full mr-3"></div>
                    3D Architectural Visualization & Design
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-bright-yellow rounded-full mr-3"></div>
                    Interior Design & Space Planning
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-bright-yellow rounded-full mr-3"></div>
                    Real Estate Marketing & Sales Tools
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-bright-yellow rounded-full mr-3"></div>
                    Professional Training & Simulation
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold text-bright-yellow mb-4">Get in Touch</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-bright-yellow mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">+256 750 421 224</p>
                    <p className="text-sm text-gray-400">Available 24/7 for consultations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-bright-yellow mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">brightthoughtsservices@gmail.com</p>
                    <p className="text-sm text-gray-400">Quick response within 2 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-bright-yellow mt-1" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-300">Kampala, Uganda</p>
                    <p className="text-sm text-gray-400">Serving all of East Africa</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-bright-black/50 rounded-lg p-4 border border-bright-yellow/20">
                <p className="text-bright-yellow font-semibold mb-2">🎯 Why Choose Bright Platform?</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• 5+ years of VR/AR expertise in real estate</li>
                  <li>• 500+ successful property visualizations</li>
                  <li>• Cutting-edge technology & innovation</li>
                  <li>• Comprehensive end-to-end solutions</li>
                  <li>• Local expertise with global standards</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact Buttons */}
          <div className="text-center">
            <p className="text-gray-300 mb-6">Ready to experience the future of real estate? Get in touch today!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold">
                <a href="tel:+256750421224">
                  <Phone className="w-5 h-5 mr-2" />
                  Call +256 750 421 224
                </a>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold">
                <a 
                  href="https://wa.me/256750421224?text=Hi! I'm interested in your real estate services. Can you provide more information?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.386"/>
                  </svg>
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-bright-black">
                <a href="mailto:brightthoughtsservices@gmail.com?subject=Property Inquiry">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
};

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard = ({ property, featured = false }: PropertyCardProps) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  
  // Handle different image storage formats using utility functions
  // PROFESSIONAL APPROACH: Pass property title to ensure proper developer-based organization
  const processedImages = processPropertyImages(
    property.images as string | string[] | null, 
    property.title,
    { useThumbnail: false }
  );
  
  const mainImage = processedImages[0] || getPlaceholderUrl(400, 300);

  const openGallery = (index: number = 0) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };



  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white ${
      featured ? 'ring-2 ring-bright-yellow' : ''
    }`}>
      <div className="relative">
        <div className="aspect-video overflow-hidden cursor-pointer" onClick={() => openGallery(0)}>
          <img 
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = getDeveloperFallbackImage(property.title);
            }}
          />
          {processedImages.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
              <Camera className="w-3 h-3 mr-1" />
              {processedImages.length}
            </div>
          )}
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

      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <CardTitle className="text-2xl font-bold text-bright-black mb-3 group-hover:text-bright-yellow transition-colors leading-tight">
            {property.title}
          </CardTitle>
          
          <div className="flex items-center text-gray-700 mb-3">
            <MapPin className="w-4 h-4 mr-2 text-bright-yellow" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>

          <div className="text-2xl font-bold text-bright-yellow mb-4">
            {property.price}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {property.bedrooms && (
            <div className="flex items-center text-sm text-gray-700">
              <Bed className="w-4 h-4 mr-2 text-bright-yellow" />
              <span className="font-medium">{property.bedrooms} Bed</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center text-sm text-gray-700">
              <Bath className="w-4 h-4 mr-2 text-bright-yellow" />
              <span className="font-medium">{property.bathrooms} Bath</span>
            </div>
          )}
          {property.garage && (
            <div className="flex items-center text-sm text-gray-700">
              <Car className="w-4 h-4 mr-2 text-bright-yellow" />
              <span className="font-medium">{property.garage} Garage</span>
            </div>
          )}
          {property.propertySize && (
            <div className="flex items-center text-sm text-gray-700">
              <Ruler className="w-4 h-4 mr-2 text-bright-yellow" />
              <span className="font-medium">{property.propertySize}</span>
            </div>
          )}
          {property.yearBuilt && (
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="w-4 h-4 mr-2 text-bright-yellow" />
              <span className="font-medium">{property.yearBuilt}</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
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
      
      {/* Image Gallery */}
      <ImageGallery 
        images={processedImages}
        alt={property.title}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        initialIndex={galleryIndex}
      />
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
  const [galleryOpen, setGalleryOpen] = useState(false);
  
  // PROFESSIONAL APPROACH: Use developer-organized images to prevent mixing
  const imageUrls = processPropertyImages(
    property.images as string | string[] | null,
    property.title,
    { useThumbnail: false }
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-bright-black">
            {property.title}
          </DialogTitle>
          <DialogDescription className="text-bright-gray">
            Detailed property information with virtual tour capabilities for {property.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Interactive Image Gallery with Zoom */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-bright-black">Property Gallery</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGalleryOpen(true)}
                className="flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                View in Fullscreen
              </Button>
            </div>
            
            <div className="aspect-video overflow-hidden rounded-lg cursor-pointer group" 
                 onClick={() => setGalleryOpen(true)}>
              <img 
                src={imageUrls[currentImageIndex]}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const fallbackImage = processPropertyImages(null, property.title)[0];
                  e.currentTarget.src = fallbackImage;
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                  <Camera className="w-6 h-6 text-bright-black" />
                </div>
              </div>
            </div>
            
            {imageUrls.length > 1 && (
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
                  {currentImageIndex + 1} / {imageUrls.length}
                </div>
              </>
            )}
          </div>

          {/* Image Thumbnails */}
          {imageUrls.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {imageUrls.map((image, index) => (
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
          
          {/* Full-Screen Image Gallery */}
          <ImageGallery 
            images={imageUrls}
            alt={property.title}
            open={galleryOpen}
            onOpenChange={setGalleryOpen}
            initialIndex={currentImageIndex}
          />

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

          {/* Client Information & Contact */}
          <div className="bg-bright-black text-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Get in Touch with Bright Platform</h3>
            
            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-bright-yellow">About Bright Platform</h4>
                <p className="text-gray-300 text-sm">
                  Leading immersive technology company specializing in VR/AR solutions for real estate, 
                  architecture, interior design, media, and training. We bring properties to life with 
                  cutting-edge virtual experiences.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-bright-yellow">Our Services</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Virtual Property Tours</li>
                  <li>• 3D Architectural Visualization</li>
                  <li>• Interior Design Solutions</li>
                  <li>• Real Estate Marketing</li>
                  <li>• Training & Simulation</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-700 pt-4 mb-6">
              <h4 className="font-semibold text-bright-yellow mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-4 h-4 mr-2" />
                    <div>
                      <div>+256 750 421 224</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>brightthoughtsservices@gmail.com</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Kampala, Uganda</span>
                  </div>
                  <div className="text-gray-300">
                    Available 24/7 for consultations
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <p className="text-gray-300 mb-4">Interested in this property? Contact our expert team for more information and to schedule a virtual or physical viewing.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold">
                  <a href="tel:+256750421224">
                    <Phone className="w-4 h-4 mr-2" />
                    Call +256 750 421 224
                  </a>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold">
                  <a 
                    href={`https://wa.me/256750421224?text=Hi! I'm interested in ${encodeURIComponent(property.title)} property. Can you provide more information?`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.386"/>
                    </svg>
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-bright-black">
                  <a href="mailto:brightthoughtsservices@gmail.com?subject=Property Inquiry - {property.title}">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Floating WhatsApp Button Component
const FloatingWhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        className="bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
      >
        <a
          href="https://wa.me/256750421224?text=Hi! I'm interested in your properties. Can you provide more information?"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.386"/>
          </svg>
        </a>
      </Button>
    </div>
  );
};


export default Properties;
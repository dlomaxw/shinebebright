import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Bed, Bath, Ruler, MapPin } from "lucide-react";
import type { Property } from "@shared/schema";
import { processPropertyImages } from "@/lib/image-utils";

interface BHKCarouselProps {
  currentProperty: Property;
  onPropertySelect?: (property: Property) => void;
}

const BHKCarousel = ({ currentProperty, onPropertySelect }: BHKCarouselProps) => {

  // Fetch all properties and filter for Avenue Muyenga variants
  const { data: allProperties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Filter for Avenue Muyenga properties (different BHK types)
  const relatedProperties = allProperties.filter(
    property => 
      property.title.includes("Avenue Muyenga") && 
      property.id !== currentProperty.id
  );

  // Include current property in the carousel
  const carouselProperties = [currentProperty, ...relatedProperties];

  // Find current property index in carousel
  const currentPropertyIndex = carouselProperties.findIndex(p => p.id === currentProperty.id);
  
  // Initialize carousel to show current property
  const [currentIndex, setCurrentIndex] = useState(currentPropertyIndex >= 0 ? currentPropertyIndex : 0);

  // Update carousel when current property changes
  useEffect(() => {
    const newIndex = carouselProperties.findIndex(p => p.id === currentProperty.id);
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  }, [currentProperty.id, carouselProperties]);
  
  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % carouselProperties.length;
    setCurrentIndex(nextIndex);
    if (onPropertySelect && carouselProperties[nextIndex]) {
      onPropertySelect(carouselProperties[nextIndex]);
    }
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + carouselProperties.length) % carouselProperties.length;
    setCurrentIndex(prevIndex);
    if (onPropertySelect && carouselProperties[prevIndex]) {
      onPropertySelect(carouselProperties[prevIndex]);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (onPropertySelect && carouselProperties[index]) {
      onPropertySelect(carouselProperties[index]);
    }
  };

  const handleCardClick = (property: Property, index: number) => {
    if (property.id !== currentProperty.id && onPropertySelect) {
      onPropertySelect(property);
    }
    setCurrentIndex(index);
  };

  if (relatedProperties.length === 0) {
    return (
      <div className="bg-bright-light/30 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold text-bright-black mb-4">
          Avenue Muyenga - BHK Configurations
        </h3>
        <p className="text-bright-gray text-center py-4">
          This is the only available configuration for this property. More options may become available soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bright-light/30 rounded-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-bright-black mb-4">
        Avenue Muyenga - Other BHK Options
      </h3>
      
      {/* Main Carousel Display */}
      <div className="relative mb-6">
        <div className="overflow-hidden rounded-lg">
          <div className="flex transition-transform duration-300 ease-in-out" 
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {carouselProperties.map((property, index) => {
              const imageUrls = processPropertyImages(
                property.images as string | string[] | null,
                property.title
              );
              
              return (
                <div key={property.id} className="w-full flex-shrink-0">
                  <Card 
                    className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      property.id === currentProperty.id ? 'ring-2 ring-bright-yellow' : 'hover:ring-1 hover:ring-bright-yellow/50'
                    }`}
                    onClick={() => handleCardClick(property, index)}
                  >
                    <div className="relative">
                      <img
                        src={imageUrls[0]}
                        alt={property.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        loading="lazy"
                      />
                      {property.id === currentProperty.id && (
                        <Badge className="absolute top-3 right-3 bg-bright-yellow text-bright-black">
                          Current
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-lg text-bright-black mb-2">
                        {property.title}
                      </h4>
                      <p className="text-bright-gray text-sm mb-3 line-clamp-2">
                        {property.description}
                      </p>
                      
                      {/* Property Details */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="flex items-center text-sm text-bright-gray">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.bedrooms} BHK
                        </div>
                        <div className="flex items-center text-sm text-bright-gray">
                          <Bath className="w-4 h-4 mr-1" />
                          {property.bathrooms} Bath
                        </div>
                        <div className="flex items-center text-sm text-bright-gray">
                          <Ruler className="w-4 h-4 mr-1" />
                          {property.propertySize}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-bright-gray mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </div>
                      
                      <div className="text-lg font-bold text-bright-black">
                        {property.price}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {carouselProperties.length > 1 && (
          <>
            <Button
              onClick={prevSlide}
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white border-0"
              data-testid="bhk-carousel-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={nextSlide}
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white border-0"
              data-testid="bhk-carousel-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {carouselProperties.length > 1 && (
        <div className="flex gap-2 justify-center overflow-x-auto pb-2">
          {carouselProperties.map((property, index) => {
            const imageUrls = processPropertyImages(
              property.images as string | string[] | null,
              property.title
            );
            
            return (
              <button
                key={property.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 relative transition-all duration-200 ${
                  index === currentIndex
                    ? "ring-2 ring-bright-yellow ring-offset-2"
                    : "hover:ring-2 hover:ring-bright-yellow/50"
                }`}
                data-testid={`bhk-thumbnail-${index}`}
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden">
                  <img
                    src={imageUrls[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {property.bedrooms}BHK
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Property Count */}
      <div className="text-center mt-4">
        <span className="text-bright-gray text-sm">
          {currentIndex + 1} of {carouselProperties.length} configurations
        </span>
      </div>
    </div>
  );
};

export default BHKCarousel;
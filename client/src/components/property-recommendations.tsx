import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Ruler, 
  TrendingUp, 
  Star,
  ChevronRight,
  Filter,
  Sparkles,
  Target,
  ThumbsUp
} from "lucide-react";
import type { Property } from "@shared/schema";
import { getPropertyImage } from "@/assets/properties";
import { cn } from "@/lib/utils";

interface PropertyRecommendationsProps {
  currentProperty?: Property;
  userPreferences?: {
    priceRange?: [number, number];
    bedrooms?: number;
    bathrooms?: number;
    location?: string;
    propertyType?: string;
    viewedProperties?: string[];
    likedProperties?: string[];
    searchHistory?: string[];
  };
  maxRecommendations?: number;
  className?: string;
}

interface RecommendationScore {
  property: Property;
  score: number;
  reasons: string[];
  matchPercentage: number;
}

export function PropertyRecommendations({ 
  currentProperty, 
  userPreferences = {},
  maxRecommendations = 6,
  className 
}: PropertyRecommendationsProps) {
  const [likedProperties, setLikedProperties] = useState<string[]>(
    userPreferences.likedProperties || JSON.parse(localStorage.getItem('liked-properties') || '[]')
  );
  
  const { data: allProperties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Save liked properties to localStorage
  useEffect(() => {
    localStorage.setItem('liked-properties', JSON.stringify(likedProperties));
  }, [likedProperties]);

  const toggleLike = (propertyId: string) => {
    setLikedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Advanced recommendation algorithm
  const getRecommendations = (): RecommendationScore[] => {
    if (!allProperties.length) return [];

    const filteredProperties = allProperties.filter(property => 
      property.id !== currentProperty?.id
    );

    const scoredProperties = filteredProperties.map(property => {
      let score = 0;
      const reasons: string[] = [];

      // Location similarity (highest weight)
      if (currentProperty?.location && property.location === currentProperty.location) {
        score += 30;
        reasons.push(`Same area as ${currentProperty.location}`);
      } else if (currentProperty?.city && property.city === currentProperty.city) {
        score += 20;
        reasons.push(`Same city as ${currentProperty.city}`);
      }

      // Price range similarity
      if (currentProperty?.price && property.price) {
        const currentPriceNum = extractPrice(currentProperty.price);
        const propPriceNum = extractPrice(property.price);
        if (currentPriceNum && propPriceNum) {
          const priceDiff = Math.abs(currentPriceNum - propPriceNum) / currentPriceNum;
          if (priceDiff < 0.2) {
            score += 25;
            reasons.push('Similar price range');
          } else if (priceDiff < 0.5) {
            score += 15;
            reasons.push('Comparable pricing');
          }
        }
      }

      // Property type similarity
      if (currentProperty?.propertyType && property.propertyType === currentProperty.propertyType) {
        score += 20;
        reasons.push(`Same property type: ${property.propertyType}`);
      }

      // Bedroom/bathroom similarity
      if (currentProperty?.bedrooms && property.bedrooms === currentProperty.bedrooms) {
        score += 15;
        reasons.push(`${property.bedrooms} bedrooms`);
      }
      if (currentProperty?.bathrooms && property.bathrooms === currentProperty.bathrooms) {
        score += 10;
        reasons.push(`${property.bathrooms} bathrooms`);
      }

      // User preference matching
      if (userPreferences.location && property.location?.toLowerCase().includes(userPreferences.location.toLowerCase())) {
        score += 20;
        reasons.push('Matches your preferred location');
      }

      if (userPreferences.propertyType && property.propertyType?.toLowerCase().includes(userPreferences.propertyType.toLowerCase())) {
        score += 15;
        reasons.push('Matches your preferred property type');
      }

      // Previously liked properties influence
      if (likedProperties.includes(property.id)) {
        score += 25;
        reasons.push('You liked this property');
      }

      // Featured properties boost
      if (property.featured) {
        score += 10;
        reasons.push('Featured property');
      }

      // Properties with more images (better listing quality)
      const imageCount = Array.isArray(property.images) ? property.images.length : 0;
      if (imageCount >= 5) {
        score += 8;
        reasons.push('Well-documented property');
      }

      // Recently updated properties
      const daysSinceUpdate = property.updatedAt 
        ? (Date.now() - new Date(property.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
        : Infinity;
      if (daysSinceUpdate < 30) {
        score += 5;
        reasons.push('Recently updated');
      }

      // Calculate match percentage
      const matchPercentage = Math.min(Math.round((score / 100) * 100), 100);

      return {
        property,
        score,
        reasons: reasons.slice(0, 3), // Top 3 reasons
        matchPercentage
      };
    });

    // Sort by score and return top recommendations
    return scoredProperties
      .sort((a, b) => b.score - a.score)
      .slice(0, maxRecommendations);
  };

  const extractPrice = (priceStr: string): number | null => {
    const match = priceStr.match(/[\d,]+/);
    if (!match) return null;
    return parseInt(match[0].replace(/,/g, ''));
  };

  const formatPrice = (price: string) => {
    const numPrice = extractPrice(price);
    if (numPrice) {
      return `$${numPrice.toLocaleString()}`;
    }
    return price;
  };

  const recommendations = getRecommendations();

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-bright-yellow" />
            Recommended Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-bright-yellow" />
            Recommended Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recommendations available at the moment.</p>
            <p className="text-sm mt-2">Browse more properties to get personalized recommendations.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-bright-yellow" />
            Recommended for You
          </div>
          <Badge variant="secondary" className="text-xs">
            {recommendations.length} matches
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map(({ property, reasons, matchPercentage }) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={getPropertyImage(Array.isArray(property.images) ? property.images[0] : '')}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Match percentage badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-bright-yellow text-bright-black font-semibold">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {matchPercentage}% match
                  </Badge>
                </div>

                {/* Like button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute top-3 right-3 bg-white/90 hover:bg-white",
                    likedProperties.includes(property.id) && "text-red-500"
                  )}
                  onClick={() => toggleLike(property.id)}
                >
                  <Heart className={cn(
                    "w-4 h-4",
                    likedProperties.includes(property.id) && "fill-current"
                  )} />
                </Button>

                {/* Property status */}
                {property.featured && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-green-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-bright-black mb-2 line-clamp-1">
                  {property.title}
                </h3>
                
                {/* Location */}
                <div className="flex items-center text-sm text-bright-gray mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>

                {/* Property details */}
                <div className="flex items-center gap-4 text-sm text-bright-gray mb-3">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}
                    </div>
                  )}
                  {property.propertySize && (
                    <div className="flex items-center">
                      <Ruler className="w-4 h-4 mr-1" />
                      {property.propertySize}
                    </div>
                  )}
                </div>

                {/* Match reasons */}
                <div className="mb-3">
                  <div className="flex items-center mb-2">
                    <ThumbsUp className="w-3 h-3 mr-1 text-green-500" />
                    <span className="text-xs font-medium text-green-600">Why this matches:</span>
                  </div>
                  <div className="space-y-1">
                    {reasons.map((reason, index) => (
                      <div key={index} className="text-xs text-bright-gray flex items-center">
                        <div className="w-1 h-1 bg-bright-yellow rounded-full mr-2"></div>
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Match progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-bright-gray">Match Score</span>
                    <span className="font-medium text-bright-black">{matchPercentage}%</span>
                  </div>
                  <Progress value={matchPercentage} className="h-1" />
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-bright-black">
                    {formatPrice(property.price)}
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View more recommendations */}
        {allProperties.length > maxRecommendations && (
          <div className="text-center mt-6">
            <Button variant="outline" className="border-bright-yellow text-bright-black hover:bg-bright-yellow">
              <Filter className="w-4 h-4 mr-2" />
              View More Recommendations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Ruler, 
  Calendar,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Home,
  DollarSign,
  Building,
  Eye
} from "lucide-react";
import type { Property } from "@shared/schema";
import { getPropertyImage } from "@/assets/properties";
import { apiRequest } from "@/lib/queryClient";

interface PropertyRecommendationsProps {
  currentPropertyId?: string;
  viewedProperties?: string[];
}

interface UserPreferences {
  budget?: string;
  location?: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  features?: string;
  additionalNotes?: string;
}

interface RecommendationResponse {
  recommendations: Property[];
  explanation: string;
}

export const PropertyRecommendations = ({ 
  currentPropertyId, 
  viewedProperties = [] 
}: PropertyRecommendationsProps) => {
  const [, setLocation] = useLocation();
  const [showPreferencesForm, setShowPreferencesForm] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const queryClient = useQueryClient();

  // Include current property in viewed list
  const allViewedProperties = currentPropertyId 
    ? [...viewedProperties, currentPropertyId]
    : viewedProperties;

  const recommendationMutation = useMutation({
    mutationFn: async (userPreferences: UserPreferences) => {
      const response = await apiRequest("POST", "/api/properties/recommendations", {
        preferences: userPreferences,
        viewedProperties: allViewedProperties
      });
      return response.json() as Promise<RecommendationResponse>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties/recommendations"] });
    }
  });

  // Auto-load basic recommendations on component mount
  const { data: basicRecommendations } = useQuery({
    queryKey: ["/api/properties/recommendations", "basic", allViewedProperties],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/properties/recommendations", {
        preferences: {},
        viewedProperties: allViewedProperties
      });
      return response.json() as Promise<RecommendationResponse>;
    }
  });

  const handlePreferenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recommendationMutation.mutate(preferences);
    setShowPreferencesForm(false);
  };

  const handlePropertyClick = (propertyId: string) => {
    setLocation(`/properties/${propertyId}`);
  };

  const currentRecommendations = recommendationMutation.data || basicRecommendations;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-bright-yellow p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-bright-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-bright-black">AI-Powered Recommendations</h2>
            <p className="text-bright-gray">Properties tailored to your preferences</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreferencesForm(!showPreferencesForm)}
            className="border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-bright-black"
          >
            {showPreferencesForm ? "Hide" : "Customize"} Preferences
          </Button>
          
          <Button
            onClick={() => recommendationMutation.mutate(preferences)}
            disabled={recommendationMutation.isPending}
            className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
          >
            {recommendationMutation.isPending ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Get New Recommendations
          </Button>
        </div>
      </div>

      {/* Preferences Form */}
      {showPreferencesForm && (
        <Card className="border-bright-yellow/20">
          <CardHeader>
            <CardTitle className="text-bright-black">Your Property Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePreferenceSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select value={preferences.budget} onValueChange={(value) => setPreferences({...preferences, budget: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-100k">Under $100,000</SelectItem>
                      <SelectItem value="100k-200k">$100,000 - $200,000</SelectItem>
                      <SelectItem value="200k-500k">$200,000 - $500,000</SelectItem>
                      <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                      <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input
                    id="location"
                    value={preferences.location || ""}
                    onChange={(e) => setPreferences({...preferences, location: e.target.value})}
                    placeholder="e.g., Nakasero, Kampala"
                  />
                </div>

                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={preferences.propertyType} onValueChange={(value) => setPreferences({...preferences, propertyType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select value={preferences.bedrooms} onValueChange={(value) => setPreferences({...preferences, bedrooms: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4+">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select value={preferences.bathrooms} onValueChange={(value) => setPreferences({...preferences, bathrooms: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bathroom</SelectItem>
                      <SelectItem value="2">2 Bathrooms</SelectItem>
                      <SelectItem value="3">3 Bathrooms</SelectItem>
                      <SelectItem value="4+">4+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="features">Important Features</Label>
                  <Input
                    id="features"
                    value={preferences.features || ""}
                    onChange={(e) => setPreferences({...preferences, features: e.target.value})}
                    placeholder="e.g., swimming pool, parking, gym"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={preferences.additionalNotes || ""}
                  onChange={(e) => setPreferences({...preferences, additionalNotes: e.target.value})}
                  placeholder="Any other preferences or requirements..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
                disabled={recommendationMutation.isPending}
              >
                {recommendationMutation.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating Recommendations...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Personalized Recommendations
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {(recommendationMutation.isPending || (!currentRecommendations && basicRecommendations === undefined)) && (
        <div className="text-center py-8">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-bright-yellow" />
          <p className="text-bright-gray">Generating personalized recommendations...</p>
        </div>
      )}

      {/* AI Explanation */}
      {currentRecommendations?.explanation && (
        <Card className="bg-gradient-to-r from-bright-yellow/5 to-yellow-100/10 border-bright-yellow/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="bg-bright-yellow p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-bright-black" />
              </div>
              <div>
                <h3 className="font-semibold text-bright-black mb-2">AI Analysis</h3>
                <p className="text-bright-gray leading-relaxed">{currentRecommendations.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommended Properties */}
      {currentRecommendations?.recommendations && currentRecommendations.recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRecommendations.recommendations.map((property) => (
            <RecommendedPropertyCard 
              key={property.id} 
              property={property} 
              onViewDetails={() => handlePropertyClick(property.id)}
            />
          ))}
        </div>
      ) : currentRecommendations ? (
        <Card className="text-center py-8">
          <CardContent>
            <Home className="w-12 h-12 mx-auto mb-4 text-bright-gray" />
            <h3 className="text-lg font-semibold text-bright-black mb-2">No Recommendations Found</h3>
            <p className="text-bright-gray mb-4">
              Try adjusting your preferences or check back later for new properties.
            </p>
            <Button 
              onClick={() => setShowPreferencesForm(true)}
              variant="outline"
              className="border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-bright-black"
            >
              Update Preferences
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

interface RecommendedPropertyCardProps {
  property: Property;
  onViewDetails: () => void;
}

const RecommendedPropertyCard = ({ property, onViewDetails }: RecommendedPropertyCardProps) => {
  const mainImage = Array.isArray(property.images) && property.images.length > 0 
    ? getPropertyImage(property.images[0])
    : null;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-bright-yellow/20 hover:border-bright-yellow/40">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          {mainImage ? (
            <img 
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.warn('Image failed to load:', mainImage);
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-bright-light flex items-center justify-center">
              <div className="text-center text-bright-gray">
                <Home className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">No Image Available</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute top-4 left-4">
          <Badge className="bg-bright-yellow text-bright-black font-semibold">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Recommended
          </Badge>
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
        </div>

        <Button 
          onClick={onViewDetails}
          className="w-full bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
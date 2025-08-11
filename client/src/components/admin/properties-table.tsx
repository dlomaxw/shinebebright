import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Edit, 
  Trash2, 
  Plus, 
  MapPin, 
  DollarSign,
  Star,
  Home
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPropertyImage } from "@/assets/properties";
import PropertyForm from "./property-form";
import type { Property } from "@shared/schema";

export default function PropertiesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    },
  });

  const filteredProperties = properties.filter(property =>
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'for sale':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      case 'under-construction':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-bright-yellow border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gray-900 border-bright-yellow/20">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="text-bright-white flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Properties Management ({properties.length})
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-white"
              />
              <Button 
                className="bg-bright-yellow text-bright-black hover:bg-yellow-400 w-full sm:w-auto"
                onClick={() => {
                  setSelectedProperty(undefined);
                  setFormOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Mobile Cards View - Visible on mobile */}
      <div className="block md:hidden space-y-4">
        {filteredProperties.map((property) => {
          const mainImage = Array.isArray(property.images) && property.images.length > 0
            ? getPropertyImage(property.images[0])
            : null;

          return (
            <Card key={property.id} className="bg-gray-900 border-bright-yellow/20 overflow-hidden">
              <div className="flex">
                {/* Property Image */}
                <div className="w-24 h-24 bg-gray-800 flex-shrink-0">
                  {mainImage ? (
                    <img 
                      src={mainImage} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                </div>
                
                {/* Property Details */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm leading-tight">{property.title}</h3>
                      <p className="text-gray-400 text-xs">{property.propertyType}</p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-bright-yellow border-bright-yellow/50 hover:bg-bright-yellow/10 h-8 w-8 p-0"
                        onClick={() => {
                          setSelectedProperty(property);
                          setFormOpen(true);
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMutation.mutate(property.id)}
                        disabled={deleteMutation.isPending}
                        className="text-red-400 border-red-400/50 hover:bg-red-400/10 h-8 w-8 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-300 text-xs">{property.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-bright-yellow font-semibold text-sm">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {property.price}
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`text-xs ${getStatusColor(property.status)}`}>
                        {property.status}
                      </Badge>
                      {property.featured && (
                        <Badge className="bg-bright-yellow text-black text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {(property.bedrooms || property.bathrooms || property.propertySize) && (
                    <div className="flex gap-4 mt-2 text-xs text-gray-400">
                      {property.bedrooms && <span>🛏️ {property.bedrooms}</span>}
                      {property.bathrooms && <span>🚿 {property.bathrooms}</span>}
                      {property.propertySize && <span>📏 {property.propertySize}</span>}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <Card className="bg-gray-900 border-bright-yellow/20 hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Image</TableHead>
                  <TableHead className="text-gray-300">Property</TableHead>
                  <TableHead className="text-gray-300">Location</TableHead>
                  <TableHead className="text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-300">Details</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Featured</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((property) => {
                  const mainImage = Array.isArray(property.images) && property.images.length > 0
                    ? getPropertyImage(property.images[0])
                    : null;

                  return (
                    <TableRow key={property.id} className="border-gray-700 hover:bg-gray-800/50">
                      <TableCell>
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800">
                          {mainImage ? (
                            <img 
                              src={mainImage} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-gray-500" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white font-medium">{property.title}</p>
                          <p className="text-gray-400 text-sm">{property.propertyType}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-300">
                          <p>{property.location}</p>
                          <p className="text-gray-500 text-sm">{property.area}, {property.city}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-bright-yellow font-semibold">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {property.price}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-300 text-sm">
                          {property.bedrooms && <p>🛏️ {property.bedrooms}</p>}
                          {property.bathrooms && <p>🚿 {property.bathrooms}</p>}
                          {property.propertySize && <p>📏 {property.propertySize}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(property.status)}>
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={property.featured ? "default" : "outline"} 
                               className={property.featured ? "bg-bright-yellow text-black" : ""}>
                          {property.featured ? "Featured" : "Standard"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-bright-yellow border-bright-yellow/50 hover:bg-bright-yellow/10"
                            onClick={() => {
                              setSelectedProperty(property);
                              setFormOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteMutation.mutate(property.id)}
                            disabled={deleteMutation.isPending}
                            className="text-red-400 border-red-400/50 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredProperties.length === 0 && (
        <Card className="bg-gray-900 border-bright-yellow/20">
          <CardContent className="text-center py-12">
            <Home className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No properties found</h3>
            <p className="text-gray-400">
              {searchTerm ? "No properties match your search criteria" : "Start by adding your first property"}
            </p>
            {!searchTerm && (
              <Button 
                className="bg-bright-yellow text-bright-black hover:bg-yellow-400 mt-4"
                onClick={() => {
                  setSelectedProperty(undefined);
                  setFormOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Property
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <PropertyForm
        open={formOpen}
        onOpenChange={setFormOpen}
        property={selectedProperty}
      />
    </div>
  );
}
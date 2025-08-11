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
import { Edit, Trash2, Plus, MapPin, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPropertyImage } from "@/assets/properties";
import type { Property } from "@shared/schema";

export default function PropertiesTable() {
  const [searchTerm, setSearchTerm] = useState("");
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
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
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
    <Card className="bg-gray-900 border-bright-yellow/20">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-bright-white flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Properties Management ({properties.length})
          </CardTitle>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-gray-800 border-gray-700 text-white"
            />
            <Button className="bg-bright-yellow text-bright-black hover:bg-yellow-400">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
          {filteredProperties.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No properties found matching your search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
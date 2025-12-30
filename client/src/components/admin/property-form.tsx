import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Pencil, Trash2, X, MapPin, Bed, Bath, Ruler, Building } from "lucide-react";
import type { Property } from "@shared/schema";

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  propertySize: z.string().optional(),
  garage: z.coerce.number().optional().nullable(),
  yearBuilt: z.coerce.number().optional().nullable(),
  propertyType: z.string().optional(),
  status: z.string().default("For Sale"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  area: z.string().optional(),
  country: z.string().default("Uganda"),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  originalUrl: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export default function PropertyForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      propertySize: "",
      garage: null,
      yearBuilt: null,
      propertyType: "Apartment",
      status: "For Sale",
      location: "",
      address: "",
      city: "Kampala",
      area: "",
      country: "Uganda",
      images: [],
      features: [],
      featured: false,
      originalUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: PropertyFormData) => {
      return apiRequest("POST", "/api/properties", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Property created successfully" });
      handleClose();
    },
    onError: () => {
      toast({ title: "Failed to create property", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PropertyFormData }) => {
      return apiRequest("PATCH", `/api/properties/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Property updated successfully" });
      handleClose();
    },
    onError: () => {
      toast({ title: "Failed to update property", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Property deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete property", variant: "destructive" });
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    setEditingProperty(null);
    form.reset();
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    form.reset({
      title: property.title,
      description: property.description || "",
      price: property.price,
      bedrooms: property.bedrooms || "",
      bathrooms: property.bathrooms || "",
      propertySize: property.propertySize || "",
      garage: property.garage,
      yearBuilt: property.yearBuilt,
      propertyType: property.propertyType || "Apartment",
      status: property.status || "For Sale",
      location: property.location,
      address: property.address || "",
      city: property.city || "",
      area: property.area || "",
      country: property.country || "Uganda",
      images: Array.isArray(property.images) ? property.images : [],
      features: Array.isArray(property.features) ? property.features : [],
      featured: property.featured || false,
      originalUrl: property.originalUrl || "",
    });
    setIsOpen(true);
  };

  const onSubmit = (data: PropertyFormData) => {
    if (editingProperty) {
      updateMutation.mutate({ id: editingProperty.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      const currentFeatures = form.getValues("features") || [];
      form.setValue("features", [...currentFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue("features", currentFeatures.filter((_, i) => i !== index));
  };

  const addImage = () => {
    if (newImage.trim()) {
      const currentImages = form.getValues("images") || [];
      form.setValue("images", [...currentImages, newImage.trim()]);
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    form.setValue("images", currentImages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-bright-white">Properties</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-bright-yellow text-bright-black hover:bg-yellow-400" data-testid="button-add-property">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-bright-black border-bright-yellow/20">
            <DialogHeader>
              <DialogTitle className="text-bright-white">
                {editingProperty ? "Edit Property" : "Add New Property"}
              </DialogTitle>
              <DialogDescription className="text-bright-white/60">
                {editingProperty ? "Update property details below" : "Fill in the property details below"}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-bright-white">Title *</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" data-testid="input-property-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-bright-white">Price *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., $250,000 or Contact for Pricing" className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" data-testid="input-property-price" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-bright-white">Location *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Kololo, Kampala" className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" data-testid="input-property-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-bright-white">Description *</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" data-testid="input-property-description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-bright-white">Bedrooms</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 3 or 2&3" className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-bright-white">Bathrooms</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 2" className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-bright-white">Property Size</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 150 Sqm" className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-bright-white">Property Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-bright-black/50 border-bright-yellow/20 text-bright-white">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="Villa">Villa</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Penthouse">Penthouse</SelectItem>
                            <SelectItem value="Commercial">Commercial</SelectItem>
                            <SelectItem value="Land">Land</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-bright-white">Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-bright-black/50 border-bright-yellow/20 text-bright-white">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="For Sale">For Sale</SelectItem>
                            <SelectItem value="For Rent">For Rent</SelectItem>
                            <SelectItem value="Sold">Sold</SelectItem>
                            <SelectItem value="Pre-Launch">Pre-Launch</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-bright-white">City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Kampala" className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-bright-white">Area</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Nakasero" className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-bright-white">Full Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Full street address" className="bg-bright-black/50 border-bright-yellow/20 text-bright-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="text-bright-white">Featured Property</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-bright-white">Images (filenames)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="Image filename (e.g., property_1.jpg)"
                      className="bg-bright-black/50 border-bright-yellow/20 text-bright-white"
                    />
                    <Button type="button" onClick={addImage} variant="outline" className="border-bright-yellow/20 text-bright-white">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.watch("images")?.map((img, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {img}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeImage(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-bright-white">Features & Amenities</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature (e.g., Swimming Pool)"
                      className="bg-bright-black/50 border-bright-yellow/20 text-bright-white"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature} variant="outline" className="border-bright-yellow/20 text-bright-white">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.watch("features")?.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeFeature(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={handleClose} className="border-bright-yellow/20 text-bright-white">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save-property"
                  >
                    {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingProperty ? "Update Property" : "Create Property"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-bright-yellow/10 bg-bright-black/50 animate-pulse">
              <div className="h-48 bg-bright-yellow/10 rounded-t-lg" />
              <CardContent className="p-4 space-y-3">
                <div className="h-5 bg-bright-yellow/10 rounded w-3/4" />
                <div className="h-4 bg-bright-yellow/10 rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <Card className="border-bright-yellow/10 bg-bright-black/50">
          <CardContent className="p-12 text-center">
            <Building className="w-12 h-12 mx-auto text-bright-yellow/50 mb-4" />
            <h3 className="text-lg font-semibold text-bright-white mb-2">No Properties Yet</h3>
            <p className="text-bright-white/60 mb-4">Add your first property to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="border-bright-yellow/10 bg-bright-black/50 overflow-hidden group" data-testid={`card-property-${property.id}`}>
              <div className="relative h-48 bg-bright-yellow/10">
                {Array.isArray(property.images) && property.images.length > 0 ? (
                  <img
                    src={`/images/properties/general/${property.images[0]}`}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/400/300";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building className="w-12 h-12 text-bright-yellow/30" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => handleEdit(property)}
                    data-testid={`button-edit-property-${property.id}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this property?")) {
                        deleteMutation.mutate(property.id);
                      }
                    }}
                    data-testid={`button-delete-property-${property.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {property.featured && (
                  <Badge className="absolute top-2 left-2 bg-bright-yellow text-bright-black">Featured</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-bright-white mb-2 truncate">{property.title}</h3>
                <div className="flex items-center text-bright-white/60 text-sm mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center gap-4 text-bright-white/60 text-sm mb-3">
                  {property.bedrooms && (
                    <span className="flex items-center">
                      <Bed className="w-3 h-3 mr-1" />
                      {property.bedrooms}
                    </span>
                  )}
                  {property.bathrooms && (
                    <span className="flex items-center">
                      <Bath className="w-3 h-3 mr-1" />
                      {property.bathrooms}
                    </span>
                  )}
                  {property.propertySize && (
                    <span className="flex items-center">
                      <Ruler className="w-3 h-3 mr-1" />
                      {property.propertySize}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-bright-yellow font-bold">{property.price}</span>
                  <Badge variant="outline" className="text-bright-white/60 border-bright-yellow/20">
                    {property.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

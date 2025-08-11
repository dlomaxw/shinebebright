import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";
import type { Property } from "@shared/schema";

const propertyFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  propertyType: z.string().min(1, "Property type is required"),
  status: z.string().min(1, "Status is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  city: z.string().min(1, "City is required"),
  area: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  propertySize: z.string().optional(),
  garage: z.string().optional(),
  yearBuilt: z.string().optional(),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

type PropertyFormData = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property;
}

const propertyTypes = [
  "Apartment", "House", "Villa", "Condo", "Townhouse", "Studio",
  "1-Bedroom Apartment", "2-Bedroom Apartment", "3-Bedroom Apartment",
  "Penthouse", "Commercial", "Land", "Office"
];

const statusOptions = [
  "For Sale", "Sold", "Under Construction", "Available", "Reserved"
];

const commonFeatures = [
  "Swimming Pool", "Gym", "Restaurant", "BBQ Area", "Kids Play Area",
  "Running Track", "Padel Court", "24/7 Security", "Concierge Service",
  "Parking", "Backup Power", "Air Conditioning", "High-Speed Internet",
  "Balcony", "Garden", "Elevator", "Storage Room", "Laundry Room"
];

export default function PropertyForm({ open, onOpenChange, property }: PropertyFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newFeature, setNewFeature] = useState("");

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      price: property?.price || "",
      propertyType: property?.propertyType || "",
      status: property?.status || "For Sale",
      location: property?.location || "",
      address: property?.address || "",
      city: property?.city || "",
      area: property?.area || "",
      country: property?.country || "Uganda",
      bedrooms: property?.bedrooms || "",
      bathrooms: property?.bathrooms || "",
      propertySize: property?.propertySize || "",
      garage: property?.garage || "",
      yearBuilt: property?.yearBuilt || "",
      features: Array.isArray(property?.features) ? property.features : [],
      featured: property?.featured || false,
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: PropertyFormData) => {
      const propertyData = {
        ...data,
        images: ["/src/assets/properties/property-01.jpeg", "/src/assets/properties/property-02.jpeg"]
      };
      
      if (property) {
        return await apiRequest("PUT", `/api/properties/${property.id}`, propertyData);
      } else {
        return await apiRequest("POST", "/api/properties", propertyData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Success",
        description: `Property ${property ? 'updated' : 'created'} successfully`,
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to ${property ? 'update' : 'create'} property`,
        variant: "destructive",
      });
      console.error("Property form error:", error);
    },
  });

  const onSubmit = (data: PropertyFormData) => {
    createMutation.mutate(data);
  };

  const selectedFeatures = form.watch("features");

  const addFeature = (feature: string) => {
    const currentFeatures = form.getValues("features");
    if (!currentFeatures.includes(feature)) {
      form.setValue("features", [...currentFeatures, feature]);
    }
  };

  const removeFeature = (feature: string) => {
    const currentFeatures = form.getValues("features");
    form.setValue("features", currentFeatures.filter(f => f !== feature));
  };

  const addCustomFeature = () => {
    if (newFeature.trim() && !selectedFeatures.includes(newFeature.trim())) {
      addFeature(newFeature.trim());
      setNewFeature("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-gray-900 text-white border-bright-yellow/20">
        <DialogHeader>
          <DialogTitle className="text-bright-yellow">
            {property ? "Edit Property" : "Add New Property"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {property ? "Update property information" : "Create a new property listing"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-bright-yellow">Basic Information</h3>
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Property Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-gray-800 border-gray-700 text-white min-h-[100px]" />
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
                      <FormLabel className="text-gray-300">Price</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="$150,000" className="bg-gray-800 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status} className="text-white hover:bg-gray-700">
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-700 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-bright-yellow data-[state=checked]:bg-bright-yellow data-[state=checked]:text-black"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-gray-300">Featured Property</FormLabel>
                        <p className="text-xs text-gray-500">Mark this property as featured</p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Location & Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-bright-yellow">Location & Details</h3>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nakasero" className="bg-gray-800 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Full Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123 Main Street" className="bg-gray-800 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Kampala" className="bg-gray-800 border-gray-700 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Area</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Central Division" className="bg-gray-800 border-gray-700 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Country</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Bedrooms</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="3" className="bg-gray-800 border-gray-700 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Bathrooms</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="2" className="bg-gray-800 border-gray-700 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="propertySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Property Size</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="120 Sqm" className="bg-gray-800 border-gray-700 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="garage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Garage</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="2 cars" className="bg-gray-800 border-gray-700 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="yearBuilt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Year Built</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="2024" className="bg-gray-800 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-bright-yellow">Features & Amenities</h3>
              
              {/* Selected Features */}
              {selectedFeatures.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">Selected Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFeatures.map((feature) => (
                      <Badge key={feature} className="bg-bright-yellow text-black">
                        {feature}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-auto p-0 text-black hover:text-red-600"
                          onClick={() => removeFeature(feature)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Features */}
              <div className="space-y-2">
                <p className="text-sm text-gray-300">Common Features:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {commonFeatures.map((feature) => (
                    <Button
                      key={feature}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={`text-left justify-start h-auto p-2 ${
                        selectedFeatures.includes(feature)
                          ? "bg-bright-yellow text-black border-bright-yellow"
                          : "text-gray-300 border-gray-600 hover:bg-gray-800"
                      }`}
                      onClick={() => selectedFeatures.includes(feature) ? removeFeature(feature) : addFeature(feature)}
                    >
                      {feature}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Feature */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom feature..."
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomFeature())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCustomFeature}
                  className="border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-black"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
              >
                {createMutation.isPending ? "Saving..." : property ? "Update Property" : "Create Property"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
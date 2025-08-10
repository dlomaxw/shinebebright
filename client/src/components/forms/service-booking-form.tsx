import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Loader2, MapPin, Phone, Mail, User, Building, Clock, DollarSign } from "lucide-react";
import { insertServiceBookingSchema, type InsertServiceBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const serviceTypes = [
  { value: "real-estate", label: "Real Estate Visualization", icon: "🏠" },
  { value: "architecture", label: "Architectural Visualization", icon: "🏗️" },
  { value: "interior-design", label: "Interior Design", icon: "🏡" },
  { value: "media", label: "Media & Entertainment", icon: "🎬" },
  { value: "training", label: "VR/AR Training", icon: "🎓" },
];

const servicePackages = [
  { value: "basic", label: "Basic Package", description: "Essential features" },
  { value: "standard", label: "Standard Package", description: "Enhanced features" },
  { value: "premium", label: "Premium Package", description: "Full-featured solution" },
];

const budgetRanges = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-50k", label: "$10,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "over-100k", label: "Over $100,000" },
];

const timelines = [
  { value: "1-2-weeks", label: "1-2 weeks" },
  { value: "1-month", label: "1 month" },
  { value: "3-months", label: "3 months" },
  { value: "6-months-plus", label: "6+ months" },
];

const commonRequirements = [
  "3D Modeling", "Virtual Reality Experience", "Augmented Reality Features",
  "Interactive Elements", "Multi-platform Support", "Custom Branding",
  "Analytics Dashboard", "User Training", "Ongoing Support", "Integration Services"
];

type ServiceBookingFormData = InsertServiceBooking & {
  selectedRequirements: string[];
};

const formSchema = insertServiceBookingSchema.extend({
  selectedRequirements: insertServiceBookingSchema.shape.requirements.optional(),
});

interface ServiceBookingFormProps {
  initialServiceType?: string;
  onSuccess?: () => void;
}

export function ServiceBookingForm({ initialServiceType, onSuccess }: ServiceBookingFormProps) {
  const [preferredDate, setPreferredDate] = useState<Date>();
  const [alternateDate, setAlternateDate] = useState<Date>();
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ServiceBookingFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
      serviceType: initialServiceType || "",
      servicePackage: "",
      projectTitle: "",
      projectDescription: "",
      budget: "",
      timeline: "",
      selectedRequirements: [],
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: InsertServiceBooking) => {
      const response = await apiRequest("POST", "/api/service-bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Submitted Successfully!",
        description: "We'll review your request and contact you within 24 hours to discuss your project.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/service-bookings"] });
      form.reset();
      setPreferredDate(undefined);
      setAlternateDate(undefined);
      setSelectedRequirements([]);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRequirementToggle = (requirement: string) => {
    setSelectedRequirements(prev => 
      prev.includes(requirement)
        ? prev.filter(r => r !== requirement)
        : [...prev, requirement]
    );
  };

  const onSubmit = async (data: ServiceBookingFormData) => {
    setIsSubmitting(true);
    
    try {
      const bookingData: InsertServiceBooking = {
        ...data,
        preferredDate: preferredDate,
        alternateDate: alternateDate,
        requirements: selectedRequirements,
      };

      await createBookingMutation.mutateAsync(bookingData);
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceType = serviceTypes.find(s => s.value === form.watch("serviceType"));

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Book Your Immersive Experience</CardTitle>
        <CardDescription>
          Tell us about your project and we'll create a customized solution for you
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  className="mt-1"
                  placeholder="John"
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  className="mt-1"
                  placeholder="Doe"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.lastName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className="mt-1"
                  placeholder="john@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  {...form.register("phone")}
                  className="mt-1"
                  placeholder="+250 xxx xxx xxx"
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.phone.message}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company/Organization
                </Label>
                <Input
                  id="company"
                  {...form.register("company")}
                  className="mt-1"
                  placeholder="Your Company Name"
                />
              </div>
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select
                  value={form.watch("serviceType")}
                  onValueChange={(value) => form.setValue("serviceType", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a service type">
                      {selectedServiceType && (
                        <span className="flex items-center gap-2">
                          <span>{selectedServiceType.icon}</span>
                          {selectedServiceType.label}
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        <span className="flex items-center gap-2">
                          <span>{service.icon}</span>
                          {service.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.serviceType && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.serviceType.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="servicePackage">Service Package</Label>
                <Select
                  value={form.watch("servicePackage") || ""}
                  onValueChange={(value) => form.setValue("servicePackage", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicePackages.map((pkg) => (
                      <SelectItem key={pkg.value} value={pkg.value}>
                        <div>
                          <div className="font-medium">{pkg.label}</div>
                          <div className="text-sm text-gray-500">{pkg.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Information</h3>
            <div>
              <Label htmlFor="projectTitle">Project Title</Label>
              <Input
                id="projectTitle"
                {...form.register("projectTitle")}
                className="mt-1"
                placeholder="My VR Property Showcase"
              />
            </div>
            <div>
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                {...form.register("projectDescription")}
                className="mt-1"
                rows={4}
                placeholder="Describe your project goals, target audience, and specific requirements..."
              />
            </div>
          </div>

          {/* Budget and Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Budget & Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Estimated Budget</Label>
                <Select
                  value={form.watch("budget") || ""}
                  onValueChange={(value) => form.setValue("budget", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="timeline" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Project Timeline
                </Label>
                <Select
                  value={form.watch("timeline") || ""}
                  onValueChange={(value) => form.setValue("timeline", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Preferred Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Preferred Meeting Dates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal mt-1", !preferredDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {preferredDate ? format(preferredDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={preferredDate}
                      onSelect={setPreferredDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>Alternate Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal mt-1", !alternateDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {alternateDate ? format(alternateDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={alternateDate}
                      onSelect={setAlternateDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Specific Requirements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonRequirements.map((requirement) => (
                <div key={requirement} className="flex items-center space-x-2">
                  <Checkbox
                    id={requirement}
                    checked={selectedRequirements.includes(requirement)}
                    onCheckedChange={() => handleRequirementToggle(requirement)}
                  />
                  <Label
                    htmlFor={requirement}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {requirement}
                  </Label>
                </div>
              ))}
            </div>
            {selectedRequirements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedRequirements.map((req) => (
                  <Badge key={req} variant="secondary" className="text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              disabled={isSubmitting || createBookingMutation.isPending}
            >
              {isSubmitting || createBookingMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Booking...
                </>
              ) : (
                "Submit Booking Request"
              )}
            </Button>
            <p className="text-sm text-gray-600 text-center mt-3">
              No payment required. We'll contact you within 24 hours to discuss your project and provide a detailed quote.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
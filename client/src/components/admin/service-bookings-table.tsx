import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Edit, Trash2, Phone, Mail, Building, Calendar, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ServiceBooking } from "@shared/schema";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const serviceTypes = {
  "real-estate": "Real Estate",
  "architecture": "Architecture", 
  "interior-design": "Interior Design",
  "media": "Media & Entertainment",
  "training": "VR/AR Training",
};

export function ServiceBookingsTable() {
  const [selectedBooking, setSelectedBooking] = useState<ServiceBooking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ServiceBooking>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery<ServiceBooking[]>({
    queryKey: ["/api/service-bookings"],
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ServiceBooking> }) => {
      const response = await apiRequest("PUT", `/api/service-bookings/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Booking updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/service-bookings"] });
      setIsEditDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Failed to update booking", variant: "destructive" });
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/service-bookings/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Booking deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/service-bookings"] });
    },
    onError: () => {
      toast({ title: "Failed to delete booking", variant: "destructive" });
    },
  });

  const handleEdit = (booking: ServiceBooking) => {
    setSelectedBooking(booking);
    setEditForm(booking);
    setIsEditDialogOpen(true);
  };

  const handleView = (booking: ServiceBooking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedBooking && editForm) {
      updateBookingMutation.mutate({
        id: selectedBooking.id,
        data: editForm,
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      deleteBookingMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading bookings...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {booking.firstName} {booking.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{booking.company}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {serviceTypes[booking.serviceType as keyof typeof serviceTypes] || booking.serviceType}
                    </div>
                    {booking.servicePackage && (
                      <div className="text-sm text-gray-500 capitalize">{booking.servicePackage}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-48 truncate">
                    {booking.projectTitle || "Untitled Project"}
                  </div>
                </TableCell>
                <TableCell>
                  {booking.budget ? (
                    <Badge variant="outline" className="text-xs">
                      {booking.budget.replace("-", " - ").replace("k", "K")}
                    </Badge>
                  ) : (
                    "Not specified"
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`text-xs ${statusColors[booking.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {booking.createdAt ? format(new Date(booking.createdAt), "MMM dd, yyyy") : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(booking)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(booking)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(booking.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Service Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              {/* Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Name</Label>
                    <p className="font-medium">{selectedBooking.firstName} {selectedBooking.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Company</Label>
                    <p>{selectedBooking.company || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email
                    </Label>
                    <p>{selectedBooking.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone
                    </Label>
                    <p>{selectedBooking.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Service Type</Label>
                    <p className="font-medium">
                      {serviceTypes[selectedBooking.serviceType as keyof typeof serviceTypes] || selectedBooking.serviceType}
                    </p>
                  </div>
                  {selectedBooking.servicePackage && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Service Package</Label>
                      <p className="capitalize">{selectedBooking.servicePackage}</p>
                    </div>
                  )}
                  {selectedBooking.projectTitle && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Project Title</Label>
                      <p>{selectedBooking.projectTitle}</p>
                    </div>
                  )}
                  {selectedBooking.projectDescription && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Description</Label>
                      <p className="text-sm">{selectedBooking.projectDescription}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Budget
                      </Label>
                      <p>{selectedBooking.budget || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Timeline
                      </Label>
                      <p>{selectedBooking.timeline || "Not specified"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              {selectedBooking.requirements && (selectedBooking.requirements as string[]).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(selectedBooking.requirements as string[]).map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Dates */}
              {(selectedBooking.preferredDate || selectedBooking.alternateDate) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Preferred Dates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedBooking.preferredDate && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Preferred Date</Label>
                        <p>{format(new Date(selectedBooking.preferredDate), "PPP")}</p>
                      </div>
                    )}
                    {selectedBooking.alternateDate && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Alternate Date</Label>
                        <p>{format(new Date(selectedBooking.alternateDate), "PPP")}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Input
                  id="assignedTo"
                  value={editForm.assignedTo || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, assignedTo: e.target.value }))}
                  placeholder="Team member ID or name"
                />
              </div>

              <div>
                <Label htmlFor="estimatedCost">Estimated Cost (USD)</Label>
                <Input
                  id="estimatedCost"
                  type="number"
                  value={editForm.estimatedCost ? editForm.estimatedCost / 100 : ""}
                  onChange={(e) => setEditForm(prev => ({ 
                    ...prev, 
                    estimatedCost: e.target.value ? parseInt(e.target.value) * 100 : undefined 
                  }))}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  value={editForm.notes || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add internal notes..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} disabled={updateBookingMutation.isPending}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
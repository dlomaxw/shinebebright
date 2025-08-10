import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Play, 
  Video, 
  Calendar, 
  Users, 
  Eye,
  Clock,
  MapPin,
  Settings,
  Share
} from "lucide-react";
import { format } from "date-fns";
import type { VirtualTour } from "@shared/schema";

interface VirtualToursListProps {
  tours: VirtualTour[];
  isClient?: boolean;
  onJoinTour?: (tourId: string) => void;
  onManageTour?: (tourId: string) => void;
}

const VirtualToursList = ({ 
  tours, 
  isClient = false, 
  onJoinTour, 
  onManageTour 
}: VirtualToursListProps) => {
  const [selectedTour, setSelectedTour] = useState<VirtualTour | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-red-100 text-red-800 animate-pulse";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTourTypeIcon = (type: string) => {
    switch (type) {
      case "live": return <Video className="h-4 w-4" />;
      case "recorded": return <Play className="h-4 w-4" />;
      case "360": return <Eye className="h-4 w-4" />;
      case "vr": return <Settings className="h-4 w-4" />;
      default: return <Video className="h-4 w-4" />;
    }
  };

  const getTourTypeColor = (type: string) => {
    switch (type) {
      case "live": return "bg-red-100 text-red-800";
      case "recorded": return "bg-blue-100 text-blue-800";
      case "360": return "bg-purple-100 text-purple-800";
      case "vr": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const canJoinTour = (tour: VirtualTour) => {
    return tour.status === "live" || (tour.status === "scheduled" && tour.scheduledAt && new Date(tour.scheduledAt.toString()) <= new Date());
  };

  if (tours.length === 0) {
    return (
      <div className="text-center py-8">
        <Video className="h-12 w-12 text-bright-gray mx-auto mb-4" />
        <h3 className="text-lg font-medium text-bright-black mb-2">No virtual tours</h3>
        <p className="text-bright-gray">
          {isClient 
            ? "Virtual tours will appear here when scheduled" 
            : "Create your first virtual tour to get started"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tours.map((tour) => (
        <Card key={tour.id} className="border border-gray-200 hover:border-bright-yellow transition-colors">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-bright-black">{tour.title}</h3>
                  <Badge className={getStatusColor(tour.status)}>
                    {tour.status === "live" && "🔴 "}
                    {tour.status}
                  </Badge>
                  <Badge className={getTourTypeColor(tour.tourType)}>
                    <div className="flex items-center gap-1">
                      {getTourTypeIcon(tour.tourType)}
                      {tour.tourType.toUpperCase()}
                    </div>
                  </Badge>
                </div>
                
                <p className="text-bright-gray text-sm mb-3">{tour.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-bright-gray" />
                    <span className="text-bright-gray">
                      {tour.scheduledAt 
                        ? format(new Date(tour.scheduledAt.toString()), "MMM dd, hh:mm a")
                        : "No date set"
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-bright-gray" />
                    <span className="text-bright-gray">
                      {tour.participants?.length || 0} participants
                    </span>
                  </div>
                  
                  {tour.status === "completed" && tour.startedAt && tour.endedAt && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-bright-gray" />
                      <span className="text-bright-gray">
                        {Math.round((new Date(tour.endedAt).getTime() - new Date(tour.startedAt).getTime()) / 60000)}m
                      </span>
                    </div>
                  )}
                  
                  {tour.recordingUrl && (
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-bright-gray" />
                      <span className="text-bright-gray">Recording available</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                {isClient ? (
                  <>
                    {canJoinTour(tour) && (
                      <Button 
                        onClick={() => onJoinTour?.(tour.id)}
                        className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Join Tour
                      </Button>
                    )}
                    {tour.recordingUrl && (
                      <Button variant="outline" asChild>
                        <a href={tour.recordingUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Recording
                        </a>
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => onManageTour?.(tour.id)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                    <Button variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {/* Participants Preview */}
            {tour.participants && tour.participants.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-bright-black">Participants</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedTour(selectedTour?.id === tour.id ? null : tour)}
                  >
                    {selectedTour?.id === tour.id ? "Hide" : "Show All"}
                  </Button>
                </div>
                
                <div className="mt-2">
                  <div className="flex -space-x-2">
                    {tour.participants.slice(0, 5).map((participant, index) => (
                      <Avatar key={index} className="w-8 h-8 border-2 border-white">
                        <AvatarFallback className="bg-bright-yellow text-bright-black text-xs">
                          {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {tour.participants.length > 5 && (
                      <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                        +{tour.participants.length - 5}
                      </div>
                    )}
                  </div>
                  
                  {selectedTour?.id === tour.id && (
                    <div className="mt-3 space-y-2">
                      {tour.participants.map((participant, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>{participant.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {participant.role}
                            </Badge>
                          </div>
                          {participant.joinedAt && (
                            <span className="text-bright-gray text-xs">
                              Joined {format(new Date(participant.joinedAt), "hh:mm a")}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VirtualToursList;
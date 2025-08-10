import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  Plus, 
  Calendar, 
  Users, 
  Eye,
  Settings,
  Play,
  Monitor,
  Headphones
} from "lucide-react";
import VirtualToursList from "@/components/virtual-tours/virtual-tours-list";
import VirtualTourViewer from "@/components/virtual-tours/virtual-tour-viewer";
import type { VirtualTour } from "@shared/schema";

const VirtualTours = () => {
  const [activeTab, setActiveTab] = useState("scheduled");
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [showViewer, setShowViewer] = useState(false);

  const { data: tours = [], isLoading } = useQuery<VirtualTour[]>({
    queryKey: ["/api/virtual-tours"],
  });

  const scheduledTours = tours.filter(tour => tour.status === "scheduled");
  const liveTours = tours.filter(tour => tour.status === "live");
  const completedTours = tours.filter(tour => tour.status === "completed");

  const handleJoinTour = (tourId: string) => {
    setSelectedTourId(tourId);
    setShowViewer(true);
  };

  const handleCreateTour = () => {
    // This would open a tour creation modal
    console.log("Create new tour");
  };

  if (showViewer && selectedTourId) {
    return (
      <VirtualTourViewer 
        tourId={selectedTourId} 
        onExit={() => {
          setShowViewer(false);
          setSelectedTourId(null);
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-bright-light flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-bright-yellow border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-bright-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-bright-black mb-2">Virtual Tours</h1>
            <p className="text-bright-gray">Experience immersive property tours and live streaming</p>
          </div>
          <Button 
            onClick={handleCreateTour}
            className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Tour
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-bright-black">{scheduledTours.length}</p>
                  <p className="text-sm text-bright-gray">Scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Video className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-bright-black">{liveTours.length}</p>
                  <p className="text-sm text-bright-gray">Live Now</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-bright-black">{completedTours.length}</p>
                  <p className="text-sm text-bright-gray">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-bright-black">
                    {tours.reduce((sum, tour) => sum + (tour.participants?.length || 0), 0)}
                  </p>
                  <p className="text-sm text-bright-gray">Total Viewers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Tours Alert */}
        {liveTours.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div>
                    <h3 className="font-semibold text-red-800">Live Tours Active</h3>
                    <p className="text-sm text-red-600">
                      {liveTours.length} tour{liveTours.length > 1 ? 's' : ''} currently streaming
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => setActiveTab("live")}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  <Video className="h-4 w-4 mr-2" />
                  View Live
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tour Types Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Tour Types Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Video className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-bright-black">Live Streaming</h3>
                <p className="text-sm text-bright-gray">Real-time guided tours with interaction</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Play className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-bright-black">Recorded Tours</h3>
                <p className="text-sm text-bright-gray">Pre-recorded walkthrough videos</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-bright-black">360° Views</h3>
                <p className="text-sm text-bright-gray">Interactive panoramic experiences</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Headphones className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-bright-black">VR Tours</h3>
                <p className="text-sm text-bright-gray">Immersive virtual reality experiences</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tours Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scheduled" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Scheduled ({scheduledTours.length})
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Live ({liveTours.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Completed ({completedTours.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              All ({tours.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled" className="space-y-4 mt-6">
            <VirtualToursList 
              tours={scheduledTours} 
              onJoinTour={handleJoinTour}
              isClient={false}
            />
          </TabsContent>
          
          <TabsContent value="live" className="space-y-4 mt-6">
            <VirtualToursList 
              tours={liveTours} 
              onJoinTour={handleJoinTour}
              isClient={false}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4 mt-6">
            <VirtualToursList 
              tours={completedTours} 
              onJoinTour={handleJoinTour}
              isClient={false}
            />
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4 mt-6">
            <VirtualToursList 
              tours={tours} 
              onJoinTour={handleJoinTour}
              isClient={false}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VirtualTours;
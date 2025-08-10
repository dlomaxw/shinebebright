import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  X, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff,
  Users,
  MessageSquare,
  Settings,
  Maximize,
  Volume2,
  VolumeX,
  Camera,
  Share,
  Hand
} from "lucide-react";
import { format } from "date-fns";
import type { VirtualTour } from "@shared/schema";

interface VirtualTourViewerProps {
  tourId: string;
  onExit: () => void;
}

const VirtualTourViewer = ({ tourId, onExit }: VirtualTourViewerProps) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: tour } = useQuery<VirtualTour>({
    queryKey: ["/api/virtual-tours", tourId],
  });

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      sender: "Tour Guide",
      message: "Welcome to the virtual tour! Feel free to ask questions.",
      timestamp: new Date().toISOString(),
      isHost: true
    },
    {
      id: "2", 
      sender: "John Doe",
      message: "This looks amazing! Can you show us the kitchen?",
      timestamp: new Date().toISOString(),
      isHost: false
    }
  ]);

  useEffect(() => {
    // Initialize video stream (mock)
    if (videoRef.current && tour?.streamUrl) {
      // In a real implementation, you would connect to the actual stream
      videoRef.current.poster = "/api/placeholder/800/450";
    }
  }, [tour]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      message: chatMessage,
      timestamp: new Date().toISOString(),
      isHost: false
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage("");
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!tour) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-bright-yellow border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">{tour.title}</h1>
          <Badge className="bg-red-600 text-white">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
          </Badge>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Users className="h-4 w-4" />
            {tour.participants?.length || 0} viewers
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowParticipants(!showParticipants)}>
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowChat(!showChat)}>
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
            <Maximize className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onExit}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            poster="/api/placeholder/800/450"
          >
            <source src={tour.streamUrl || ""} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            {/* Left Controls */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={isVideoOn ? "default" : "destructive"}
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="bg-black/50 hover:bg-black/70"
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant={isAudioOn ? "default" : "destructive"}
                onClick={() => setIsAudioOn(!isAudioOn)}
                className="bg-black/50 hover:bg-black/70"
              >
                {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant={handRaised ? "default" : "outline"}
                onClick={() => setHandRaised(!handRaised)}
                className={`bg-black/50 hover:bg-black/70 ${handRaised ? 'bg-bright-yellow text-black' : ''}`}
              >
                <Hand className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Right Controls */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={isRecording ? "destructive" : "outline"}
                onClick={() => setIsRecording(!isRecording)}
                className="bg-black/50 hover:bg-black/70"
              >
                <div className="h-4 w-4 rounded-full bg-red-500" />
                {isRecording && <span className="ml-2">REC</span>}
              </Button>
              <Button size="sm" variant="outline" className="bg-black/50 hover:bg-black/70">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tour Info Overlay */}
          <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg">
            <h3 className="font-semibold mb-1">{tour.title}</h3>
            <p className="text-sm text-gray-300">{tour.description}</p>
            {tour.scheduledAt && (
              <p className="text-xs text-gray-400 mt-1">
                Started: {format(new Date(tour.scheduledAt), "hh:mm a")}
              </p>
            )}
          </div>
        </div>

        {/* Side Panels */}
        <div className="w-80 bg-gray-900 flex flex-col">
          {/* Participants Panel */}
          {showParticipants && (
            <div className="flex-1 border-b border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Participants ({tour.participants?.length || 0})
                </h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {tour.participants?.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-bright-yellow text-bright-black text-xs">
                          {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{participant.name}</div>
                        <div className="text-gray-400 text-xs capitalize">{participant.role}</div>
                      </div>
                      {participant.role === "host" && (
                        <Badge className="bg-bright-yellow text-bright-black text-xs">Host</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Chat Panel */}
          {showChat && (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Live Chat
                </h3>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium ${message.isHost ? 'text-bright-yellow' : 'text-white'}`}>
                          {message.sender}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {format(new Date(message.timestamp), "hh:mm")}
                        </span>
                      </div>
                      <p className="text-gray-300">{message.message}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bright-yellow"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleSendMessage}
                    className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualTourViewer;
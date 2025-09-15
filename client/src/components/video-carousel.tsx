import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";

interface Video {
  id: string;
  title: string;
  url: string;
  embedId: string;
  thumbnail: string;
}

const VideoCarousel = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos: Video[] = [
    {
      id: "1",
      title: "Immersive VR Experience",
      url: "https://youtu.be/eJVDb9imPSQ?si=YFv3ARKpPXvZc8Y1",
      embedId: "eJVDb9imPSQ",
      thumbnail: "https://img.youtube.com/vi/eJVDb9imPSQ/maxresdefault.jpg"
    },
    {
      id: "2", 
      title: "AR Visualization Demo",
      url: "https://youtu.be/H0732NCswuk?si=oH5I4iWaDHbE9-vh",
      embedId: "H0732NCswuk",
      thumbnail: "https://img.youtube.com/vi/H0732NCswuk/maxresdefault.jpg"
    },
    {
      id: "3",
      title: "Property Tour Experience",
      url: "https://youtu.be/v-O3NOg6NQE?si=nF6IJDKC-G59E6DE",
      embedId: "v-O3NOg6NQE",
      thumbnail: "https://img.youtube.com/vi/v-O3NOg6NQE/maxresdefault.jpg"
    },
    {
      id: "4",
      title: "Interactive Design Solution",
      url: "https://youtu.be/lVtxpXOFLws?si=u1Y_YgVR_ibcnAea",
      embedId: "lVtxpXOFLws", 
      thumbnail: "https://img.youtube.com/vi/lVtxpXOFLws/maxresdefault.jpg"
    },
    {
      id: "5",
      title: "Training Simulation Platform",
      url: "https://youtu.be/MsWtobsdzHw?si=hNssFJWAX6vH1Lj6",
      embedId: "MsWtobsdzHw",
      thumbnail: "https://img.youtube.com/vi/MsWtobsdzHw/maxresdefault.jpg"
    },
    {
      id: "6",
      title: "Enterprise VR Solutions",
      url: "https://youtu.be/YjVWdQ4NdFM?si=5dxelP1dvI3MadZw",
      embedId: "YjVWdQ4NdFM",
      thumbnail: "https://img.youtube.com/vi/YjVWdQ4NdFM/maxresdefault.jpg"
    },
    {
      id: "7",
      title: "Advanced VR Technology",
      url: "https://youtu.be/nrjRQ9cVDAc?si=CLfPQceD3tPbwJl_",
      embedId: "nrjRQ9cVDAc",
      thumbnail: "https://img.youtube.com/vi/nrjRQ9cVDAc/maxresdefault.jpg"
    },
    {
      id: "8",
      title: "Immersive AR Solutions",
      url: "https://youtu.be/BXJuMAc3i0k?si=vgCixste9KHnITZi",
      embedId: "BXJuMAc3i0k",
      thumbnail: "https://img.youtube.com/vi/BXJuMAc3i0k/maxresdefault.jpg"
    }
  ];

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToVideo = (index: number) => {
    setCurrentVideo(index);
  };

  return (
    <div className="w-full">
      {/* Main Video Display */}
      <div className="relative mb-8">
        <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${videos[currentVideo].embedId}?autoplay=0&rel=0&modestbranding=1`}
            title={videos[currentVideo].title}
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
        
        {/* Navigation Arrows */}
        <Button
          onClick={prevVideo}
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white border-0"
          data-testid="video-prev-button"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={nextVideo}
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white border-0"
          data-testid="video-next-button"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Video Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-semibold text-lg mb-2">{videos[currentVideo].title}</h3>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-bright-yellow hover:text-yellow-400 hover:bg-white/10 p-0 h-auto"
            >
              <a 
                href={videos[currentVideo].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                data-testid={`video-link-${videos[currentVideo].id}`}
              >
                <ExternalLink className="w-4 h-4" />
                Watch on YouTube
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Video Thumbnails */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`relative cursor-pointer transition-all duration-300 ${
              index === currentVideo
                ? "ring-3 ring-bright-yellow ring-offset-2"
                : "hover:ring-2 hover:ring-bright-yellow/50 hover:ring-offset-1"
            }`}
            onClick={() => goToVideo(index)}
            data-testid={`video-thumbnail-${video.id}`}
          >
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-black ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Counter */}
      <div className="text-center mt-6">
        <span className="text-bright-gray font-medium">
          {currentVideo + 1} of {videos.length}
        </span>
      </div>
    </div>
  );
};

export default VideoCarousel;
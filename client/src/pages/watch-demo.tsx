import { motion } from "framer-motion";
import { Play, Clock, Eye, Calendar } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// YouTube videos data from Shine Bright Properties channel
const videos = [
  {
    id: "1",
    title: "Shine Bright Properties - Company Overview",
    description: "Discover how Shine Bright Properties transforms real estate with innovative technology and exceptional service.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3:45",
    views: "2.5K",
    uploadDate: "1 week ago",
    category: "Company Overview"
  },
  {
    id: "2", 
    title: "Luxury Property Showcase - Kampala",
    description: "Tour our premium properties in Kampala's most prestigious neighborhoods.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "6:30",
    views: "5.2K",
    uploadDate: "2 weeks ago",
    category: "Property Tours"
  },
  {
    id: "3",
    title: "Interior Design Excellence",
    description: "See how our interior design team creates stunning living spaces that inspire.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "4:55",
    views: "3.8K",
    uploadDate: "3 weeks ago",
    category: "Interior Design"
  },
  {
    id: "4",
    title: "VR Technology in Real Estate",
    description: "Experience the future of property viewing with our immersive VR technology.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "5:12",
    views: "4.1K",
    uploadDate: "1 month ago",
    category: "VR Technology"
  },
  {
    id: "5",
    title: "Client Success Stories",
    description: "Hear from our satisfied clients about their property journey with Shine Bright Properties.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "7:20",
    views: "1.9K",
    uploadDate: "1 month ago",
    category: "Testimonials"
  },
  {
    id: "6",
    title: "Behind the Scenes - Photo Shoot",
    description: "Go behind the scenes of our professional property photography and videography process.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "4:33",
    views: "2.7K",
    uploadDate: "2 months ago",
    category: "Behind The Scenes"
  }
];

const categories = ["All", "Company Overview", "Property Tours", "Interior Design", "VR Technology", "Testimonials", "Behind The Scenes"];

interface VideoPlayerProps {
  video: any;
  onClose: () => void;
}

function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video">
          <iframe
            src={video.embedUrl}
            title={video.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-bright-black mb-2">{video.title}</h3>
          <p className="text-gray-600 mb-4">{video.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <Badge className="bg-bright-yellow text-bright-black">
              {video.category}
            </Badge>
            <div className="flex items-center gap-4">
              <span>{video.views} views</span>
              <span>{video.uploadDate}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WatchDemo() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredVideos = activeCategory === "All" 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bright-yellow/5 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-bright-black mb-6">
            Watch Our <span className="text-bright-yellow">Demo Videos</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our collection of property tours, design showcases, and immersive VR experiences. 
            See how Bright Platform transforms the real estate and design industry.
          </p>
          
          {/* YouTube Channel CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-4 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
          >
            <Play className="h-5 w-5" />
            <a 
              href="https://youtube.com/@shinebrightproperties?si=grJE8u4yBy-935v8"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              Visit Our YouTube Channel
            </a>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={activeCategory === category ? "bg-bright-yellow hover:bg-bright-yellow/90 text-bright-black" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Featured Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div 
                className="relative aspect-video bg-gradient-to-br from-bright-yellow/20 to-bright-black/80 flex items-center justify-center cursor-pointer group"
                onClick={() => setSelectedVideo(videos[0])}
              >
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-80 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">Watch Featured Video</h3>
                  <p className="text-lg opacity-90">{videos[0]?.title}</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-bold text-bright-black mb-2">
                  {videos[0]?.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {videos[0]?.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{videos[0]?.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{videos[0]?.uploadDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedVideo(video)}>
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-bright-yellow/20 to-bright-black/60 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {video.duration}
                    </div>
                    <Badge className="absolute top-3 left-3 bg-bright-yellow text-bright-black">
                      {video.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-bright-black mb-2 group-hover:text-bright-yellow transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{video.views} views</span>
                      </div>
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <VideoPlayer 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button 
            size="lg"
            className="bg-bright-yellow hover:bg-bright-yellow/90 text-bright-black font-semibold px-8 py-3"
          >
            Load More Videos
          </Button>
        </motion.div>

        {/* Channel Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 bg-bright-black/5 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-bright-black mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Subscribe to our YouTube channel for the latest property tours, design insights, and VR experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-yellow mb-2">50+</div>
              <div className="text-gray-600">Videos Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-yellow mb-2">10K+</div>
              <div className="text-gray-600">Channel Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-yellow mb-2">500+</div>
              <div className="text-gray-600">Subscribers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
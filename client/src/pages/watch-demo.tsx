import { motion } from "framer-motion";
import { Play, Clock, Eye, Calendar } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Authentic YouTube videos from Shine Bright Properties channel
// Note: Replace with actual video IDs from the channel when available
const videos = [
  {
    id: "1",
    title: "Loading authentic content from Shine Bright Properties YouTube channel...",
    description: "Please wait while we fetch the latest videos from our official YouTube channel.",
    embedUrl: "https://www.youtube.com/embed/placeholder",
    channelUrl: "https://youtube.com/@shinebrightproperties",
    duration: "Loading...",
    views: "Loading...",
    uploadDate: "Loading...",
    category: "Channel Content"
  }
];

// Placeholder for channel integration - will be replaced with real data
const channelInfo = {
  name: "Shine Bright Properties",
  url: "https://youtube.com/@shinebrightproperties",
  description: "Official YouTube channel for Shine Bright Properties - showcasing premium real estate, innovative technology, and exceptional service in Uganda.",
  subscriberCount: "Loading...",
  videoCount: "Loading...",
  totalViews: "Loading..."
};

// Categories for reference - all videos are now directly from the YouTube channel
const videoCategories = [
  "Property Tours", "Interior Design", "VR Technology", 
  "Client Stories", "Behind The Scenes", "Market Insights"
];

export default function WatchDemo() {
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

        {/* YouTube Channel CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <Play className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Visit Our Official YouTube Channel
            </h3>
            <p className="text-lg mb-6 opacity-90">
              All our videos are hosted on YouTube. Click below to watch our latest property tours, VR experiences, and behind-the-scenes content.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
            >
              <a 
                href="https://youtube.com/@shinebrightproperties" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Play className="h-5 w-5 mr-2" />
                Open YouTube Channel
              </a>
            </Button>
          </div>
        </motion.div>

        {/* YouTube Channel Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=UUShinebrightproperties"
                  title="Shine Bright Properties YouTube Channel"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-bold text-bright-black mb-2">
                  Shine Bright Properties - Official Channel
                </h2>
                <p className="text-gray-600 mb-4">
                  Discover our latest property showcases, virtual tours, and behind-the-scenes content directly from our official YouTube channel.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>Channel Views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Updated Regularly</span>
                    </div>
                  </div>
                  <Button 
                    asChild
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <a 
                      href="https://youtube.com/@shinebrightproperties" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Subscribe
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Channel Videos Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-bright-black mb-4">
              Latest Videos from Our Channel
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit our YouTube channel to see all our latest content including property tours, virtual reality experiences, and behind-the-scenes footage.
            </p>
          </div>
          
          {/* Direct Channel Link */}
          <Card className="bg-gradient-to-r from-bright-yellow/10 to-red-50 border-2 border-bright-yellow/20">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <Play className="h-16 w-16 mx-auto mb-4 text-bright-yellow" />
                <h3 className="text-2xl font-bold text-bright-black mb-4">
                  Shine Bright Properties YouTube Channel
                </h3>
                <p className="text-gray-600 mb-6">
                  Watch our complete collection of property tours, design showcases, and virtual reality experiences. 
                  Subscribe to stay updated with our latest content.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                  >
                    <a 
                      href="https://youtube.com/@shinebrightproperties" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Watch on YouTube
                    </a>
                  </Button>
                  <Button 
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-bright-black"
                  >
                    <a 
                      href="https://youtube.com/@shinebrightproperties?sub_confirmation=1" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Subscribe Now
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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

        {/* Video Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-bright-black mb-4">
              Video Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore different types of content on our YouTube channel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Property Tours", description: "Virtual tours of our premium properties", icon: "🏠" },
              { name: "Interior Design", description: "Design inspiration and room makeovers", icon: "🎨" },
              { name: "VR Experiences", description: "Immersive virtual reality property viewing", icon: "🥽" },
              { name: "Client Stories", description: "Success stories from satisfied clients", icon: "💬" },
              { name: "Behind the Scenes", description: "Our team at work and company culture", icon: "🎬" },
              { name: "Market Insights", description: "Real estate market trends and analysis", icon: "📊" }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-bold text-bright-black mb-2 group-hover:text-bright-yellow transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Connect With Us on YouTube
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow our journey as we showcase Uganda's finest properties and share our expertise in real estate and design.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-yellow mb-2">Premium</div>
              <div className="text-gray-600">Quality Content</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-yellow mb-2">Latest</div>
              <div className="text-gray-600">Property Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-yellow mb-2">Expert</div>
              <div className="text-gray-600">Market Insights</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
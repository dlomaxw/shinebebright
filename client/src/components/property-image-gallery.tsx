import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Share2, 
  X,
  Maximize,
  Grid,
  Play,
  Pause
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPropertyImage } from "@/assets/properties";

interface PropertyImageGalleryProps {
  propertyId: string;
  images: string[];
  title: string;
  className?: string;
}

export function PropertyImageGallery({ propertyId, images, title, className }: PropertyImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [isPanEnabled, setIsPanEnabled] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Auto-slideshow functionality
  useEffect(() => {
    if (!isSlideshow || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isSlideshow, images.length]);

  // Reset zoom and pan when changing images
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
    setIsPanEnabled(false);
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 5));
    if (zoom >= 1) setIsPanEnabled(true);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 0.5, 1);
    setZoom(newZoom);
    if (newZoom <= 1) {
      setIsPanEnabled(false);
      setPanPosition({ x: 0, y: 0 });
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPanEnabled) return;
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanEnabled || !dragStart) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleShare = async () => {
    const currentImageUrl = getPropertyImage(images[currentIndex]);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - Image ${currentIndex + 1}`,
          text: `Check out this property image from ${title}`,
          url: currentImageUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(currentImageUrl);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = getPropertyImage(images[currentIndex]);
    link.download = `${title.replace(/\s+/g, '_')}_image_${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!images || images.length === 0) {
    return (
      <Card className={cn("relative aspect-video bg-gray-100 flex items-center justify-center", className)}>
        <div className="text-center text-gray-500">
          <Grid className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No images available</p>
        </div>
      </Card>
    );
  }

  const MainGallery = () => (
    <div className="relative group">
      {/* Main Image Display */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <img
          src={getPropertyImage(images[currentIndex])}
          alt={`${title} - Image ${currentIndex + 1}`}
          className={cn(
            "w-full h-full object-cover transition-all duration-300 cursor-grab",
            isPanEnabled && "cursor-move"
          )}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setDragStart({ x: 0, y: 0 })}
          draggable={false}
        />
        
        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Control Panel */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-white text-sm px-2">{Math.round(zoom * 100)}%</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={handleZoomIn}
            disabled={zoom >= 5}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-white/30 mx-1" />
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={handleRotate}
          >
            <RotateCw className="w-4 h-4" />
          </Button>
          {images.length > 1 && (
            <>
              <div className="w-px h-6 bg-white/30 mx-1" />
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setIsSlideshow(!isSlideshow)}
              >
                {isSlideshow ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </>
          )}
          <div className="w-px h-6 bg-white/30 mx-1" />
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
          </Button>
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-0">
              <div className="relative w-full h-[95vh]">
                <img
                  src={getPropertyImage(images[currentIndex])}
                  alt={`${title} - Image ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                  onClick={() => setIsFullscreen(false)}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Slideshow indicator */}
        {isSlideshow && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-red-500 text-white animate-pulse">
              SLIDESHOW
            </Badge>
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                index === currentIndex 
                  ? "border-bright-yellow ring-2 ring-bright-yellow/50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={getPropertyImage(image)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={className}>
      <MainGallery />
    </div>
  );
}
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

const categoryColors = {
  'real-estate': 'bg-blue-100 text-blue-800',
  'architecture': 'bg-green-100 text-green-800',
  'interior-design': 'bg-purple-100 text-purple-800',
  'media': 'bg-red-100 text-red-800',
  'training': 'bg-orange-100 text-orange-800',
  'technology': 'bg-indigo-100 text-indigo-800',
};

const categoryLabels = {
  'real-estate': 'Real Estate',
  'architecture': 'Architecture',
  'interior-design': 'Interior Design',
  'media': 'Media',
  'training': 'Training',
  'technology': 'Technology',
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const categoryColor = categoryColors[project.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
  const categoryLabel = categoryLabels[project.category as keyof typeof categoryLabels] || project.category;

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative group">
        <img
          src={project.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {project.videoUrl ? (
            <Button className="bg-bright-yellow text-bright-black px-6 py-2 rounded-lg font-semibold flex items-center">
              <Play className="w-4 h-4 mr-2" /> Watch Tour
            </Button>
          ) : (
            <Button className="bg-bright-yellow text-bright-black px-6 py-2 rounded-lg font-semibold flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" /> View Details
            </Button>
          )}
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-bright-black mb-2">{project.title}</h3>
        <p className="text-bright-gray mb-4 line-clamp-2">{project.description}</p>
        {project.location && (
          <p className="text-sm text-bright-gray mb-4">📍 {project.location}</p>
        )}
        <div className="flex items-center justify-between">
          <Badge className={categoryColor}>
            {categoryLabel}
          </Badge>
          {project.price && (
            <span className="text-lg font-bold text-bright-black">
              ${project.price.toLocaleString()}
            </span>
          )}
        </div>
        {(project.bedrooms || project.bathrooms || project.area) && (
          <div className="flex justify-between text-sm text-bright-gray mt-3 pt-3 border-t">
            {project.bedrooms && <span>{project.bedrooms} beds</span>}
            {project.bathrooms && <span>{project.bathrooms} baths</span>}
            {project.area && <span>{project.area} sq ft</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

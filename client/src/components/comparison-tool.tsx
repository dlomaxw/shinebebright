import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus, Download, RefreshCw } from "lucide-react";
import type { Project } from "@shared/schema";

interface ComparisonToolProps {
  selectedProjects: Project[];
  onRemoveProject: (projectId: string) => void;
  onClearAll: () => void;
}

const ComparisonTool = ({ selectedProjects, onRemoveProject, onClearAll }: ComparisonToolProps) => {
  const generateReport = () => {
    // This would typically generate a PDF or downloadable report
    alert("Comparison report would be generated and downloaded");
  };

  const emptySlots = Array(4 - selectedProjects.length).fill(null);

  return (
    <div className="bg-bright-light rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Selected Projects */}
        {selectedProjects.map((project) => (
          <Card key={project.id} className="bg-white rounded-lg shadow-md">
            <div className="relative">
              <img
                src={project.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                onClick={() => onRemoveProject(project.id)}
              >
                <X className="w-4 h-4 text-bright-gray" />
              </Button>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-bright-black mb-2">{project.title}</h3>
              <div className="space-y-2 text-sm text-bright-gray">
                {project.price && (
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold">${project.price.toLocaleString()}</span>
                  </div>
                )}
                {project.bedrooms && (
                  <div className="flex justify-between">
                    <span>Bedrooms:</span>
                    <span className="font-semibold">{project.bedrooms}</span>
                  </div>
                )}
                {project.bathrooms && (
                  <div className="flex justify-between">
                    <span>Bathrooms:</span>
                    <span className="font-semibold">{project.bathrooms}</span>
                  </div>
                )}
                {project.area && (
                  <div className="flex justify-between">
                    <span>Area:</span>
                    <span className="font-semibold">{project.area} sq ft</span>
                  </div>
                )}
                {project.location && (
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-semibold">{project.location}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-semibold capitalize">{project.category.replace('-', ' ')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty Slots */}
        {emptySlots.map((_, index) => (
          <Card key={`empty-${index}`} className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300">
            <CardContent className="flex flex-col items-center justify-center min-h-[300px] p-6">
              <Plus className="w-12 h-12 text-bright-gray mb-4" />
              <h3 className="text-lg font-semibold text-bright-gray mb-2">Add Property</h3>
              <p className="text-bright-gray text-center text-sm">
                Select up to {4 - selectedProjects.length} more {4 - selectedProjects.length === 1 ? 'property' : 'properties'} to compare
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Comparison Actions */}
      {selectedProjects.length > 0 && (
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            onClick={generateReport}
            className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold"
            disabled={selectedProjects.length < 2}
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button
            variant="outline"
            onClick={onClearAll}
            className="border-bright-gray text-bright-gray hover:border-bright-black hover:text-bright-black"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      )}

      {selectedProjects.length < 2 && selectedProjects.length > 0 && (
        <div className="text-center mt-4">
          <p className="text-bright-gray text-sm">
            Add at least 2 properties to generate a comparison report
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;

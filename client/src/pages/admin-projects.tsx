import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Project, InsertProject } from "@/../../shared/schema";

const categories = [
  "Graphics Design and Animation",
  "Branding", 
  "Content Marketing",
  "Social Media Handling",
  "Website Design and Development",
  "Videography and Photography"
];

const AdminProjects = () => {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [formData, setFormData] = useState<Partial<InsertProject>>({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    videoUrl: "",
    status: "active",
    featured: false
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch existing projects
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Add project mutation
  const addProjectMutation = useMutation({
    mutationFn: (projectData: InsertProject) => 
      apiRequest('POST', '/api/projects', projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setFormData({
        title: "",
        description: "",
        category: "",
        imageUrl: "",
        videoUrl: "",
        status: "active",
        featured: false
      });
      setIsAddingProject(false);
      toast({
        title: "Success",
        description: "Project added successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add project",
        variant: "destructive",
      });
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: (projectId: string) => 
      apiRequest('DELETE', `/api/projects/${projectId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success",
        description: "Project deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addProjectMutation.mutate(formData as InsertProject);
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProjectMutation.mutate(projectId);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-bright-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-bright-black mb-4">
            Admin - Manage Projects
          </h1>
          <p className="text-xl text-bright-gray">
            Add your Instagram projects and manage your portfolio
          </p>
        </div>

        {/* Add New Project Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Add New Instagram Project
              <Button
                onClick={() => setIsAddingProject(!isAddingProject)}
                variant={isAddingProject ? "outline" : "default"}
                className={isAddingProject ? "" : "bg-bright-yellow text-bright-black hover:bg-yellow-400"}
              >
                <Plus className="w-4 h-4 mr-2" />
                {isAddingProject ? "Cancel" : "Add Project"}
              </Button>
            </CardTitle>
          </CardHeader>
          {isAddingProject && (
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter project title"
                      required
                      data-testid="input-project-title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the project..."
                    rows={3}
                    data-testid="textarea-description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl || ""}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      type="url"
                      data-testid="input-image-url"
                    />
                  </div>
                  <div>
                    <Label htmlFor="videoUrl">Video URL (optional)</Label>
                    <Input
                      id="videoUrl"
                      value={formData.videoUrl || ""}
                      onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                      placeholder="https://example.com/video or Instagram link"
                      type="url"
                      data-testid="input-video-url"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-4 h-4 text-bright-yellow bg-gray-100 border-gray-300 rounded focus:ring-bright-yellow"
                    data-testid="checkbox-featured"
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>

                <Button 
                  type="submit" 
                  disabled={addProjectMutation.isPending}
                  className="w-full bg-bright-yellow text-bright-black hover:bg-yellow-400"
                  data-testid="button-add-project"
                >
                  {addProjectMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding Project...
                    </>
                  ) : (
                    "Add Project"
                  )}
                </Button>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Existing Projects */}
        <div>
          <h2 className="text-2xl font-bold text-bright-black mb-6">
            Current Projects ({projects.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-bright-yellow mx-auto mb-4" />
              <p className="text-bright-gray">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-bright-gray text-lg mb-4">
                No projects added yet
              </p>
              <p className="text-bright-gray">
                Add your first Instagram project using the form above
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.imageUrl || `/api/placeholder/400/300?text=${encodeURIComponent(project.title)}`}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/api/placeholder/400/300?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    {project.videoUrl && (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 p-2 bg-bright-yellow text-bright-black rounded-full hover:scale-110 transition-transform"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-bright-yellow/10 text-bright-black">
                        {project.category}
                      </Badge>
                      {project.featured && (
                        <Badge className="bg-bright-yellow text-bright-black">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-bright-black mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-bright-gray text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded ${
                        project.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                      <Button
                        onClick={() => handleDelete(project.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                        disabled={deleteProjectMutation.isPending}
                        data-testid={`delete-project-${project.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <Card className="mt-12 bg-bright-yellow/10 border-bright-yellow/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-bright-black mb-4">
              📸 How to add your Instagram projects:
            </h3>
            <ol className="space-y-2 text-bright-gray">
              <li>1. Visit your Instagram account: <strong>@brightpropertiesug</strong></li>
              <li>2. Copy the image URL from your posts (right-click → Copy image address)</li>
              <li>3. For videos, you can link to the Instagram post URL</li>
              <li>4. Choose the appropriate category for each project</li>
              <li>5. Mark your best work as "Featured" to highlight it</li>
              <li>6. Add descriptions to provide context about each project</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProjects;
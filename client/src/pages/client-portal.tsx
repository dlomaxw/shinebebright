import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FolderOpen, 
  MessageSquare, 
  Video, 
  Calendar, 
  Users, 
  FileText,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  PlayCircle
} from "lucide-react";
import { format } from "date-fns";
import ProjectMessages from "@/components/client-portal/project-messages";
import ProjectFiles from "@/components/client-portal/project-files";
import ProjectTimeline from "@/components/client-portal/project-timeline";
import VirtualToursList from "@/components/virtual-tours/virtual-tours-list";
import type { ClientProject, VirtualTour } from "@shared/schema";

const ClientPortal = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Mock client ID - in a real app, this would come from authentication
  const clientId = "client-123";

  const { data: projects = [], isLoading } = useQuery<ClientProject[]>({
    queryKey: ["/api/client-projects", clientId],
  });

  const { data: virtualTours = [] } = useQuery<VirtualTour[]>({
    queryKey: ["/api/virtual-tours", "client", clientId],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "review": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "cancelled": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bright-black mb-2">Client Portal</h1>
          <p className="text-bright-gray">Track your projects, communicate with the team, and manage deliverables</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-bright-yellow/10 rounded-lg">
                  <FolderOpen className="h-6 w-6 text-bright-yellow" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-bright-black">{projects.length}</p>
                  <p className="text-sm text-bright-gray">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-bright-black">{virtualTours.length}</p>
                  <p className="text-sm text-bright-gray">Virtual Tours</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-bright-black">
                    {projects.filter(p => p.status === "completed").length}
                  </p>
                  <p className="text-sm text-bright-gray">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-bright-black">
                    {projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length || 0}%
                  </p>
                  <p className="text-sm text-bright-gray">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List or Project Detail */}
        {!activeProject ? (
          <div className="space-y-6">
            {/* Projects Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
                <CardDescription>Manage and track all your ongoing projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="border border-gray-200 hover:border-bright-yellow transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-bright-black">{project.title}</h3>
                          <Badge className={getStatusColor(project.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(project.status)}
                              {project.status}
                            </div>
                          </Badge>
                        </div>
                        
                        <p className="text-bright-gray text-sm mb-4 line-clamp-2">{project.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-bright-gray">Progress</span>
                              <span className="text-bright-black font-medium">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-bright-gray" />
                              <span className="text-bright-gray">
                                {project.expectedEndDate ? format(new Date(project.expectedEndDate), "MMM dd") : "No date"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-bright-gray" />
                              <span className="text-bright-gray">{project.team?.length || 0} members</span>
                            </div>
                          </div>
                          
                          {project.budget && (
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4 text-bright-gray" />
                              <span className="text-bright-gray">
                                ${((project.spent || 0) / 100).toLocaleString()} / ${(project.budget / 100).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => setActiveProject(project.id)}
                          className="w-full mt-4 bg-bright-yellow text-bright-black hover:bg-yellow-400"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {projects.length === 0 && (
                  <div className="text-center py-12">
                    <FolderOpen className="h-12 w-12 text-bright-gray mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-bright-black mb-2">No Projects Yet</h3>
                    <p className="text-bright-gray mb-4">Start your first project with us</p>
                    <Button className="bg-bright-yellow text-bright-black hover:bg-yellow-400">
                      Book a Service
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Virtual Tours Section */}
            {virtualTours.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Virtual Tours
                  </CardTitle>
                  <CardDescription>Access your scheduled and completed virtual tours</CardDescription>
                </CardHeader>
                <CardContent>
                  <VirtualToursList tours={virtualTours} isClient={true} />
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          // Project Detail View
          <ProjectDetailView 
            projectId={activeProject} 
            onBack={() => setActiveProject(null)} 
          />
        )}
      </div>
    </div>
  );
};

// Project Detail Component
const ProjectDetailView = ({ projectId, onBack }: { projectId: string; onBack: () => void }) => {
  const { data: project } = useQuery<ClientProject>({
    queryKey: ["/api/client-projects", projectId],
  });

  if (!project) {
    return <div>Loading project details...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2">
            ← Back to Projects
          </Button>
          <h1 className="text-2xl font-bold text-bright-black">{project.title}</h1>
          <p className="text-bright-gray">{project.description}</p>
        </div>
        <Badge className={`${getStatusColor(project.status)} px-4 py-2`}>
          {project.status}
        </Badge>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-black mb-2">{project.progress}%</div>
              <div className="text-bright-gray">Progress</div>
              <Progress value={project.progress} className="mt-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-black mb-2">
                ${project.budget ? (project.budget / 100).toLocaleString() : '0'}
              </div>
              <div className="text-bright-gray">Budget</div>
              <div className="text-sm text-bright-gray mt-1">
                ${project.spent ? (project.spent / 100).toLocaleString() : '0'} spent
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-black mb-2">
                {project.expectedEndDate ? format(new Date(project.expectedEndDate), "MMM dd") : 'TBD'}
              </div>
              <div className="text-bright-gray">Target Date</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Details Tabs */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="space-y-4">
          <ProjectTimeline project={project} />
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4">
          <ProjectMessages projectId={project.id} />
        </TabsContent>
        
        <TabsContent value="files" className="space-y-4">
          <ProjectFiles project={project} />
        </TabsContent>
        
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bright-yellow rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-bright-black" />
                  </div>
                  <div>
                    <div className="font-medium">{project.projectManager || "Not assigned"}</div>
                    <div className="text-sm text-bright-gray">Project Manager</div>
                  </div>
                </div>
                
                {project.team?.map((memberId, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">Team Member {index + 1}</div>
                      <div className="text-sm text-bright-gray">Developer</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function getStatusColor(status: string): string {
  switch (status) {
    case "planning": return "bg-blue-100 text-blue-800";
    case "in-progress": return "bg-yellow-100 text-yellow-800";
    case "review": return "bg-purple-100 text-purple-800";
    case "completed": return "bg-green-100 text-green-800";
    case "cancelled": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export default ClientPortal;
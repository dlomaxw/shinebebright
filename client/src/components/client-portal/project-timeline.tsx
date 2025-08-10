import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Calendar,
  Target,
  TrendingUp
} from "lucide-react";
import { format } from "date-fns";
import type { ClientProject } from "@shared/schema";

interface ProjectTimelineProps {
  project: ClientProject;
}

const ProjectTimeline = ({ project }: ProjectTimelineProps) => {
  const milestones = project.milestones || [];
  
  const completedMilestones = milestones.filter(m => m.completed).length;
  const totalMilestones = milestones.length;
  const milestoneProgress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Timeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-bright-black">{totalMilestones}</div>
                <div className="text-sm text-bright-gray">Total Milestones</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-bright-black">{completedMilestones}</div>
                <div className="text-sm text-bright-gray">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-bright-black">{Math.round(milestoneProgress)}%</div>
                <div className="text-sm text-bright-gray">Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Project Completion</span>
                <span className="text-bright-black">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-bright-gray" />
                <span className="text-bright-gray">Started:</span>
                <span className="font-medium">
                  {project.startDate ? format(new Date(project.startDate), "MMM dd, yyyy") : "Not started"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-bright-gray" />
                <span className="text-bright-gray">Target:</span>
                <span className="font-medium">
                  {project.expectedEndDate ? format(new Date(project.expectedEndDate), "MMM dd, yyyy") : "No deadline"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Project Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          {milestones.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-bright-gray mx-auto mb-4" />
              <h3 className="text-lg font-medium text-bright-black mb-2">No milestones defined</h3>
              <p className="text-bright-gray">Milestones will be added as your project progresses</p>
            </div>
          ) : (
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex gap-4">
                  {/* Timeline Connector */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      milestone.completed 
                        ? 'bg-green-100 border-2 border-green-500' 
                        : 'bg-gray-100 border-2 border-gray-300'
                    }`}>
                      {milestone.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className={`w-0.5 h-16 mt-2 ${
                        milestone.completed ? 'bg-green-200' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                  
                  {/* Milestone Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-bright-black">{milestone.title}</h3>
                      <Badge className={milestone.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {milestone.completed ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    
                    {milestone.description && (
                      <p className="text-bright-gray text-sm mb-2">{milestone.description}</p>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-bright-gray">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {format(new Date(milestone.dueDate), "MMM dd, yyyy")}</span>
                      {milestone.completed && (
                        <Badge variant="outline" className="text-xs">
                          ✓ Done
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Phases */}
      <Card>
        <CardHeader>
          <CardTitle>Project Phases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { phase: "Planning", status: "completed", progress: 100 },
              { phase: "Design", status: project.progress > 25 ? "in-progress" : "pending", progress: Math.max(0, Math.min(100, (project.progress - 25) * 4)) },
              { phase: "Development", status: project.progress > 50 ? "in-progress" : "pending", progress: Math.max(0, Math.min(100, (project.progress - 50) * 4)) },
              { phase: "Delivery", status: project.progress > 75 ? "in-progress" : "pending", progress: Math.max(0, Math.min(100, (project.progress - 75) * 4)) },
            ].map((phase) => (
              <Card key={phase.phase} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      phase.status === "completed" ? "bg-green-100" :
                      phase.status === "in-progress" ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      {phase.status === "completed" ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : phase.status === "in-progress" ? (
                        <Clock className="h-6 w-6 text-blue-600" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <h3 className="font-medium text-bright-black mb-1">{phase.phase}</h3>
                    <div className="text-sm text-bright-gray mb-2">{Math.round(phase.progress)}%</div>
                    <Progress value={phase.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectTimeline;
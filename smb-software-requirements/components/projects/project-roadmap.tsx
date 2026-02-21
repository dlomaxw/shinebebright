"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

type Milestone = {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: "completed" | "in-progress" | "upcoming" | "delayed"
  tasks: {
    total: number
    completed: number
  }
}

const mockRoadmap: Record<string, Milestone[]> = {
  "1": [
    {
      id: "milestone-1",
      title: "Discovery & Planning",
      description: "Project kickoff, requirements gathering, and initial planning",
      startDate: "2023-01-15",
      endDate: "2023-01-30",
      status: "completed",
      tasks: {
        total: 8,
        completed: 8,
      },
    },
    {
      id: "milestone-2",
      title: "Design Phase",
      description: "Wireframing, UI design, and design approval",
      startDate: "2023-02-01",
      endDate: "2023-02-28",
      status: "completed",
      tasks: {
        total: 12,
        completed: 12,
      },
    },
    {
      id: "milestone-3",
      title: "Development Phase 1",
      description: "Frontend development, core functionality implementation",
      startDate: "2023-03-01",
      endDate: "2023-04-15",
      status: "completed",
      tasks: {
        total: 20,
        completed: 20,
      },
    },
    {
      id: "milestone-4",
      title: "Development Phase 2",
      description: "Backend integration, API development, and CRM integration",
      startDate: "2023-04-16",
      endDate: "2023-05-31",
      status: "in-progress",
      tasks: {
        total: 18,
        completed: 10,
      },
    },
    {
      id: "milestone-5",
      title: "Testing & QA",
      description: "Quality assurance, bug fixing, and performance optimization",
      startDate: "2023-06-01",
      endDate: "2023-06-15",
      status: "upcoming",
      tasks: {
        total: 15,
        completed: 0,
      },
    },
    {
      id: "milestone-6",
      title: "Launch & Deployment",
      description: "Final deployment, launch activities, and post-launch support",
      startDate: "2023-06-16",
      endDate: "2023-06-30",
      status: "upcoming",
      tasks: {
        total: 10,
        completed: 0,
      },
    },
  ],
}

type ProjectRoadmapProps = {
  projectId: string
}

export function ProjectRoadmap({ projectId }: ProjectRoadmapProps) {
  const roadmap = mockRoadmap[projectId] || []

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "upcoming":
        return <Clock className="h-5 w-5 text-gray-500" />
      case "delayed":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "upcoming":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      case "delayed":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Roadmap</CardTitle>
        <CardDescription>Timeline and milestones for project completion</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {roadmap.map((milestone, index) => (
            <div key={milestone.id} className="relative pb-8">
              {/* Timeline connector */}
              {index < roadmap.length - 1 && (
                <div
                  className={`absolute left-6 top-8 h-full w-0.5 ${
                    milestone.status === "completed" ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background">
                  {getStatusIcon(milestone.status)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium">{milestone.title}</h4>
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span>
                        {milestone.startDate} to {milestone.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Tasks:</span>
                      <span>
                        {milestone.tasks.completed}/{milestone.tasks.total} completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

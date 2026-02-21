"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { ProjectTasks } from "@/components/projects/project-tasks"
import { ProjectRoadmap } from "@/components/projects/project-roadmap"

type ProjectDetailsProps = {
  projectId: string
  onBack: () => void
}

export function ProjectDetails({ projectId, onBack }: ProjectDetailsProps) {
  // In a real app, you would fetch the project details based on the ID
  const project = {
    id: projectId,
    name: "Website Redesign",
    client: "Acme Corp",
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    status: "active",
    progress: 65,
    budget: "$24,000",
    spent: "$15,600",
    description:
      "Complete redesign of Acme Corp's corporate website with focus on improved user experience, mobile responsiveness, and integration with their CRM system.",
    team: [
      { name: "John Doe", role: "Project Manager", avatar: "/placeholder.svg?height=32&width=32", initials: "JD" },
      { name: "Sarah Johnson", role: "UI/UX Designer", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
      {
        name: "Michael Brown",
        role: "Frontend Developer",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
      { name: "Emily Davis", role: "Backend Developer", avatar: "/placeholder.svg?height=32&width=32", initials: "ED" },
      { name: "Robert Wilson", role: "QA Tester", avatar: "/placeholder.svg?height=32&width=32", initials: "RW" },
    ],
    milestones: [
      { title: "Project Kickoff", date: "2023-01-20", completed: true },
      { title: "Design Approval", date: "2023-02-28", completed: true },
      { title: "Development Phase 1", date: "2023-04-15", completed: true },
      { title: "Beta Launch", date: "2023-05-01", completed: false },
      { title: "Final Delivery", date: "2023-06-30", completed: false },
    ],
    risks: [
      { title: "Integration Challenges", severity: "medium", mitigation: "Early testing with CRM API" },
      { title: "Timeline Constraints", severity: "high", mitigation: "Additional resources allocated" },
      { title: "Scope Creep", severity: "low", mitigation: "Strict change management process" },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "on-hold":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-muted-foreground">
            Client: {project.client} • {project.startDate} to {project.endDate}
          </p>
        </div>
        <Badge className={`ml-auto ${getStatusColor(project.status)}`}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Budget</p>
              <p>{project.budget}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Spent</p>
              <p>{project.spent}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Timeline</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p>
                  {project.startDate} to {project.endDate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.team.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-3">
                  {milestone.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium">{milestone.title}</p>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="risks">Risks & Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <ProjectTasks projectId={projectId} />
        </TabsContent>
        <TabsContent value="roadmap" className="space-y-4">
          <ProjectRoadmap projectId={projectId} />
        </TabsContent>
        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risks & Issues</CardTitle>
              <CardDescription>Identified risks and mitigation strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.risks.map((risk, index) => (
                  <div key={index} className="flex items-start justify-between rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{risk.title}</p>
                        <p className="text-sm text-muted-foreground">Mitigation: {risk.mitigation}</p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(risk.severity)}>
                      {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

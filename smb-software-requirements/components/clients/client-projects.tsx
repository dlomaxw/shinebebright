"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

type Project = {
  id: string
  name: string
  startDate: string
  endDate: string
  status: "active" | "completed" | "on-hold" | "cancelled"
  progress: number
  budget: string
  team: {
    name: string
    avatar?: string
    initials: string
  }[]
}

type ClientProjectsProps = {
  clientId: string
}

export function ClientProjects({ clientId }: ClientProjectsProps) {
  // In a real app, you would fetch projects based on the client ID
  const projects: Project[] = [
    {
      id: "1",
      name: "Website Redesign",
      startDate: "2023-01-15",
      endDate: "2023-06-30",
      status: "active",
      progress: 65,
      budget: "$24,000",
      team: [
        { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", initials: "JD" },
        { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
        { name: "Michael Brown", avatar: "/placeholder.svg?height=32&width=32", initials: "MB" },
      ],
    },
    {
      id: "2",
      name: "Digital Marketing Campaign",
      startDate: "2023-03-01",
      endDate: "2023-08-31",
      status: "active",
      progress: 40,
      budget: "$18,000",
      team: [
        { name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "ED" },
        { name: "Robert Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "RW" },
      ],
    },
    {
      id: "3",
      name: "SEO Optimization",
      startDate: "2023-06-01",
      endDate: "2023-12-31",
      status: "on-hold",
      progress: 10,
      budget: "$8,500",
      team: [{ name: "Jennifer Lee", avatar: "/placeholder.svg?height=32&width=32", initials: "JL" }],
    },
  ]

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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Projects</CardTitle>
          <CardDescription>Projects for this client</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status === "on-hold"
                      ? "On Hold"
                      : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription>
                  {project.startDate} to {project.endDate}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Budget</span>
                  <span className="text-sm">{project.budget}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Team</div>
                  <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                      <Avatar key={i} className="border-2 border-background h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

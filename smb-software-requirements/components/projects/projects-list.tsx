"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Project = {
  id: string
  name: string
  client: string
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

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    client: "Acme Corp",
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
    name: "Mobile App Development",
    client: "TechSoft Inc",
    startDate: "2023-02-01",
    endDate: "2023-08-15",
    status: "active",
    progress: 40,
    budget: "$45,000",
    team: [
      { name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "ED" },
      { name: "Robert Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "RW" },
      { name: "Jennifer Lee", avatar: "/placeholder.svg?height=32&width=32", initials: "JL" },
      { name: "David Chen", avatar: "/placeholder.svg?height=32&width=32", initials: "DC" },
    ],
  },
  {
    id: "3",
    name: "Brand Identity Refresh",
    client: "Global Industries",
    startDate: "2023-03-10",
    endDate: "2023-05-20",
    status: "completed",
    progress: 100,
    budget: "$18,500",
    team: [
      { name: "Jessica Taylor", avatar: "/placeholder.svg?height=32&width=32", initials: "JT" },
      { name: "Andrew Martin", avatar: "/placeholder.svg?height=32&width=32", initials: "AM" },
    ],
  },
  {
    id: "4",
    name: "E-commerce Platform",
    client: "Retail Solutions",
    startDate: "2023-01-05",
    endDate: "2023-07-30",
    status: "on-hold",
    progress: 35,
    budget: "$62,000",
    team: [
      { name: "Thomas Anderson", avatar: "/placeholder.svg?height=32&width=32", initials: "TA" },
      { name: "Michelle Wong", avatar: "/placeholder.svg?height=32&width=32", initials: "MW" },
      { name: "Kevin Smith", avatar: "/placeholder.svg?height=32&width=32", initials: "KS" },
    ],
  },
  {
    id: "5",
    name: "CRM Implementation",
    client: "Sales Force Co",
    startDate: "2023-04-01",
    endDate: "2023-09-30",
    status: "active",
    progress: 25,
    budget: "$38,000",
    team: [
      { name: "Patricia Garcia", avatar: "/placeholder.svg?height=32&width=32", initials: "PG" },
      { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "JW" },
    ],
  },
]

type ProjectsListProps = {
  status?: "active" | "completed" | "on-hold" | "cancelled"
  onSelectProject: (id: string) => void
}

export function ProjectsList({ status, onSelectProject }: ProjectsListProps) {
  const filteredProjects = status ? mockProjects.filter((project) => project.status === status) : mockProjects

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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription>{project.client}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onSelectProject(project.id)}>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Project</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(project.status)}>
                {project.status === "on-hold"
                  ? "On Hold"
                  : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              <div className="text-sm text-muted-foreground">{project.budget}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {project.startDate} - {project.endDate}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member, i) => (
                  <Avatar key={i} className="border-2 border-background h-8 w-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                ))}
                {project.team.length > 3 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={() => onSelectProject(project.id)}>
                View Project
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Milestone = {
  id: string
  title: string
  description: string
  project: string
  startDate: string
  endDate: string
  status: "completed" | "in-progress" | "upcoming" | "delayed"
  owner: {
    name: string
    avatar?: string
    initials: string
  }
  quarter: "Q1" | "Q2" | "Q3" | "Q4"
  dependencies?: string[]
}

const mockMilestones: Milestone[] = [
  {
    id: "milestone-1",
    title: "Website Redesign - Discovery & Planning",
    description: "Project kickoff, requirements gathering, and initial planning",
    project: "Website Redesign",
    startDate: "2023-04-01",
    endDate: "2023-04-15",
    status: "completed",
    owner: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    quarter: "Q2",
  },
  {
    id: "milestone-2",
    title: "Website Redesign - Design Phase",
    description: "Wireframing, UI design, and design approval",
    project: "Website Redesign",
    startDate: "2023-04-16",
    endDate: "2023-05-15",
    status: "completed",
    owner: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    quarter: "Q2",
    dependencies: ["milestone-1"],
  },
  {
    id: "milestone-3",
    title: "Website Redesign - Development Phase",
    description: "Frontend and backend development",
    project: "Website Redesign",
    startDate: "2023-05-16",
    endDate: "2023-07-15",
    status: "in-progress",
    owner: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    quarter: "Q2",
    dependencies: ["milestone-2"],
  },
  {
    id: "milestone-4",
    title: "Website Redesign - Testing & Launch",
    description: "QA testing, bug fixes, and website launch",
    project: "Website Redesign",
    startDate: "2023-07-16",
    endDate: "2023-08-15",
    status: "upcoming",
    owner: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    quarter: "Q3",
    dependencies: ["milestone-3"],
  },
  {
    id: "milestone-5",
    title: "Mobile App - Requirements & Design",
    description: "Requirements gathering and UI/UX design",
    project: "Mobile App Development",
    startDate: "2023-05-01",
    endDate: "2023-06-15",
    status: "completed",
    owner: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    quarter: "Q2",
  },
  {
    id: "milestone-6",
    title: "Mobile App - Development Phase 1",
    description: "Core functionality development",
    project: "Mobile App Development",
    startDate: "2023-06-16",
    endDate: "2023-08-15",
    status: "in-progress",
    owner: {
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RW",
    },
    quarter: "Q3",
    dependencies: ["milestone-5"],
  },
  {
    id: "milestone-7",
    title: "Mobile App - Development Phase 2",
    description: "Additional features and integrations",
    project: "Mobile App Development",
    startDate: "2023-08-16",
    endDate: "2023-10-15",
    status: "upcoming",
    owner: {
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RW",
    },
    quarter: "Q3",
    dependencies: ["milestone-6"],
  },
  {
    id: "milestone-8",
    title: "Mobile App - Testing & Launch",
    description: "Beta testing, bug fixes, and app store submission",
    project: "Mobile App Development",
    startDate: "2023-10-16",
    endDate: "2023-11-30",
    status: "upcoming",
    owner: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    quarter: "Q4",
    dependencies: ["milestone-7"],
  },
  {
    id: "milestone-9",
    title: "E-commerce Platform - Planning",
    description: "Requirements gathering and platform selection",
    project: "E-commerce Platform",
    startDate: "2023-07-01",
    endDate: "2023-07-31",
    status: "delayed",
    owner: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    quarter: "Q3",
  },
  {
    id: "milestone-10",
    title: "E-commerce Platform - Implementation",
    description: "Platform setup, customization, and product catalog",
    project: "E-commerce Platform",
    startDate: "2023-08-01",
    endDate: "2023-09-30",
    status: "upcoming",
    owner: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    quarter: "Q3",
    dependencies: ["milestone-9"],
  },
  {
    id: "milestone-11",
    title: "E-commerce Platform - Launch",
    description: "Final testing, payment gateway integration, and launch",
    project: "E-commerce Platform",
    startDate: "2023-10-01",
    endDate: "2023-10-31",
    status: "upcoming",
    owner: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    quarter: "Q4",
    dependencies: ["milestone-10"],
  },
  {
    id: "milestone-12",
    title: "Brand Identity - Research & Concepts",
    description: "Market research, competitor analysis, and initial concepts",
    project: "Brand Identity Refresh",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    status: "upcoming",
    owner: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    quarter: "Q3",
  },
  {
    id: "milestone-13",
    title: "Brand Identity - Design & Guidelines",
    description: "Logo design, color palette, typography, and brand guidelines",
    project: "Brand Identity Refresh",
    startDate: "2023-10-01",
    endDate: "2023-11-15",
    status: "upcoming",
    owner: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    quarter: "Q4",
    dependencies: ["milestone-12"],
  },
  {
    id: "milestone-14",
    title: "Brand Identity - Implementation",
    description: "Rollout of new brand identity across all channels",
    project: "Brand Identity Refresh",
    startDate: "2023-11-16",
    endDate: "2023-12-31",
    status: "upcoming",
    owner: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    quarter: "Q4",
    dependencies: ["milestone-13"],
  },
]

type RoadmapKanbanProps = {
  projectId?: string
  quarter?: string
}

export function RoadmapKanban({ projectId, quarter }: RoadmapKanbanProps) {
  let filteredMilestones = [...mockMilestones]

  if (projectId && projectId !== "all") {
    filteredMilestones = filteredMilestones.filter((milestone) => {
      return milestone.project === projects.find((p) => p.id === projectId)?.name
    })
  }

  if (quarter) {
    filteredMilestones = filteredMilestones.filter((milestone) => milestone.quarter === quarter)
  }

  const completedMilestones = filteredMilestones.filter((milestone) => milestone.status === "completed")
  const inProgressMilestones = filteredMilestones.filter((milestone) => milestone.status === "in-progress")
  const upcomingMilestones = filteredMilestones.filter((milestone) => milestone.status === "upcoming")
  const delayedMilestones = filteredMilestones.filter((milestone) => milestone.status === "delayed")

  const projects = [
    { id: "1", name: "Website Redesign" },
    { id: "2", name: "Mobile App Development" },
    { id: "3", name: "E-commerce Platform" },
    { id: "4", name: "Brand Identity Refresh" },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Completed</h3>
          <Badge variant="outline">{completedMilestones.length}</Badge>
        </div>
        {completedMilestones.map((milestone) => (
          <Card key={milestone.id} className="shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{milestone.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Move</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs">{milestone.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {milestone.project}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {milestone.quarter}
                </Badge>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {milestone.startDate} - {milestone.endDate}
                  </span>
                </div>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={milestone.owner.avatar || "/placeholder.svg"} alt={milestone.owner.name} />
                  <AvatarFallback>{milestone.owner.initials}</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">In Progress</h3>
          <Badge variant="outline">{inProgressMilestones.length}</Badge>
        </div>
        {inProgressMilestones.map((milestone) => (
          <Card key={milestone.id} className="shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{milestone.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Move</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs">{milestone.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {milestone.project}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {milestone.quarter}
                </Badge>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {milestone.startDate} - {milestone.endDate}
                  </span>
                </div>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={milestone.owner.avatar || "/placeholder.svg"} alt={milestone.owner.name} />
                  <AvatarFallback>{milestone.owner.initials}</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Upcoming</h3>
          <Badge variant="outline">{upcomingMilestones.length}</Badge>
        </div>
        {upcomingMilestones.map((milestone) => (
          <Card key={milestone.id} className="shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{milestone.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Move</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs">{milestone.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {milestone.project}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {milestone.quarter}
                </Badge>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {milestone.startDate} - {milestone.endDate}
                  </span>
                </div>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={milestone.owner.avatar || "/placeholder.svg"} alt={milestone.owner.name} />
                  <AvatarFallback>{milestone.owner.initials}</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Delayed</h3>
          <Badge variant="outline">{delayedMilestones.length}</Badge>
        </div>
        {delayedMilestones.map((milestone) => (
          <Card key={milestone.id} className="shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{milestone.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Move</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs">{milestone.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {milestone.project}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {milestone.quarter}
                </Badge>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {milestone.startDate} - {milestone.endDate}
                  </span>
                </div>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={milestone.owner.avatar || "/placeholder.svg"} alt={milestone.owner.name} />
                  <AvatarFallback>{milestone.owner.initials}</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

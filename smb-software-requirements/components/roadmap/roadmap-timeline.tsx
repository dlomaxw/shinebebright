"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

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

type RoadmapTimelineProps = {
  projectId?: string
  quarter?: string
}

export function RoadmapTimeline({ projectId, quarter }: RoadmapTimelineProps) {
  let filteredMilestones = [...mockMilestones]

  if (projectId && projectId !== "all") {
    filteredMilestones = filteredMilestones.filter((milestone) => {
      return milestone.project === projects.find((p) => p.id === projectId)?.name
    })
  }

  if (quarter) {
    filteredMilestones = filteredMilestones.filter((milestone) => milestone.quarter === quarter)
  }

  // Sort milestones by start date
  filteredMilestones.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

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

  const projects = [
    { id: "1", name: "Website Redesign" },
    { id: "2", name: "Mobile App Development" },
    { id: "3", name: "E-commerce Platform" },
    { id: "4", name: "Brand Identity Refresh" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>View and manage project milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {filteredMilestones.map((milestone, index) => (
            <div key={milestone.id} className="relative pb-10">
              {/* Timeline connector */}
              {index < filteredMilestones.length - 1 && (
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
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-medium">{milestone.title}</h4>
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                    </Badge>
                    <Badge variant="outline">{milestone.quarter}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span>
                        {milestone.startDate} to {milestone.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Owner:</span>
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={milestone.owner.avatar || "/placeholder.svg"} alt={milestone.owner.name} />
                          <AvatarFallback>{milestone.owner.initials}</AvatarFallback>
                        </Avatar>
                        <span>{milestone.owner.name}</span>
                      </div>
                    </div>
                    {milestone.dependencies && milestone.dependencies.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Dependencies:</span>
                        <span>
                          {milestone.dependencies
                            .map(
                              (depId) => mockMilestones.find((m) => m.id === depId)?.title.split(" - ")[1] || "Unknown",
                            )
                            .join(", ")}
                        </span>
                      </div>
                    )}
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

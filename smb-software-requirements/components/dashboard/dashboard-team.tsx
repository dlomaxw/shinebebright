"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users } from "lucide-react"
import { toast } from "sonner"

export function DashboardTeam() {
  const teamMembers = [
    {
      id: "1",
      name: "John Doe",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      department: "Management",
      utilization: 85,
      status: "available",
      tasks: 8,
      projects: 3,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
      department: "Design",
      utilization: 92,
      status: "busy",
      tasks: 12,
      projects: 4,
    },
    {
      id: "3",
      name: "Michael Brown",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      department: "Development",
      utilization: 78,
      status: "available",
      tasks: 10,
      projects: 2,
    },
    {
      id: "4",
      name: "Emily Davis",
      role: "Backend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
      department: "Development",
      utilization: 88,
      status: "away",
      tasks: 6,
      projects: 3,
    },
    {
      id: "5",
      name: "Robert Wilson",
      role: "Full Stack Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RW",
      department: "Development",
      utilization: 95,
      status: "busy",
      tasks: 14,
      projects: 4,
    },
    {
      id: "6",
      name: "Jennifer Lee",
      role: "QA Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JL",
      department: "Quality Assurance",
      utilization: 75,
      status: "available",
      tasks: 9,
      projects: 2,
    },
  ]

  const teamActivity = [
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      action: "completed task",
      target: "Homepage Wireframes",
      project: "Website Redesign",
      timestamp: "10 minutes ago",
    },
    {
      id: "2",
      user: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
      action: "commented on",
      target: "Navigation Component",
      project: "Website Redesign",
      timestamp: "25 minutes ago",
    },
    {
      id: "3",
      user: {
        name: "Robert Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RW",
      },
      action: "pushed code to",
      target: "feature/api-integration",
      project: "Mobile App",
      timestamp: "1 hour ago",
    },
    {
      id: "4",
      user: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
      },
      action: "created task",
      target: "Implement User Authentication",
      project: "Mobile App",
      timestamp: "2 hours ago",
    },
    {
      id: "5",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
      action: "scheduled meeting",
      target: "Project Planning",
      project: "E-commerce Platform",
      timestamp: "3 hours ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "busy":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "away":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "bg-red-500"
    if (utilization >= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Team Dashboard</h3>
        <Button onClick={() => toast.success("Team member creation launched", { description: "The dialog will be available in the next release." })}>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Team Size</CardTitle>
            <CardDescription>Total team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="text-3xl font-bold">24</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Avg. Utilization</CardTitle>
            <CardDescription>Team utilization rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85.5%</div>
            <Progress value={85.5} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Projects</CardTitle>
            <CardDescription>Projects in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across 5 departments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Directory</CardTitle>
              <CardDescription>View and manage your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Department</span>
                          <span className="text-sm">{member.department}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Utilization</span>
                            <span>{member.utilization}%</span>
                          </div>
                          <Progress
                            value={member.utilization}
                            className={`h-1.5 ${getUtilizationColor(member.utilization)}`}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Tasks</span>
                          <span className="text-sm">{member.tasks}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Projects</span>
                          <span className="text-sm">{member.projects}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Recent actions from your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {teamActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>{" "}
                      <span className="text-muted-foreground">in</span>{" "}
                      <span className="font-medium">{activity.project}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <Button variant="outline">View All Activity</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

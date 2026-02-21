"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ActivityItem = {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  action: string
  target: string
  timestamp: string
}

const recentActivity: ActivityItem[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    action: "completed",
    target: "Monthly Sales Report",
    timestamp: "10 minutes ago",
  },
  {
    id: "2",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    action: "created",
    target: "New Customer Profile: Acme Corp",
    timestamp: "25 minutes ago",
  },
  {
    id: "3",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    action: "updated",
    target: "Inventory Status for Product XYZ",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    action: "commented on",
    target: "Project Alpha Timeline",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    user: {
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RW",
    },
    action: "approved",
    target: "Expense Report #12345",
    timestamp: "3 hours ago",
  },
]

const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    role: "Sales Manager",
    avatar: "/placeholder.svg?height=64&width=64",
    initials: "JD",
    status: "online",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Customer Support",
    avatar: "/placeholder.svg?height=64&width=64",
    initials: "SJ",
    status: "online",
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Inventory Specialist",
    avatar: "/placeholder.svg?height=64&width=64",
    initials: "MB",
    status: "offline",
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=64&width=64",
    initials: "ED",
    status: "online",
  },
  {
    id: "5",
    name: "Robert Wilson",
    role: "Finance Director",
    avatar: "/placeholder.svg?height=64&width=64",
    initials: "RW",
    status: "busy",
  },
]

export function TeamActivity() {
  return (
    <Tabs defaultValue="activity">
      <TabsList className="mb-4">
        <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        <TabsTrigger value="members">Team Members</TabsTrigger>
      </TabsList>
      <TabsContent value="activity">
        <Card>
          <CardHeader>
            <CardTitle>Team Activity</CardTitle>
            <CardDescription>Recent actions from your team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                    <AvatarFallback>{item.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-semibold">{item.user.name}</span> {item.action}{" "}
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="members">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>View and manage your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background 
                        ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "busy"
                              ? "bg-red-500"
                              : "bg-gray-400"
                        }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

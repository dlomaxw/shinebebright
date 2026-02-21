"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type Task = {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "high" | "medium" | "low"
  dueDate: string
  project?: string
  assignee?: {
    name: string
    avatar?: string
    initials: string
  }
}

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Create wireframes for homepage",
    description: "Design initial wireframes for the homepage layout",
    status: "todo",
    priority: "high",
    dueDate: "2023-06-10",
    project: "Website Redesign",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
  },
  {
    id: "task-2",
    title: "Develop responsive navigation",
    description: "Implement responsive navigation menu for all device sizes",
    status: "in-progress",
    priority: "medium",
    dueDate: "2023-06-15",
    project: "Website Redesign",
    assignee: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
  },
  {
    id: "task-3",
    title: "Implement user authentication",
    description: "Set up user login and registration functionality",
    status: "review",
    priority: "high",
    dueDate: "2023-06-20",
    project: "Mobile App",
    assignee: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
  },
  {
    id: "task-4",
    title: "Create product catalog page",
    description: "Design and implement the product catalog with filtering options",
    status: "done",
    priority: "medium",
    dueDate: "2023-06-05",
    project: "E-commerce Platform",
    assignee: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
  },
  {
    id: "task-5",
    title: "Set up analytics tracking",
    description: "Implement Google Analytics and event tracking",
    status: "todo",
    priority: "low",
    dueDate: "2023-06-25",
    project: "Website Redesign",
  },
  {
    id: "task-6",
    title: "Conduct usability testing",
    description: "Organize and conduct usability testing sessions with target users",
    status: "todo",
    priority: "high",
    dueDate: "2023-06-30",
    project: "Mobile App",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
  },
  {
    id: "task-7",
    title: "Fix payment gateway integration",
    description: "Debug and fix issues with payment processing",
    status: "in-progress",
    priority: "high",
    dueDate: "2023-06-12",
    project: "E-commerce Platform",
    assignee: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
  },
  {
    id: "task-8",
    title: "Optimize image loading",
    description: "Implement lazy loading and image optimization",
    status: "review",
    priority: "medium",
    dueDate: "2023-06-18",
    project: "Website Redesign",
    assignee: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
  },
  {
    id: "task-9",
    title: "Update privacy policy",
    description: "Review and update privacy policy to comply with regulations",
    status: "done",
    priority: "medium",
    dueDate: "2023-06-08",
    project: "Legal Compliance",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
  },
]

type TaskBoardProps = {
  filter?: "my-tasks" | "unassigned" | "completed"
}

export function TaskBoard({ filter }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  let filteredTasks = [...tasks]

  if (filter === "my-tasks") {
    // In a real app, you would filter by the current user
    filteredTasks = filteredTasks.filter((task) => task.assignee?.name === "Michael Brown")
  } else if (filter === "unassigned") {
    filteredTasks = filteredTasks.filter((task) => !task.assignee)
  } else if (filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.status === "done")
  }

  const todoTasks = filteredTasks.filter((task) => task.status === "todo")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "in-progress")
  const reviewTasks = filteredTasks.filter((task) => task.status === "review")
  const doneTasks = filteredTasks.filter((task) => task.status === "done")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">To Do</h3>
          <Badge variant="outline">{todoTasks.length}</Badge>
        </div>
        {todoTasks.map((task) => (
          <Card key={task.id} className="shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Assign</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                  {task.project && (
                    <Badge variant="outline" className="text-xs">
                      {task.project}
                    </Badge>
                  )}
                </div>
                {task.assignee ? (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Unassigned
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Due {task.dueDate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">In Progress</h3>
          <Badge variant="outline">{inProgressTasks.length}</Badge>
        </div>
        {inProgressTasks.map((task) => (
          <Card key={task.id} className="shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Assign</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                  {task.project && (
                    <Badge variant="outline" className="text-xs">
                      {task.project}
                    </Badge>
                  )}
                </div>
                {task.assignee ? (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Unassigned
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Due {task.dueDate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">In Review</h3>
          <Badge variant="outline">{reviewTasks.length}</Badge>
        </div>
        {reviewTasks.map((task) => (
          <Card key={task.id} className="shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Assign</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                  {task.project && (
                    <Badge variant="outline" className="text-xs">
                      {task.project}
                    </Badge>
                  )}
                </div>
                {task.assignee ? (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Unassigned
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Due {task.dueDate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Done</h3>
          <Badge variant="outline">{doneTasks.length}</Badge>
        </div>
        {doneTasks.map((task) => (
          <Card key={task.id} className="shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Assign</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                  {task.project && (
                    <Badge variant="outline" className="text-xs">
                      {task.project}
                    </Badge>
                  )}
                </div>
                {task.assignee ? (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Unassigned
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Due {task.dueDate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

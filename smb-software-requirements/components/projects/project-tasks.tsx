"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Task = {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "high" | "medium" | "low"
  dueDate: string
  assignee: {
    name: string
    avatar?: string
    initials: string
  }
}

const mockTasks: Record<string, Task[]> = {
  "1": [
    {
      id: "task-1",
      title: "Create wireframes for homepage",
      description: "Design initial wireframes for the homepage layout",
      status: "done",
      priority: "high",
      dueDate: "2023-02-10",
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
      status: "done",
      priority: "medium",
      dueDate: "2023-03-05",
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
      status: "in-progress",
      priority: "high",
      dueDate: "2023-04-20",
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
      status: "in-progress",
      priority: "medium",
      dueDate: "2023-05-10",
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
      dueDate: "2023-05-25",
      assignee: {
        name: "Robert Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RW",
      },
    },
    {
      id: "task-6",
      title: "Conduct usability testing",
      description: "Organize and conduct usability testing sessions with target users",
      status: "todo",
      priority: "high",
      dueDate: "2023-06-15",
      assignee: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
    },
  ],
}

type ProjectTasksProps = {
  projectId: string
}

export function ProjectTasks({ projectId }: ProjectTasksProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks[projectId] || [])
  const [filter, setFilter] = useState<string | null>(null)

  const filteredTasks = filter ? tasks.filter((task) => task.status === filter) : tasks

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "review":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "done":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

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

  const formatStatus = (status: string) => {
    switch (status) {
      case "todo":
        return "To Do"
      case "in-progress":
        return "In Progress"
      case "review":
        return "In Review"
      case "done":
        return "Done"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Tasks</CardTitle>
          <CardDescription>Manage and track project tasks</CardDescription>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {filter ? formatStatus(filter) : "All Tasks"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter(null)}>All Tasks</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("todo")}>To Do</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("in-progress")}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("review")}>In Review</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("done")}>Done</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="flex items-start justify-between rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <Checkbox id={task.id} checked={task.status === "done"} className="mt-1" />
                <div>
                  <label
                    htmlFor={task.id}
                    className={`font-medium ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </label>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getStatusColor(task.status)}>{formatStatus(task.status)}</Badge>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                  <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

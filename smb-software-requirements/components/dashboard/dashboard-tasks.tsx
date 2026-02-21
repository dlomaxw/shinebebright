"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewTaskDialog } from "@/components/tasks/new-task-dialog"

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
]

type DashboardTasksProps = {
  limit?: number
}

export function DashboardTasks({ limit }: DashboardTasksProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filter, setFilter] = useState<string | null>(null)

  let filteredTasks = [...tasks]

  if (filter) {
    filteredTasks = filteredTasks.filter((task) => task.status === filter)
  }

  if (limit) {
    filteredTasks = filteredTasks.slice(0, limit)
  }

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
    <div className="space-y-4">
      {!limit && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Tasks</h3>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
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
            <NewTaskDialog />
          </div>
        </div>
      )}

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
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span>Due: {task.dueDate}</span>
                  {task.project && (
                    <>
                      <span>•</span>
                      <span>Project: {task.project}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={getStatusColor(task.status)}>{formatStatus(task.status)}</Badge>
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Assigned to:</span>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <Badge variant="outline">Unassigned</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

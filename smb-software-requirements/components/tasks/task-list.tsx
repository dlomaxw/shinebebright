"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

type TaskListProps = {
  filter?: "my-tasks" | "unassigned" | "completed"
}

export function TaskList({ filter }: TaskListProps) {
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
      <CardHeader>
        <CardTitle>Task List</CardTitle>
        <CardDescription>View and manage all tasks in one place</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox checked={task.status === "done"} />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                </TableCell>
                <TableCell>{task.project || "-"}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(task.status)}>{formatStatus(task.status)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                        <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignee.name}</span>
                    </div>
                  ) : (
                    <Badge variant="outline">Unassigned</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Assign</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

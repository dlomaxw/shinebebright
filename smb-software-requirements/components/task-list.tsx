"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Task = {
  id: string
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
  dueDate: string
  assignee?: string
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete quarterly financial report",
    completed: false,
    priority: "high",
    dueDate: "2023-06-30",
    assignee: "John Doe",
  },
  {
    id: "2",
    title: "Review new customer applications",
    completed: false,
    priority: "medium",
    dueDate: "2023-06-25",
  },
  {
    id: "3",
    title: "Update inventory management system",
    completed: false,
    priority: "high",
    dueDate: "2023-06-28",
    assignee: "Jane Smith",
  },
  {
    id: "4",
    title: "Schedule team building event",
    completed: true,
    priority: "low",
    dueDate: "2023-06-15",
  },
  {
    id: "5",
    title: "Prepare monthly sales presentation",
    completed: false,
    priority: "medium",
    dueDate: "2023-06-29",
    assignee: "Mike Johnson",
  },
]

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Manage your team's tasks and track progress</CardDescription>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Tasks</DropdownMenuItem>
              <DropdownMenuItem>High Priority</DropdownMenuItem>
              <DropdownMenuItem>Medium Priority</DropdownMenuItem>
              <DropdownMenuItem>Low Priority</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Incomplete</DropdownMenuItem>
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
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start justify-between p-4 rounded-lg border ${task.completed ? "bg-muted/50" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className="mt-1"
                />
                <div>
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </label>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span>Due: {task.dueDate}</span>
                    {task.assignee && (
                      <>
                        <span>•</span>
                        <span>Assigned to: {task.assignee}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Badge className={`${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

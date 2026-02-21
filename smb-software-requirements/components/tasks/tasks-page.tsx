"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskBoard } from "@/components/tasks/task-board"
import { TaskList } from "@/components/tasks/task-list"
import { Plus, Filter, LayoutGrid, List } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewTaskDialog } from "@/components/tasks/new-task-dialog"

export function TasksPage() {
  const [view, setView] = useState<"board" | "list">("board")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <div className="flex gap-2">
          <div className="flex rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("board")}
              className={view === "board" ? "bg-muted" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("list")}
              className={view === "list" ? "bg-muted" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Tasks</DropdownMenuItem>
              <DropdownMenuItem>My Tasks</DropdownMenuItem>
              <DropdownMenuItem>High Priority</DropdownMenuItem>
              <DropdownMenuItem>Due This Week</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NewTaskDialog />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {view === "board" ? <TaskBoard /> : <TaskList />}
        </TabsContent>
        <TabsContent value="my-tasks" className="space-y-4">
          {view === "board" ? <TaskBoard filter="my-tasks" /> : <TaskList filter="my-tasks" />}
        </TabsContent>
        <TabsContent value="unassigned" className="space-y-4">
          {view === "board" ? <TaskBoard filter="unassigned" /> : <TaskList filter="unassigned" />}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {view === "board" ? <TaskBoard filter="completed" /> : <TaskList filter="completed" />}
        </TabsContent>
      </Tabs>
    </div>
  )
}

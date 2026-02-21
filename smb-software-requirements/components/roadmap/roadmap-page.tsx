"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoadmapTimeline } from "@/components/roadmap/roadmap-timeline"
import { RoadmapKanban } from "@/components/roadmap/roadmap-kanban"
import { Plus, Filter, Calendar, LayoutGrid } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RoadmapPage() {
  const [view, setView] = useState<"timeline" | "kanban">("timeline")
  const [selectedProject, setSelectedProject] = useState<string>("all")

  const projects = [
    { id: "all", name: "All Projects" },
    { id: "1", name: "Website Redesign" },
    { id: "2", name: "Mobile App Development" },
    { id: "3", name: "E-commerce Platform" },
    { id: "4", name: "Brand Identity Refresh" },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Project Roadmap</h2>
        <div className="flex gap-2">
          <div className="flex rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("timeline")}
              className={view === "timeline" ? "bg-muted" : ""}
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("kanban")}
              className={view === "kanban" ? "bg-muted" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Milestones</DropdownMenuItem>
              <DropdownMenuItem>Upcoming</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Delayed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Milestones</TabsTrigger>
          <TabsTrigger value="q2">Q2 2023</TabsTrigger>
          <TabsTrigger value="q3">Q3 2023</TabsTrigger>
          <TabsTrigger value="q4">Q4 2023</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {view === "timeline" ? (
            <RoadmapTimeline projectId={selectedProject} />
          ) : (
            <RoadmapKanban projectId={selectedProject} />
          )}
        </TabsContent>
        <TabsContent value="q2" className="space-y-4">
          {view === "timeline" ? (
            <RoadmapTimeline projectId={selectedProject} quarter="Q2" />
          ) : (
            <RoadmapKanban projectId={selectedProject} quarter="Q2" />
          )}
        </TabsContent>
        <TabsContent value="q3" className="space-y-4">
          {view === "timeline" ? (
            <RoadmapTimeline projectId={selectedProject} quarter="Q3" />
          ) : (
            <RoadmapKanban projectId={selectedProject} quarter="Q3" />
          )}
        </TabsContent>
        <TabsContent value="q4" className="space-y-4">
          {view === "timeline" ? (
            <RoadmapTimeline projectId={selectedProject} quarter="Q4" />
          ) : (
            <RoadmapKanban projectId={selectedProject} quarter="Q4" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectDetails } from "@/components/projects/project-details"
import { Plus, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export function ProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Projects</DropdownMenuItem>
              <DropdownMenuItem>Active Projects</DropdownMenuItem>
              <DropdownMenuItem>Completed Projects</DropdownMenuItem>
              <DropdownMenuItem>On Hold</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => toast.success("Project creation launched", { description: "The dialog will be available in the next release." })}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="onhold">On Hold</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {selectedProjectId ? (
            <ProjectDetails projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />
          ) : (
            <ProjectsList onSelectProject={setSelectedProjectId} />
          )}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          {selectedProjectId ? (
            <ProjectDetails projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />
          ) : (
            <ProjectsList status="active" onSelectProject={setSelectedProjectId} />
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {selectedProjectId ? (
            <ProjectDetails projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />
          ) : (
            <ProjectsList status="completed" onSelectProject={setSelectedProjectId} />
          )}
        </TabsContent>
        <TabsContent value="onhold" className="space-y-4">
          {selectedProjectId ? (
            <ProjectDetails projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />
          ) : (
            <ProjectsList status="on-hold" onSelectProject={setSelectedProjectId} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

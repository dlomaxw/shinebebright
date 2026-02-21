"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, ArrowUpDown } from "lucide-react"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"

type ProjectData = {
  id: string
  name: string
  client: string
  budget: number
  actualCost: number
  variance: number
  variancePercent: number
  status: "completed" | "in-progress" | "at-risk"
  progress: number
}

const mockProjects: ProjectData[] = [
  {
    id: "1",
    name: "Website Redesign",
    client: "Acme Corp",
    budget: 24000,
    actualCost: 22800,
    variance: 1200,
    variancePercent: 5,
    status: "completed",
    progress: 100,
  },
  {
    id: "2",
    name: "Mobile App Development",
    client: "TechSoft Inc",
    budget: 45000,
    actualCost: 38250,
    variance: 6750,
    variancePercent: 15,
    status: "completed",
    progress: 100,
  },
  {
    id: "3",
    name: "Brand Identity Refresh",
    client: "Global Industries",
    budget: 18500,
    actualCost: 19425,
    variance: -925,
    variancePercent: -5,
    status: "completed",
    progress: 100,
  },
  {
    id: "4",
    name: "E-commerce Platform",
    client: "Retail Solutions",
    budget: 62000,
    actualCost: 40300,
    variance: 21700,
    variancePercent: 35,
    status: "in-progress",
    progress: 65,
  },
  {
    id: "5",
    name: "CRM Implementation",
    client: "Finance Pro",
    budget: 38000,
    actualCost: 26600,
    variance: 11400,
    variancePercent: 30,
    status: "in-progress",
    progress: 70,
  },
  {
    id: "6",
    name: "Marketing Campaign",
    client: "Healthcare Plus",
    budget: 15000,
    actualCost: 16500,
    variance: -1500,
    variancePercent: -10,
    status: "at-risk",
    progress: 60,
  },
  {
    id: "7",
    name: "Data Analytics Dashboard",
    client: "Education First",
    budget: 28000,
    actualCost: 19600,
    variance: 8400,
    variancePercent: 30,
    status: "in-progress",
    progress: 70,
  },
  {
    id: "8",
    name: "Social Media Strategy",
    client: "Marketing Experts",
    budget: 12000,
    actualCost: 13200,
    variance: -1200,
    variancePercent: -10,
    status: "at-risk",
    progress: 80,
  },
]

export function ProjectProfitability() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortField, setSortField] = useState<string>("variancePercent")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  let filteredProjects = [...mockProjects]

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredProjects = filteredProjects.filter(
      (project) => project.name.toLowerCase().includes(query) || project.client.toLowerCase().includes(query),
    )
  }

  // Sort projects
  filteredProjects.sort((a, b) => {
    const aValue = a[sortField as keyof ProjectData]
    const bValue = b[sortField as keyof ProjectData]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "at-risk":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-green-500"
    if (variance < 0) return "text-red-500"
    return ""
  }

  // Calculate summary metrics
  const totalBudget = filteredProjects.reduce((sum, project) => sum + project.budget, 0)
  const totalActualCost = filteredProjects.reduce((sum, project) => sum + project.actualCost, 0)
  const totalVariance = totalBudget - totalActualCost
  const totalVariancePercent = (totalVariance / totalBudget) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Project Profitability Analysis</h3>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Actual Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalActualCost.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getVarianceColor(totalVariance)}`}>
              ${totalVariance.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Variance %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getVarianceColor(totalVariancePercent)}`}>
              {totalVariancePercent.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Profitability Table</CardTitle>
          <CardDescription>Budget vs. actual costs by project</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" className="p-0 h-auto font-medium" onClick={() => handleSort("budget")}>
                    Budget
                    {sortField === "budget" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" className="p-0 h-auto font-medium" onClick={() => handleSort("actualCost")}>
                    Actual Cost
                    {sortField === "actualCost" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" className="p-0 h-auto font-medium" onClick={() => handleSort("variance")}>
                    Variance
                    {sortField === "variance" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-medium"
                    onClick={() => handleSort("variancePercent")}
                  >
                    Variance %{sortField === "variancePercent" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status === "in-progress"
                        ? "In Progress"
                        : project.status === "at-risk"
                          ? "At Risk"
                          : "Completed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2 w-20" />
                      <span className="text-sm">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${project.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${project.actualCost.toLocaleString()}</TableCell>
                  <TableCell className={`text-right ${getVarianceColor(project.variance)}`}>
                    ${project.variance.toLocaleString()}
                  </TableCell>
                  <TableCell className={`text-right ${getVarianceColor(project.variancePercent)}`}>
                    {project.variancePercent}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

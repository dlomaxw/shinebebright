"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Zap } from "lucide-react"

type AutomationMetric = {
  id: string
  title: string
  description: string
  timeSaved: number
  tasksAutomated: number
  status: "active" | "paused" | "draft"
}

const automationMetrics: AutomationMetric[] = [
  {
    id: "1",
    title: "Invoice Generation",
    description: "Automatically creates invoices when orders are completed",
    timeSaved: 12.5,
    tasksAutomated: 145,
    status: "active",
  },
  {
    id: "2",
    title: "Customer Follow-ups",
    description: "Sends follow-up emails to customers after purchase",
    timeSaved: 8.2,
    tasksAutomated: 98,
    status: "active",
  },
  {
    id: "3",
    title: "Inventory Alerts",
    description: "Notifies when inventory items are running low",
    timeSaved: 5.7,
    tasksAutomated: 42,
    status: "active",
  },
  {
    id: "4",
    title: "Meeting Scheduler",
    description: "Automatically schedules team meetings based on availability",
    timeSaved: 6.3,
    tasksAutomated: 24,
    status: "paused",
  },
  {
    id: "5",
    title: "Expense Categorization",
    description: "Categorizes expenses automatically for accounting",
    timeSaved: 9.1,
    tasksAutomated: 87,
    status: "draft",
  },
]

export function AutomationInsights() {
  const totalTimeSaved = automationMetrics.reduce((acc, metric) => acc + metric.timeSaved, 0)
  const totalTasksAutomated = automationMetrics.reduce((acc, metric) => acc + metric.tasksAutomated, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "paused":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "draft":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Automation Insights</CardTitle>
          <CardDescription>See how automation is improving your business efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Total Time Saved</div>
                <div className="text-sm text-muted-foreground">{totalTimeSaved.toFixed(1)} hours/week</div>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Tasks Automated</div>
                <div className="text-sm text-muted-foreground">{totalTasksAutomated} tasks/month</div>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {automationMetrics.map((metric) => (
        <Card key={metric.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{metric.title}</CardTitle>
              <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
            </div>
            <CardDescription>{metric.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">{metric.timeSaved}</span> hours saved weekly
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">{metric.tasksAutomated}</span> tasks automated
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

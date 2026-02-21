"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Play, Pause, Plus } from "lucide-react"
import { useState } from "react"

export function DashboardTimeTracking() {
  const [selectedWeek, setSelectedWeek] = useState("current")

  const weeklyHoursData = [
    { day: "Mon", billable: 6.5, nonBillable: 1.5 },
    { day: "Tue", billable: 7.2, nonBillable: 0.8 },
    { day: "Wed", billable: 6.8, nonBillable: 1.2 },
    { day: "Thu", billable: 7.5, nonBillable: 0.5 },
    { day: "Fri", billable: 5.5, nonBillable: 2.5 },
    { day: "Sat", billable: 2.0, nonBillable: 0 },
    { day: "Sun", billable: 0, nonBillable: 0 },
  ]

  const recentTimeEntries = [
    {
      id: "1",
      project: "Website Redesign",
      client: "Acme Corp",
      task: "Frontend Development",
      duration: "2h 15m",
      date: "Today",
      billable: true,
      status: "running",
    },
    {
      id: "2",
      project: "Mobile App",
      client: "TechSoft Inc",
      task: "API Integration",
      duration: "1h 45m",
      date: "Today",
      billable: true,
      status: "stopped",
    },
    {
      id: "3",
      project: "Website Redesign",
      client: "Acme Corp",
      task: "Team Meeting",
      duration: "45m",
      date: "Today",
      billable: false,
      status: "stopped",
    },
    {
      id: "4",
      project: "E-commerce Platform",
      client: "Retail Solutions",
      task: "Bug Fixes",
      duration: "3h 20m",
      date: "Yesterday",
      billable: true,
      status: "stopped",
    },
    {
      id: "5",
      project: "Internal",
      client: "Company",
      task: "Admin Work",
      duration: "1h 10m",
      date: "Yesterday",
      billable: false,
      status: "stopped",
    },
  ]

  // Calculate total hours
  const totalBillableHours = weeklyHoursData.reduce((sum, day) => sum + day.billable, 0)
  const totalNonBillableHours = weeklyHoursData.reduce((sum, day) => sum + day.nonBillable, 0)
  const totalHours = totalBillableHours + totalNonBillableHours
  const billablePercentage = (totalBillableHours / totalHours) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Time Tracking</h3>
        <div className="flex gap-2">
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="last">Last Week</SelectItem>
              <SelectItem value="twoWeeksAgo">Two Weeks Ago</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Time Entry
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Hours</CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">+2.5h from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Billable Hours</CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalBillableHours.toFixed(1)}h</div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Billable ratio</span>
                <span>{billablePercentage.toFixed(1)}%</span>
              </div>
              <Progress value={billablePercentage} className="h-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Utilization</CardTitle>
            <CardDescription>Based on 40h work week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{((totalHours / 40) * 100).toFixed(1)}%</div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Progress</span>
                <span>{totalHours.toFixed(1)} / 40h</span>
              </div>
              <Progress value={(totalHours / 40) * 100} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Hours</CardTitle>
          <CardDescription>Billable vs. non-billable hours</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyHoursData}>
                <XAxis dataKey="day" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Bar dataKey="billable" name="Billable Hours" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nonBillable" name="Non-Billable Hours" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Time Entries</CardTitle>
          <CardDescription>Your recent tracked time</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project / Task</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Billable</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTimeEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{entry.project}</p>
                      <p className="text-sm text-muted-foreground">{entry.task}</p>
                    </div>
                  </TableCell>
                  <TableCell>{entry.client}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>
                    {entry.billable ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {entry.status === "running" ? (
                        <Button variant="outline" size="sm">
                          <Pause className="mr-1 h-3 w-3" />
                          Stop
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="mr-1 h-3 w-3" />
                          Start
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">View All Time Entries</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

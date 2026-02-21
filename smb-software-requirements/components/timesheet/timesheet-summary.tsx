"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"

type TimesheetSummaryProps = {
  date: DateRange | undefined
}

export function TimesheetSummary({ date }: TimesheetSummaryProps) {
  const startDate = date?.from ? format(date.from, "MMM d, yyyy") : "Not selected"
  const endDate = date?.to ? format(date.to, "MMM d, yyyy") : "Not selected"

  // Mock data for the charts and tables
  const projectData = [
    { name: "Website Redesign", hours: 24.5 },
    { name: "Mobile App Development", hours: 18.5 },
    { name: "E-commerce Platform", hours: 12 },
    { name: "Brand Identity Refresh", hours: 8 },
  ]

  const taskData = [
    { name: "Development", hours: 28 },
    { name: "Design", hours: 16 },
    { name: "Meetings", hours: 10 },
    { name: "Testing", hours: 6 },
    { name: "Documentation", hours: 3 },
  ]

  const dailyData = [
    { name: "Mon", hours: 8.5 },
    { name: "Tue", hours: 9 },
    { name: "Wed", hours: 7.5 },
    { name: "Thu", hours: 8 },
    { name: "Fri", hours: 6 },
    { name: "Sat", hours: 2 },
    { name: "Sun", hours: 0 },
  ]

  const totalHours = projectData.reduce((sum, item) => sum + item.hours, 0)
  const billableHours = 52.5 // Mock billable hours
  const billablePercentage = Math.round((billableHours / totalHours) * 100)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Hours</CardTitle>
            <CardDescription>
              {startDate} to {endDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalHours}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Billable Hours</CardTitle>
            <CardDescription>
              {startDate} to {endDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{billableHours}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Billable Percentage</CardTitle>
            <CardDescription>
              {startDate} to {endDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{billablePercentage}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hours by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: {
                  label: "Hours",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hours by Task</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: {
                  label: "Hours",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              hours: {
                label: "Hours",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Entry Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Billable Hours</TableHead>
                <TableHead>Billable Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Website Redesign</TableCell>
                <TableCell>Design</TableCell>
                <TableCell>10.5</TableCell>
                <TableCell>10.5</TableCell>
                <TableCell>$1,050.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Website Redesign</TableCell>
                <TableCell>Development</TableCell>
                <TableCell>14.0</TableCell>
                <TableCell>14.0</TableCell>
                <TableCell>$1,400.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mobile App Development</TableCell>
                <TableCell>Design</TableCell>
                <TableCell>5.5</TableCell>
                <TableCell>5.5</TableCell>
                <TableCell>$550.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mobile App Development</TableCell>
                <TableCell>Development</TableCell>
                <TableCell>8.0</TableCell>
                <TableCell>8.0</TableCell>
                <TableCell>$800.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mobile App Development</TableCell>
                <TableCell>Meetings</TableCell>
                <TableCell>5.0</TableCell>
                <TableCell>5.0</TableCell>
                <TableCell>$500.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E-commerce Platform</TableCell>
                <TableCell>Development</TableCell>
                <TableCell>6.0</TableCell>
                <TableCell>6.0</TableCell>
                <TableCell>$600.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E-commerce Platform</TableCell>
                <TableCell>Testing</TableCell>
                <TableCell>6.0</TableCell>
                <TableCell>3.5</TableCell>
                <TableCell>$350.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand Identity Refresh</TableCell>
                <TableCell>Design</TableCell>
                <TableCell>8.0</TableCell>
                <TableCell>0.0</TableCell>
                <TableCell>$0.00</TableCell>
              </TableRow>
              <TableRow className="font-medium">
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell>{totalHours}</TableCell>
                <TableCell>{billableHours}</TableCell>
                <TableCell>$5,250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

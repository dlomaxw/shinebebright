"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { useState } from "react"

export function DashboardProfitability() {
  const [timeRange, setTimeRange] = useState("year")

  const profitabilityData = [
    { month: "Jan", targetMargin: 30, actualMargin: 28.9 },
    { month: "Feb", targetMargin: 30, actualMargin: 30.8 },
    { month: "Mar", targetMargin: 30, actualMargin: 32.7 },
    { month: "Apr", targetMargin: 30, actualMargin: 36.2 },
    { month: "May", targetMargin: 30, actualMargin: 36.4 },
    { month: "Jun", targetMargin: 30, actualMargin: 37.1 },
    { month: "Jul", targetMargin: 30, actualMargin: 38.2 },
    { month: "Aug", targetMargin: 30, actualMargin: 37.5 },
    { month: "Sep", targetMargin: 30, actualMargin: 37.1 },
    { month: "Oct", targetMargin: 30, actualMargin: 38.7 },
    { month: "Nov", targetMargin: 30, actualMargin: 40.0 },
    { month: "Dec", targetMargin: 30, actualMargin: 41.2 },
  ]

  const projectProfitability = [
    {
      name: "Website Redesign",
      client: "Acme Corp",
      budget: "$24,000",
      actual: "$22,800",
      margin: 35,
      variance: "+$1,200",
    },
    {
      name: "Mobile App Development",
      client: "TechSoft Inc",
      budget: "$45,000",
      actual: "$38,250",
      margin: 45,
      variance: "+$6,750",
    },
    {
      name: "Brand Identity Refresh",
      client: "Global Industries",
      budget: "$18,500",
      actual: "$19,425",
      margin: 25,
      variance: "-$925",
    },
    {
      name: "E-commerce Platform",
      client: "Retail Solutions",
      budget: "$62,000",
      actual: "$40,300",
      margin: 42,
      variance: "+$21,700",
    },
    {
      name: "CRM Implementation",
      client: "Finance Pro",
      budget: "$38,000",
      actual: "$26,600",
      margin: 38,
      variance: "+$11,400",
    },
  ]

  const clientProfitability = [
    {
      name: "Acme Corp",
      revenue: "$85,000",
      cost: "$51,000",
      profit: "$34,000",
      margin: 40,
    },
    {
      name: "TechSoft Inc",
      revenue: "$62,000",
      cost: "$43,400",
      profit: "$18,600",
      margin: 30,
    },
    {
      name: "Global Industries",
      revenue: "$45,000",
      cost: "$31,500",
      profit: "$13,500",
      margin: 30,
    },
    {
      name: "Retail Solutions",
      revenue: "$38,000",
      cost: "$26,600",
      profit: "$11,400",
      margin: 30,
    },
    {
      name: "Finance Pro",
      revenue: "$72,000",
      cost: "$39,600",
      profit: "$32,400",
      margin: 45,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Profitability Metrics</h3>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Profit Margin</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">36.4%</div>
            <p className="text-xs text-muted-foreground">+6.4% above target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Billable Utilization</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">+3.5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue per Employee</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$185,600</div>
            <p className="text-xs text-muted-foreground">+12.3% from last year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profit Margin Trend</CardTitle>
          <CardDescription>Monthly profit margin vs. target</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitabilityData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actualMargin"
                  name="Actual Margin %"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="targetMargin"
                  name="Target Margin %"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Profitability</CardTitle>
            <CardDescription>Top 5 projects by margin</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Margin</TableHead>
                  <TableHead>Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectProfitability.map((project) => (
                  <TableRow key={project.name}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.margin} className="h-2 w-16" />
                        <span>{project.margin}%</span>
                      </div>
                    </TableCell>
                    <TableCell className={project.variance.startsWith("+") ? "text-green-500" : "text-red-500"}>
                      {project.variance}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Profitability</CardTitle>
            <CardDescription>Top 5 clients by margin</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Profit</TableHead>
                  <TableHead>Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientProfitability.map((client) => (
                  <TableRow key={client.name}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.revenue}</TableCell>
                    <TableCell>{client.profit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={client.margin} className="h-2 w-16" />
                        <span>{client.margin}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Line Profitability</CardTitle>
          <CardDescription>Revenue and profit by service line</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Web Development", revenue: 320000, profit: 128000, margin: 40 },
                  { name: "Mobile Development", revenue: 240000, profit: 84000, margin: 35 },
                  { name: "UI/UX Design", revenue: 180000, profit: 72000, margin: 40 },
                  { name: "Digital Marketing", revenue: 120000, profit: 36000, margin: 30 },
                  { name: "Consulting", revenue: 90000, profit: 36000, margin: 40 },
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

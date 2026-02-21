"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function ProfitabilityOverview() {
  const [timeRange, setTimeRange] = useState("year")

  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
    { month: "Feb", revenue: 52000, expenses: 36000, profit: 16000 },
    { month: "Mar", revenue: 49000, expenses: 33000, profit: 16000 },
    { month: "Apr", revenue: 58000, expenses: 37000, profit: 21000 },
    { month: "May", revenue: 55000, expenses: 35000, profit: 20000 },
    { month: "Jun", revenue: 62000, expenses: 39000, profit: 23000 },
    { month: "Jul", revenue: 68000, expenses: 42000, profit: 26000 },
    { month: "Aug", revenue: 72000, expenses: 45000, profit: 27000 },
    { month: "Sep", revenue: 70000, expenses: 44000, profit: 26000 },
    { month: "Oct", revenue: 75000, expenses: 46000, profit: 29000 },
    { month: "Nov", revenue: 80000, expenses: 48000, profit: 32000 },
    { month: "Dec", revenue: 85000, expenses: 50000, profit: 35000 },
  ]

  const profitMarginData = [
    { month: "Jan", margin: 28.9 },
    { month: "Feb", margin: 30.8 },
    { month: "Mar", margin: 32.7 },
    { month: "Apr", margin: 36.2 },
    { month: "May", margin: 36.4 },
    { month: "Jun", margin: 37.1 },
    { month: "Jul", margin: 38.2 },
    { month: "Aug", margin: 37.5 },
    { month: "Sep", margin: 37.1 },
    { month: "Oct", margin: 38.7 },
    { month: "Nov", margin: 40.0 },
    { month: "Dec", margin: 41.2 },
  ]

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0)
  const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0)
  const averageProfitMargin = (totalProfit / totalRevenue) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Financial Performance</h3>
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
            <CardTitle className="text-base">Total Revenue</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(totalRevenue / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">+12.5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Expenses</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(totalExpenses / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">+8.2% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Net Profit</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(totalProfit / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">+18.3% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs. Expenses</CardTitle>
            <CardDescription>Monthly breakdown for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Margin</CardTitle>
            <CardDescription>Monthly profit margin percentage</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitMarginData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="margin"
                    name="Profit Margin %"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Financial health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Average Profit Margin</p>
              <p className="text-2xl font-bold">{averageProfitMargin.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">+2.5% from last year</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Billable Utilization</p>
              <p className="text-2xl font-bold">78.5%</p>
              <p className="text-xs text-muted-foreground">+3.2% from last year</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Average Project Value</p>
              <p className="text-2xl font-bold">$24.8k</p>
              <p className="text-xs text-muted-foreground">+15.3% from last year</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Client Retention Rate</p>
              <p className="text-2xl font-bold">92.7%</p>
              <p className="text-xs text-muted-foreground">+1.8% from last year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

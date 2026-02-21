"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useHistoricalData } from "@/hooks/use-historical-data"
import { Building2, TrendingUp, Download } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const periodOptions = [
  { value: "1Y", label: "1 Year" },
  { value: "2Y", label: "2 Years" },
  { value: "3Y", label: "3 Years" },
]

export function BusinessGrowthChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("2Y")
  const { data, loading, error } = useHistoricalData("business-trends", selectedPeriod)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading Chart</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const latestData = data[data.length - 1]
  const previousData = data[data.length - 2]
  const monthlyGrowth = (
    ((latestData?.registrations - previousData?.registrations) / previousData?.registrations) *
    100
  ).toFixed(1)

  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Period,New Registrations,Cumulative\n" +
      data.map((row) => `${row.period},${row.registrations},${row.cumulative}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `business_growth_${selectedPeriod}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Business Registration Trends
              <TrendingUp className="h-5 w-5 text-green-600" />
            </CardTitle>
            <CardDescription>
              Latest: {latestData?.registrations.toLocaleString()} new businesses
              <Badge className="ml-2 bg-green-100 text-green-800">+{monthlyGrowth}% MoM</Badge>
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>

        <div className="flex gap-2 mt-4">
          {periodOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedPeriod === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{latestData?.registrations.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Monthly Registrations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{latestData?.cumulative.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Active</div>
          </div>
        </div>

        <ChartContainer
          config={{
            registrations: {
              label: "New Registrations",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => value.toLocaleString()} />
              <Tooltip
                content={<ChartTooltipContent />}
                formatter={(value: any) => [value.toLocaleString(), "New Registrations"]}
              />
              <Area
                type="monotone"
                dataKey="registrations"
                stroke="var(--color-registrations)"
                fill="var(--color-registrations)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Business Climate:</strong> Uganda shows strong entrepreneurial growth with {monthlyGrowth}%
            month-over-month increase in new business registrations. This indicates a healthy business environment and
            growing economic confidence.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

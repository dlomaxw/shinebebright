"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useHistoricalData } from "@/hooks/use-historical-data"
import { BarChart3, Download } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const periodOptions = [
  { value: "3Y", label: "3 Years" },
  { value: "5Y", label: "5 Years" },
  { value: "10Y", label: "10 Years" },
]

export function GDPTrendsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("5Y")
  const { data, loading, error } = useHistoricalData("gdp", selectedPeriod)

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

  const latestGDP = data[data.length - 1]
  const averageGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length

  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Period,GDP (Billion USD),Growth Rate (%)\n" +
      data.map((row) => `${row.period},${row.gdp},${row.growth}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `gdp_trends_${selectedPeriod}.csv`)
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
              <BarChart3 className="h-5 w-5" />
              Uganda GDP Growth Trends
            </CardTitle>
            <CardDescription>
              Current GDP: ${latestGDP?.gdp}B
              <Badge className="ml-2 bg-green-100 text-green-800">{latestGDP?.growth}% growth</Badge>
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
            <div className="text-2xl font-bold text-blue-600">${latestGDP?.gdp}B</div>
            <div className="text-sm text-muted-foreground">Current GDP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{averageGrowth.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Average Growth</div>
          </div>
        </div>

        <ChartContainer
          config={{
            gdp: {
              label: "GDP (Billion USD)",
              color: "hsl(var(--chart-1))",
            },
            growth: {
              label: "Growth Rate (%)",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                content={<ChartTooltipContent />}
                formatter={(value: any, name: string | undefined) => [
                  name === "gdp" ? `$${value}B` : `${value}%`,
                  name === "gdp" ? "GDP" : "Growth Rate",
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="gdp" fill="var(--color-gdp)" name="GDP (Billion USD)" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="growth"
                stroke="var(--color-growth)"
                name="Growth Rate (%)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Analysis:</strong> Uganda's GDP has grown consistently with an average growth rate of{" "}
            {averageGrowth.toFixed(1)}% over the selected period. The economy shows{" "}
            {latestGDP?.growth > averageGrowth ? "above-average" : "steady"} performance in the latest quarter.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

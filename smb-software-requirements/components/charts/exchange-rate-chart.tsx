"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useHistoricalData } from "@/hooks/use-historical-data"
import { TrendingUp, TrendingDown, Download, Maximize2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { AIEnhancedChart } from "./ai-enhanced-chart"

const periodOptions = [
  { value: "1M", label: "1 Month" },
  { value: "3M", label: "3 Months" },
  { value: "6M", label: "6 Months" },
  { value: "1Y", label: "1 Year" },
  { value: "2Y", label: "2 Years" },
]

export function ExchangeRateChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { data, loading, error } = useHistoricalData("exchange-rates", selectedPeriod)

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

  const currentRate = data[data.length - 1]?.rate || 0
  const previousRate = data[data.length - 2]?.rate || 0
  const change = currentRate - previousRate
  const changePercent = ((change / previousRate) * 100).toFixed(2)

  const averageRate = data.reduce((sum, item) => sum + item.rate, 0) / data.length
  const maxRate = Math.max(...data.map((item) => item.rate))
  const minRate = Math.min(...data.map((item) => item.rate))

  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Rate,Change,Volume\n" +
      data.map((row) => `${row.date},${row.rate},${row.change},${row.volume}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `exchange_rates_${selectedPeriod}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const chartComponent = (
    <Card className={isFullscreen ? "fixed inset-4 z-50 bg-white" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              USD/UGX Exchange Rate Trends
              {change > 0 ? (
                <TrendingUp className="h-5 w-5 text-red-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-green-600" />
              )}
            </CardTitle>
            <CardDescription>
              Current: {currentRate.toLocaleString()} UGX
              <Badge className={`ml-2 ${change > 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                {change > 0 ? "+" : ""}
                {changePercent}%
              </Badge>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
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
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{minRate.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Minimum</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{Math.round(averageRate).toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{maxRate.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Maximum</div>
          </div>
        </div>

        <ChartContainer
          config={{
            rate: {
              label: "Exchange Rate",
              color: "hsl(var(--chart-1))",
            },
          }}
          className={isFullscreen ? "h-96" : "h-64"}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
              />
              <YAxis domain={["dataMin - 50", "dataMax + 50"]} tickFormatter={(value) => value.toLocaleString()} />
              <Tooltip
                content={<ChartTooltipContent />}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: any) => [value.toLocaleString() + " UGX", "Rate"]}
              />
              <ReferenceLine y={averageRate} stroke="#888" strokeDasharray="5 5" label="Average" />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="var(--color-rate)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )

  return (
    <AIEnhancedChart chartData={data} chartType="Exchange Rate">
      {chartComponent}
    </AIEnhancedChart>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useHistoricalData } from "@/hooks/use-historical-data"
import { Coffee, TrendingUp, TrendingDown, Download } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const periodOptions = [
  { value: "6M", label: "6 Months" },
  { value: "1Y", label: "1 Year" },
  { value: "2Y", label: "2 Years" },
]

export function CoffeePricesChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y")
  const { data, loading, error } = useHistoricalData("coffee-prices", selectedPeriod)

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

  const latestPrice = data[data.length - 1]
  const previousPrice = data[data.length - 8] // Week ago
  const weeklyChange = latestPrice?.arabica - previousPrice?.arabica || 0
  const weeklyChangePercent = ((weeklyChange / previousPrice?.arabica) * 100).toFixed(2)

  const avgArabica = data.reduce((sum, item) => sum + item.arabica, 0) / data.length
  const avgRobusta = data.reduce((sum, item) => sum + item.robusta, 0) / data.length

  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Arabica Price,Robusta Price,Volume\n" +
      data.map((row) => `${row.date},${row.arabica},${row.robusta},${row.volume}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `coffee_prices_${selectedPeriod}.csv`)
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
              <Coffee className="h-5 w-5" />
              Uganda Coffee Prices Trends
              {weeklyChange > 0 ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600" />
              )}
            </CardTitle>
            <CardDescription>
              Arabica: ${latestPrice?.arabica}/kg
              <Badge className={`ml-2 ${weeklyChange > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {weeklyChange > 0 ? "+" : ""}
                {weeklyChangePercent}% (7d)
              </Badge>
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
            <div className="text-2xl font-bold text-amber-600">${avgArabica.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Avg Arabica Price</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-800">${avgRobusta.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Avg Robusta Price</div>
          </div>
        </div>

        <ChartContainer
          config={{
            arabica: {
              label: "Arabica",
              color: "hsl(var(--chart-1))",
            },
            robusta: {
              label: "Robusta",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-64"
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
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                content={<ChartTooltipContent />}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: any, name: string | undefined) => [
                  `$${value}/kg`,
                  name === "arabica" ? "Arabica" : "Robusta",
                ]}
              />
              <Legend />
              <Line type="monotone" dataKey="arabica" stroke="var(--color-arabica)" strokeWidth={2} name="Arabica" />
              <Line type="monotone" dataKey="robusta" stroke="var(--color-robusta)" strokeWidth={2} name="Robusta" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Market Insight:</strong> Coffee prices show{" "}
            {weeklyChange > 0 ? "upward momentum" : "downward pressure"}
            with Arabica at ${latestPrice?.arabica}/kg. This {weeklyChange > 0 ? "benefits" : "challenges"} Ugandan
            coffee exporters who primarily grow Arabica varieties.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

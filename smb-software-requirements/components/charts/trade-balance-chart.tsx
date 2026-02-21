"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useHistoricalData } from "@/hooks/use-historical-data"
import { TrendingUp, TrendingDown, Download, Import, ImportIcon as Export } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const periodOptions = [
  { value: "2Y", label: "2 Years" },
  { value: "3Y", label: "3 Years" },
  { value: "5Y", label: "5 Years" },
]

export function TradeBalanceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("3Y")
  const { data, loading, error } = useHistoricalData("trade-data", selectedPeriod)

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
  const avgBalance = data.reduce((sum, item) => sum + item.balance, 0) / data.length

  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Period,Exports (B USD),Imports (B USD),Balance (B USD)\n" +
      data.map((row) => `${row.period},${row.exports},${row.imports},${row.balance}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `trade_balance_${selectedPeriod}.csv`)
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
              <div className="flex items-center gap-1">
                <Export className="h-4 w-4 text-green-600" />
                <Import className="h-4 w-4 text-red-600" />
              </div>
              Uganda Trade Balance Trends
              {latestData?.balance > 0 ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600" />
              )}
            </CardTitle>
            <CardDescription>
              Current Balance: ${latestData?.balance}B
              <Badge
                className={`ml-2 ${latestData?.balance > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {latestData?.balance > 0 ? "Surplus" : "Deficit"}
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
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">${latestData?.exports}B</div>
            <div className="text-sm text-muted-foreground">Current Exports</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">${latestData?.imports}B</div>
            <div className="text-sm text-muted-foreground">Current Imports</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${avgBalance > 0 ? "text-green-600" : "text-red-600"}`}>
              ${avgBalance.toFixed(1)}B
            </div>
            <div className="text-sm text-muted-foreground">Avg Balance</div>
          </div>
        </div>

        <ChartContainer
          config={{
            exports: {
              label: "Exports",
              color: "hsl(var(--chart-1))",
            },
            imports: {
              label: "Imports",
              color: "hsl(var(--chart-2))",
            },
            balance: {
              label: "Balance",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip
                content={<ChartTooltipContent />}
                formatter={(value: any, name: string | undefined) => [
                  `$${value}B`,
                  name ? name.charAt(0).toUpperCase() + name.slice(1) : "",
                ]}
              />
              <Legend />
              <Bar dataKey="exports" fill="var(--color-exports)" name="Exports" />
              <Bar dataKey="imports" fill="var(--color-imports)" name="Imports" />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="var(--color-balance)"
                name="Trade Balance"
                strokeWidth={3}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Trade Analysis:</strong> Uganda maintains a trade {latestData?.balance > 0 ? "surplus" : "deficit"}
            of ${Math.abs(latestData?.balance)}B. Key exports include coffee, tea, and gold, while imports are dominated
            by machinery, petroleum, and manufactured goods.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

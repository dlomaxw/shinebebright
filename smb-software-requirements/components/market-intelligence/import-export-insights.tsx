"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

const tradeData = [
  {
    type: "Coffee Exports",
    volume: "125,000 tons",
    value: "$420M",
    change: "+15.2%",
    trend: "up",
    destination: "Europe, USA",
  },
  {
    type: "Tea Exports",
    volume: "65,000 tons",
    value: "$180M",
    change: "+8.7%",
    trend: "up",
    destination: "Middle East, Europe",
  },
  {
    type: "Machinery Imports",
    volume: "45,000 units",
    value: "$320M",
    change: "+12.3%",
    trend: "up",
    origin: "China, India",
  },
  {
    type: "Fuel Imports",
    volume: "2.1M barrels",
    value: "$890M",
    change: "-5.4%",
    trend: "down",
    origin: "Middle East",
  },
]

export function ImportExportInsights() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tradeData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{item.type}</CardTitle>
                {item.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-lg font-bold">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.volume}</div>
                <div className={`text-xs ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {item.change} vs last year
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.destination || item.origin}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

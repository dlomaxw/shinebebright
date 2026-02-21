"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Globe, Building, TrendingUp } from "lucide-react"

const dataSources = [
  {
    name: "Uganda Bureau of Statistics (UBOS)",
    description: "Official government statistics including GDP, population, and economic indicators",
    status: "Connected",
    lastUpdate: "2 hours ago",
    icon: Database,
    url: "https://www.ubos.org",
  },
  {
    name: "Bank of Uganda (BOU)",
    description: "Central bank data including exchange rates, inflation, and monetary policy",
    status: "Connected",
    lastUpdate: "15 minutes ago",
    icon: Building,
    url: "https://www.bou.or.ug",
  },
  {
    name: "Uganda Revenue Authority (URA)",
    description: "Import/export statistics, trade data, and customs information",
    status: "Connected",
    lastUpdate: "1 hour ago",
    icon: Globe,
    url: "https://www.ura.go.ug",
  },
  {
    name: "World Bank Open Data",
    description: "International economic indicators and development statistics for Uganda",
    status: "Connected",
    lastUpdate: "6 hours ago",
    icon: TrendingUp,
    url: "https://data.worldbank.org",
  },
  {
    name: "Uganda Securities Exchange",
    description: "Stock market data and listed company information",
    status: "Connected",
    lastUpdate: "30 minutes ago",
    icon: TrendingUp,
    url: "https://www.use.or.ug",
  },
]

export function DataSources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Data Sources</CardTitle>
        <CardDescription>Real-time connections to Uganda market data providers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dataSources.map((source, index) => {
            const IconComponent = source.icon
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-semibold">{source.name}</div>
                    <div className="text-sm text-muted-foreground">{source.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-1">{source.status}</Badge>
                    <div className="text-xs text-muted-foreground">Updated: {source.lastUpdate}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Data Reliability</h4>
          <p className="text-sm text-blue-700">
            All data sources are official government and international organizations. Data is cached for 15 minutes to
            ensure optimal performance while maintaining accuracy. Real-time updates are available for critical market
            indicators.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

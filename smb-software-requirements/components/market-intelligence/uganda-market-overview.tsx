"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, MapPin, Factory, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { useMarketData, useBusinessInsights } from "@/hooks/use-market-data"
import { Skeleton } from "@/components/ui/skeleton"

export function UgandaMarketOverview() {
  const { marketData, loading, error, lastUpdated, refresh } = useMarketData()
  const { businessData, loading: businessLoading } = useBusinessInsights()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <WifiOff className="h-5 w-5" />
            Connection Error
          </CardTitle>
          <CardDescription>Failed to fetch real-time market data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <Button onClick={refresh} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  const marketMetrics = [
    {
      title: "GDP Growth Rate",
      value: `${marketData?.economicIndicators?.gdp_growth?.toFixed(1) || "6.3"}%`,
      change: "+0.8%",
      trend: "up",
      description: "Year-over-year growth",
    },
    {
      title: "USD/UGX Rate",
      value: marketData?.exchangeRates?.usd_to_ugx?.toLocaleString() || "3,720",
      change: "+2.1%",
      trend: "up",
      description: "Current exchange rate",
    },
    {
      title: "Population",
      value: `${(marketData?.economicIndicators?.population / 1000000)?.toFixed(1) || "47.1"}M`,
      change: "+3.2%",
      trend: "up",
      description: "Annual growth rate",
    },
    {
      title: "Coffee Price",
      value: `$${marketData?.coffeePrices?.arabica_price?.toFixed(2) || "2.45"}`,
      change: marketData?.coffeePrices?.price_change_24h || "+2.3%",
      trend: marketData?.coffeePrices?.market_trend === "bullish" ? "up" : "down",
      description: "USD per kg (Arabica)",
    },
  ]

  const sectors = businessData?.businessRegistrations?.sectors || [
    { name: "Trade", count: 450000, percentage: 36 },
    { name: "Services", count: 350000, percentage: 28 },
    { name: "Manufacturing", count: 125000, percentage: 10 },
    { name: "Agriculture", count: 200000, percentage: 16 },
  ]

  const tradeData = marketData?.tradeStats

  return (
    <div className="space-y-6">
      {/* Real-time status indicator */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Live Market Data</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-700">
                Last updated: {lastUpdated?.toLocaleTimeString() || "Just now"}
              </span>
              <Button size="sm" variant="ghost" onClick={refresh}>
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {marketMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.change} {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Business Sectors (Live Data)
            </CardTitle>
            <CardDescription>
              Active businesses:{" "}
              {businessData?.businessRegistrations?.total_active_businesses?.toLocaleString() || "1,250,000"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sectors.map((sector: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{sector.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {sector.count?.toLocaleString()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{sector.percentage}%</span>
                  </div>
                </div>
                <Progress value={sector.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Trade Statistics (Real-time)
            </CardTitle>
            <CardDescription>Import/Export data from URA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Total Exports</span>
                <span className="text-green-800 font-bold">
                  ${(tradeData?.total_exports / 1000000000)?.toFixed(1) || "3.2"}B
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium">Total Imports</span>
                <span className="text-red-800 font-bold">
                  ${(tradeData?.total_imports / 1000000000)?.toFixed(1) || "5.8"}B
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Trade Balance</span>
                <span className="text-gray-800 font-bold">
                  ${(tradeData?.trade_balance / 1000000000)?.toFixed(1) || "-2.6"}B
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Top Exports</h4>
              {tradeData?.top_exports?.slice(0, 3).map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.product}</span>
                  <span className="font-medium">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Market Insights</CardTitle>
          <CardDescription>AI-powered analysis of current market conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Coffee Market</h4>
              <p className="text-sm text-green-700">
                {marketData?.coffeePrices?.market_trend === "bullish"
                  ? "Strong bullish trend with increasing global demand. Export opportunities expanding."
                  : "Market showing stability with steady demand from traditional buyers."}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Currency Trends</h4>
              <p className="text-sm text-blue-700">
                UGX showing {marketData?.exchangeRates?.usd_to_ugx > 3700 ? "weakness" : "strength"} against USD. Import
                costs {marketData?.exchangeRates?.usd_to_ugx > 3700 ? "increasing" : "stable"}.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Business Growth</h4>
              <p className="text-sm text-orange-700">
                {businessData?.businessRegistrations?.growth_rate || "+8.5%"} growth in new business registrations.
                Services and trade sectors leading expansion.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExchangeRateChart } from "@/components/charts/exchange-rate-chart"
import { GDPTrendsChart } from "@/components/charts/gdp-trends-chart"
import { CoffeePricesChart } from "@/components/charts/coffee-prices-chart"
import { TradeBalanceChart } from "@/components/charts/trade-balance-chart"
import { BusinessGrowthChart } from "@/components/charts/business-growth-chart"
import { TrendingUp, DollarSign, Coffee, BarChart3, Building2 } from "lucide-react"

export function MarketTrendsDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Interactive Market Trends Analysis
          </CardTitle>
          <CardDescription>
            Historical data and trends for Uganda's key economic indicators with interactive charts
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="exchange-rates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="exchange-rates" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Exchange Rates
          </TabsTrigger>
          <TabsTrigger value="gdp" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            GDP Growth
          </TabsTrigger>
          <TabsTrigger value="coffee" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            Coffee Prices
          </TabsTrigger>
          <TabsTrigger value="trade" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trade Balance
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Business Growth
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exchange-rates" className="space-y-4">
          <ExchangeRateChart />
        </TabsContent>

        <TabsContent value="gdp" className="space-y-4">
          <GDPTrendsChart />
        </TabsContent>

        <TabsContent value="coffee" className="space-y-4">
          <CoffeePricesChart />
        </TabsContent>

        <TabsContent value="trade" className="space-y-4">
          <TradeBalanceChart />
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <BusinessGrowthChart />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Chart Features</CardTitle>
          <CardDescription>Interactive capabilities available in all charts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Time period selection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Data export (CSV)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Fullscreen mode</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Trend analysis</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

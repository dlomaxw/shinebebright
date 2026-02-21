"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UgandaMarketOverview } from "./uganda-market-overview"
import { ImportExportInsights } from "./import-export-insights"
import { FactoryIntelligence } from "./factory-intelligence"
import { CompetitorAnalysis } from "./competitor-analysis"
import { MarketOpportunities } from "./market-opportunities"
import { MarketTrendsDashboard } from "./market-trends-dashboard"
import { AIMarketInsights } from "@/components/ai/ai-market-insights"
import { LiveMarketInsights } from "./live-market-insights"

export function MarketIntelligencePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Market Intelligence</h2>
          <p className="text-muted-foreground">AI-powered insights for the Ugandan and East African markets</p>
        </div>
      </div>

      <Tabs defaultValue="ai-insights" className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="ai-insights">Grok AI</TabsTrigger>
          <TabsTrigger value="live">Live Data</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="import-export">Trade</TabsTrigger>
          <TabsTrigger value="factories">Factories</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-insights" className="space-y-4">
          <AIMarketInsights />
        </TabsContent>

        <TabsContent value="live" className="space-y-4">
          <LiveMarketInsights />
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <UgandaMarketOverview />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <MarketTrendsDashboard />
        </TabsContent>

        <TabsContent value="import-export" className="space-y-4">
          <ImportExportInsights />
        </TabsContent>

        <TabsContent value="factories" className="space-y-4">
          <FactoryIntelligence />
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <CompetitorAnalysis />
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <MarketOpportunities />
        </TabsContent>
      </Tabs>
    </div>
  )
}

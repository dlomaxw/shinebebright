"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FactoryOverview } from "./factory-overview"
import { ProductionTracking } from "./production-tracking"
import { SupplyChain } from "./supply-chain"
import { QualityControl } from "./quality-control"
import { FactoryAnalytics } from "./factory-analytics"

export function FactoriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Factory Management</h2>
          <p className="text-muted-foreground">Monitor and manage manufacturing operations across East Africa</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <FactoryOverview />
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <ProductionTracking />
        </TabsContent>

        <TabsContent value="supply-chain" className="space-y-4">
          <SupplyChain />
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <QualityControl />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <FactoryAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfitabilityOverview } from "@/components/analytics/profitability-overview"
import { ClientProfitability } from "@/components/analytics/client-profitability"
import { ProjectProfitability } from "@/components/analytics/project-profitability"
import { FinancialReports } from "@/components/analytics/financial-reports"

export function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics & Reporting</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Profitability Overview</TabsTrigger>
          <TabsTrigger value="clients">Client Profitability</TabsTrigger>
          <TabsTrigger value="projects">Project Profitability</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <ProfitabilityOverview />
        </TabsContent>
        <TabsContent value="clients" className="space-y-4">
          <ClientProfitability />
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <ProjectProfitability />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <FinancialReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImportTracker } from "./import-tracker"
import { ExportTracker } from "./export-tracker"
import { CustomsDocuments } from "./customs-documents"
import { TradeRoutes } from "./trade-routes"
import { ShipmentTracking } from "./shipment-tracking"

export function ImportExportPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Import/Export Management</h2>
          <p className="text-muted-foreground">Manage cross-border trade operations across East Africa</p>
        </div>
      </div>

      <Tabs defaultValue="imports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="imports">Imports</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
          <TabsTrigger value="customs">Customs</TabsTrigger>
          <TabsTrigger value="routes">Trade Routes</TabsTrigger>
          <TabsTrigger value="tracking">Shipments</TabsTrigger>
        </TabsList>

        <TabsContent value="imports" className="space-y-4">
          <ImportTracker />
        </TabsContent>

        <TabsContent value="exports" className="space-y-4">
          <ExportTracker />
        </TabsContent>

        <TabsContent value="customs" className="space-y-4">
          <CustomsDocuments />
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <TradeRoutes />
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <ShipmentTracking />
        </TabsContent>
      </Tabs>
    </div>
  )
}

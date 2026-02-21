"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ShipmentTracking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Tracking</CardTitle>
      </CardHeader>
      <CardContent>{"Real-time shipment status and ETAs will appear here."}</CardContent>
    </Card>
  )
}

export default ShipmentTracking

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Clock, MapPin } from "lucide-react"

const exports = [
  {
    id: "EXP-2024-001",
    buyer: "European Coffee Importers",
    product: "Arabica Coffee Beans",
    value: "$280,000",
    status: "Shipped",
    eta: "2024-01-20",
    destination: "Hamburg, Germany",
  },
  {
    id: "EXP-2024-002",
    buyer: "Middle East Tea Co.",
    product: "Black Tea",
    value: "$95,000",
    status: "Processing",
    eta: "2024-01-18",
    destination: "Dubai, UAE",
  },
  {
    id: "EXP-2024-003",
    buyer: "African Textiles Ltd",
    product: "Cotton Fabric",
    value: "$150,000",
    status: "Ready to Ship",
    eta: "2024-01-16",
    destination: "Lagos, Nigeria",
  },
]

export function ExportTracker() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Export Shipments</h3>
        <Button>Add New Export</Button>
      </div>

      <div className="grid gap-4">
        {exports.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  {item.id}
                </CardTitle>
                <Badge
                  className={
                    item.status === "Shipped"
                      ? "bg-green-100 text-green-800"
                      : item.status === "Ready to Ship"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {item.status}
                </Badge>
              </div>
              <CardDescription>{item.buyer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <div className="text-sm text-muted-foreground">Product</div>
                  <div className="font-medium">{item.product}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Value</div>
                  <div className="font-medium">{item.value}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ETA
                  </div>
                  <div className="font-medium">{item.eta}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Destination
                  </div>
                  <div className="font-medium">{item.destination}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

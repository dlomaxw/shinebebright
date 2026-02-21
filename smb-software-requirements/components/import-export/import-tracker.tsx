"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Clock, MapPin } from "lucide-react"

const imports = [
  {
    id: "IMP-2024-001",
    supplier: "Shanghai Manufacturing Co.",
    product: "Industrial Machinery",
    value: "$125,000",
    status: "In Transit",
    eta: "2024-01-15",
    port: "Mombasa",
  },
  {
    id: "IMP-2024-002",
    supplier: "Mumbai Textiles Ltd",
    product: "Raw Cotton",
    value: "$45,000",
    status: "Customs Clearance",
    eta: "2024-01-12",
    port: "Dar es Salaam",
  },
  {
    id: "IMP-2024-003",
    supplier: "Dubai Electronics",
    product: "Computer Components",
    value: "$78,000",
    status: "Delivered",
    eta: "2024-01-10",
    port: "Entebbe",
  },
]

export function ImportTracker() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Import Shipments</h3>
        <Button>Add New Import</Button>
      </div>

      <div className="grid gap-4">
        {imports.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {item.id}
                </CardTitle>
                <Badge
                  className={
                    item.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : item.status === "In Transit"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {item.status}
                </Badge>
              </div>
              <CardDescription>{item.supplier}</CardDescription>
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
                    Port
                  </div>
                  <div className="font-medium">{item.port}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

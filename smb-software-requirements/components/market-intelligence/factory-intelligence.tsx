"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Factory, MapPin, Users } from "lucide-react"

const factories = [
  {
    name: "Kampala Textile Mills",
    location: "Kampala Industrial Area",
    type: "Textile Manufacturing",
    capacity: "85%",
    employees: 450,
    status: "Active",
  },
  {
    name: "Jinja Steel Works",
    location: "Jinja",
    type: "Steel Production",
    capacity: "92%",
    employees: 320,
    status: "Active",
  },
  {
    name: "Mukono Food Processing",
    location: "Mukono",
    type: "Food Processing",
    capacity: "78%",
    employees: 180,
    status: "Active",
  },
  {
    name: "Mbale Coffee Processing",
    location: "Mbale",
    type: "Coffee Processing",
    capacity: "95%",
    employees: 120,
    status: "Peak Season",
  },
]

export function FactoryIntelligence() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {factories.map((factory, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Factory className="h-5 w-5" />
                  {factory.name}
                </CardTitle>
                <Badge
                  className={
                    factory.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : factory.status === "Peak Season"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                  }
                >
                  {factory.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {factory.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <span className="text-sm font-medium">{factory.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Capacity:</span>
                  <span className="text-sm font-medium">{factory.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Employees:
                  </span>
                  <span className="text-sm font-medium">{factory.employees}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

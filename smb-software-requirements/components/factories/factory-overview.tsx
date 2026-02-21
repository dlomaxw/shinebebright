"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Factory, TrendingUp } from "lucide-react"

const factoryMetrics = [
  {
    title: "Total Production",
    value: "12,450",
    unit: "units",
    change: "+8.2%",
    trend: "up",
  },
  {
    title: "Capacity Utilization",
    value: "87%",
    unit: "",
    change: "+5.1%",
    trend: "up",
  },
  {
    title: "Active Workers",
    value: "1,240",
    unit: "employees",
    change: "+12",
    trend: "up",
  },
  {
    title: "Quality Score",
    value: "94.5%",
    unit: "",
    change: "+2.3%",
    trend: "up",
  },
]

const factories = [
  {
    name: "Kampala Textile Mills",
    location: "Kampala Industrial Area",
    capacity: 85,
    production: "2,450 units/day",
    status: "Operational",
  },
  {
    name: "Jinja Steel Works",
    location: "Jinja",
    capacity: 92,
    production: "180 tons/day",
    status: "Peak Production",
  },
  {
    name: "Mukono Food Processing",
    location: "Mukono",
    capacity: 78,
    production: "5,200 packages/day",
    status: "Operational",
  },
]

export function FactoryOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {factoryMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-green-600">{metric.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Factory Status Overview</CardTitle>
          <CardDescription>Real-time status of all manufacturing facilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {factories.map((factory, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Factory className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-semibold">{factory.name}</div>
                    <div className="text-sm text-muted-foreground">{factory.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{factory.production}</div>
                    <div className="text-xs text-muted-foreground">Current Production</div>
                  </div>
                  <div className="w-24">
                    <div className="text-xs text-muted-foreground mb-1">Capacity</div>
                    <Progress value={factory.capacity} className="h-2" />
                    <div className="text-xs text-center mt-1">{factory.capacity}%</div>
                  </div>
                  <Badge
                    className={
                      factory.status === "Peak Production"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {factory.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

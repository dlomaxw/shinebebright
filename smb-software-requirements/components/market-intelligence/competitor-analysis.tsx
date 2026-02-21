"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Target } from "lucide-react"

const competitors = [
  {
    name: "East Africa Trading Co.",
    sector: "Import/Export",
    marketShare: 15,
    revenue: "$45M",
    growth: "+12%",
    strength: "Strong logistics network",
  },
  {
    name: "Uganda Coffee Exporters",
    sector: "Coffee Export",
    marketShare: 22,
    revenue: "$78M",
    growth: "+18%",
    strength: "Premium quality focus",
  },
  {
    name: "Kampala Manufacturing Ltd",
    sector: "Manufacturing",
    marketShare: 8,
    revenue: "$32M",
    growth: "+6%",
    strength: "Local market presence",
  },
  {
    name: "Nile Valley Textiles",
    sector: "Textile",
    marketShare: 12,
    revenue: "$28M",
    growth: "+9%",
    strength: "Cost-effective production",
  },
]

export function CompetitorAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {competitors.map((competitor, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{competitor.name}</CardTitle>
                <Badge variant="outline">{competitor.sector}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-muted-foreground">Market Share</span>
                  </div>
                  <div className="text-lg font-bold">{competitor.marketShare}%</div>
                  <Progress value={competitor.marketShare} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Revenue</span>
                  </div>
                  <div className="text-lg font-bold">{competitor.revenue}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-muted-foreground">Growth</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">{competitor.growth}</div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Key Strength</span>
                  <div className="text-sm">{competitor.strength}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, Users, MapPin, Clock } from "lucide-react"
import { toast } from "sonner"

const opportunities = [
  {
    title: "Organic Coffee Export to EU",
    description:
      "Growing demand for organic coffee in European markets. Uganda's climate ideal for organic production.",
    potential: "High",
    investment: "$2.5M",
    timeframe: "6-12 months",
    market: "Europe",
    confidence: 92,
  },
  {
    title: "Mobile Payment Solutions for Rural Areas",
    description: "Underserved rural markets with growing smartphone adoption. Opportunity for fintech expansion.",
    potential: "Medium",
    investment: "$800K",
    timeframe: "3-6 months",
    market: "Uganda Rural",
    confidence: 85,
  },
  {
    title: "Solar Panel Manufacturing",
    description: "Government incentives for renewable energy. Growing demand across East Africa.",
    potential: "High",
    investment: "$5M",
    timeframe: "12-18 months",
    market: "East Africa",
    confidence: 78,
  },
  {
    title: "E-commerce Platform for SMEs",
    description: "Small businesses need digital presence. Limited competition in local market.",
    potential: "Medium",
    investment: "$1.2M",
    timeframe: "4-8 months",
    market: "Uganda",
    confidence: 88,
  },
]

export function MarketOpportunities() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {opportunities.map((opportunity, index) => (
          <Card key={index} className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  {opportunity.title}
                </CardTitle>
                <Badge
                  className={
                    opportunity.potential === "High" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {opportunity.potential} Potential
                </Badge>
              </div>
              <CardDescription>{opportunity.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    Investment
                  </div>
                  <div className="font-semibold">{opportunity.investment}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Timeframe
                  </div>
                  <div className="font-semibold">{opportunity.timeframe}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    Market
                  </div>
                  <div className="font-semibold">{opportunity.market}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    Confidence
                  </div>
                  <div className="font-semibold">{opportunity.confidence}%</div>
                </div>
                <div className="space-y-1">
                  <Button size="sm" className="w-full" onClick={() => toast.success("Opportunity Explored", { description: "You are actively exploring " + opportunity.title })}>
                    Explore Opportunity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

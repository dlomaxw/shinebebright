"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import Link from "next/link"

const marketData = [
  {
    sector: "Agriculture",
    growth: "+12.5%",
    trend: "up",
    description: "Coffee and tea exports showing strong growth",
  },
  {
    sector: "Manufacturing",
    growth: "+8.3%",
    trend: "up",
    description: "Textile and food processing leading expansion",
  },
  {
    sector: "Technology",
    growth: "+25.7%",
    trend: "up",
    description: "Mobile money and fintech driving innovation",
  },
  {
    sector: "Construction",
    growth: "+15.2%",
    trend: "up",
    description: "Infrastructure projects boosting sector growth",
  },
]

export function MarketInsights() {
  return (
    <section id="market-insights" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800">Market Intelligence</Badge>
          <h2 className="text-3xl font-bold mb-4">Real-Time Uganda Market Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with AI-powered market intelligence specifically tailored for the Ugandan business environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketData.map((data, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-center mb-2">
                  {data.trend === "up" ? (
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <CardTitle className="text-lg">{data.sector}</CardTitle>
                <div className={`text-2xl font-bold ${data.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {data.growth}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{data.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-orange-600">
            <Link href="/market-intelligence">
              Explore Full Market Intelligence <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

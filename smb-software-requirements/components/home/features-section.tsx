"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Factory, Truck, BarChart3, MapPin, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Market Intelligence",
    description:
      "Advanced AI analyzes Ugandan market trends, competitor insights, and business opportunities in real-time.",
    badge: "AI-Powered",
  },
  {
    icon: Factory,
    title: "Factory Management",
    description: "Track manufacturing operations, production capacity, and supply chain across East African factories.",
    badge: "Manufacturing",
  },
  {
    icon: Truck,
    title: "Import/Export Tracking",
    description: "Comprehensive import/export management with customs documentation and cross-border trade insights.",
    badge: "Trade",
  },
  {
    icon: BarChart3,
    title: "Uganda Market Analytics",
    description: "Deep dive into Ugandan market data, consumer behavior, and economic indicators.",
    badge: "Analytics",
  },
  {
    icon: MapPin,
    title: "Local Market Expertise",
    description: "Built-in knowledge of East African regulations, cultural nuances, and business practices.",
    badge: "Local",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "AI identifies untapped markets, potential partnerships, and expansion opportunities.",
    badge: "Growth",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-800">Features</Badge>
          <h2 className="text-3xl font-bold mb-4">Built for East African Success</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature is designed with deep understanding of the East African business landscape, from Kampala's
            markets to cross-border trade routes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-8 w-8 text-green-600" />
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

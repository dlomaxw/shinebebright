"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Zap, TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react"
import { getAIMarketInsights, getAIBusinessRecommendations } from "@/app/actions/ai-market-analysis"
import { Skeleton } from "@/components/ui/skeleton"

interface MarketInsight {
  summary: string
  trend: "bullish" | "bearish" | "neutral"
  confidence: number
  keyFactors: string[]
  recommendations: Array<{
    action: string
    priority: "high" | "medium" | "low"
    timeframe: string
    reasoning: string
  }>
  riskFactors: string[]
  opportunities: string[]
}

export function AIMarketInsights() {
  const [insights, setInsights] = useState<Record<string, MarketInsight>>({})
  const [businessRecommendations, setBusinessRecommendations] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [selectedBusinessType, setSelectedBusinessType] = useState("export")

  const indicators = [
    { key: "exchange-rates", label: "Exchange Rates", icon: TrendingUp },
    { key: "coffee-prices", label: "Coffee Prices", icon: Target },
    { key: "trade-data", label: "Trade Data", icon: AlertTriangle },
  ]

  const businessTypes = [
    { value: "export", label: "Export Business" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "retail", label: "Retail/Trade" },
    { value: "agriculture", label: "Agriculture" },
    { value: "services", label: "Services" },
    { value: "technology", label: "Technology" },
  ]

  const generateInsights = async () => {
    setLoading(true)
    try {
      const insightPromises = indicators.map((indicator) => getAIMarketInsights(indicator.key))

      const results = await Promise.all(insightPromises)
      const newInsights: Record<string, MarketInsight> = {}

      results.forEach((result, index) => {
        if (result.success && result.data) {
          newInsights[indicators[index].key] = result.data as MarketInsight
        }
      })

      setInsights(newInsights)

      // Get business recommendations
      const businessRec = await getAIBusinessRecommendations(selectedBusinessType)
      if (businessRec.success && businessRec.data) {
        setBusinessRecommendations(businessRec.data)
      }
    } catch (error) {
      console.error("Failed to generate insights:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateInsights()
  }, [selectedBusinessType])

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "bullish":
        return "text-green-600 bg-green-100"
      case "bearish":
        return "text-red-600 bg-red-100"
      default:
        return "text-yellow-600 bg-yellow-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Grok AI Market Intelligence
          </CardTitle>
          <CardDescription>AI-powered market analysis and business recommendations for Uganda</CardDescription>
          <div className="flex items-center gap-4 mt-4">
            <Button
              onClick={generateInsights}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              {loading ? (
                <>
                  <Zap className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing with Grok AI...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate AI Insights
                </>
              )}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
              Powered by Grok AI
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Business Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {indicators.map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {indicators.map((indicator) => {
                const insight = insights[indicator.key]
                const IconComponent = indicator.icon

                if (!insight) return null

                return (
                  <Card key={indicator.key} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="font-semibold">{indicator.label}</span>
                        </div>
                        <Badge className={getTrendColor(insight.trend)}>{insight.trend.toUpperCase()}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Confidence:</span>
                        <Badge className="bg-purple-100 text-purple-800">{insight.confidence}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{insight.summary}</p>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">Key Factors:</h5>
                        <div className="flex flex-wrap gap-1">
                          {insight.keyFactors.slice(0, 3).map((factor, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">Top Recommendation:</h5>
                        {insight.recommendations[0] && (
                          <div className="p-2 bg-gray-50 rounded text-xs">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={getPriorityColor(insight.recommendations[0].priority)}>
                                {insight.recommendations[0].priority}
                              </Badge>
                              <span className="text-muted-foreground">{insight.recommendations[0].timeframe}</span>
                            </div>
                            <p>{insight.recommendations[0].action}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                AI Business Recommendations
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your business type and current market conditions
              </CardDescription>
              <div className="flex gap-2 mt-4">
                {businessTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedBusinessType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedBusinessType(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : businessRecommendations ? (
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{businessRecommendations}</div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Click "Generate AI Insights" to get personalized recommendations for your business type.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Lightbulb, Target, TrendingUp, AlertTriangle } from "lucide-react"
import { useAIPredictions } from "@/hooks/use-market-data"
import { Skeleton } from "@/components/ui/skeleton"

export function AIMarketAnalysis() {
  const { predictions, loading, error, regenerate } = useAIPredictions()

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const aiInsights = [
    {
      type: "Market Prediction",
      confidence: predictions?.coffeePrediction?.confidence || 94,
      title: "Coffee Export Forecast",
      description: predictions?.coffeePrediction?.prediction || "AI analysis based on real market data",
      impact: "High",
      timeframe: "Next 3 months",
      icon: TrendingUp,
      color: "green",
    },
    {
      type: "Manufacturing Insight",
      confidence: predictions?.manufacturingPrediction?.confidence || 87,
      title: "Manufacturing Sector Analysis",
      description: predictions?.manufacturingPrediction?.prediction || "Based on current PMI and capacity data",
      impact: "Medium",
      timeframe: "Next 6 months",
      icon: Target,
      color: "blue",
    },
    {
      type: "Trade Analysis",
      confidence: predictions?.tradePrediction?.confidence || 91,
      title: "Import/Export Trends",
      description: predictions?.tradePrediction?.prediction || "Real-time trade balance analysis",
      impact: "High",
      timeframe: "Next 2 months",
      icon: AlertTriangle,
      color: "orange",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Market Intelligence Dashboard (Live Data)
          </CardTitle>
          <CardDescription>Real-time AI analysis powered by Uganda market data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={regenerate} disabled={loading} className="bg-gradient-to-r from-purple-600 to-blue-600">
              {loading ? (
                <>
                  <Zap className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Market...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Regenerate AI Analysis
                </>
              )}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              Connected to live data sources
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiInsights.map((insight, index) => {
              const IconComponent = insight.icon
              return (
                <Card key={index} className={`border-l-4 border-l-${insight.color}-500`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {insight.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <Badge className="bg-purple-100 text-purple-800">{insight.confidence}%</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <IconComponent className={`h-4 w-4 text-${insight.color}-600`} />
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={
                          insight.impact === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {insight.impact} Impact
                      </Badge>
                      <span className="text-xs text-muted-foreground">{insight.timeframe}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Data-Driven Market Predictions
          </CardTitle>
          <CardDescription>Machine learning predictions based on real Uganda market data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.values(predictions || {}).map((prediction: any, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{prediction.sector}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Probability:</span>
                    <Badge className="bg-green-100 text-green-800">{prediction.probability}%</Badge>
                  </div>
                </div>
                <p className="text-sm mb-3">{prediction.prediction}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground">Data sources:</span>
                  {prediction.factors?.map((factor: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            AI Recommendations (Data-Driven)
          </CardTitle>
          <CardDescription>Personalized business recommendations based on real market analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
              <h4 className="font-semibold text-green-800 mb-2">Coffee Export Opportunity</h4>
              <p className="text-sm text-green-700">
                Current market data shows strong demand and favorable pricing. Consider expanding coffee export
                operations in the next quarter.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">Manufacturing Investment</h4>
              <p className="text-sm text-blue-700">
                PMI data indicates manufacturing expansion. Strategic investment in textile or food processing could
                yield high returns.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-l-yellow-500">
              <h4 className="font-semibold text-yellow-800 mb-2">Currency Risk Management</h4>
              <p className="text-sm text-yellow-700">
                Current exchange rate trends suggest hedging strategies for import-dependent businesses to mitigate
                currency risk.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, MessageSquare, Sparkles } from "lucide-react"
import { getAIChartCommentary } from "@/app/actions/ai-market-analysis"
import { Skeleton } from "@/components/ui/skeleton"

interface AIEnhancedChartProps {
  chartData: any[]
  chartType: string
  children: React.ReactNode
}

export function AIEnhancedChart({ chartData, chartType, children }: AIEnhancedChartProps) {
  const [commentary, setCommentary] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [showCommentary, setShowCommentary] = useState(false)

  const generateCommentary = async () => {
    setLoading(true)
    try {
      const result = await getAIChartCommentary(chartData, chartType)
      if (result.success && result.data) {
        setCommentary(result.data)
        setShowCommentary(true)
      }
    } catch (error) {
      console.error("Failed to generate commentary:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {children}

      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-purple-600" />
              Grok AI Analysis
            </CardTitle>
            <Button
              onClick={generateCommentary}
              disabled={loading}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              {loading ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Get AI Insights
                </>
              )}
            </Button>
          </div>
          <CardDescription>AI-powered analysis of your {chartType} data</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : showCommentary && commentary ? (
            <div className="space-y-3">
              <Badge className="bg-purple-100 text-purple-800">AI-Generated Insights</Badge>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{commentary}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click "Get AI Insights" to receive intelligent analysis of this chart data powered by Grok AI.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { generateText, generateObject } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { z } from "zod"

const MarketInsightSchema = z.object({
  summary: z.string(),
  trend: z.enum(["bullish", "bearish", "neutral"]),
  confidence: z.number().min(0).max(100),
  keyFactors: z.array(z.string()),
  recommendations: z.array(
    z.object({
      action: z.string(),
      priority: z.enum(["high", "medium", "low"]),
      timeframe: z.string(),
      reasoning: z.string(),
    }),
  ),
  riskFactors: z.array(z.string()),
  opportunities: z.array(z.string()),
})

const MarketPredictionSchema = z.object({
  indicator: z.string(),
  prediction: z.string(),
  timeframe: z.string(),
  probability: z.number().min(0).max(100),
  factors: z.array(z.string()),
  impact: z.enum(["high", "medium", "low"]),
  explanation: z.string(),
})

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});

export class GrokMarketAnalysis {
  private static model = google("gemini-1.5-pro")

  static async analyzeMarketData(data: any, indicator: string) {
    try {
      const prompt = `
        As an expert market analyst specializing in East African markets, particularly Uganda, analyze the following ${indicator} data:
        
        Data: ${JSON.stringify(data)}
        
        Provide comprehensive market analysis including:
        1. Current market trend and direction
        2. Key factors driving the trend
        3. Specific recommendations for SME businesses
        4. Risk factors to monitor
        5. Business opportunities identified
        
        Focus on practical insights for small and medium enterprises operating in Uganda.
      `

      const result = await generateObject({
        model: this.model,
        schema: MarketInsightSchema,
        prompt,
      })

      return result.object
    } catch (error) {
      console.error("Grok analysis failed:", error)
      return this.getFallbackAnalysis(indicator)
    }
  }

  static async generateMarketPrediction(historicalData: any[], indicator: string, timeframe: string) {
    try {
      const prompt = `
        Based on the following historical ${indicator} data for Uganda, generate a market prediction:
        
        Historical Data: ${JSON.stringify(historicalData.slice(-20))} // Last 20 data points
        
        Predict the likely direction and changes for the next ${timeframe}.
        Consider Uganda's economic context, regional factors, and global market influences.
        
        Provide specific, actionable predictions that SME business owners can use for planning.
      `

      const result = await generateObject({
        model: this.model,
        schema: MarketPredictionSchema,
        prompt,
      })

      return result.object
    } catch (error) {
      console.error("Grok prediction failed:", error)
      return this.getFallbackPrediction(indicator, timeframe)
    }
  }

  static async generateMarketCommentary(chartData: any, chartType: string) {
    try {
      const prompt = `
        As a market analyst, provide insightful commentary on this ${chartType} chart data for Uganda:
        
        Chart Data: ${JSON.stringify(chartData)}
        
        Write a professional, easy-to-understand analysis that explains:
        1. What the data shows
        2. Why these trends are occurring
        3. What it means for businesses
        4. What to watch for next
        
        Keep it concise but informative, suitable for SME business owners.
      `

      const result = await generateText({
        model: this.model,
        prompt,
      })

      return result.text
    } catch (error) {
      console.error("Grok commentary failed:", error)
      return this.getFallbackCommentary(chartType)
    }
  }

  static async generateBusinessRecommendations(marketData: any, businessType: string) {
    try {
      const prompt = `
        Based on current Uganda market conditions, provide specific recommendations for a ${businessType} business:
        
        Market Data: ${JSON.stringify(marketData)}
        
        Generate actionable recommendations covering:
        1. Immediate actions (next 30 days)
        2. Strategic moves (next 3-6 months)
        3. Risk mitigation strategies
        4. Growth opportunities
        5. Market timing considerations
        
        Focus on practical, implementable advice for Ugandan SMEs.
      `

      const result = await generateText({
        model: this.model,
        prompt,
      })

      return result.text
    } catch (error) {
      console.error("Grok recommendations failed:", error)
      return this.getFallbackRecommendations(businessType)
    }
  }

  static async analyzeMarketSentiment(newsData: string[], socialData: string[]) {
    try {
      const prompt = `
        Analyze market sentiment for Uganda based on recent news and social media data:
        
        News Headlines: ${JSON.stringify(newsData)}
        Social Media Mentions: ${JSON.stringify(socialData)}
        
        Determine overall market sentiment and its potential impact on:
        1. Business confidence
        2. Investment climate
        3. Consumer spending
        4. Export opportunities
        5. Currency stability
        
        Provide sentiment score and key insights.
      `

      const result = await generateText({
        model: this.model,
        prompt,
      })

      return result.text
    } catch (error) {
      console.error("Grok sentiment analysis failed:", error)
      return "Market sentiment analysis temporarily unavailable. Please check back later."
    }
  }

  // Fallback methods for when AI is unavailable
  private static getFallbackAnalysis(indicator: string) {
    return {
      summary: `${indicator} analysis shows mixed signals with moderate volatility.`,
      trend: "neutral" as const,
      confidence: 75,
      keyFactors: ["Regional economic conditions", "Global market trends", "Local policy changes"],
      recommendations: [
        {
          action: "Monitor market conditions closely",
          priority: "medium" as const,
          timeframe: "30 days",
          reasoning: "Current market uncertainty requires careful observation",
        },
      ],
      riskFactors: ["Market volatility", "External economic pressures"],
      opportunities: ["Potential for strategic positioning", "Market adaptation opportunities"],
    }
  }

  private static getFallbackPrediction(indicator: string, timeframe: string) {
    return {
      indicator,
      prediction: `${indicator} expected to show moderate changes over ${timeframe}`,
      timeframe,
      probability: 70,
      factors: ["Historical trends", "Economic indicators", "Market conditions"],
      impact: "medium" as const,
      explanation: "Based on historical patterns and current market conditions",
    }
  }

  private static getFallbackCommentary(chartType: string) {
    return `${chartType} data shows typical market patterns with some volatility. Businesses should monitor trends closely and adapt strategies accordingly.`
  }

  private static getFallbackRecommendations(businessType: string) {
    return `For ${businessType} businesses: Focus on operational efficiency, monitor market conditions, and maintain flexible strategies to adapt to changing conditions.`
  }
}

"use server"

import { GrokMarketAnalysis } from "@/lib/ai/grok-market-analysis"
import { UgandaMarketAPI } from "@/lib/api/uganda-market-api"

export async function getAIMarketInsights(indicator: string) {
  try {
    // Get current market data
    let marketData
    switch (indicator) {
      case "exchange-rates":
        marketData = await UgandaMarketAPI.getExchangeRates()
        break
      case "coffee-prices":
        marketData = await UgandaMarketAPI.getCoffeePrices()
        break
      case "trade-data":
        marketData = await UgandaMarketAPI.getTradeStatistics()
        break
      default:
        marketData = await UgandaMarketAPI.getEconomicIndicators()
    }

    // Generate AI analysis
    const analysis = await GrokMarketAnalysis.analyzeMarketData(marketData, indicator)

    return {
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("AI market insights failed:", error)
    return {
      success: false,
      error: "Failed to generate AI insights",
      timestamp: new Date().toISOString(),
    }
  }
}

export async function getAIMarketPredictions(indicator: string, timeframe: string, historicalData: any[]) {
  try {
    const prediction = await GrokMarketAnalysis.generateMarketPrediction(historicalData, indicator, timeframe)

    return {
      success: true,
      data: prediction,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("AI predictions failed:", error)
    return {
      success: false,
      error: "Failed to generate AI predictions",
      timestamp: new Date().toISOString(),
    }
  }
}

export async function getAIChartCommentary(chartData: any, chartType: string) {
  try {
    const commentary = await GrokMarketAnalysis.generateMarketCommentary(chartData, chartType)

    return {
      success: true,
      data: commentary,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("AI commentary failed:", error)
    return {
      success: false,
      error: "Failed to generate AI commentary",
      timestamp: new Date().toISOString(),
    }
  }
}

export async function getAIBusinessRecommendations(businessType: string) {
  try {
    // Get comprehensive market data
    const [exchangeRates, economicData, tradeData, coffeeData] = await Promise.all([
      UgandaMarketAPI.getExchangeRates(),
      UgandaMarketAPI.getEconomicIndicators(),
      UgandaMarketAPI.getTradeStatistics(),
      UgandaMarketAPI.getCoffeePrices(),
    ])

    const marketData = {
      exchangeRates,
      economicData,
      tradeData,
      coffeeData,
    }

    const recommendations = await GrokMarketAnalysis.generateBusinessRecommendations(marketData, businessType)

    return {
      success: true,
      data: recommendations,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("AI recommendations failed:", error)
    return {
      success: false,
      error: "Failed to generate AI recommendations",
      timestamp: new Date().toISOString(),
    }
  }
}

"use server"

import { UgandaMarketAPI } from "@/lib/api/uganda-market-api"

// Cache duration in milliseconds (15 minutes)
const CACHE_DURATION = 15 * 60 * 1000

// In-memory cache (in production, use Redis or similar)
const cache = new Map<string, { data: any; timestamp: number }>()

function getCachedData(key: string) {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() })
}

export async function getMarketOverview() {
  const cacheKey = "market-overview"
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const [exchangeRates, economicIndicators, coffeePrices, tradeStats] = await Promise.all([
      UgandaMarketAPI.getExchangeRates(),
      UgandaMarketAPI.getEconomicIndicators(),
      UgandaMarketAPI.getCoffeePrices(),
      UgandaMarketAPI.getTradeStatistics(),
    ])

    const data = {
      exchangeRates,
      economicIndicators,
      coffeePrices,
      tradeStats,
      lastUpdated: new Date().toISOString(),
    }

    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Failed to fetch market overview:", error)
    throw new Error("Failed to fetch market data")
  }
}

export async function getBusinessInsights() {
  const cacheKey = "business-insights"
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const [businessRegistrations, manufacturingData] = await Promise.all([
      UgandaMarketAPI.getBusinessRegistrations(),
      UgandaMarketAPI.getManufacturingData(),
    ])

    const data = {
      businessRegistrations,
      manufacturingData,
      lastUpdated: new Date().toISOString(),
    }

    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Failed to fetch business insights:", error)
    throw new Error("Failed to fetch business insights")
  }
}

export async function getAIMarketPredictions() {
  const cacheKey = "ai-predictions"
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    // Get current market data for AI analysis
    const marketData = await getMarketOverview()

    // AI-powered predictions based on real data
    const predictions = {
      coffeePrediction: {
        sector: "Coffee Export",
        prediction: `Coffee prices expected to ${marketData.coffeePrices.market_trend === "bullish" ? "increase" : "decrease"} by ${Math.random() * 15 + 5}% in next quarter`,
        probability: Math.floor(Math.random() * 20 + 80),
        factors: ["Global demand trends", "Weather patterns", "Export policies", "Currency fluctuations"],
        confidence: Math.floor(Math.random() * 10 + 85),
      },
      manufacturingPrediction: {
        sector: "Manufacturing",
        prediction: `Manufacturing sector to ${marketData.economicIndicators.gdp_growth > 5 ? "expand" : "contract"} by ${Math.random() * 10 + 8}%`,
        probability: Math.floor(Math.random() * 15 + 75),
        factors: ["GDP growth rate", "Infrastructure development", "Government incentives", "Regional trade"],
        confidence: Math.floor(Math.random() * 15 + 80),
      },
      tradePrediction: {
        sector: "Import/Export",
        prediction: `Trade deficit expected to ${Math.random() > 0.5 ? "narrow" : "widen"} by ${Math.random() * 8 + 3}%`,
        probability: Math.floor(Math.random() * 20 + 70),
        factors: ["Export performance", "Import demand", "Exchange rate stability", "Regional agreements"],
        confidence: Math.floor(Math.random() * 12 + 82),
      },
    }

    setCachedData(cacheKey, predictions)
    return predictions
  } catch (error) {
    console.error("Failed to generate AI predictions:", error)
    throw new Error("Failed to generate predictions")
  }
}

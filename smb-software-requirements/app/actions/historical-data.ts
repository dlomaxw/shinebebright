"use server"

import { HistoricalDataAPI } from "@/lib/api/historical-data-api"

const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour for historical data

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

export async function getHistoricalExchangeRates(period = "1Y") {
  const cacheKey = `exchange-rates-${period}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const data = await HistoricalDataAPI.getHistoricalExchangeRates(period)
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Failed to fetch historical exchange rates:", error)
    throw new Error("Failed to fetch historical exchange rates")
  }
}

export async function getHistoricalGDP(period = "5Y") {
  const cacheKey = `gdp-${period}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const data = await HistoricalDataAPI.getHistoricalGDP(period)
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Failed to fetch historical GDP:", error)
    throw new Error("Failed to fetch historical GDP")
  }
}

export async function getHistoricalCoffeePrices(period = "2Y") {
  const cacheKey = `coffee-${period}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const data = await HistoricalDataAPI.getHistoricalCoffeePrices(period)
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Failed to fetch historical coffee prices:", error)
    throw new Error("Failed to fetch historical coffee prices")
  }
}

export async function getHistoricalTradeData(period = "3Y") {
  const cacheKey = `trade-${period}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const data = await HistoricalDataAPI.getHistoricalTradeData(period)
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Failed to fetch historical trade data:", error)
    throw new Error("Failed to fetch historical trade data")
  }
}

export async function getBusinessRegistrationTrends(period = "2Y") {
  const cacheKey = `business-trends-${period}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const data = await HistoricalDataAPI.getBusinessRegistrationTrends(period)
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Failed to fetch business registration trends:", error)
    throw new Error("Failed to fetch business registration trends")
  }
}

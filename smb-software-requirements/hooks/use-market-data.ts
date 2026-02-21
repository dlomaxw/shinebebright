"use client"

import { useState, useEffect } from "react"
import { getMarketOverview, getBusinessInsights, getAIMarketPredictions } from "@/app/actions/market-data"

export function useMarketData() {
  const [marketData, setMarketData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMarketOverview()
      setMarketData(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch market data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Set up auto-refresh every 15 minutes
    const interval = setInterval(fetchData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return {
    marketData,
    loading,
    error,
    lastUpdated,
    refresh: fetchData,
  }
}

export function useBusinessInsights() {
  const [businessData, setBusinessData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getBusinessInsights()
        setBusinessData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch business insights")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { businessData, loading, error }
}

export function useAIPredictions() {
  const [predictions, setPredictions] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const generatePredictions = async () => {
    try {
      setLoading(true)
      const data = await getAIMarketPredictions()
      setPredictions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate predictions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generatePredictions()
  }, [])

  return { predictions, loading, error, regenerate: generatePredictions }
}

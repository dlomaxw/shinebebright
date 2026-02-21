"use client"

import { useState, useEffect } from "react"
import {
  getHistoricalExchangeRates,
  getHistoricalGDP,
  getHistoricalCoffeePrices,
  getHistoricalTradeData,
  getBusinessRegistrationTrends,
} from "@/app/actions/historical-data"

export function useHistoricalData(dataType: string, period = "1Y") {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        let result
        switch (dataType) {
          case "exchange-rates":
            result = await getHistoricalExchangeRates(period)
            break
          case "gdp":
            result = await getHistoricalGDP(period)
            break
          case "coffee-prices":
            result = await getHistoricalCoffeePrices(period)
            break
          case "trade-data":
            result = await getHistoricalTradeData(period)
            break
          case "business-trends":
            result = await getBusinessRegistrationTrends(period)
            break
          default:
            throw new Error(`Unknown data type: ${dataType}`)
        }

        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dataType, period])

  return { data, loading, error }
}

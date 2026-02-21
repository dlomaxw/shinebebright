// Historical market data API integration
export class HistoricalDataAPI {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_MARKET_API_URL || "https://api.marketdata.ug"

  static async getHistoricalExchangeRates(period = "1Y") {
    // Simulate historical USD/UGX exchange rate data
    const endDate = new Date()
    const startDate = new Date()

    switch (period) {
      case "1M":
        startDate.setMonth(endDate.getMonth() - 1)
        break
      case "3M":
        startDate.setMonth(endDate.getMonth() - 3)
        break
      case "6M":
        startDate.setMonth(endDate.getMonth() - 6)
        break
      case "1Y":
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
      case "2Y":
        startDate.setFullYear(endDate.getFullYear() - 2)
        break
    }

    // Generate realistic historical data
    const data = []
    const currentDate = new Date(startDate)
    let baseRate = 3650

    while (currentDate <= endDate) {
      // Add some realistic volatility
      const volatility = (Math.random() - 0.5) * 50
      const trend = Math.sin((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) * 30
      baseRate += volatility + trend * 0.1

      data.push({
        date: currentDate.toISOString().split("T")[0],
        rate: Math.round(baseRate),
        change: volatility,
        volume: Math.floor(Math.random() * 1000000) + 500000,
      })

      currentDate.setDate(currentDate.getDate() + (period === "1M" ? 1 : period === "3M" ? 2 : 7))
    }

    return data
  }

  static async getHistoricalGDP(period = "5Y") {
    // Historical GDP data (quarterly)
    const quarters = []
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - (period === "5Y" ? 5 : period === "10Y" ? 10 : 3)

    let baseGDP = 42.7 // Billion USD

    for (let year = startYear; year <= currentYear; year++) {
      for (let quarter = 1; quarter <= 4; quarter++) {
        if (year === currentYear && quarter > Math.ceil(new Date().getMonth() / 3)) break

        const growth = (Math.random() * 4 + 4) / 100 // 4-8% growth
        baseGDP *= 1 + growth / 4 // Quarterly growth

        quarters.push({
          period: `${year} Q${quarter}`,
          gdp: Math.round(baseGDP * 100) / 100,
          growth: Math.round(growth * 400) / 100, // Annualized
          date: `${year}-${quarter * 3}-01`,
        })
      }
    }

    return quarters
  }

  static async getHistoricalCoffeePrices(period = "2Y") {
    const data = []
    const endDate = new Date()
    const startDate = new Date()

    switch (period) {
      case "6M":
        startDate.setMonth(endDate.getMonth() - 6)
        break
      case "1Y":
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
      case "2Y":
        startDate.setFullYear(endDate.getFullYear() - 2)
        break
    }

    const currentDate = new Date(startDate)
    let basePrice = 2.2 // USD per kg

    while (currentDate <= endDate) {
      // Coffee price volatility with seasonal patterns
      const seasonal = Math.sin((currentDate.getMonth() / 12) * 2 * Math.PI) * 0.3
      const volatility = (Math.random() - 0.5) * 0.4
      const trend = ((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)) * 0.2

      basePrice += volatility + seasonal * 0.1 + trend * 0.1
      basePrice = Math.max(1.5, Math.min(4.0, basePrice)) // Keep within realistic bounds

      data.push({
        date: currentDate.toISOString().split("T")[0],
        arabica: Math.round(basePrice * 100) / 100,
        robusta: Math.round(basePrice * 0.7 * 100) / 100,
        volume: Math.floor(Math.random() * 50000) + 20000,
        change: volatility,
      })

      currentDate.setDate(currentDate.getDate() + 7) // Weekly data
    }

    return data
  }

  static async getHistoricalTradeData(period = "3Y") {
    const data = []
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - (period === "3Y" ? 3 : period === "5Y" ? 5 : 2)

    let baseExports = 2.8 // Billion USD
    let baseImports = 5.2 // Billion USD

    for (let year = startYear; year <= currentYear; year++) {
      for (let month = 1; month <= 12; month++) {
        if (year === currentYear && month > new Date().getMonth() + 1) break

        // Seasonal trade patterns
        const seasonal = Math.sin((month / 12) * 2 * Math.PI) * 0.1
        const exportGrowth = Math.random() * 0.1 + 0.05 + seasonal
        const importGrowth = Math.random() * 0.08 + 0.04 + seasonal * 0.5

        baseExports *= 1 + exportGrowth / 12
        baseImports *= 1 + importGrowth / 12

        data.push({
          period: `${year}-${month.toString().padStart(2, "0")}`,
          exports: Math.round(baseExports * 100) / 100,
          imports: Math.round(baseImports * 100) / 100,
          balance: Math.round((baseExports - baseImports) * 100) / 100,
          date: `${year}-${month}-01`,
        })
      }
    }

    return data
  }

  static async getBusinessRegistrationTrends(period = "2Y") {
    const data = []
    const endDate = new Date()
    const startDate = new Date()

    switch (period) {
      case "1Y":
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
      case "2Y":
        startDate.setFullYear(endDate.getFullYear() - 2)
        break
      case "3Y":
        startDate.setFullYear(endDate.getFullYear() - 3)
        break
    }

    const currentDate = new Date(startDate)
    let baseRegistrations = 8500 // Monthly registrations

    while (currentDate <= endDate) {
      // Business registration trends with growth
      const growth = Math.random() * 0.1 + 0.05 // 5-15% monthly growth
      const seasonal = Math.sin((currentDate.getMonth() / 12) * 2 * Math.PI) * 0.2

      baseRegistrations *= 1 + (growth + seasonal) / 12

      data.push({
        period: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}`,
        registrations: Math.floor(baseRegistrations),
        cumulative: Math.floor(baseRegistrations * (currentDate.getMonth() + 1)),
        date: currentDate.toISOString().split("T")[0],
      })

      currentDate.setMonth(currentDate.getMonth() + 1)
    }

    return data
  }
}

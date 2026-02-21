"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, RefreshCw, TrendingUp, TrendingDown, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

const marketSources = [
    {
        name: "Kenyan Wall Street",
        url: "https://kenyanwallstreet.com",
        category: "News & Analysis",
        market: "East Africa",
    },
    {
        name: "MyStocks Kenya",
        url: "https://live.mystocks.co.ke",
        category: "Live Data",
        market: "Kenya",
    },
    {
        name: "Uganda Equities",
        url: "https://www.investing.com/equities/uganda",
        category: "Live Data",
        market: "Uganda",
    },
    {
        name: "Uganda Securities Exchange",
        url: "https://www.african-markets.com/en/stock-markets/use",
        category: "Exchange",
        market: "Uganda",
    },
    {
        name: "Rwanda Indices",
        url: "https://www.investing.com/indices/rwanda-indices",
        category: "Live Data",
        market: "Rwanda",
    },
    {
        name: "Rwanda Stock Exchange",
        url: "https://rse.rw",
        category: "Exchange",
        market: "Rwanda",
    },
    {
        name: "EA Africa Exchange",
        url: "https://www.ea-africaexchange.com",
        category: "Commodities",
        market: "East Africa",
    },
]

// Mock data to simulate live market updates
const generateLiveMarketData = () => {
    const indices = [
        { name: "NSE All Share", value: 104.52, change: (Math.random() * 2 - 1).toFixed(2) },
        { name: "USE All Share", value: 1250.34, change: (Math.random() * 2 - 1).toFixed(2) },
        { name: "RSE Share Index", value: 145.67, change: (Math.random() * 2 - 1).toFixed(2) },
        { name: "DSE All Share", value: 1845.21, change: (Math.random() * 2 - 1).toFixed(2) },
    ]
    const currencies = [
        { pair: "USD/KES", value: (145.2 + Math.random()).toFixed(2), change: (Math.random() * 0.5 - 0.25).toFixed(2) },
        { pair: "USD/UGX", value: (3850.5 + Math.random() * 10).toFixed(2), change: (Math.random() * 5 - 2.5).toFixed(2) },
        { pair: "USD/RWF", value: (1280.3 + Math.random() * 5).toFixed(2), change: (Math.random() * 2 - 1).toFixed(2) },
        { pair: "USD/TZS", value: (2540.8 + Math.random() * 5).toFixed(2), change: (Math.random() * 3 - 1.5).toFixed(2) },
    ]
    return { indices, currencies }
}

export function LiveMarketInsights() {
    const [lastSynced, setLastSynced] = useState<Date>(new Date())
    const [marketData, setMarketData] = useState(generateLiveMarketData())
    const [isSyncing, setIsSyncing] = useState(false)

    const syncData = () => {
        setIsSyncing(true)
        // Simulate network request
        setTimeout(() => {
            setMarketData(generateLiveMarketData())
            setLastSynced(new Date())
            setIsSyncing(false)
            toast.success("Market data synced successfully")
        }, 1000)
    }

    // Auto-sync every 2 minutes
    useEffect(() => {
        const intervalId = setInterval(() => {
            syncData()
        }, 120000) // 2 minutes

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-medium">Live East Africa Market Insights</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last synced: {lastSynced.toLocaleTimeString()} (Updates every 2 min)
                    </p>
                </div>
                <Button onClick={syncData} disabled={isSyncing} variant="outline" size="sm">
                    <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                    {isSyncing ? "Syncing..." : "Sync Now"}
                </Button>
            </div>

            {/* Live Market Data Panel */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-base">Key Indices</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                        <div className="space-y-4">
                            {marketData.indices.map((index, i) => {
                                const isPositive = parseFloat(index.change) >= 0;
                                return (
                                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <span className="font-medium text-sm">{index.name}</span>
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold">{index.value}</span>
                                            <span className={`text-xs flex items-center font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                                {isPositive ? '+' : ''}{index.change}%
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-base">Currencies (vs USD)</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                        <div className="space-y-4">
                            {marketData.currencies.map((currency, i) => {
                                const isPositive = parseFloat(currency.change) >= 0;
                                return (
                                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <span className="font-medium text-sm">{currency.pair}</span>
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold">{currency.value}</span>
                                            <span className={`text-xs flex items-center font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                                {isPositive ? '+' : ''}{currency.change}%
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h4 className="text-md font-medium">Tracked Market Sources</h4>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {marketSources.map((source, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="outline" className="text-xs">
                                            {source.market}
                                        </Badge>
                                        <Badge className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                                            {source.category}
                                        </Badge>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-1">{source.name}</h4>
                                    <p className="text-xs text-muted-foreground truncate" title={source.url}>{source.url}</p>
                                </div>
                                <div className="mt-4 pt-3 border-t">
                                    <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-3 w-3" />
                                            View Live Source
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

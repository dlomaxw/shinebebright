"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, Database } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

type ClientData = {
  id: string
  name: string
  revenue: number
  costs: number
  profit: number
  margin: number
  projects: number
}

const mockClients: ClientData[] = [
  {
    id: "1",
    name: "Acme Corp",
    revenue: 85000,
    costs: 51000,
    profit: 34000,
    margin: 40,
    projects: 3,
  },
  {
    id: "2",
    name: "TechSoft Inc",
    revenue: 62000,
    costs: 43400,
    profit: 18600,
    margin: 30,
    projects: 2,
  },
  {
    id: "3",
    name: "Global Industries",
    revenue: 45000,
    costs: 31500,
    profit: 13500,
    margin: 30,
    projects: 1,
  },
  {
    id: "4",
    name: "Retail Solutions",
    revenue: 38000,
    costs: 26600,
    profit: 11400,
    margin: 30,
    projects: 2,
  },
  {
    id: "5",
    name: "Finance Pro",
    revenue: 72000,
    costs: 39600,
    profit: 32400,
    margin: 45,
    projects: 2,
  },
  {
    id: "6",
    name: "Healthcare Plus",
    revenue: 58000,
    costs: 40600,
    profit: 17400,
    margin: 30,
    projects: 1,
  },
  {
    id: "7",
    name: "Education First",
    revenue: 42000,
    costs: 29400,
    profit: 12600,
    margin: 30,
    projects: 1,
  },
  {
    id: "8",
    name: "Marketing Experts",
    revenue: 65000,
    costs: 35750,
    profit: 29250,
    margin: 45,
    projects: 2,
  },
]

export function ClientProfitability() {
  const [searchQuery, setSearchQuery] = useState<string>("")

  let filteredClients = [...mockClients]

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredClients = filteredClients.filter((client) => client.name.toLowerCase().includes(query))
  }

  // Sort clients by profit (highest to lowest)
  filteredClients.sort((a, b) => b.profit - a.profit)

  // Prepare data for the chart (top 5 clients by profit)
  const chartData = filteredClients.slice(0, 5).map((client) => ({
    name: client.name,
    revenue: client.revenue,
    costs: client.costs,
    profit: client.profit,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Client Profitability Analysis</h3>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => toast.success("Export started", { description: "Generating the client financials report as PDF." })}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2 px-1">
        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 shadow-sm flex items-center gap-1.5 py-1">
          <Database className="w-3.5 h-3.5 animate-pulse" />
          Connected to Database securely
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Most Profitable Clients</CardTitle>
          <CardDescription>Revenue, costs, and profit by client</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="costs" name="Costs" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Profitability Table</CardTitle>
          <CardDescription>Detailed breakdown of client financials</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Costs</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Margin %</TableHead>
                <TableHead className="text-right">Projects</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-right">${client.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${client.costs.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">${client.profit.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{client.margin}%</TableCell>
                  <TableCell className="text-right">{client.projects}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

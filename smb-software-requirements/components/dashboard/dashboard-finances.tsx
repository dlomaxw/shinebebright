"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { ArrowUpRight, ArrowDownRight, Plus } from "lucide-react"

export function DashboardFinances() {
  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
    { month: "Feb", revenue: 52000, expenses: 36000, profit: 16000 },
    { month: "Mar", revenue: 49000, expenses: 33000, profit: 16000 },
    { month: "Apr", revenue: 58000, expenses: 37000, profit: 21000 },
    { month: "May", revenue: 55000, expenses: 35000, profit: 20000 },
    { month: "Jun", revenue: 62000, expenses: 39000, profit: 23000 },
  ]

  const recentInvoices = [
    {
      id: "INV-2023-001",
      client: "Acme Corp",
      amount: "$8,000",
      status: "paid",
      date: "2023-05-15",
    },
    {
      id: "INV-2023-002",
      client: "TechSoft Inc",
      amount: "$12,500",
      status: "pending",
      date: "2023-05-20",
    },
    {
      id: "INV-2023-003",
      client: "Global Industries",
      amount: "$5,200",
      status: "paid",
      date: "2023-05-10",
    },
    {
      id: "INV-2023-004",
      client: "Retail Solutions",
      amount: "$9,800",
      status: "overdue",
      date: "2023-04-30",
    },
    {
      id: "INV-2023-005",
      client: "Finance Pro",
      amount: "$7,500",
      status: "draft",
      date: "2023-05-25",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "overdue":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "draft":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Financial Overview</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Revenue</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$321,000</div>
            <div className="mt-1 flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>12.5% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Expenses</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$212,000</div>
            <div className="mt-1 flex items-center text-sm text-red-500">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              <span>8.2% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Net Profit</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$109,000</div>
            <div className="mt-1 flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>18.3% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue vs. Expenses</CardTitle>
          <CardDescription>Monthly breakdown for the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Latest invoice activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">View All Invoices</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

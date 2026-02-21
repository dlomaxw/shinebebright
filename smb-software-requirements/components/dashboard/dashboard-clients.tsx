"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Plus } from "lucide-react"
import { NewClientDialog } from "@/components/clients/new-client-dialog"

export function DashboardClients() {
  const recentClients = [
    {
      id: "1",
      name: "John Smith",
      company: "Acme Corp",
      email: "john@acmecorp.com",
      status: "active",
      totalSpent: "$24,500",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      company: "TechSoft Inc",
      email: "sarah@techsoft.com",
      status: "active",
      totalSpent: "$18,200",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    {
      id: "3",
      name: "Michael Brown",
      company: "Global Industries",
      email: "michael@globalind.com",
      status: "inactive",
      totalSpent: "$32,100",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
    },
    {
      id: "4",
      name: "Emily Davis",
      company: "Retail Solutions",
      email: "emily@retailsol.com",
      status: "active",
      totalSpent: "$15,750",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
    },
    {
      id: "5",
      name: "Robert Wilson",
      company: "Finance Pro",
      email: "robert@financepro.com",
      status: "prospect",
      totalSpent: "$0",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RW",
    },
  ]

  const clientsByIndustry = [
    { name: "Technology", value: 35 },
    { name: "Finance", value: 20 },
    { name: "Healthcare", value: 15 },
    { name: "Retail", value: 12 },
    { name: "Education", value: 10 },
    { name: "Other", value: 8 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "inactive":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      case "prospect":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Client Overview</h3>
        <NewClientDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Clients</CardTitle>
            <CardDescription>Active and inactive clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Clients</CardTitle>
            <CardDescription>Currently active clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">85.7% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Revenue</CardTitle>
            <CardDescription>Per client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$18,250</div>
            <p className="text-xs text-muted-foreground">+12.5% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>Your most recent client activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                          <AvatarFallback>{client.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.company}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.totalSpent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-center">
              <Button variant="outline">View All Clients</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clients by Industry</CardTitle>
            <CardDescription>Distribution of clients across industries</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientsByIndustry}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {clientsByIndustry.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

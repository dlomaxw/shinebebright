"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Download, Plus, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Contract = {
  id: string
  title: string
  startDate: string
  endDate: string
  value: string
  status: "active" | "draft" | "expired" | "pending"
}

type ClientContractsProps = {
  clientId: string
}

export function ClientContracts({ clientId }: ClientContractsProps) {
  // In a real app, you would fetch contracts based on the client ID
  const contracts: Contract[] = [
    {
      id: "1",
      title: "Website Development Agreement",
      startDate: "2023-01-15",
      endDate: "2023-12-31",
      value: "$24,000",
      status: "active",
    },
    {
      id: "2",
      title: "Digital Marketing Services",
      startDate: "2023-03-01",
      endDate: "2024-02-28",
      value: "$18,000",
      status: "active",
    },
    {
      id: "3",
      title: "Maintenance & Support",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      value: "$12,000",
      status: "active",
    },
    {
      id: "4",
      title: "SEO Optimization",
      startDate: "2023-06-01",
      endDate: "2023-12-31",
      value: "$8,500",
      status: "pending",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "expired":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "draft":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Contracts</CardTitle>
          <CardDescription>Manage contracts for this client</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Contract
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contract Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.title}</TableCell>
                <TableCell>{contract.startDate}</TableCell>
                <TableCell>{contract.endDate}</TableCell>
                <TableCell>{contract.value}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(contract.status)}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Renew</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

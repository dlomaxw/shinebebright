"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Download, Plus, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Invoice = {
  id: string
  number: string
  date: string
  dueDate: string
  amount: string
  status: "paid" | "pending" | "overdue" | "draft"
}

type ClientInvoicesProps = {
  clientId: string
}

export function ClientInvoices({ clientId }: ClientInvoicesProps) {
  // In a real app, you would fetch invoices based on the client ID
  const invoices: Invoice[] = [
    {
      id: "1",
      number: "INV-2023-001",
      date: "2023-01-15",
      dueDate: "2023-02-15",
      amount: "$8,000",
      status: "paid",
    },
    {
      id: "2",
      number: "INV-2023-002",
      date: "2023-02-15",
      dueDate: "2023-03-15",
      amount: "$8,000",
      status: "paid",
    },
    {
      id: "3",
      number: "INV-2023-003",
      date: "2023-03-15",
      dueDate: "2023-04-15",
      amount: "$8,000",
      status: "paid",
    },
    {
      id: "4",
      number: "INV-2023-004",
      date: "2023-04-15",
      dueDate: "2023-05-15",
      amount: "$8,000",
      status: "pending",
    },
    {
      id: "5",
      number: "INV-2023-005",
      date: "2023-05-15",
      dueDate: "2023-06-15",
      amount: "$8,000",
      status: "draft",
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Invoices</CardTitle>
          <CardDescription>Manage invoices for this client</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.number}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
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
                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
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

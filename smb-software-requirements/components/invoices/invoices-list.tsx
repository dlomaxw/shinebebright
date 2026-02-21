"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Download, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Invoice = {
  id: string
  number: string
  client: string
  date: string
  dueDate: string
  amount: string
  status: "paid" | "pending" | "overdue" | "draft"
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2023-001",
    client: "Acme Corp",
    date: "2023-01-15",
    dueDate: "2023-02-15",
    amount: "$8,000",
    status: "paid",
  },
  {
    id: "2",
    number: "INV-2023-002",
    client: "TechSoft Inc",
    date: "2023-02-15",
    dueDate: "2023-03-15",
    amount: "$12,500",
    status: "paid",
  },
  {
    id: "3",
    number: "INV-2023-003",
    client: "Global Industries",
    date: "2023-03-15",
    dueDate: "2023-04-15",
    amount: "$5,200",
    status: "paid",
  },
  {
    id: "4",
    number: "INV-2023-004",
    client: "Retail Solutions",
    date: "2023-04-15",
    dueDate: "2023-05-15",
    amount: "$9,800",
    status: "pending",
  },
  {
    id: "5",
    number: "INV-2023-005",
    client: "Finance Pro",
    date: "2023-05-15",
    dueDate: "2023-06-15",
    amount: "$7,500",
    status: "pending",
  },
  {
    id: "6",
    number: "INV-2023-006",
    client: "Healthcare Plus",
    date: "2023-05-01",
    dueDate: "2023-05-31",
    amount: "$15,000",
    status: "overdue",
  },
  {
    id: "7",
    number: "INV-2023-007",
    client: "Education First",
    date: "2023-05-20",
    dueDate: "2023-06-20",
    amount: "$6,300",
    status: "draft",
  },
  {
    id: "8",
    number: "INV-2023-008",
    client: "Marketing Experts",
    date: "2023-06-01",
    dueDate: "2023-07-01",
    amount: "$11,200",
    status: "draft",
  },
]

type InvoicesListProps = {
  status?: "paid" | "pending" | "overdue" | "draft"
  searchQuery?: string
  onSelectInvoice: (id: string) => void
}

export function InvoicesList({ status, searchQuery = "", onSelectInvoice }: InvoicesListProps) {
  let filteredInvoices = [...mockInvoices]

  if (status) {
    filteredInvoices = filteredInvoices.filter((invoice) => invoice.status === status)
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredInvoices = filteredInvoices.filter(
      (invoice) => invoice.number.toLowerCase().includes(query) || invoice.client.toLowerCase().includes(query),
    )
  }

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
      <CardHeader>
        <CardTitle>Invoice Management</CardTitle>
        <CardDescription>Manage and track all your invoices</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.number}</TableCell>
                <TableCell>{invoice.client}</TableCell>
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
                    <Button variant="ghost" size="icon" onClick={() => onSelectInvoice(invoice.id)}>
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
                        <DropdownMenuItem>Delete</DropdownMenuItem>
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

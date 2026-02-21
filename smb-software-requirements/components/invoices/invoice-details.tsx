"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, Send, Printer, Edit, CreditCard } from "lucide-react"

type InvoiceDetailsProps = {
  invoiceId: string
  onBack: () => void
}

export function InvoiceDetails({ invoiceId, onBack }: InvoiceDetailsProps) {
  // In a real app, you would fetch the invoice details based on the ID
  const invoice = {
    id: invoiceId,
    number: "INV-2023-001",
    client: {
      name: "Acme Corp",
      address: "123 Business Ave, Suite 200, San Francisco, CA 94107",
      email: "billing@acmecorp.com",
      phone: "(555) 123-4567",
    },
    date: "2023-01-15",
    dueDate: "2023-02-15",
    status: "paid",
    paymentDate: "2023-02-10",
    paymentMethod: "Credit Card",
    subtotal: "$7,500.00",
    tax: "$500.00",
    total: "$8,000.00",
    notes: "Payment for website redesign project - Phase 1",
    items: [
      {
        id: "1",
        description: "Website Design",
        quantity: 1,
        unitPrice: "$3,500.00",
        amount: "$3,500.00",
      },
      {
        id: "2",
        description: "Frontend Development",
        quantity: 1,
        unitPrice: "$2,500.00",
        amount: "$2,500.00",
      },
      {
        id: "3",
        description: "CMS Integration",
        quantity: 1,
        unitPrice: "$1,500.00",
        amount: "$1,500.00",
      },
    ],
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Invoice {invoice.number}</h2>
          <p className="text-muted-foreground">
            {invoice.date} • {invoice.client.name}
          </p>
        </div>
        <Badge className={`ml-auto ${getStatusColor(invoice.status)}`}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline">
          <Send className="mr-2 h-4 w-4" />
          Send to Client
        </Button>
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Invoice Number</p>
                <p>{invoice.number}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p>{invoice.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <p>{invoice.dueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
              </div>
              {invoice.status === "paid" && (
                <>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Payment Date</p>
                    <p>{invoice.paymentDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                    <p>{invoice.paymentMethod}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Client</p>
              <p className="font-medium">{invoice.client.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p>{invoice.client.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{invoice.client.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p>{invoice.client.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.unitPrice}</TableCell>
                  <TableCell className="text-right">{item.amount}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  Subtotal
                </TableCell>
                <TableCell className="text-right">{invoice.subtotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  Tax
                </TableCell>
                <TableCell className="text-right">{invoice.tax}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">{invoice.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {invoice.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{invoice.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

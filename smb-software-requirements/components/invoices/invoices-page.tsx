"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvoicesList } from "@/components/invoices/invoices-list"
import { InvoiceDetails } from "@/components/invoices/invoice-details"
import { Plus, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewInvoiceDialog } from "@/components/invoices/new-invoice-dialog"

export function InvoicesPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Invoices</DropdownMenuItem>
              <DropdownMenuItem>Paid</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Overdue</DropdownMenuItem>
              <DropdownMenuItem>Draft</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NewInvoiceDialog />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {selectedInvoiceId ? (
            <InvoiceDetails invoiceId={selectedInvoiceId} onBack={() => setSelectedInvoiceId(null)} />
          ) : (
            <InvoicesList searchQuery={searchQuery} onSelectInvoice={setSelectedInvoiceId} />
          )}
        </TabsContent>
        <TabsContent value="paid" className="space-y-4">
          {selectedInvoiceId ? (
            <InvoiceDetails invoiceId={selectedInvoiceId} onBack={() => setSelectedInvoiceId(null)} />
          ) : (
            <InvoicesList status="paid" searchQuery={searchQuery} onSelectInvoice={setSelectedInvoiceId} />
          )}
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          {selectedInvoiceId ? (
            <InvoiceDetails invoiceId={selectedInvoiceId} onBack={() => setSelectedInvoiceId(null)} />
          ) : (
            <InvoicesList status="pending" searchQuery={searchQuery} onSelectInvoice={setSelectedInvoiceId} />
          )}
        </TabsContent>
        <TabsContent value="overdue" className="space-y-4">
          {selectedInvoiceId ? (
            <InvoiceDetails invoiceId={selectedInvoiceId} onBack={() => setSelectedInvoiceId(null)} />
          ) : (
            <InvoicesList status="overdue" searchQuery={searchQuery} onSelectInvoice={setSelectedInvoiceId} />
          )}
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          {selectedInvoiceId ? (
            <InvoiceDetails invoiceId={selectedInvoiceId} onBack={() => setSelectedInvoiceId(null)} />
          ) : (
            <InvoicesList status="draft" searchQuery={searchQuery} onSelectInvoice={setSelectedInvoiceId} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContractsList } from "@/components/contracts/contracts-list"
import { ContractDetails } from "@/components/contracts/contract-details"
import { Plus, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewContractDialog } from "@/components/contracts/new-contract-dialog"

export function ContractsPage() {
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Contracts</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Contracts</DropdownMenuItem>
              <DropdownMenuItem>Active Contracts</DropdownMenuItem>
              <DropdownMenuItem>Expiring Soon</DropdownMenuItem>
              <DropdownMenuItem>Expired</DropdownMenuItem>
              <DropdownMenuItem>Draft</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NewContractDialog />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Contracts</TabsTrigger>
          <TabsTrigger value="client">Client Contracts</TabsTrigger>
          <TabsTrigger value="vendor">Vendor Contracts</TabsTrigger>
          <TabsTrigger value="employee">Employee Contracts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {selectedContractId ? (
            <ContractDetails contractId={selectedContractId} onBack={() => setSelectedContractId(null)} />
          ) : (
            <ContractsList onSelectContract={setSelectedContractId} />
          )}
        </TabsContent>
        <TabsContent value="client" className="space-y-4">
          {selectedContractId ? (
            <ContractDetails contractId={selectedContractId} onBack={() => setSelectedContractId(null)} />
          ) : (
            <ContractsList type="client" onSelectContract={setSelectedContractId} />
          )}
        </TabsContent>
        <TabsContent value="vendor" className="space-y-4">
          {selectedContractId ? (
            <ContractDetails contractId={selectedContractId} onBack={() => setSelectedContractId(null)} />
          ) : (
            <ContractsList type="vendor" onSelectContract={setSelectedContractId} />
          )}
        </TabsContent>
        <TabsContent value="employee" className="space-y-4">
          {selectedContractId ? (
            <ContractDetails contractId={selectedContractId} onBack={() => setSelectedContractId(null)} />
          ) : (
            <ContractsList type="employee" onSelectContract={setSelectedContractId} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

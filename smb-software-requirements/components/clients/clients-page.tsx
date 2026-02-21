"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientsList } from "@/components/clients/clients-list"
import { ClientDetails } from "@/components/clients/client-details"
import { Plus, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ClientsPage() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Clients</DropdownMenuItem>
              <DropdownMenuItem>Active Clients</DropdownMenuItem>
              <DropdownMenuItem>Inactive Clients</DropdownMenuItem>
              <DropdownMenuItem>Prospects</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {selectedClientId ? (
            <ClientDetails clientId={selectedClientId} onBack={() => setSelectedClientId(null)} />
          ) : (
            <ClientsList searchQuery={searchQuery} onSelectClient={setSelectedClientId} />
          )}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          {selectedClientId ? (
            <ClientDetails clientId={selectedClientId} onBack={() => setSelectedClientId(null)} />
          ) : (
            <ClientsList status="active" searchQuery={searchQuery} onSelectClient={setSelectedClientId} />
          )}
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          {selectedClientId ? (
            <ClientDetails clientId={selectedClientId} onBack={() => setSelectedClientId(null)} />
          ) : (
            <ClientsList status="inactive" searchQuery={searchQuery} onSelectClient={setSelectedClientId} />
          )}
        </TabsContent>
        <TabsContent value="prospects" className="space-y-4">
          {selectedClientId ? (
            <ClientDetails clientId={selectedClientId} onBack={() => setSelectedClientId(null)} />
          ) : (
            <ClientsList status="prospect" searchQuery={searchQuery} onSelectClient={setSelectedClientId} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

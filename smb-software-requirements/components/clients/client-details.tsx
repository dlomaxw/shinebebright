"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Mail, Phone, MapPin, Building, Calendar, FileText, CreditCard, MessageSquare } from "lucide-react"
import { ClientContracts } from "@/components/clients/client-contracts"
import { ClientProjects } from "@/components/clients/client-projects"
import { ClientInvoices } from "@/components/clients/client-invoices"
import { ClientNotes } from "@/components/clients/client-notes"

type ClientDetailsProps = {
  clientId: string
  onBack: () => void
}

export function ClientDetails({ clientId, onBack }: ClientDetailsProps) {
  // In a real app, you would fetch the client details based on the ID
  const client = {
    id: clientId,
    name: "John Smith",
    company: "Acme Corp",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    address: "123 Business Ave, Suite 200, San Francisco, CA 94107",
    website: "https://www.acmecorp.com",
    industry: "Technology",
    status: "active",
    totalSpent: "$24,500",
    lastContact: "2023-05-15",
    nextMeeting: "2023-06-10",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "JS",
    contactPerson: "John Smith",
    contactTitle: "CEO",
    notes:
      "Acme Corp is interested in expanding their digital presence. They're looking for a comprehensive solution that includes website redesign and digital marketing services.",
    tags: ["website", "marketing", "enterprise"],
  }

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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{client.name}</h2>
          <p className="text-muted-foreground">{client.company}</p>
        </div>
        <Badge className={`ml-auto ${getStatusColor(client.status)}`}>
          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                <AvatarFallback className="text-2xl">{client.initials}</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{client.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{client.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Industry</p>
              <p>{client.industry}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Website</p>
              <p>{client.website}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Primary Contact</p>
              <p>
                {client.contactPerson}, {client.contactTitle}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Tags</p>
              <div className="flex flex-wrap gap-2">
                {client.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relationship Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">{client.totalSpent}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Last Contact</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p>{client.lastContact}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Next Meeting</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p>{client.nextMeeting}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Notes</p>
              <p className="text-sm">{client.notes}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">
            <FileText className="mr-2 h-4 w-4" />
            Contracts
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Building className="mr-2 h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="invoices">
            <CreditCard className="mr-2 h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="notes">
            <MessageSquare className="mr-2 h-4 w-4" />
            Notes & Activities
          </TabsTrigger>
        </TabsList>
        <TabsContent value="contracts" className="space-y-4">
          <ClientContracts clientId={clientId} />
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <ClientProjects clientId={clientId} />
        </TabsContent>
        <TabsContent value="invoices" className="space-y-4">
          <ClientInvoices clientId={clientId} />
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <ClientNotes clientId={clientId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

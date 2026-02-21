"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Mail, Phone, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Client = {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: "active" | "inactive" | "prospect"
  industry: string
  totalSpent: string
  lastContact: string
  avatar?: string
  initials: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "John Smith",
    company: "Acme Corp",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    status: "active",
    industry: "Technology",
    totalSpent: "$24,500",
    lastContact: "2023-05-15",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JS",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "TechSoft Inc",
    email: "sarah@techsoft.com",
    phone: "(555) 234-5678",
    status: "active",
    industry: "Software",
    totalSpent: "$18,200",
    lastContact: "2023-05-10",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
  },
  {
    id: "3",
    name: "Michael Brown",
    company: "Global Industries",
    email: "michael@globalind.com",
    phone: "(555) 345-6789",
    status: "inactive",
    industry: "Manufacturing",
    totalSpent: "$32,100",
    lastContact: "2023-04-22",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
  },
  {
    id: "4",
    name: "Emily Davis",
    company: "Retail Solutions",
    email: "emily@retailsol.com",
    phone: "(555) 456-7890",
    status: "active",
    industry: "Retail",
    totalSpent: "$15,750",
    lastContact: "2023-05-18",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ED",
  },
  {
    id: "5",
    name: "Robert Wilson",
    company: "Finance Pro",
    email: "robert@financepro.com",
    phone: "(555) 567-8901",
    status: "prospect",
    industry: "Finance",
    totalSpent: "$0",
    lastContact: "2023-05-05",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RW",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    company: "Healthcare Plus",
    email: "jennifer@healthplus.com",
    phone: "(555) 678-9012",
    status: "active",
    industry: "Healthcare",
    totalSpent: "$28,900",
    lastContact: "2023-05-12",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JL",
  },
  {
    id: "7",
    name: "David Chen",
    company: "Education First",
    email: "david@edufirst.com",
    phone: "(555) 789-0123",
    status: "inactive",
    industry: "Education",
    totalSpent: "$12,400",
    lastContact: "2023-04-15",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DC",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    company: "Marketing Experts",
    email: "lisa@marketexp.com",
    phone: "(555) 890-1234",
    status: "prospect",
    industry: "Marketing",
    totalSpent: "$0",
    lastContact: "2023-05-08",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "LT",
  },
]

type ClientsListProps = {
  status?: "active" | "inactive" | "prospect"
  searchQuery?: string
  onSelectClient: (id: string) => void
}

export function ClientsList({ status, searchQuery = "", onSelectClient }: ClientsListProps) {
  let filteredClients = [...mockClients]

  if (status) {
    filteredClients = filteredClients.filter((client) => client.status === status)
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredClients = filteredClients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.company.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query),
    )
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
    <Card>
      <CardHeader>
        <CardTitle>Client Directory</CardTitle>
        <CardDescription>Manage your client relationships</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
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
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{client.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{client.industry}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(client.status)}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{client.totalSpent}</TableCell>
                <TableCell>{client.lastContact}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onSelectClient(client.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Add Contract</DropdownMenuItem>
                        <DropdownMenuItem>Create Invoice</DropdownMenuItem>
                        <DropdownMenuItem>View Projects</DropdownMenuItem>
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

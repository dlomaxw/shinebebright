"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Download, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Contract = {
  id: string
  title: string
  type: "client" | "vendor" | "employee"
  party: string
  startDate: string
  endDate: string
  value: string
  status: "active" | "draft" | "expired" | "pending"
}

const mockContracts: Contract[] = [
  {
    id: "1",
    title: "Website Development Agreement",
    type: "client",
    party: "Acme Corp",
    startDate: "2023-01-15",
    endDate: "2023-12-31",
    value: "$24,000",
    status: "active",
  },
  {
    id: "2",
    title: "Software License Agreement",
    type: "vendor",
    party: "TechSoft Inc",
    startDate: "2023-03-01",
    endDate: "2024-02-28",
    value: "$8,500",
    status: "active",
  },
  {
    id: "3",
    title: "Consulting Services Agreement",
    type: "client",
    party: "Global Industries",
    startDate: "2023-02-10",
    endDate: "2023-08-10",
    value: "$15,000",
    status: "expired",
  },
  {
    id: "4",
    title: "Employment Contract",
    type: "employee",
    party: "John Smith",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    value: "$75,000",
    status: "active",
  },
  {
    id: "5",
    title: "Office Lease Agreement",
    type: "vendor",
    party: "City Properties LLC",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    value: "$36,000",
    status: "active",
  },
  {
    id: "6",
    title: "Marketing Services Agreement",
    type: "client",
    party: "BrandBoost Agency",
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    value: "$12,000",
    status: "pending",
  },
  {
    id: "7",
    title: "Equipment Purchase Agreement",
    type: "vendor",
    party: "Industrial Supplies Co",
    startDate: "2023-05-15",
    endDate: "2023-05-15",
    value: "$7,200",
    status: "active",
  },
]

type ContractsListProps = {
  type?: "client" | "vendor" | "employee"
  onSelectContract: (id: string) => void
}

export function ContractsList({ type, onSelectContract }: ContractsListProps) {
  const filteredContracts = type ? mockContracts.filter((contract) => contract.type === type) : mockContracts

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
      <CardHeader>
        <CardTitle>Manage Contracts</CardTitle>
        <CardDescription>View and manage all your contracts in one place</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contract Name</TableHead>
              <TableHead>Party</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.title}</TableCell>
                <TableCell>{contract.party}</TableCell>
                <TableCell>{contract.startDate}</TableCell>
                <TableCell>{contract.endDate}</TableCell>
                <TableCell>{contract.value}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onSelectContract(contract.id)}>
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

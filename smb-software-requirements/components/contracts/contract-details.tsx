"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Edit, Clock, AlertCircle, CheckCircle2 } from "lucide-react"

type ContractDetailsProps = {
  contractId: string
  onBack: () => void
}

export function ContractDetails({ contractId, onBack }: ContractDetailsProps) {
  // In a real app, you would fetch the contract details based on the ID
  const contract = {
    id: contractId,
    title: "Website Development Agreement",
    type: "client",
    party: "Acme Corp",
    partyContact: "John Smith, CEO",
    partyEmail: "john@acmecorp.com",
    partyPhone: "(555) 123-4567",
    startDate: "2023-01-15",
    endDate: "2023-12-31",
    value: "$24,000",
    status: "active",
    description:
      "Agreement for the development and maintenance of Acme Corp's e-commerce website, including design, development, testing, and deployment phases.",
    terms: [
      "Payment schedule: 30% upfront, 40% at beta release, 30% upon completion",
      "Deliverables include responsive design, CMS integration, and payment processing",
      "Maintenance period: 6 months after launch",
      "24/7 emergency support for critical issues",
    ],
    milestones: [
      { title: "Project Kickoff", date: "2023-01-20", completed: true },
      { title: "Design Approval", date: "2023-02-15", completed: true },
      { title: "Beta Release", date: "2023-06-01", completed: true },
      { title: "Final Delivery", date: "2023-08-15", completed: false },
      { title: "End of Maintenance Period", date: "2024-02-15", completed: false },
    ],
    documents: [
      { name: "Signed Contract", type: "PDF", size: "2.4 MB", date: "2023-01-15" },
      { name: "Statement of Work", type: "DOCX", size: "1.8 MB", date: "2023-01-15" },
      { name: "Design Specifications", type: "PDF", size: "5.2 MB", date: "2023-02-10" },
      { name: "Change Request #1", type: "PDF", size: "0.8 MB", date: "2023-04-22" },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{contract.title}</h2>
          <p className="text-muted-foreground">
            Contract with {contract.party} • {contract.startDate} to {contract.endDate}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Contract
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Contract Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">{contract.status}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Contract Type</p>
              <p>{contract.type.charAt(0).toUpperCase() + contract.type.slice(1)} Contract</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Contract Value</p>
              <p>{contract.value}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Duration</p>
              <p>
                {contract.startDate} to {contract.endDate}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Party Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p>{contract.party}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Contact Person</p>
              <p>{contract.partyContact}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{contract.partyEmail}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{contract.partyPhone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Start Date</p>
              <p>{contract.startDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">End Date</p>
              <p>{contract.endDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Next Milestone</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <p>Final Delivery - 2023-08-15</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Renewal Reminder</p>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p>60 days before expiration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{contract.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Milestones</CardTitle>
              <CardDescription>Track important milestones and deliverables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contract.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                    {milestone.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-sm text-muted-foreground">Due: {milestone.date}</p>
                    </div>
                    <Badge
                      className={
                        milestone.completed ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                      }
                    >
                      {milestone.completed ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Documents</CardTitle>
              <CardDescription>All documents related to this contract</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contract.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded bg-muted p-2">
                        <span className="font-mono text-xs">{doc.type}</span>
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.size} • Uploaded on {doc.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="terms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
              <CardDescription>Key terms and conditions of this contract</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-6">
                {contract.terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

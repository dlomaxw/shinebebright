"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { Plus, CreditCard, TrendingUp, TrendingDown } from "lucide-react"

type CreditTransaction = {
  id: string
  user_id: string
  transaction_type: string
  amount: number
  description: string
  created_at: string
  user_profiles: {
    email: string
    full_name?: string
  }
}

export function CreditManagement() {
  const [transactions, setTransactions] = useState<CreditTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState("")
  const [creditAmount, setCreditAmount] = useState("")
  const [description, setDescription] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const { user } = useAuth()

  useEffect(() => {
    fetchTransactions()
    fetchUsers()
  }, [])

  const fetchTransactions = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setTransactions([
        {
          id: "tx-1",
          user_id: "1",
          transaction_type: "admin_grant",
          amount: 100,
          description: "Initial credits",
          created_at: new Date().toISOString(),
          user_profiles: {
            email: "john@example.com",
            full_name: "John Doe",
          }
        }
      ])
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUsers([
        { id: "1", email: "john@example.com", full_name: "John Doe", credits: 100 }
      ])
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const addCredits = async () => {
    if (!selectedUserId || !creditAmount || !description) return

    try {
      const newTransaction = {
        id: `tx-${Date.now()}`,
        user_id: selectedUserId,
        transaction_type: "admin_grant",
        amount: Number.parseInt(creditAmount),
        description,
        created_at: new Date().toISOString(),
        user_profiles: {
          email: users.find(u => u.id === selectedUserId)?.email || "",
          full_name: users.find(u => u.id === selectedUserId)?.full_name || "",
        }
      }
      setTransactions([newTransaction, ...transactions])
      setIsDialogOpen(false)
      setSelectedUserId("")
      setCreditAmount("")
      setDescription("")
    } catch (error) {
      console.error("Error adding credits:", error)
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "usage":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "admin_grant":
      case "purchase":
      case "bonus":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      default:
        return <CreditCard className="h-4 w-4 text-gray-500" />
    }
  }

  const getTransactionColor = (type: string, amount: number) => {
    if (amount > 0) return "text-green-600"
    if (amount < 0) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Credit Management</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Credits
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Credits to User</DialogTitle>
              <DialogDescription>Grant credits to a user account</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="user">Select User</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                >
                  <option value="">Select a user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name || user.email} ({user.credits} credits)
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Credit Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter credit amount"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Reason for credit grant..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addCredits}>Add Credits</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credit Transactions</CardTitle>
          <CardDescription>Recent credit transactions across all users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.user_profiles?.full_name || "No name"}</p>
                      <p className="text-sm text-muted-foreground">{transaction.user_profiles?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.transaction_type)}
                      <Badge variant="outline">{transaction.transaction_type.replace("_", " ")}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={getTransactionColor(transaction.transaction_type, transaction.amount)}>
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount} credits
                    </span>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

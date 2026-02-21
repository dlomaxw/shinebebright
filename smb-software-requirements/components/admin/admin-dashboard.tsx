"use client"

import { useAuth } from "@/hooks/use-auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/admin/user-management"
import { CreditManagement } from "@/components/admin/credit-management"
import { SubscriptionManagement } from "@/components/admin/subscription-management"
import { SystemStats } from "@/components/admin/system-stats"
import { Shield, Users, CreditCard, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Access denied</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage users, credits, and system settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium">Admin Access</span>
        </div>
      </div>

      <Tabs defaultValue="stats" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stats">
            <BarChart3 className="mr-2 h-4 w-4" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="credits">
            <CreditCard className="mr-2 h-4 w-4" />
            Credits
          </TabsTrigger>
          <TabsTrigger value="subscriptions">
            <CreditCard className="mr-2 h-4 w-4" />
            Subscriptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          <SystemStats />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="credits" className="space-y-4">
          <CreditManagement />
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <SubscriptionManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

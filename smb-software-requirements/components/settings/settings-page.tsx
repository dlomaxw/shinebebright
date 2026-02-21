"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRoles } from "@/components/settings/user-roles"
import { TeamMembers } from "@/components/settings/team-members"
import { GeneralSettings } from "@/components/settings/general-settings"
import { CompanyProfile } from "@/components/settings/company-profile"
import { IntegrationsSettings } from "@/components/settings/integrations"

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="roles">User Roles & Permissions</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="company" className="space-y-4">
          <CompanyProfile />
        </TabsContent>
        <TabsContent value="team" className="space-y-4">
          <TeamMembers />
        </TabsContent>
        <TabsContent value="roles" className="space-y-4">
          <UserRoles />
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4">
          <IntegrationsSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

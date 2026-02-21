"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { toast } from "sonner"
import { DownloadCloud, UploadCloud, AlertTriangle } from "lucide-react"

export function GeneralSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    taskReminders: true,
    projectUpdates: true,
    teamMessages: true,
    clientActivity: false,
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    language: "en",
    theme: "system",
  })

  const handleSwitchChange = (key: string) => (checked: boolean) => {
    setSettings({
      ...settings,
      [key]: checked,
    })
  }

  const handleSelectChange = (key: string) => (value: string) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={handleSwitchChange("emailNotifications")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="task-reminders">Task Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminders for upcoming and overdue tasks</p>
              </div>
              <Switch
                id="task-reminders"
                checked={settings.taskReminders}
                onCheckedChange={handleSwitchChange("taskReminders")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="project-updates">Project Updates</Label>
                <p className="text-sm text-muted-foreground">Receive notifications when projects are updated</p>
              </div>
              <Switch
                id="project-updates"
                checked={settings.projectUpdates}
                onCheckedChange={handleSwitchChange("projectUpdates")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="team-messages">Team Messages</Label>
                <p className="text-sm text-muted-foreground">Get notified when you receive new team messages</p>
              </div>
              <Switch
                id="team-messages"
                checked={settings.teamMessages}
                onCheckedChange={handleSwitchChange("teamMessages")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="client-activity">Client Activity</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about client actions</p>
              </div>
              <Switch
                id="client-activity"
                checked={settings.clientActivity}
                onCheckedChange={handleSwitchChange("clientActivity")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={handleSelectChange("timezone")}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select value={settings.dateFormat} onValueChange={handleSelectChange("dateFormat")}>
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-format">Time Format</Label>
              <Select value={settings.timeFormat} onValueChange={handleSelectChange("timeFormat")}>
                <SelectTrigger id="time-format">
                  <SelectValue placeholder="Select time format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                  <SelectItem value="24h">24-hour (13:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={handleSelectChange("language")}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={settings.theme} onValueChange={handleSelectChange("theme")}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>Change Password</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline">Set Up Two-Factor Authentication</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management & Import/Export</CardTitle>
          <CardDescription>Export your databases, import backups, or factory reset the firm's data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Button variant="outline" className="flex-1" onClick={() => toast.success("Export Backup Started", { description: "Bundling all files and data to be exported as a zip." })}>
              <DownloadCloud className="w-4 h-4 mr-2" />
              Export All Files & Data
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => toast.success("Import dialog opened", { description: "Ready to import backup files." })}>
              <UploadCloud className="w-4 h-4 mr-2" />
              Import Data
            </Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-destructive flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Danger Zone: Factory Reset
              </h4>
              <p className="text-sm text-muted-foreground">Permanently wipe out all clients, messages, projects and revert settings to factory preset.</p>
            </div>
            <Button variant="destructive" onClick={() => toast.success("Factory Reset Initiated", { description: "Please confirm your action in the upcoming dialog window." })}>Factory Reset Settings & Data</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={() => toast.success("Settings saved", { description: "Your basic preferences have been updated." })}>Save Changes</Button>
      </div>
    </div>
  )
}

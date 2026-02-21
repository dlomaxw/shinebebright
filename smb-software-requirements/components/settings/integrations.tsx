"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ExternalLink, Plug, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function IntegrationsSettings() {
    const [salesforceEnabled, setSalesforceEnabled] = useState(true)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Plug className="h-6 w-6 text-blue-600" />
                        <CardTitle>Salesforce Case Routing</CardTitle>
                    </div>
                    <CardDescription>Configure Google Cloud Application Integration for Salesforce cases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Enable Salesforce Sync</Label>
                            <p className="text-sm text-muted-foreground">Automatically route and sync cases via Cloud Integrations</p>
                        </div>
                        <Switch
                            checked={salesforceEnabled}
                            onCheckedChange={(checked) => {
                                setSalesforceEnabled(checked)
                                if (checked) toast.success("Salesforce routing integration enabled")
                                else toast.info("Salesforce routing integration disabled")
                            }}
                        />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Integration Cloud Location</Label>
                            <Input value="northamerica-northeast1" disabled />
                        </div>
                        <div className="space-y-2">
                            <Label>Google Cloud Project</Label>
                            <Input value="promomd-e6cd1" disabled />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 text-blue-800 rounded-md border border-blue-200">
                        <ShieldCheck className="h-5 w-5" />
                        <p className="text-sm">Connection established and securely routed via Application Integrations.</p>
                    </div>

                    <Button
                        className="w-full sm:w-auto"
                        variant="outline"
                        onClick={() => window.open("https://console.cloud.google.com/integrations/edit/salesforce_case_routing/locations/northamerica-northeast1?project=promomd-e6cd1", "_blank")}
                    >
                        Manage in Google Cloud Console
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

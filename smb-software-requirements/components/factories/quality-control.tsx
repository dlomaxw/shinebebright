"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function QualityControl() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Control Metrics</CardTitle>
      </CardHeader>
      <CardContent>{"QC dashboards will display defect rates and audit logs."}</CardContent>
    </Card>
  )
}

export default QualityControl

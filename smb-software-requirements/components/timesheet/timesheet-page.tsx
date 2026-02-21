"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimesheetWeekly } from "@/components/timesheet/timesheet-weekly"
import { TimesheetSummary } from "@/components/timesheet/timesheet-summary"
import { Plus, Download } from "lucide-react"
import { DatePickerWithRange } from "@/components/timesheet/date-range-picker"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { toast } from "sonner"

export function TimesheetPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Timesheet</h2>
        <div className="flex gap-2">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button variant="outline" onClick={() => toast.success("Export started", { description: "Your timesheet is being exported as CSV/PDF." })}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => toast.success("Time entry creation launched", { description: "The dialog will be available in the next release." })}>
            <Plus className="mr-2 h-4 w-4" />
            Add Time Entry
          </Button>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="space-y-4">
          <TimesheetWeekly date={date} />
        </TabsContent>
        <TabsContent value="summary" className="space-y-4">
          <TimesheetSummary date={date} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

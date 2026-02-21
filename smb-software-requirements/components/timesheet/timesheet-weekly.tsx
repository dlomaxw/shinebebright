"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Plus } from "lucide-react"

type TimeEntry = {
  id: string
  project: string
  task: string
  date: Date
  hours: number
  notes?: string
}

const mockProjects = [
  { id: "1", name: "Website Redesign" },
  { id: "2", name: "Mobile App Development" },
  { id: "3", name: "E-commerce Platform" },
  { id: "4", name: "Brand Identity Refresh" },
]

const mockTasks = [
  { id: "1", name: "Design" },
  { id: "2", name: "Development" },
  { id: "3", name: "Testing" },
  { id: "4", name: "Meetings" },
  { id: "5", name: "Documentation" },
]

const mockTimeEntries: TimeEntry[] = [
  {
    id: "entry-1",
    project: "Website Redesign",
    task: "Design",
    date: new Date(),
    hours: 3.5,
    notes: "Created wireframes for homepage",
  },
  {
    id: "entry-2",
    project: "Website Redesign",
    task: "Development",
    date: new Date(),
    hours: 4,
    notes: "Implemented responsive navigation",
  },
  {
    id: "entry-3",
    project: "Mobile App Development",
    task: "Design",
    date: addDays(new Date(), 1),
    hours: 2,
    notes: "UI design for onboarding screens",
  },
  {
    id: "entry-4",
    project: "Mobile App Development",
    task: "Meetings",
    date: addDays(new Date(), 1),
    hours: 1.5,
    notes: "Client review meeting",
  },
  {
    id: "entry-5",
    project: "E-commerce Platform",
    task: "Development",
    date: addDays(new Date(), 2),
    hours: 6,
    notes: "Implemented shopping cart functionality",
  },
  {
    id: "entry-6",
    project: "Brand Identity Refresh",
    task: "Design",
    date: addDays(new Date(), 3),
    hours: 4,
    notes: "Logo design iterations",
  },
  {
    id: "entry-7",
    project: "Website Redesign",
    task: "Testing",
    date: addDays(new Date(), 4),
    hours: 3,
    notes: "Cross-browser compatibility testing",
  },
]

type TimesheetWeeklyProps = {
  date: DateRange | undefined
}

export function TimesheetWeekly({ date }: TimesheetWeeklyProps) {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(mockTimeEntries)
  const [newEntry, setNewEntry] = useState<Partial<TimeEntry>>({
    project: "",
    task: "",
    hours: 0,
    notes: "",
  })

  // Calculate the week days based on the selected date range
  const startDate = date?.from || new Date()
  const endDate = date?.to || addDays(startDate, 6)

  const weekStart = startOfWeek(startDate, { weekStartsOn: 1 }) // Monday as start of week
  const weekEnd = endOfWeek(startDate, { weekStartsOn: 1 }) // Sunday as end of week

  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  })

  const getDayEntries = (day: Date) => {
    return timeEntries.filter((entry) => isSameDay(entry.date, day))
  }

  const getDayTotal = (day: Date) => {
    return getDayEntries(day).reduce((total, entry) => total + entry.hours, 0)
  }

  const getWeekTotal = () => {
    return weekDays.reduce((total, day) => total + getDayTotal(day), 0)
  }

  const handleAddEntry = () => {
    if (newEntry.project && newEntry.task && newEntry.hours) {
      const entry: TimeEntry = {
        id: `entry-${timeEntries.length + 1}`,
        project: newEntry.project,
        task: newEntry.task,
        date: startDate,
        hours: Number(newEntry.hours),
        notes: newEntry.notes,
      }

      setTimeEntries([...timeEntries, entry])
      setNewEntry({
        project: "",
        task: "",
        hours: 0,
        notes: "",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Timesheet</CardTitle>
          <CardDescription>
            {format(weekStart, "MMMM d, yyyy")} - {format(weekEnd, "MMMM d, yyyy")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Task</TableHead>
                {weekDays.map((day) => (
                  <TableHead key={day.toString()} className="text-center">
                    <div>{format(day, "EEE")}</div>
                    <div className="text-xs text-muted-foreground">{format(day, "MMM d")}</div>
                  </TableHead>
                ))}
                <TableHead className="text-center">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Group entries by project and task */}
              {Array.from(new Set(timeEntries.map((entry) => `${entry.project}-${entry.task}`))).map((key) => {
                const [project, task] = key.split("-")
                const projectEntries = timeEntries.filter((entry) => entry.project === project && entry.task === task)
                const projectTotal = projectEntries.reduce((total, entry) => total + entry.hours, 0)

                return (
                  <TableRow key={key}>
                    <TableCell>{project}</TableCell>
                    <TableCell>{task}</TableCell>
                    {weekDays.map((day) => {
                      const dayEntry = projectEntries.find((entry) => isSameDay(entry.date, day))
                      return (
                        <TableCell key={day.toString()} className="text-center">
                          {dayEntry ? dayEntry.hours : "-"}
                        </TableCell>
                      )
                    })}
                    <TableCell className="text-center font-medium">{projectTotal}</TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell colSpan={2} className="font-medium">
                  Daily Total
                </TableCell>
                {weekDays.map((day) => (
                  <TableCell key={day.toString()} className="text-center font-medium">
                    {getDayTotal(day)}
                  </TableCell>
                ))}
                <TableCell className="text-center font-medium">{getWeekTotal()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Time Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-2">
              <label htmlFor="project" className="text-sm font-medium">
                Project
              </label>
              <Select value={newEntry.project} onValueChange={(value) => setNewEntry({ ...newEntry, project: value })}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {mockProjects.map((project) => (
                    <SelectItem key={project.id} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="task" className="text-sm font-medium">
                Task
              </label>
              <Select value={newEntry.task} onValueChange={(value) => setNewEntry({ ...newEntry, task: value })}>
                <SelectTrigger id="task">
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  {mockTasks.map((task) => (
                    <SelectItem key={task.id} value={task.name}>
                      {task.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="hours" className="text-sm font-medium">
                Hours
              </label>
              <Input
                id="hours"
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={newEntry.hours || ""}
                onChange={(e) => setNewEntry({ ...newEntry, hours: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <Input
                id="notes"
                value={newEntry.notes || ""}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              />
            </div>
          </div>
          <Button className="mt-4" onClick={handleAddEntry}>
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

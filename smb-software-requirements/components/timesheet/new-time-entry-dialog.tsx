"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Clock } from "lucide-react"

export function NewTimeEntryDialog() {
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Time entry saved", {
            description: "Your hours have been tracked successfully.",
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Clock className="mr-2 h-4 w-4" />
                    Log Time
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Log Time Entry</DialogTitle>
                        <DialogDescription>
                            Record the hours you spent working on a task or project.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="project">Project</Label>
                                <select
                                    id="project"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select project...</option>
                                    <option value="p1">Website Redesign</option>
                                    <option value="p2">Mobile App Development</option>
                                    <option value="p3">CRM Implementation</option>
                                    <option value="internal">Internal Admin</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="hours">Hours Worked</Label>
                                <Input id="hours" type="number" step="0.5" min="0.5" max="24" placeholder="e.g. 2.5" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes/Description</Label>
                            <Input id="notes" placeholder="Summarize what you worked on" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Entry</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

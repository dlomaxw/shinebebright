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
import { Plus } from "lucide-react"

export function NewProjectDialog() {
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Project created successfully", {
            description: "The new project has been added to the system.",
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>
                            Add a new project to your workspace. Set the timeline and budget below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input id="name" placeholder="e.g. Website Redesign" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="client">Client</Label>
                            <Input id="client" placeholder="e.g. Acme Corp" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start">Start Date</Label>
                                <Input id="start" type="date" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end">End Date</Label>
                                <Input id="end" type="date" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="budget">Budget</Label>
                            <Input id="budget" type="text" placeholder="e.g. $10,000" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Create Project</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

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

export function NewContractDialog() {
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Contract created successfully", {
            description: "The new contract is now stored in your records.",
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Contract
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Contract</DialogTitle>
                        <DialogDescription>
                            Draft a new contractual agreement.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Contract Title</Label>
                            <Input id="title" placeholder="e.g. Master Services Agreement" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="party">Counterparty (Client / Vendor)</Label>
                            <Input id="party" placeholder="e.g. Tech Solutions LLc" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start">Effective Date</Label>
                                <Input id="start" type="date" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end">Expiration Date</Label>
                                <Input id="end" type="date" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="value">Contract Value</Label>
                            <Input id="value" type="text" placeholder="e.g. $50,000" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Draft Contract</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

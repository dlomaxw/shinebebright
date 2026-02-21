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

export function NewInvoiceDialog() {
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Invoice created successfully", {
            description: "A draft invoice has been generated for your client.",
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Invoice
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Invoice</DialogTitle>
                        <DialogDescription>
                            Generate a new billing invoice for a client.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="client">Client Name</Label>
                            <Input id="client" placeholder="e.g. Acme Corp" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount ($)</Label>
                            <Input id="amount" type="number" step="0.01" placeholder="e.g. 5000.00" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="issued">Issue Date</Label>
                                <Input id="issued" type="date" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="due">Due Date</Label>
                                <Input id="due" type="date" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Invoice Description (Optional)</Label>
                            <Input id="description" placeholder="e.g. Web Development Services" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Generate Draft</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

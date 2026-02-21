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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { MessageSquare } from "lucide-react"

export function NewMessageDialog() {
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Message sent", {
            description: "Your message has been delivered to the recipient.",
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    New Message
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Compose Message</DialogTitle>
                        <DialogDescription>
                            Draft a direct message to a team member or client.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="to">To:</Label>
                            <Input id="to" placeholder="Type a name or email address" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="What is this about?" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="body">Message Body</Label>
                            <Textarea
                                id="body"
                                placeholder="Type your message here..."
                                required
                                className="min-h-[120px]"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Discard
                        </Button>
                        <Button type="submit">Send Message</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

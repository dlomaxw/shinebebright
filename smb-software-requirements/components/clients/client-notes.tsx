"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

type Note = {
  id: string
  content: string
  date: string
  author: {
    name: string
    avatar?: string
    initials: string
  }
}

type ClientNotesProps = {
  clientId: string
}

export function ClientNotes({ clientId }: ClientNotesProps) {
  const [newNote, setNewNote] = useState("")

  // In a real app, you would fetch notes based on the client ID
  const notes: Note[] = [
    {
      id: "1",
      content:
        "Had a meeting with John about the website redesign project. He's interested in adding e-commerce functionality to the site. Need to prepare a proposal for this additional scope.",
      date: "2023-05-15",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
    },
    {
      id: "2",
      content:
        "Followed up on the invoice #INV-2023-003. John mentioned they're processing it and should be paid by the end of the week.",
      date: "2023-04-10",
      author: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
    },
    {
      id: "3",
      content:
        "Discussed potential digital marketing campaign for Q3. Client is interested but wants to see the results of the website redesign first before committing to additional services.",
      date: "2023-03-22",
      author: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
      },
    },
  ]

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, you would add the note to the database
      console.log("Adding note:", newNote)
      setNewNote("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes & Activities</CardTitle>
        <CardDescription>Keep track of client interactions and notes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Textarea
            placeholder="Add a note about this client..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleAddNote}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </div>

        <div className="space-y-6">
          {notes.map((note) => (
            <div key={note.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={note.author.avatar || "/placeholder.svg"} alt={note.author.name} />
                <AvatarFallback>{note.author.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{note.author.name}</p>
                  <p className="text-xs text-muted-foreground">{note.date}</p>
                </div>
                <p className="text-sm">{note.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

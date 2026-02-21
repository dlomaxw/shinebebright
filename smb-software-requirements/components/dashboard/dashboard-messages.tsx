"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"
import { toast } from "sonner"

type Message = {
  id: string
  content: string
  timestamp: string
  sender: {
    name: string
    avatar?: string
    initials: string
  }
  unread: boolean
  chatName: string
}

type DashboardMessagesProps = {
  limit?: number
}

export function DashboardMessages({ limit }: DashboardMessagesProps) {
  const messages: Message[] = [
    {
      id: "msg-1",
      content:
        "Hey team, I've just pushed the latest design files to Figma. Can everyone take a look and provide feedback?",
      timestamp: "10:30 AM",
      sender: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      unread: true,
      chatName: "Website Redesign Team",
    },
    {
      id: "msg-2",
      content: "I've updated the wireframes for the client meeting tomorrow. Let me know if you have any questions.",
      timestamp: "9:15 AM",
      sender: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      unread: true,
      chatName: "Direct Message",
    },
    {
      id: "msg-3",
      content: "The API integration is complete. Ready for testing.",
      timestamp: "Yesterday",
      sender: {
        name: "Robert Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RW",
      },
      unread: true,
      chatName: "Mobile App Project",
    },
    {
      id: "msg-4",
      content: "Can you review the code changes I pushed?",
      timestamp: "Yesterday",
      sender: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
      unread: false,
      chatName: "Direct Message",
    },
    {
      id: "msg-5",
      content: "The campaign is scheduled to launch next Monday",
      timestamp: "Monday",
      sender: {
        name: "Jessica Taylor",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JT",
      },
      unread: false,
      chatName: "Marketing Team",
    },
    {
      id: "msg-6",
      content: "The backend is ready for integration",
      timestamp: "Monday",
      sender: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
      },
      unread: false,
      chatName: "Direct Message",
    },
    {
      id: "msg-7",
      content: "Here's a summary of today's client meeting",
      timestamp: "Last week",
      sender: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
      unread: false,
      chatName: "Client Meeting Notes",
    },
  ]

  const displayMessages = limit ? messages.slice(0, limit) : messages

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Team Messages</h3>
          <Button onClick={() => toast.success("Message drafting launched", { description: "The dialog will be available in the next release." })}>
            <MessageSquare className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      )}

      <Card>
        {!limit && (
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Stay connected with your team</CardDescription>
          </CardHeader>
        )}
        <CardContent className="space-y-4">
          {displayMessages.map((message) => (
            <div key={message.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
                <AvatarFallback>{message.sender.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{message.sender.name}</p>
                    <p className="text-xs text-muted-foreground">in {message.chatName}</p>
                    {message.unread && <Badge className="h-1.5 w-1.5 rounded-full bg-primary p-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {!limit && (
            <div className="flex justify-center">
              <Button variant="outline">View All Messages</Button>
            </div>
          )}
          {limit && (
            <div className="flex justify-center">
              <Button variant="link">View All Messages</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

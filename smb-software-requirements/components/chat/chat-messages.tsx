"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Paperclip, Send, Smile, MoreHorizontal, Phone, Video } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Message = {
  id: string
  content: string
  timestamp: string
  sender: {
    id: string
    name: string
    avatar?: string
    initials: string
  }
  attachments?: {
    name: string
    url: string
    type: "image" | "document" | "other"
  }[]
}

type ChatMessagesProps = {
  chatId: string
}

export function ChatMessages({ chatId }: ChatMessagesProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // In a real app, you would fetch messages based on the chat ID
  const chat = {
    id: chatId,
    name: "Website Redesign Team",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "WT",
    isGroup: true,
    members: [
      { id: "user-1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", initials: "JD" },
      { id: "user-2", name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
      { id: "user-3", name: "Michael Brown", avatar: "/placeholder.svg?height=32&width=32", initials: "MB" },
      { id: "user-4", name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "ED" },
    ],
  }

  const messages: Message[] = [
    {
      id: "msg-1",
      content:
        "Hey team, I've just pushed the latest design files to Figma. Can everyone take a look and provide feedback?",
      timestamp: "10:30 AM",
      sender: {
        id: "user-2",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
    },
    {
      id: "msg-2",
      content: "I'll check them out right away. Are there any specific areas you want us to focus on?",
      timestamp: "10:32 AM",
      sender: {
        id: "user-1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
    },
    {
      id: "msg-3",
      content: "Mainly the homepage layout and the new navigation. I've tried a few different approaches.",
      timestamp: "10:35 AM",
      sender: {
        id: "user-2",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
    },
    {
      id: "msg-4",
      content: "Here's a screenshot of the current version I'm working on:",
      timestamp: "10:36 AM",
      sender: {
        id: "user-2",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      attachments: [
        {
          name: "homepage-design.png",
          url: "/placeholder.svg?height=300&width=500",
          type: "image",
        },
      ],
    },
    {
      id: "msg-5",
      content: "That looks great! I like the clean layout and how you've organized the content sections.",
      timestamp: "10:40 AM",
      sender: {
        id: "user-3",
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
    },
    {
      id: "msg-6",
      content:
        "I agree with Michael. The navigation is much more intuitive now. One suggestion - could we make the call-to-action buttons a bit more prominent?",
      timestamp: "10:41 AM",
      sender: {
        id: "user-4",
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
      },
    },
    {
      id: "msg-7",
      content: "Good point, Emily. I'll try a few variations with more prominent CTAs.",
      timestamp: "10:42 AM",
      sender: {
        id: "user-2",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send the message to the server
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Group messages by sender for better UI
  const groupedMessages: Message[][] = []
  let currentGroup: Message[] = []
  let currentSenderId = ""

  messages.forEach((message) => {
    if (message.sender.id !== currentSenderId) {
      if (currentGroup.length > 0) {
        groupedMessages.push([...currentGroup])
        currentGroup = []
      }
      currentSenderId = message.sender.id
    }
    currentGroup.push(message)
  })

  if (currentGroup.length > 0) {
    groupedMessages.push(currentGroup)
  }

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
            <AvatarFallback>{chat.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{chat.name}</CardTitle>
            {chat.isGroup && <p className="text-xs text-muted-foreground">{chat.members?.length} members</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Info</DropdownMenuItem>
              <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
              <DropdownMenuItem>Leave Chat</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex} className="flex gap-3">
              <Avatar className="mt-1 h-8 w-8">
                <AvatarImage src={group[0].sender.avatar || "/placeholder.svg"} alt={group[0].sender.name} />
                <AvatarFallback>{group[0].sender.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{group[0].sender.name}</p>
                  <p className="text-xs text-muted-foreground">{group[0].timestamp}</p>
                </div>
                {group.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <p>{message.content}</p>
                    {message.attachments?.map((attachment, index) => (
                      <div key={index} className="mt-2">
                        {attachment.type === "image" ? (
                          <div className="overflow-hidden rounded-lg">
                            <img
                              src={attachment.url || "/placeholder.svg"}
                              alt={attachment.name}
                              className="max-h-[300px] w-auto object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 rounded-lg border p-2">
                            <Paperclip className="h-4 w-4" />
                            <span className="text-sm">{attachment.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </>
  )
}

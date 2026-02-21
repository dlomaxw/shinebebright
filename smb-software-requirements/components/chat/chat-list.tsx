"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Chat = {
  id: string
  name: string
  avatar?: string
  initials: string
  lastMessage: string
  timestamp: string
  unread: number
  isGroup: boolean
  members?: {
    name: string
    avatar?: string
    initials: string
  }[]
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Website Redesign Team",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "WT",
    lastMessage: "Let's review the new homepage design tomorrow",
    timestamp: "10:42 AM",
    unread: 3,
    isGroup: true,
    members: [
      { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", initials: "JD" },
      { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
      { name: "Michael Brown", avatar: "/placeholder.svg?height=32&width=32", initials: "MB" },
      { name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "ED" },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
    lastMessage: "I've updated the wireframes for the client meeting",
    timestamp: "9:15 AM",
    unread: 0,
    isGroup: false,
  },
  {
    id: "3",
    name: "Mobile App Project",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MP",
    lastMessage: "The API integration is complete. Ready for testing.",
    timestamp: "Yesterday",
    unread: 0,
    isGroup: true,
    members: [
      { name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "ED" },
      { name: "Robert Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "RW" },
      { name: "Jennifer Lee", avatar: "/placeholder.svg?height=32&width=32", initials: "JL" },
    ],
  },
  {
    id: "4",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
    lastMessage: "Can you review the code changes I pushed?",
    timestamp: "Yesterday",
    unread: 1,
    isGroup: false,
  },
  {
    id: "5",
    name: "Marketing Team",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MT",
    lastMessage: "The campaign is scheduled to launch next Monday",
    timestamp: "Monday",
    unread: 0,
    isGroup: true,
    members: [
      { name: "Jessica Taylor", avatar: "/placeholder.svg?height=32&width=32", initials: "JT" },
      { name: "Andrew Martin", avatar: "/placeholder.svg?height=32&width=32", initials: "AM" },
      { name: "Lisa Wang", avatar: "/placeholder.svg?height=32&width=32", initials: "LW" },
    ],
  },
  {
    id: "6",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ED",
    lastMessage: "The backend is ready for integration",
    timestamp: "Monday",
    unread: 0,
    isGroup: false,
  },
  {
    id: "7",
    name: "Client Meeting Notes",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "CM",
    lastMessage: "Here's a summary of today's client meeting",
    timestamp: "Last week",
    unread: 0,
    isGroup: true,
    members: [
      { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", initials: "JD" },
      { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
      { name: "Robert Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "RW" },
    ],
  },
]

type ChatListProps = {
  searchQuery?: string
  selectedChatId: string | null
  onSelectChat: (id: string) => void
}

export function ChatList({ searchQuery = "", selectedChatId, onSelectChat }: ChatListProps) {
  let filteredChats = [...mockChats]

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredChats = filteredChats.filter(
      (chat) => chat.name.toLowerCase().includes(query) || chat.lastMessage.toLowerCase().includes(query),
    )
  }

  return (
    <div className="space-y-1 p-2">
      {filteredChats.map((chat) => (
        <div
          key={chat.id}
          className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-accent ${
            selectedChatId === chat.id ? "bg-accent" : ""
          }`}
          onClick={() => onSelectChat(chat.id)}
        >
          <Avatar>
            <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
            <AvatarFallback>{chat.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between">
              <p className="truncate font-medium">{chat.name}</p>
              <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
            </div>
            <p className="truncate text-sm text-muted-foreground">{chat.lastMessage}</p>
          </div>
          {chat.unread > 0 && (
            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">{chat.unread}</Badge>
          )}
        </div>
      ))}
    </div>
  )
}

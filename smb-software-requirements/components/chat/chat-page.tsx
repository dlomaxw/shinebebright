"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatList } from "@/components/chat/chat-list"
import { ChatMessages } from "@/components/chat/chat-messages"
import { Search, Plus } from "lucide-react"

export function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>("1")
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Team Chat</h2>
      </div>

      <div className="grid h-[calc(100vh-12rem)] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Card className="col-span-1 flex flex-col">
          <div className="flex items-center gap-2 p-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="icon" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <CardContent className="flex-1 overflow-auto p-0">
            <ChatList searchQuery={searchQuery} selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
          </CardContent>
        </Card>

        <Card className="col-span-1 flex flex-col md:col-span-2 lg:col-span-3">
          {selectedChatId ? (
            <ChatMessages chatId={selectedChatId} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">No conversation selected</h3>
                <p className="text-sm text-muted-foreground">Select a conversation from the list to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

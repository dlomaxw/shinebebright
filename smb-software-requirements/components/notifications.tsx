"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">New invoice paid</p>
            <p className="text-xs text-muted-foreground">Invoice #12345 was paid by Client A</p>
            <p className="text-xs text-muted-foreground">10 minutes ago</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Team meeting reminder</p>
            <p className="text-xs text-muted-foreground">Weekly team meeting in 30 minutes</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Low inventory alert</p>
            <p className="text-xs text-muted-foreground">Product XYZ is running low (5 units left)</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-center text-sm text-muted-foreground">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

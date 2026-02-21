"use client"

import type React from "react"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Search } from "@/components/search"
import { Notifications } from "@/components/notifications"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <MainNav />
          <div className="ml-auto flex items-center gap-4">
            <Search />
            <Notifications />
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

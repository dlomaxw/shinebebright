"use client"

import Link from "next/link"
import { Building2 } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function MainNav() {
  return (
    <div className="flex items-center gap-2">
      <SidebarTrigger />
      <Link href="/" className="flex items-center gap-2">
        <Building2 className="h-6 w-6" />
        <span className="font-bold">SMB Platform</span>
      </Link>
    </div>
  )
}

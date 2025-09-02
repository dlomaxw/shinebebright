"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// Define types for our context
type AdminUser = {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  avatar?: string
  lastLogin?: string
}

type AdminStats = {
  visitors: number
  inquiries: number
  projects: number
  users: number
  visitorsTrend: number
  inquiriesTrend: number
  projectsTrend: number
  usersTrend: number
}

type AdminSettings = {
  siteTitle: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  colorScheme: {
    primary: string
    secondary: string
    accent: string
  }
  logoUrl: string
  faviconUrl: string
}

type AdminContextType = {
  user: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  stats: AdminStats
  settings: AdminSettings
  notifications: Notification[]
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateSettings: (settings: Partial<AdminSettings>) => Promise<boolean>
  updateStats: () => Promise<boolean>
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
}

type Notification = {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  read: boolean
  date: string
}

// Create the context
const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Sample data
const sampleUser: AdminUser = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@bright.com",
  role: "admin",
  avatar: "/images/logo.png",
  lastLogin: new Date().toISOString(),
}

const sampleStats: AdminStats = {
  visitors: 24532,
  inquiries: 342,
  projects: 87,
  users: 12,
  visitorsTrend: 12.5,
  inquiriesTrend: 8.2,
  projectsTrend: -2.4,
  usersTrend: 9.1,
}

const sampleSettings: AdminSettings = {
  siteTitle: "Bright Platform",
  siteDescription: "Immersive technology solutions across industries",
  contactEmail: "brightthoughtsservices@gmail.com",
  contactPhone: "+1 (123) 456-7890",
  contactAddress: "1St Floor Shop 4, The Square, Plot 10 Third St, Kampala",
  socialLinks: {
    facebook: "https://facebook.com/brightplatform",
    twitter: "https://twitter.com/brightplatform",
    instagram: "https://instagram.com/brightplatform",
    linkedin: "https://linkedin.com/company/brightplatform",
  },
  colorScheme: {
    primary: "#FFE100",
    secondary: "#111111",
    accent: "#0070F3",
  },
  logoUrl: "/images/logo.png",
  faviconUrl: "/favicon.ico",
}

const sampleNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "New Inquiry",
    message: "You have received a new inquiry from John Smith",
    type: "info",
    read: false,
    date: new Date().toISOString(),
  },
  {
    id: "notif-2",
    title: "Project Updated",
    message: "Luxury Condo VR Tour project has been updated",
    type: "success",
    read: false,
    date: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "notif-3",
    title: "System Warning",
    message: "Storage usage is approaching 90% of your limit",
    type: "warning",
    read: true,
    date: new Date(Date.now() - 86400000).toISOString(),
  },
]

// Create the provider
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats>(sampleStats)
  const [settings, setSettings] = useState<AdminSettings>(sampleSettings)
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      // In a real app, this would check a token in localStorage or cookies
      // and validate it with the backend
      const token = localStorage.getItem("admin_token")

      if (token) {
        // Simulate API call to validate token
        await new Promise((resolve) => setTimeout(resolve, 500))
        setUser(sampleUser)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Hardcode successful login for admin@bright.com with password "password"
      if (email === "admin@bright.com" && password === "password") {
        setUser(sampleUser)
        localStorage.setItem("admin_token", "demo-token-12345")
        setIsLoading(false)
        return true
      } else {
        setIsLoading(false)
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try admin@bright.com / password",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      return false
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("admin_token")
    router.push("/login")
  }

  // Update settings
  const updateSettings = async (newSettings: Partial<AdminSettings>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSettings((prev) => ({ ...prev, ...newSettings }))
      toast({
        title: "Settings updated",
        description: "Your changes have been saved successfully",
      })
      return true
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update settings",
        variant: "destructive",
      })
      return false
    }
  }

  // Update stats
  const updateStats = async (): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would fetch fresh stats from the backend
      // For demo, we'll just slightly modify the existing stats
      setStats((prev) => ({
        ...prev,
        visitors: prev.visitors + Math.floor(Math.random() * 100),
        inquiries: prev.inquiries + Math.floor(Math.random() * 5),
      }))
      return true
    } catch (error) {
      return false
    }
  }

  // Mark notification as read
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    stats,
    settings,
    notifications,
    login,
    logout,
    updateSettings,
    updateStats,
    markNotificationAsRead,
    clearAllNotifications,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

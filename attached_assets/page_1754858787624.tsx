"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Users, FileText, MessageSquare, ArrowRight, ArrowUp, ArrowDown, Eye, Clock, Calendar, RefreshCw } from 'lucide-react'
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdmin } from "@/contexts/admin-context"

// Sample data for the dashboard
const recentInquiries = [
  {
    name: "John Smith",
    email: "john@example.com",
    service: "Real Estate",
    date: "2 hours ago",
    status: "New",
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    service: "Architecture",
    date: "5 hours ago",
    status: "Responded",
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    service: "Interior Design",
    date: "1 day ago",
    status: "Closed",
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    service: "Media Production",
    date: "2 days ago",
    status: "Responded",
  },
]

const recentProjects = [
  {
    title: "Luxury Condo VR Tour",
    client: "Skyline Properties",
    status: "In Progress",
    completion: 75,
    dueDate: "Oct 15, 2023",
  },
  {
    title: "Corporate Training Module",
    client: "TechCorp Inc.",
    status: "Completed",
    completion: 100,
    dueDate: "Sep 30, 2023",
  },
  {
    title: "Retail Store Visualization",
    client: "Fashion Brands Co.",
    status: "In Progress",
    completion: 40,
    dueDate: "Nov 5, 2023",
  },
  {
    title: "Architectural Rendering",
    client: "Modern Architects",
    status: "In Review",
    completion: 90,
    dueDate: "Oct 10, 2023",
  },
]

export default function AdminDashboard() {
  const [period, setPeriod] = useState("week")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { user, updateStats, logout } = useAdmin()

  const handleRefreshStats = async () => {
    setIsRefreshing(true)
    await updateStats()
    setIsRefreshing(false)
  }

  return (
   <div className="space-y-6">
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
       <div>
         <h1 className="text-2xl font-bold text-bright-white">Dashboard</h1>
         <p className="text-bright-white/70">Welcome back, {user?.name}</p>
       </div>

       <div className="mt-4 sm:mt-0 flex items-center space-x-2">
         <Button variant="outline" size="sm" className="text-bright-white border-bright-yellow/20">
           <Calendar className="h-4 w-4 mr-2" />{" "}
           {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
         </Button>
         <Button
           className="bg-bright-yellow text-bright-black hover:bg-bright-yellow/90"
           onClick={handleRefreshStats}
           disabled={isRefreshing}
         >
           {isRefreshing ? (
             <>
               <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Refreshing...
             </>
           ) : (
             <>
               <Clock className="h-4 w-4 mr-2" /> Refresh Data
             </>
           )}
         </Button>
       </div>
     </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      {
        title: "Total Visitors",
        value: 24532,
        change: "+12.5%",
        trend: "up",
        icon: <Eye className="h-5 w-5" />,
      },
      {
        title: "Inquiries",
        value: 342,
        change: "+8.2%",
        trend: "up",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        title: "Projects",
        value: 87,
        change: "-2.4%",
        trend: "down",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Users",
        value: 12,
        change: "+9.1%",
        trend: "up",
        icon: <Users className="h-5 w-5" />,
      },
    ].map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className="border-bright-yellow/10 bg-bright-black/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="bg-bright-yellow/10 p-2 rounded-md">
                <div className="text-bright-yellow">{stat.icon}</div>
              </div>

              <div className={`flex items-center ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                <span className="text-sm font-medium">{stat.change}</span>
                {stat.trend === "up" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-bright-white/70 text-sm font-medium">{stat.title}</h3>
              <p className="text-bright-white text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
  <Card className="border-bright-yellow/10 bg-bright-black/50 backdrop-blur-sm">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-bright-white">Analytics Overview</CardTitle>
          <CardDescription>Website traffic and engagement metrics</CardDescription>
        </div>

        <Tabs defaultValue="week" value={period} onValueChange={setPeriod}>
          <TabsList className="bg-bright-black/30">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] flex items-center justify-center">
        <BarChart3 className="h-16 w-16 text-bright-white/20" />
        <p className="text-bright-white/50 ml-4">Analytics chart will be displayed here</p>
      </div>
    </CardContent>
  </Card>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Recent Inquiries */}
    <Card className="border-bright-yellow/10 bg-bright-black/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-bright-white">Recent Inquiries</CardTitle>
          <Button variant="ghost" size="sm" className="text-bright-yellow hover:text-bright-yellow/80">
            <Link href="/admin/inquiries" className="flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInquiries.map((inquiry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-md bg-bright-black/30 hover:bg-bright-black/40 transition-colors"
            >
              <div>
                <p className="font-medium text-bright-white">{inquiry.name}</p>
                <div className="flex items-center text-sm text-bright-white/70">
                  <span>{inquiry.email}</span>
                  <span className="mx-2">•</span>
                  <span>{inquiry.service}</span>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-xs text-bright-white/50 mr-3">{inquiry.date}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    inquiry.status === "New"
                      ? "bg-green-500/20 text-green-500"
                      : inquiry.status === "Responded"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Recent Projects */}
    <Card className="border-bright-yellow/10 bg-bright-black/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-bright-white">Recent Projects</CardTitle>
          <Button variant="ghost" size="sm" className="text-bright-yellow hover:text-bright-yellow/80">
            <Link href="/admin/content/projects" className="flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project, index) => (
            <div key={index} className="p-3 rounded-md bg-bright-black/30 hover:bg-bright-black/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-bright-white">{project.title}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    project.status === "Completed"
                      ? "bg-green-500/20 text-green-500"
                      : project.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="flex items-center text-sm text-bright-white/70 mb-2">
                <span>{project.client}</span>
                <span className="mx-2">•</span>
                <span>Due: {project.dueDate}</span>
              </div>

              <div className="w-full bg-bright-black/50 rounded-full h-1.5">
                <div className="bg-bright-yellow h-1.5 rounded-full" style={{ width: `${project.completion}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
  </div>
 )
}

"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, MapPin, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-green-100 text-green-800">
              <MapPin className="h-3 w-3 mr-1" />
              Specialized for East Africa
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
              Transform Your Business in Uganda & East Africa
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The only business management platform built specifically for East African markets. Get AI-powered
              insights, manage imports/exports, track factories, and understand the Ugandan market like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" asChild className="bg-gradient-to-r from-green-600 to-orange-600">
                <Link href="/">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>500+ Businesses</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>5 Countries</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-orange-100 rounded-2xl p-8">
              <img
                src="/placeholder.svg?height=400&width=600&text=AfricaSMB+Dashboard"
                alt="AfricaSMB Dashboard"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Market Data</span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-2xl font-bold text-green-600">+127%</div>
              <div className="text-sm text-muted-foreground">Growth Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

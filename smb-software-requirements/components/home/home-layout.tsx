"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, MapPin, Brain } from "lucide-react"
import Link from "next/link"
import { HeroSection } from "./hero-section"
import { FeaturesSection } from "./features-section"
import { MarketInsights } from "./market-insights"
import { TestimonialsSection } from "./testimonials-section"

export function HomeLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-green-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AfricaSMB</h1>
                <p className="text-xs text-muted-foreground">East Africa Business Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm hover:text-green-600 transition-colors">
                Features
              </Link>
              <Link href="#market-insights" className="text-sm hover:text-green-600 transition-colors">
                Market Insights
              </Link>
              <Link href="#about" className="text-sm hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-sm hover:text-green-600 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-green-600 to-orange-600">
                <Link href="/">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
        <MarketInsights />
        <TestimonialsSection />

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-green-100 text-green-800">About AfricaSMB</Badge>
              <h2 className="text-3xl font-bold mb-6">Empowering East African Businesses</h2>
              <p className="text-lg text-muted-foreground mb-8">
                AfricaSMB is the premier business management platform designed specifically for small and medium
                enterprises in East Africa, with deep expertise in the Ugandan market. We understand the unique
                challenges and opportunities that businesses face in this dynamic region.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card>
                  <CardHeader>
                    <MapPin className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle>Uganda Market Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Deep understanding of Uganda's business landscape, from Kampala's bustling markets to rural
                      agricultural enterprises. We know the local regulations, cultural nuances, and market dynamics.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Brain className="h-8 w-8 text-orange-600 mb-2" />
                    <CardTitle>AI-Powered Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our advanced AI tools analyze market trends, import/export data, factory operations, and business
                      opportunities to give you the competitive edge you need in the East African market.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of East African businesses already using AfricaSMB to grow and succeed.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/">
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-green-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">AfricaSMB</span>
              </div>
              <p className="text-gray-400">Empowering East African businesses with intelligent management solutions.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/market-intelligence" className="hover:text-white transition-colors">
                    Market Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/import-export" className="hover:text-white transition-colors">
                    Import/Export
                  </Link>
                </li>
                <li>
                  <Link href="/factories" className="hover:text-white transition-colors">
                    Factory Management
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Markets</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Uganda</li>
                <li>Kenya</li>
                <li>Tanzania</li>
                <li>Rwanda</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Kampala, Uganda</li>
                <li>info@africasmb.com</li>
                <li>+256 700 123 456</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AfricaSMB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ComparisonProvider } from "@/contexts/comparison-context"
import ComparisonBar from "@/components/comparison-bar"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ComparisonProvider>
          <FuturisticNavbar />
          <main>{children}</main>
          <Footer />
          <ComparisonBar />
        </ComparisonProvider>
      </body>
    </html>
  )
}

"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Property {
  id: string
  title: string
  location: string
  price: string
  priceType: "month" | "total"
  image: string
  video?: string
  bedrooms: number
  bathrooms: number
  area: number
  rating?: number
  amenities?: string[]
  yearBuilt?: number
  parkingSpaces?: number
  floorNumber?: number
  totalFloors?: number
  furnished?: boolean
  petFriendly?: boolean
  balcony?: boolean
  gym?: boolean
  pool?: boolean
  security?: boolean
  elevator?: boolean
  airConditioning?: boolean
}

interface ComparisonContextType {
  comparedProperties: Property[]
  addToComparison: (property: Property) => void
  removeFromComparison: (propertyId: string) => void
  clearComparison: () => void
  isInComparison: (propertyId: string) => boolean
  maxComparisons: number
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparedProperties, setComparedProperties] = useState<Property[]>([])
  const maxComparisons = 4

  const addToComparison = (property: Property) => {
    setComparedProperties((prev) => {
      if (prev.length >= maxComparisons) {
        return prev
      }
      if (prev.some((p) => p.id === property.id)) {
        return prev
      }
      return [...prev, property]
    })
  }

  const removeFromComparison = (propertyId: string) => {
    setComparedProperties((prev) => prev.filter((p) => p.id !== propertyId))
  }

  const clearComparison = () => {
    setComparedProperties([])
  }

  const isInComparison = (propertyId: string) => {
    return comparedProperties.some((p) => p.id === propertyId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparedProperties,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        maxComparisons,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}

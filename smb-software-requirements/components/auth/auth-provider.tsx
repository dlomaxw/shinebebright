"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  session: any | null // Firebase doesn't strictly use session objects like Supabase on the client
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any | null>(null) // Retaining session for back-compat with the app
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // onAuthStateChanged is the Firebase equivalent to supabase.auth.onAuthStateChange
    import("firebase/auth").then(({ onAuthStateChanged }) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        setSession(currentUser ? { user: currentUser } : null) // Mocking a session object
        setLoading(false)
      })

      return () => unsubscribe()
    })
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return {}
    } catch (error: any) {
      return { error: error.message || "An unexpected error occurred" }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      return {}
    } catch (error: any) {
      return { error: error.message || "An unexpected error occurred" }
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

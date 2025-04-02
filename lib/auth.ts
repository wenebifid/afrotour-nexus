// This is a mock authentication service
// In a real application, you would use a proper authentication provider like NextAuth.js, Clerk, or Auth0

import { createClient } from "@/lib/supabase"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
}

// Mock user session storage
let currentUser: User | null = null

export async function signIn(email: string, password: string): Promise<{ success: boolean; message?: string }> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Check if the error is related to email confirmation
      if (error.message.includes("Email not confirmed")) {
        return {
          success: false,
          message: "Please verify your email before logging in. Check your inbox for a confirmation link.",
        }
      }
      throw error
    }

    if (data.user) {
      // Get user metadata from Supabase user object
      const firstName = data.user.user_metadata?.first_name || ""
      const lastName = data.user.user_metadata?.last_name || ""

      currentUser = {
        id: data.user.id,
        email: data.user.email!,
        firstName,
        lastName,
      }

      return { success: true }
    }

    return { success: false, message: "Invalid email or password" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}

export async function signUp(userData: SignUpData): Promise<{ success: boolean; message?: string }> {
  try {
    // Input validation
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      return { success: false, message: "All fields are required" }
    }

    // Password validation - basic check for minimum length
    if (userData.password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long" }
    }

    // Email validation - basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) {
      return { success: false, message: "Please enter a valid email address" }
    }

    const supabase = createClient()

    // Create the user account with metadata
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
      },
    })

    if (error) {
      console.error("Supabase signup error:", error)

      // Handle specific error cases
      if (error.message.includes("already registered")) {
        return { success: false, message: "This email is already registered. Please log in instead." }
      }

      return { success: false, message: error.message || "Registration failed. Please try again." }
    }

    if (!data.user) {
      return { success: false, message: "Failed to create user account. Please try again." }
    }

    // We don't need to create a separate profile entry anymore
    // Supabase stores user metadata in the auth.users table
    // We'll use that instead of a separate profiles table

    // Check if email confirmation is required
    // In Supabase, if email confirmation is required, the session will be null
    if (data.session === null) {
      return {
        success: true,
        message: "Registration successful! Please check your email to verify your account.",
      }
    }

    return {
      success: true,
      message: "Registration successful! You can now log in to your account.",
    }
  } catch (error) {
    // Log the full error for debugging
    console.error("Signup error details:", error)

    // Provide a generic error message to the user
    return {
      success: false,
      message: "An unexpected error occurred during registration. Please try again later.",
    }
  }
}

export async function resendConfirmationEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    if (!email) {
      return { success: false, message: "Email address is required" }
    }

    const supabase = createClient()

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    })

    if (error) {
      console.error("Resend confirmation error:", error)
      return { success: false, message: error.message || "Failed to resend confirmation email" }
    }

    return {
      success: true,
      message: "Confirmation email resent. Please check your inbox.",
    }
  } catch (error) {
    console.error("Error resending confirmation email:", error)
    return {
      success: false,
      message: "Failed to resend confirmation email. Please try again.",
    }
  }
}

export async function signOut(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
  currentUser = null
}

export async function getCurrentUser(): Promise<User | null> {
  if (currentUser) return currentUser

  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      // Instead of logging and potentially throwing an error, just return null
      // This is expected for non-authenticated users
      return null
    }

    if (data.user) {
      // Get user metadata directly from the user object
      const firstName = data.user.user_metadata?.first_name || ""
      const lastName = data.user.user_metadata?.last_name || ""

      currentUser = {
        id: data.user.id,
        email: data.user.email!,
        firstName,
        lastName,
      }

      return currentUser
    }
  } catch (error) {
    console.error("Get current user error:", error)
  }

  return null
}


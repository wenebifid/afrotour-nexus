"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { resendConfirmationEmail } from "@/lib/auth"

export default function EmailVerificationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState<string>("")
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    // In a real app, you would verify the token here
    // For this demo, we'll simulate a successful verification after a delay
    const timer = setTimeout(() => {
      setStatus("success")
      setMessage("Your email has been successfully verified. You can now log in to your account.")
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleResendEmail = async () => {
    if (!email) {
      setMessage("Email address is missing. Please go back to the sign-up page.")
      return
    }

    setIsResending(true)
    try {
      const result = await resendConfirmationEmail(email)
      if (result.success) {
        setMessage(result.message)
      } else {
        setMessage(result.message)
      }
    } catch (error) {
      setMessage("Failed to resend verification email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            {status === "loading" ? "Verifying your email address..." : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <p className="text-gray-600">Please wait while we verify your email address...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center space-y-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <Alert variant="destructive">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <Button variant="outline" className="mt-4" onClick={handleResendEmail} disabled={isResending}>
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {status === "success" ? (
            <Link href="/login">
              <Button>Proceed to Login</Button>
            </Link>
          ) : status === "error" ? (
            <Link href="/signup">
              <Button variant="outline">Back to Sign Up</Button>
            </Link>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  )
}


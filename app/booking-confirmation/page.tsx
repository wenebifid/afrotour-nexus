"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, MapPin, Users, Clock, Download, Share2 } from "lucide-react"
import { sendConfirmationEmail } from "@/lib/email"
import { getCurrentUser } from "@/lib/auth"

export default function BookingConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [emailSent, setEmailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  // Get booking details from URL params
  const bookingId = searchParams.get("bookingId") || "ATN-" + Math.floor(100000 + Math.random() * 900000)
  const destination = searchParams.get("destination") || "Unknown Destination"
  const packageType = searchParams.get("package") || "diamond"
  const date = searchParams.get("date") || "Not specified"
  const travelers = Number.parseInt(searchParams.get("travelers") || "1")
  const total = Number.parseInt(searchParams.get("total") || "0")
  const guestEmail = searchParams.get("guestEmail") || null

  // Calculate breakdown
  const packagePrice = packageType === "diamond" ? 1200 : 2200
  const ticketCost = 450 * travelers
  const accommodationCost = packageType === "diamond" ? 600 : 1200

  // Mock guide information based on destination
  const guide = {
    name: destination.includes("Kigali")
      ? "John Mutabazi"
      : destination.includes("Lagos")
        ? "Chioma Okafor"
        : destination.includes("Nairobi")
          ? "David Kamau"
          : destination.includes("Cape Town")
            ? "Sarah Nkosi"
            : destination.includes("Accra")
              ? "Kwame Mensah"
              : destination.includes("Zanzibar")
                ? "Fatima Hassan"
                : "Local Guide",
    phone: "+123 456 7890",
    email: `guide@afrotournexus.com`,
  }

  // Format date
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified"

  // Package details
  const packageDetails = {
    diamond: {
      name: "Diamond Package",
      duration: "5 days",
    },
    platinum: {
      name: "Platinum Package",
      duration: "7 days",
    },
  }

  useEffect(() => {
    // Get user email or use guest email
    async function fetchUserEmail() {
      try {
        // If we have a guest email from URL params, use that
        if (guestEmail) {
          setUserEmail(guestEmail)
          // If the email wasn't sent during payment, send a confirmation email
          if (!emailSent) {
            handleSendEmail(guestEmail)
          }
          return
        }

        // Otherwise try to get the logged-in user's email
        const user = await getCurrentUser()
        if (user) {
          setUserEmail(user.email)
          // If the email wasn't sent during payment, send a confirmation email
          if (!emailSent) {
            handleSendEmail(user.email)
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }

    fetchUserEmail()
  }, [emailSent, guestEmail])

  const handleSendEmail = async (email: string = userEmail || "") => {
    if (emailSent || !email) return

    setIsLoading(true)
    try {
      await sendConfirmationEmail({
        to: email,
        subject: `Booking Confirmation - ${bookingId}`,
        bookingDetails: {
          id: bookingId,
          destination,
          date: formattedDate,
          packageType,
          travelers,
          total,
          guide,
        },
      })
      setEmailSent(true)
    } catch (error) {
      console.error("Failed to send email:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your booking has been confirmed.{" "}
            {emailSent ? "A confirmation email has been sent to your registered email address." : ""}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Booking #{bookingId}</CardTitle>
                <CardDescription>Confirmation details</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Tour Details</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-gray-600">{destination}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-gray-600">
                        {packageDetails[packageType as keyof typeof packageDetails].duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <Users className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Travelers</p>
                      <p className="text-gray-600">
                        {travelers} {travelers === 1 ? "person" : "people"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Guide Information</h3>
                <div className="p-4 border rounded-lg">
                  <p className="font-medium text-lg">{guide.name}</p>
                  <p className="text-gray-600 mb-3">Your local guide</p>
                  <div className="space-y-2 text-sm">
                    <p>Phone: {guide.phone}</p>
                    <p>Email: {guide.email}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Payment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tour package:</span>
                      <span>${packagePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flight tickets:</span>
                      <span>${ticketCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accommodation:</span>
                      <span>${accommodationCost}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total paid:</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t">
            <div className="w-full">
              <p className="text-sm text-gray-600 mb-4">
                Please keep this confirmation for your records. You'll need to present it to your guide upon arrival.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => router.push("/dashboard")}>View in Dashboard</Button>
                <Button variant="outline" onClick={() => router.push("/destinations")}>
                  Book Another Tour
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            {emailSent
              ? "A confirmation email has been sent to your registered email address."
              : "Having trouble? Click the button below to resend the confirmation email."}
          </p>
          {!emailSent && userEmail && (
            <Button variant="link" onClick={() => handleSendEmail()} disabled={isLoading}>
              {isLoading ? "Sending..." : "Resend Confirmation Email"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}


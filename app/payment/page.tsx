"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, Wallet, DollarSign } from "lucide-react"
import { processPayment } from "@/lib/payment"
import { sendPaymentConfirmationEmail } from "@/lib/email"
import { getCurrentUser } from "@/lib/auth"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [guestEmail, setGuestEmail] = useState("")
  const [isGuestCheckout, setIsGuestCheckout] = useState(false)

  // Get booking details from URL params
  const destination = searchParams.get("destination") || "Unknown Destination"
  const packageType = searchParams.get("package") || "diamond"
  const date = searchParams.get("date") || "Not specified"
  const travelers = Number.parseInt(searchParams.get("travelers") || "1")
  const total = Number.parseInt(searchParams.get("total") || "0")

  // Calculate breakdown
  const packagePrice = packageType === "diamond" ? 1200 : 2200
  const ticketCost = 450 * travelers
  const accommodationCost = packageType === "diamond" ? 600 : 1200

  // Get user email for confirmation
  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const user = await getCurrentUser()
        if (user) {
          setUserEmail(user.email)
          setIsGuestCheckout(false)
        } else {
          setIsGuestCheckout(true)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        setIsGuestCheckout(true)
      }
    }
    fetchUserEmail()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validate guest email if doing guest checkout
    if (isGuestCheckout && !guestEmail) {
      setError("Please enter your email address for booking confirmation")
      setIsLoading(false)
      return
    }

    try {
      // Process payment
      const success = await processPayment({
        method: paymentMethod,
        amount: total,
        currency: "USD",
        details: paymentMethod === "card" ? cardDetails : undefined,
      })

      if (success) {
        // Generate booking ID
        const bookingId = "ATN-" + Math.floor(100000 + Math.random() * 900000)

        // Send confirmation email to either logged-in user or guest
        const emailToUse = isGuestCheckout ? guestEmail : userEmail

        if (emailToUse) {
          await sendPaymentConfirmationEmail(emailToUse, {
            bookingId,
            destination,
            date,
            amount: total,
            packageType,
            travelers,
          })
        }

        // Redirect to confirmation page with booking details
        router.push(
          `/booking-confirmation?bookingId=${bookingId}&destination=${destination}&package=${packageType}&date=${date}&travelers=${travelers}&total=${total}${isGuestCheckout ? `&guestEmail=${encodeURIComponent(guestEmail)}` : ""}`,
        )
      } else {
        setError("Payment failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred while processing your payment.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  {isGuestCheckout && (
                    <div className="mb-6">
                      <div className="grid gap-2">
                        <Label htmlFor="guestEmail">Email Address</Label>
                        <Input
                          id="guestEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          required
                        />
                        <p className="text-sm text-gray-500">
                          We'll send your booking confirmation to this email address
                        </p>
                      </div>
                    </div>
                  )}

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-3 gap-4 mb-6"
                  >
                    <div>
                      <RadioGroupItem value="card" id="card" className="peer sr-only" />
                      <Label
                        htmlFor="card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-3 h-6 w-6" />
                        Card
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                      <Label
                        htmlFor="wallet"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Wallet className="mb-3 h-6 w-6" />
                        Mobile Wallet
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                      <Label
                        htmlFor="cash"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <DollarSign className="mb-3 h-6 w-6" />
                        Cash on Arrival
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="number">Card Number</Label>
                        <Input
                          id="number"
                          name="number"
                          placeholder="4242 4242 4242 4242"
                          value={cardDetails.number}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expMonth">Expiry Month</Label>
                          <Select
                            value={cardDetails.expMonth}
                            onValueChange={(value) => setCardDetails((prev) => ({ ...prev, expMonth: value }))}
                          >
                            <SelectTrigger id="expMonth">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                                  {month.toString().padStart(2, "0")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="expYear">Expiry Year</Label>
                          <Select
                            value={cardDetails.expYear}
                            onValueChange={(value) => setCardDetails((prev) => ({ ...prev, expYear: value }))}
                          >
                            <SelectTrigger id="expYear">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            value={cardDetails.cvc}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        You'll be redirected to your mobile wallet provider to complete the payment.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "cash" && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        You'll pay in cash directly to your guide upon arrival. Please note that a 20% deposit is
                        required to confirm your booking.
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{destination}</h3>
                    <p className="text-sm text-gray-500">{date}</p>
                    <p className="text-sm text-gray-500">
                      {packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Tour Package:</span>
                      <span>${packagePrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>
                        Flight Tickets ({travelers} {travelers === 1 ? "person" : "people"}):
                      </span>
                      <span>${ticketCost}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Accommodation:</span>
                      <span>${accommodationCost}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${total}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


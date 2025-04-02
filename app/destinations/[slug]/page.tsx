"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { destinations } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Check, MapPin, Users, Info } from "lucide-react"

// Tour package data
const tourPackages = {
  diamond: {
    name: "Diamond Package",
    price: 1200,
    features: [
      "5-day guided tour",
      "3-star hotel accommodation",
      "Airport transfers",
      "Daily breakfast",
      "Entry to main attractions",
    ],
    description:
      "Our standard package offers a comprehensive experience with comfortable accommodations and all the essential features for an enjoyable trip.",
  },
  platinum: {
    name: "Platinum Package",
    price: 2200,
    features: [
      "7-day guided tour",
      "5-star luxury hotel accommodation",
      "Private airport transfers",
      "All meals included",
      "VIP access to attractions",
      "Exclusive cultural experiences",
      "Personal photographer for one day",
      "Spa treatment",
    ],
    description:
      "Our premium package offers an elevated experience with luxury accommodations, exclusive activities, and personalized service for the discerning traveler.",
  },
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState<"diamond" | "platinum">("diamond")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [travelers, setTravelers] = useState<number>(1)

  // Find the destination based on the slug
  const destination = destinations.find((dest) => dest.name.toLowerCase().replace(/\s+/g, "-") === params.slug)

  if (!destination) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
        <p className="mb-8">The destination you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/destinations")}>View All Destinations</Button>
      </div>
    )
  }

  // Calculate pricing
  const packagePrice = tourPackages[selectedPackage].price
  const ticketCost = 450 // Base flight ticket cost
  const accommodationCost = selectedPackage === "diamond" ? 600 : 1200
  const totalCost = packagePrice + ticketCost * travelers

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a travel date")
      return
    }

    // In a real app, you would save this data to state/context or pass it via URL params
    const bookingDetails = {
      destination: destination.name,
      country: destination.country,
      package: selectedPackage,
      date: selectedDate,
      travelers,
      totalCost,
    }

    // Navigate to payment page
    router.push(
      `/payment?destination=${destination.name}&package=${selectedPackage}&date=${selectedDate}&travelers=${travelers}&total=${totalCost}`,
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {destination.name}, {destination.country}
            </h1>
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              <span>{destination.country}</span>
              <span className="mx-2">•</span>
              <Users className="h-5 w-5 mr-2 text-primary" />
              <span>{destination.guides} Local guides</span>
            </div>

            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={`${destination.name}, ${destination.country}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold mb-4">About {destination.name}</h2>
              <p className="text-gray-700 mb-4">{destination.description}</p>
              <p className="text-gray-700">
                Experience the vibrant culture, breathtaking landscapes, and rich history of {destination.name}. Our
                local guides will take you on an unforgettable journey through the heart of {destination.country},
                showing you both the famous landmarks and hidden gems that make this destination special.
              </p>
            </div>

            <Tabs defaultValue="highlights" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="highlights" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold text-lg mb-3">Tour Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Guided tours of major cultural and historical sites</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Authentic local cuisine experiences</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Interactions with local communities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Transportation between all destinations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Comfortable accommodations throughout your stay</span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="itinerary" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold text-lg mb-3">Sample Itinerary</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Day 1: Arrival & Welcome</h4>
                    <p className="text-sm text-gray-600">Airport pickup, hotel check-in, welcome dinner</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Day 2: City Exploration</h4>
                    <p className="text-sm text-gray-600">Visit to main landmarks, historical sites, local market</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Day 3: Cultural Immersion</h4>
                    <p className="text-sm text-gray-600">Traditional crafts workshop, community visit, cultural show</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Day 4: Natural Wonders</h4>
                    <p className="text-sm text-gray-600">
                      Excursion to nearby natural attractions, hiking, photography
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Day 5: Leisure & Departure</h4>
                    <p className="text-sm text-gray-600">
                      Free time for shopping, optional activities, airport transfer
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    Note: Platinum package includes additional days with exclusive activities
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold text-lg mb-3">Traveler Reviews</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">Sarah J.</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "An incredible experience! The guides were knowledgeable and friendly. I learned so much about the
                      culture and history."
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">Michael T.</h4>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Great tour overall. The accommodations were comfortable and the food was amazing. Would recommend
                      the platinum package for the extra experiences."
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">Elena R.</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Absolutely worth every penny! The platinum package gave us access to experiences we wouldn't have
                      had otherwise. Our guide was exceptional and made us feel like family."
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Book Your Tour</CardTitle>
              <CardDescription>Select your package and travel details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Choose Package</h3>
                <RadioGroup
                  value={selectedPackage}
                  onValueChange={(value) => setSelectedPackage(value as "diamond" | "platinum")}
                  className="grid grid-cols-1 gap-4"
                >
                  <div>
                    <RadioGroupItem value="diamond" id="diamond" className="peer sr-only" />
                    <Label
                      htmlFor="diamond"
                      className="flex flex-col justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">Diamond Package</span>
                        <span className="font-bold">${tourPackages.diamond.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{tourPackages.diamond.description}</p>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="platinum" id="platinum" className="peer sr-only" />
                    <Label
                      htmlFor="platinum"
                      className="flex flex-col justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">Platinum Package</span>
                        <span className="font-bold">${tourPackages.platinum.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{tourPackages.platinum.description}</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Travel Date</Label>
                <input
                  id="date"
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers</Label>
                <input
                  id="travelers"
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={travelers}
                  onChange={(e) => setTravelers(Number.parseInt(e.target.value))}
                  min={1}
                  max={10}
                  required
                />
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-2">Price Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tour Package ({tourPackages[selectedPackage].name})</span>
                    <span>${packagePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Flight Tickets ({travelers} {travelers === 1 ? "person" : "people"})
                    </span>
                    <span>${ticketCost * travelers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accommodation</span>
                    <span>${accommodationCost}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalCost}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-md flex items-start text-xs">
                <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                <p>
                  Prices are per person. A 20% deposit is required to secure your booking. Cancellation up to 30 days
                  before departure receives a full refund.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleBooking}>
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}


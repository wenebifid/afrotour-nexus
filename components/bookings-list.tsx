"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

// Mock booking data
const bookings = [
  {
    id: 1,
    destination: "Kigali, Rwanda",
    date: "2025-04-15",
    status: "upcoming",
    guests: 2,
    duration: "5 days",
    image: "/images/kigali.jpg",
    price: 1200,
    guide: "John Mutabazi",
  },
  {
    id: 2,
    destination: "Lagos, Nigeria",
    date: "2025-05-20",
    status: "upcoming",
    guests: 1,
    duration: "7 days",
    image: "/images/lagos.jpg",
    price: 1500,
    guide: "Chioma Okafor",
  },
  {
    id: 3,
    destination: "Cape Town, South Africa",
    date: "2024-12-10",
    status: "completed",
    guests: 3,
    duration: "10 days",
    image: "/images/cape-town.jpg",
    price: 2200,
    guide: "David Nkosi",
  },
]

export default function BookingsList() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-gray-500 mb-4">No {activeTab} bookings found</p>
                <Button>Book a Tour</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BookingCard({ booking }: { booking: any }) {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <Card>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 h-48 md:h-auto">
          <img
            src={booking.image || "/placeholder.svg"}
            alt={booking.destination}
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <div className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{booking.destination}</CardTitle>
                <CardDescription>Booking #{booking.id}</CardDescription>
              </div>
              <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>{booking.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>Guide: {booking.guide}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-lg font-bold">${booking.price}</div>
            <div className="space-x-2">
              {booking.status === "upcoming" && (
                <>
                  <Button variant="outline">Modify</Button>
                  <Button>View Details</Button>
                </>
              )}
              {booking.status === "completed" && (
                <>
                  <Button variant="outline">Leave Review</Button>
                  <Button>Book Again</Button>
                </>
              )}
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}


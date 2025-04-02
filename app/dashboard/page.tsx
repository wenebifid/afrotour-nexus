"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, type User } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, CreditCard, UserIcon, Bookmark } from "lucide-react"
import MapView from "@/components/map-view"
import BookingsList from "@/components/bookings-list"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push("/login")
          return
        }
        setUser(currentUser)
      } catch (err) {
        console.error("Error loading user:", err)
        setError("Failed to load user data. Please check your Supabase configuration.")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [router])

  if (loading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-8">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={() => router.push("/login")}>Return to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.firstName || "User"}!</h1>
          <p className="text-gray-600">Manage your tours and bookings</p>
        </div>
        <Button>Book a New Tour</Button>
      </div>

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="explore">Explore Map</TabsTrigger>
          <TabsTrigger value="saved">Saved Tours</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <BookingsList />
        </TabsContent>

        <TabsContent value="explore">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Map</CardTitle>
              <CardDescription>Explore destinations and plan your next adventure</CardDescription>
            </CardHeader>

            <CardContent className="h-[500px]">
              <MapView />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={`/images/destination-${item}.jpg`}
                    alt="Saved destination"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold mb-2">Saved Destination {item}</h3>
                  <p className="text-gray-600 mb-4">A beautiful location you've saved for future travel.</p>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <UserIcon className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {user?.firstName || ""} {user?.lastName || ""}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <CreditCard className="h-5 w-5 mr-4 text-primary" />
                    <div>
                      <h4 className="font-medium">Payment Methods</h4>
                      <p className="text-sm text-gray-600">Manage your payment options</p>
                    </div>
                    <Button variant="ghost" className="ml-auto">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center p-4 border rounded-lg">
                    <MapPin className="h-5 w-5 mr-4 text-primary" />
                    <div>
                      <h4 className="font-medium">Saved Locations</h4>
                      <p className="text-sm text-gray-600">View and manage your saved destinations</p>
                    </div>
                    <Button variant="ghost" className="ml-auto">
                      View
                    </Button>
                  </div>

                  <div className="flex items-center p-4 border rounded-lg">
                    <Calendar className="h-5 w-5 mr-4 text-primary" />
                    <div>
                      <h4 className="font-medium">Travel Preferences</h4>
                      <p className="text-sm text-gray-600">Update your travel preferences</p>
                    </div>
                    <Button variant="ghost" className="ml-auto">
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-12 w-full mb-8" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-24 w-full" />
        ))}
      </div>
    </div>
  )
}


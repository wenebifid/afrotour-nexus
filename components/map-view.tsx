"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Navigation } from "lucide-react"
import { destinations } from "@/lib/data"

// This is a simplified map component
// In a real application, you would use a library like Mapbox, Google Maps, or Leaflet
export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    // In a real app, you would initialize your map library here
    const mapContainer = mapRef.current

    // For demo purposes, we're just setting a background and adding markers manually
    mapContainer.style.backgroundImage = "url('/images/africa-map.jpg')"
    mapContainer.style.backgroundSize = "cover"
    mapContainer.style.backgroundPosition = "center"

    // Cleanup function
    return () => {
      // Cleanup map instance if needed
    }
  }, [])

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
        <div className="md:col-span-1 h-full overflow-auto">
          {filteredDestinations.length > 0 ? (
            <div className="space-y-2">
              {filteredDestinations.map((dest, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer flex items-center ${
                    selectedLocation === index ? "bg-primary/10 border border-primary" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedLocation(index)}
                >
                  <MapPin className={`h-5 w-5 mr-2 ${selectedLocation === index ? "text-primary" : "text-gray-500"}`} />
                  <div>
                    <p className="font-medium">{dest.name}</p>
                    <p className="text-sm text-gray-600">{dest.country}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">No destinations found</div>
          )}
        </div>

        <div className="md:col-span-3 h-full relative">
          <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden relative">
            {/* Map will be rendered here */}

            {/* Markers for destinations */}
            {destinations.map((dest, index) => (
              <div
                key={index}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  selectedLocation === index ? "z-10" : "z-0"
                }`}
                style={{
                  // These would be actual coordinates in a real map
                  left: `${20 + index * 15}%`,
                  top: `${30 + index * 10}%`,
                }}
              >
                <div
                  className={`
                  p-1 rounded-full 
                  ${
                    selectedLocation === index
                      ? "bg-primary text-white scale-125"
                      : "bg-white text-primary border border-primary"
                  }
                  transition-all duration-200
                `}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                {selectedLocation === index && (
                  <Card className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 z-20">
                    <CardContent className="p-3">
                      <p className="font-medium">
                        {dest.name}, {dest.country}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{dest.guides} local guides</p>
                      <Button size="sm" className="w-full mt-2">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


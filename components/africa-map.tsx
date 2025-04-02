"use client"

import { useState, useRef } from "react"
import { MapPin } from "lucide-react"
import { destinations } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function AfricaMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 }) // Center of the map as percentage

  // Reset zoom and center
  const resetView = () => {
    setZoomLevel(1)
    setMapCenter({ x: 50, y: 50 })
    setSelectedLocation(null)
  }

  // Handle location click
  const handleLocationClick = (index: number) => {
    // If already selected, reset view
    if (selectedLocation === index) {
      resetView()
      return
    }

    // Set the selected location
    setSelectedLocation(index)

    // Zoom in and center on the location
    setZoomLevel(2.5)

    // These values would ideally come from a proper mapping of coordinates
    // For now, we're using approximate positions based on the destination index
    const locationPositions = [
      { x: 52, y: 45 }, // Kigali
      { x: 45, y: 48 }, // Lagos
      { x: 55, y: 48 }, // Nairobi
      { x: 50, y: 65 }, // Cape Town
      { x: 43, y: 46 }, // Accra
      { x: 57, y: 52 }, // Zanzibar
    ]

    setMapCenter(locationPositions[index])
  }

  return (
    <div className="h-full flex flex-col">
      <div className="relative h-full overflow-hidden rounded-lg border">
        {/* Africa outline SVG - always visible */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-[80%] h-[80%]">
              <Image src="/images/africa-outline.png" alt="Africa Map" layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>

        {/* Map container with zoom and pan effect */}
        <div
          ref={mapRef}
          className="w-full h-full relative transition-transform duration-700 ease-in-out"
          style={{
            backgroundImage: "url('/images/africa-map.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(${zoomLevel})`,
            transformOrigin: `${mapCenter.x}% ${mapCenter.y}%`,
          }}
        >
          {/* Location markers */}
          {destinations.map((dest, index) => (
            <div
              key={index}
              className={`absolute cursor-pointer transition-all duration-300 ${
                selectedLocation === index ? "z-20 scale-125" : "z-10 hover:scale-110"
              }`}
              style={{
                // These would be actual coordinates in a real map implementation
                // For now, we're using approximate positions
                left: `${index === 0 ? 52 : index === 1 ? 45 : index === 2 ? 55 : index === 3 ? 50 : index === 4 ? 43 : 57}%`,
                top: `${index === 0 ? 45 : index === 1 ? 48 : index === 2 ? 48 : index === 3 ? 65 : index === 4 ? 46 : 52}%`,
              }}
              onClick={() => handleLocationClick(index)}
            >
              <div
                className={`
                  p-1 rounded-full 
                  ${
                    selectedLocation === index ? "bg-primary text-white" : "bg-white text-primary border border-primary"
                  }
                  transition-all duration-200
                `}
              >
                <MapPin className="h-6 w-6" />
              </div>

              {/* Location info card - only shown when selected */}
              {selectedLocation === index && (
                <Card className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 z-30">
                  <CardContent className="p-3">
                    <p className="font-medium">
                      {dest.name}, {dest.country}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{dest.guides} local guides</p>
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `/destinations/${dest.name.toLowerCase().replace(/\s+/g, "-")}`
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>

        {/* Reset view button - only shown when zoomed in */}
        {zoomLevel > 1 && (
          <Button variant="secondary" size="sm" className="absolute top-4 right-4 z-30" onClick={resetView}>
            Reset View
          </Button>
        )}

        {/* Instructions overlay - only shown when not zoomed in */}
        {zoomLevel === 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-30">
            Click on a marker to zoom in
          </div>
        )}
      </div>
    </div>
  )
}


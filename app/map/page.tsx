import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import AfricaMapWithSVG from "@/components/africa-map-with-svg"

export default function InteractiveMapPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Interactive Map</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore African destinations and find your next adventure
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Explore Africa</CardTitle>
          <CardDescription>Click on a destination marker to zoom in and learn more</CardDescription>
        </CardHeader>
        <CardContent className="h-[600px] p-0">
          <AfricaMapWithSVG />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Map</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  1
                </span>
                <span>Click on any marker to zoom in on that location</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  2
                </span>
                <span>View basic information about the destination</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  3
                </span>
                <span>Click "View Details" to see tours and booking options</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  4
                </span>
                <span>Click "Reset View" or click the marker again to zoom out</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Our interactive map currently features these amazing destinations:</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Cape Town, South Africa</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Accra, Ghana</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Zanzibar, Tanzania</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


import Link from "next/link"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import DestinationCard from "@/components/destination-card"
import { destinations } from "@/lib/data"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-image.jpeg" alt="African safari with lion" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">See Africa like a local</h1>
          <p className="text-xl text-white/90 mb-8">
            A company specialized in tourism and infrastructural aid and maintenance
          </p>

          <div className="flex justify-center mt-8">
            <Link href="/destinations">
              <Button size="lg" className="px-8">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="thumbs-up"
              title="Hand Picked Guides"
              description="Local African Guides with extensive knowledge of their regions"
            />
            <FeatureCard
              icon="headset"
              title="24/7 Support"
              description="Support resources such as call centers available around the clock"
            />
            <FeatureCard
              icon="map"
              title="Elite Mapping"
              description="Interactive maps for navigation and identification of hotspots"
            />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-lg text-gray-600">Visit 30+ cities and villages in Africa with a secure guide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={index}
                image={destination.image}
                name={destination.name}
                country={destination.country}
                guides={destination.guides}
                description={destination.description}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/destinations">
              <Button size="lg">View All Destinations</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Work</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Combining tourism with sustainable infrastructure development across Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/nairobi.jpeg"
                alt="Infrastructure development"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <p className="text-gray-700 mb-6">
                AfroTour Nexus empowers sustainable infrastructure development across Africa by combining smart
                technology with community collaboration. Our platform provides GIS-powered planning tools to identify
                high-impact projects—from eco-lodges to renewable energy systems.
              </p>
              <p className="text-gray-700 mb-6">
                We connect developers with funding partners and offer crowdfunding opportunities for travelers to
                directly support schools, clinics, and clean water initiatives.
              </p>
              <Link href="/how-we-work">
                <Button>Learn More About Our Approach</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore Africa?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign up now to access exclusive tours, interactive maps, and connect with local guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary" size="lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


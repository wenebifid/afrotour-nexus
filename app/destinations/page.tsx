import { destinations } from "@/lib/data"
import DestinationCard from "@/components/destination-card"

export default function DestinationsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Explore African Destinations</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the beauty, culture, and adventure that awaits you across the diverse landscapes of Africa. From
          bustling cities to serene natural wonders, find your perfect destination.
        </p>
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
    </div>
  )
}


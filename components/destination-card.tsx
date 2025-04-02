import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Link from "next/link"

interface DestinationCardProps {
  image: string
  name: string
  country: string
  guides: number
  description: string
}

export default function DestinationCard({ image, name, country, guides, description }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={`${name}, ${country}`}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">
            {name}, {country}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {guides} Local guide{guides !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <Link href={`/destinations/${name.toLowerCase().replace(/\s+/g, "-")}`}>
          <Button variant="default" className="w-full">
            Book a Tour
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}


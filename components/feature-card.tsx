import { ThumbsUp, Headset, Users, Map } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "thumbs-up":
        return <ThumbsUp className="h-6 w-6" />
      case "headset":
        return <Headset className="h-6 w-6" />
      case "users":
        return <Users className="h-6 w-6" />
      case "map":
        return <Map className="h-6 w-6" />
      default:
        return <ThumbsUp className="h-6 w-6" />
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            {getIcon(icon)}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}


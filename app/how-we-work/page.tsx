import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Lightbulb, Users, Recycle, Wrench, Globe } from "lucide-react"

export default function HowWeWorkPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">How We Work</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Combining tourism with sustainable infrastructure development across Africa
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            AfroTour Nexus empowers sustainable infrastructure development across Africa by combining smart technology
            with community collaboration. Our platform provides GIS-powered planning tools to identify high-impact
            projects—from eco-lodges to renewable energy systems—prioritizing locations where tourism growth meets local
            needs. We connect developers with funding partners and offer crowdfunding opportunities for travelers to
            directly support schools, clinics, and clean water initiatives. Every project is designed with
            sustainability scoring to minimize environmental impact while maximizing long-term benefits.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            To ensure lasting results, we train local communities in infrastructure maintenance—from solar panel repair
            to waste management—creating jobs and ownership. Real-time reporting tools let residents flag issues, while
            our partnerships with governments and NGOs fast-track solutions. From rainwater systems in Nigeria to
            community-maintained eco-camps in Kenya, AfroTour Nexus builds infrastructure that serves both travelers and
            African communities for generations.
          </p>
        </div>

        {/* Key Principles */}
        <div className="my-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Key Principles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Smart Planning</h3>
                  <p className="text-gray-600">
                    Using GIS technology to identify high-impact infrastructure projects that serve both tourism and
                    local needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Community Collaboration</h3>
                  <p className="text-gray-600">
                    Working directly with local communities to ensure projects meet their needs and create lasting
                    value.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Sustainability First</h3>
                  <p className="text-gray-600">
                    Every project is scored on environmental impact, resource efficiency, and long-term viability.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Skills Transfer</h3>
                  <p className="text-gray-600">
                    Training local communities in infrastructure maintenance to create jobs and ensure long-term
                    success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="my-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Objectives</h2>

          <div className="space-y-8">
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1">
                  <img src="/images/lagos.jpeg" alt="Lagos, Nigeria" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-2 p-6">
                  <h3 className="font-semibold text-xl mb-2">Rainwater Harvesting Systems in Nigeria</h3>
                  <p className="text-gray-600 mb-4">
                    Implementing sustainable rainwater collection systems in rural communities near Lagos, providing
                    clean water for both locals and eco-lodges.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>We plan to serve 5,000+ community members</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>We aim to reduce water-related illness by 60%</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>We will create 12 maintenance jobs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1">
                  <img src="/images/nairobi.jpeg" alt="Nairobi, Kenya" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-2 p-6">
                  <h3 className="font-semibold text-xl mb-2">Community-Maintained Eco-Camps in Kenya</h3>
                  <p className="text-gray-600 mb-4">
                    Developing solar-powered eco-camps near Nairobi National Park that will be fully operated and
                    maintained by local community members.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>We plan to use 100% renewable energy</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>We aim to create 35 permanent local jobs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Revenue will support local school for 200 children</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/10 p-8 rounded-lg text-center my-16">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Whether you're a traveler, investor, or community partner, there are many ways to support sustainable
            infrastructure development across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/destinations">
              <Button size="lg">
                <Globe className="mr-2 h-5 w-5" />
                Explore Destinations
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


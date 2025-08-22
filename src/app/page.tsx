import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import DualSearchBanner from "@/components/DualSearchBanner";
import { Star, ChevronRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Search */}
      <DualSearchBanner />

      {/* Featured Notaries Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Notaries
            </h2>
            <p className="text-xl text-gray-600">
              Connect with top-rated, verified notaries in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, NY",
                rating: 4.9,
                reviews: 127,
                specialties: ["Real Estate", "Legal Documents"],
              },
              {
                name: "Michael Chen",
                location: "Los Angeles, CA",
                rating: 5.0,
                reviews: 203,
                specialties: ["Mobile Service", "Business Docs"],
              },
              {
                name: "Emily Davis",
                location: "Chicago, IL",
                rating: 4.8,
                reviews: 156,
                specialties: ["Remote Notary", "Medical Forms"],
              },
            ].map((notary, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {notary.name[0]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">
                      {notary.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{notary.location}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {notary.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm ml-2">
                    ({notary.reviews} reviews)
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {notary.specialties.map((specialty, i) => (
                    <Badge key={i} variant="secondary" className="mr-2 text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link href={`/notary/${index + 1}`}>
                    View Profile
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/california-notaries">
                View All Notaries
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Get your documents notarized in three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Find a Notary",
                description:
                  "Search for certified notaries in your area or book an online session",
              },
              {
                step: "2",
                title: "Schedule Appointment",
                description:
                  "Choose a convenient time and location for your notarization",
              },
              {
                step: "3",
                title: "Get Notarized",
                description:
                  "Meet with your notary and get your documents officially notarized",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

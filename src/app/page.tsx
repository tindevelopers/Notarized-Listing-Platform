import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DualSearchBanner from "@/components/DualSearchBanner";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Static notary data - in a real app, this would come from a database
const notariesData = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1494790108755-2616b39c0e6e?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    location: "Los Angeles, CA",
    rating: 5.0,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "emily-davis",
    name: "Emily Davis",
    location: "Chicago, IL",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "david-wilson",
    name: "David Wilson",
    location: "Houston, TX",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "lisa-rodriguez",
    name: "Lisa Rodriguez",
    location: "Phoenix, AZ",
    rating: 5.0,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "james-taylor",
    name: "James Taylor",
    location: "Miami, FL",
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "maria-garcia",
    name: "Maria Garcia",
    location: "Denver, CO",
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "robert-brown",
    name: "Robert Brown",
    location: "Seattle, WA",
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&h=300&fit=crop&crop=face",
  },
];

// Server Component - renders on the server
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Dual Search Banner */}
      <DualSearchBanner />

      {/* Search by State */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Search by State
            </h2>
            <p className="text-xl text-gray-600">
              Find certified notaries in your state quickly and easily
            </p>
          </div>

          <div className="relative">
            {/* US Map SVG */}
            <div className="flex justify-center">
              <svg viewBox="0 0 1000 600" className="w-full max-w-4xl h-auto">
                {/* Simplified US Map - Main states as blue shapes */}
                <g fill="#0066FF" stroke="#ffffff" strokeWidth="2">
                  {/* California */}
                  <Link href="/california-notaries">
                    <path
                      d="M50 150 L50 400 L150 450 L180 420 L160 380 L140 350 L120 300 L100 250 L80 200 Z"
                      className="hover:fill-blue-600 cursor-pointer transition-colors"
                    />
                  </Link>
                  {/* Texas */}
                  <path
                    d="M300 350 L450 340 L460 450 L420 480 L350 470 L320 440 Z"
                    className="hover:fill-blue-600 cursor-pointer transition-colors"
                  />
                  {/* Florida */}
                  <path
                    d="M600 420 L750 430 L780 480 L720 500 L650 490 L620 450 Z"
                    className="hover:fill-blue-600 cursor-pointer transition-colors"
                  />
                  {/* New York */}
                  <path
                    d="M700 150 L800 140 L820 200 L780 220 L720 200 Z"
                    className="hover:fill-blue-600 cursor-pointer transition-colors"
                  />
                  {/* Illinois */}
                  <path
                    d="M500 200 L550 190 L560 280 L520 290 L510 250 Z"
                    className="hover:fill-blue-600 cursor-pointer transition-colors"
                  />
                  {/* Pennsylvania */}
                  <path
                    d="M650 180 L750 170 L760 220 L670 230 Z"
                    className="hover:fill-blue-600 cursor-pointer transition-colors"
                  />
                  {/* Ohio */}
                  <path
                    d="M580 200 L650 190 L660 250 L590 260 Z"
                    className="hover:fill-blue-600 cursor-pointer transition-colors"
                  />
                  {/* Georgia */}
                  <path
                    d="M620 320 L680 310 L700 380 L640 390 Z"
                    className="hover:fill-blue-600 cursor-pointer transition-colors"
                  />
                  {/* North Carolina */}
                  <path
                    d="M650 280 L750 270 L770 320 L670 330 Z"
                    className="hover:fill-blue-600 cursor-pointer transition-colors"
                  />
                  {/* Michigan */}
                  <path
                    d="M520 150 L580 140 L590 200 L530 210 Z"
                    className="hover:fill-blue-600 cursor-pointer transition-colors"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Most requested notary services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Real Estate</h3>
              <p className="text-blue-100">
                Property transactions, deeds, and mortgage documents
              </p>
              <Button variant="secondary" className="w-full">
                Learn More
              </Button>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Business Documents</h3>
              <p className="text-purple-100">
                Contracts, agreements, and corporate filings
              </p>
              <Button variant="secondary" className="w-full">
                Learn More
              </Button>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Legal Documents</h3>
              <p className="text-green-100">
                Affidavits, powers of attorney, and legal forms
              </p>
              <Button variant="secondary" className="w-full">
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">
                  Remote On-Line Notarization
                  <br />
                  at your fingertips.
                </h2>
                <p className="text-xl text-gray-600">
                  Professional notary services come to you. No need to travel or
                  wait in line.
                </p>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">
                    Available 24/7 nationwide
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">
                    Certified and insured notaries
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">
                    Mobile and online services
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">
                    Instant booking and scheduling
                  </span>
                </li>
              </ul>

              <Button size="lg" className="text-lg px-8 py-6">
                Book Now
              </Button>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop"
                alt="Mobile notary service"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Notaries - Server-rendered */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our Notaries</h2>
            <p className="text-xl text-gray-600">
              Meet our certified professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {notariesData.map((notary) => (
              <Card
                key={notary.id}
                className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow"
              >
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src={notary.image} alt={notary.name} />
                  <AvatarFallback>
                    {notary.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{notary.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {notary.location}
                  </p>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{notary.rating}</span>
                    <span className="text-sm text-gray-500">
                      ({notary.reviews})
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Book Now
                  </Button>
                  <Link href={`/notary/${notary.id}`}>
                    <Button size="sm" className="px-4">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/california-notaries">
              <Button variant="outline" size="lg">
                View All Notaries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Our Results speak for themselves
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands of customers nationwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-primary">40%</div>
              <div className="text-xl font-semibold text-gray-900">
                Faster Service
              </div>
              <p className="text-gray-600">
                Average completion time compared to traditional notary services
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-primary">99%</div>
              <div className="text-xl font-semibold text-gray-900">
                Customer Satisfaction
              </div>
              <p className="text-gray-600">
                Based on over 50,000 completed notarizations
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-primary">3.6K</div>
              <div className="text-xl font-semibold text-gray-900">
                Certified Notaries
              </div>
              <p className="text-gray-600">
                Professional notaries available across all 50 states
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">How it works</h2>
            <p className="text-xl text-gray-600">
              Get your documents notarized in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                1
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Schedule Online
                </h3>
                <p className="text-gray-600">
                  Choose your preferred time and location. Our notaries are
                  available 24/7.
                </p>
              </div>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                2
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Meet & Verify
                </h3>
                <p className="text-gray-600">
                  Meet with a certified notary who will verify your identity and
                  documents.
                </p>
              </div>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                3
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Complete & Receive
                </h3>
                <p className="text-gray-600">
                  Get your notarized documents instantly with digital copies
                  sent to your email.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Here's what our great customers have to say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b39c0e6e?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Real Estate Agent</div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Notarized made the home buying process so much easier. The
                notary arrived right on time and was incredibly professional.
                I'll definitely use them again!"
              </p>
            </Card>

            <Card className="p-8 space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-sm text-gray-600">Business Owner</div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Outstanding service! Fast, reliable, and affordable. The online
                booking system is so convenient and the notary was knowledgeable
                and friendly."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Browse Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Browse articles & news
            </h2>
            <p className="text-xl text-gray-600">
              Stay informed about notary services and legal requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Understanding Remote Online Notarization",
                excerpt:
                  "Learn about the benefits and requirements of remote notary services...",
                image:
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
                date: "Mar 15, 2024",
              },
              {
                title: "Real Estate Document Notarization Guide",
                excerpt:
                  "Everything you need to know about notarizing property documents...",
                image:
                  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
                date: "Mar 12, 2024",
              },
              {
                title: "Mobile Notary vs Traditional Services",
                excerpt:
                  "Compare the advantages of mobile notary services over traditional...",
                image:
                  "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop",
                date: "Mar 10, 2024",
              },
            ].map((article, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {article.date}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary"
                    >
                      Read More <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-12 bg-gradient-to-br from-primary to-blue-600 text-white text-center space-y-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Join our notary platform</h3>
                <p className="text-blue-100">
                  Become a certified notary partner and start earning with
                  flexible schedules
                </p>
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-6"
              >
                Apply Now
              </Button>
            </Card>

            <Card className="p-12 bg-gradient-to-br from-secondary to-gray-700 text-white text-center space-y-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Find a Notary</h3>
                <p className="text-gray-200">
                  Quick and secure notary services available in your area
                </p>
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-6"
              >
                Search Now
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

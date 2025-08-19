"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CaliforniaNotaries() {

  // Sample notary data - this would typically come from an API
  const notaries = [
    {
      id: "matt-cannon",
      name: "Matt Cannon",
      rating: 5.0,
      description:
        "Amet tincidunt non congue vel massa molestie magna eget, molestae magna eget.",
      location: "680 High Newton Drive Brook, NY 10247",
      isTopRated: true,
      isExperienced: true,
      isInsured: true,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: "andy-smith",
      name: "Andy Smith",
      rating: 5.0,
      description:
        "Amet tincidunt non congue vel massa molestie magna eget, molestae magna eget.",
      location: "680 High Newton Drive Brook, NY 10247",
      isTopRated: true,
      isExperienced: true,
      isInsured: true,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: "john-carter",
      name: "John Carter",
      rating: 5.0,
      description:
        "Amet tincidunt non congue vel massa molestie magna eget, molestae magna eget.",
      location: "680 High Newton Drive Brook, NY 10247",
      isTopRated: true,
      isExperienced: true,
      isInsured: true,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: "kathy-curl",
      name: "Kathy Curl",
      rating: 5.0,
      description:
        "Amet tincidunt non congue vel massa molestie magna eget, molestae magna eget.",
      location: "680 High Newton Drive Brook, NY 10247",
      isTopRated: true,
      isExperienced: true,
      isInsured: true,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b39c0e6e?w=300&h=300&fit=crop&crop=face",
    },
    // Add more notaries as needed
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              California Notaries
            </h1>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed
              vulputate tortor mauris molestie lorem tincidunt.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Filter by</span>
            <Select defaultValue="category">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {notaries.map((notary, index) => (
            <Card
              key={notary.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center space-y-4">
                {/* Avatar */}
                <div className="mx-auto">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={notary.image} alt={notary.name} />
                    <AvatarFallback>
                      {notary.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name and Rating */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{notary.name}</h3>
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-1">
                  {notary.isTopRated && (
                    <Badge className="bg-orange-100 text-orange-700 text-xs">
                      Top Rated
                    </Badge>
                  )}
                  {notary.isExperienced && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs">
                      Experienced
                    </Badge>
                  )}
                  {notary.isInsured && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      Insured
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {notary.description}
                </p>

                {/* Location */}
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-center">{notary.location}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Book
                  </Button>
                  <Link href={`/notary/${notary.id}`}>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4 mb-16">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Next
          </Button>
        </div>
      </main>

      {/* Help Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left space-y-4">
              <h2 className="text-2xl font-bold">
                Looking for help? we help you to hire the best Notary
              </h2>
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipiscing elit venenatis
                vulputate enim ut amet tellus lorem enim et est cursus.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Hire Notary
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

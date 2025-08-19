"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CaliforniaNotaries() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Notarized
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Notary Services
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Remote Services
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Document Prep
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="text-gray-700">
                List your business
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Search Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Notary Services
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Remote Services
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Document Prep
                </a>
                <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="text-gray-700 justify-start"
                  >
                    List your business
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 justify-start">
                    Search Now
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

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
                  <Button variant="outline" size="sm" className="flex-1">
                    More
                  </Button>
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
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Footer content */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Main Pages</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link
                    href="/"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-900 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/california-notaries"
                    className="hover:text-gray-900 transition-colors"
                  >
                    California Notaries
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
            <p>Copyright © Notarized Inc | Powered by TIN</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

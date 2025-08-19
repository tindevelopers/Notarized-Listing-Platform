"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  ChevronRight,
  User,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default function NotaryProfile({ params }: PageProps) {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Gray background section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Notarys */}
          <Link
            href="/california-notaries"
            className="inline-flex items-center space-x-2 text-gray-900 hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-bold">Back to Notarys</span>
          </Link>

          {/* Profile Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-white shadow-sm">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="w-44 h-44 rounded-full bg-gray-100 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b39c0e6e?w=300&h=300&fit=crop&crop=face"
                        alt="Lily Woods"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <div className="text-primary text-lg">California</div>
                      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Lily Woods ({params.id})
                      </h1>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit
                        erat morbi scelerisque mauris diam cum pretium ultrices
                        nibh viverra etiam massa duis congue lorem egestas odio
                        lorem ipsum.
                      </p>
                    </div>

                    {/* Design Badge */}
                    <div className="inline-flex">
                      <Badge className="bg-primary text-white px-6 py-3 text-base rounded-full">
                        <span className="mr-2">✏️</span>
                        Design
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white shadow-sm">
                {/* Star Rating */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="text-gray-600">5.0 (123 Reviews)</div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-gray-600">(+123) 443-545-8250</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-gray-600">
                      legalservices@company.com
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 text-primary mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="text-gray-600">
                      680 High Noon Circle
                      <br />
                      Bronx, NY 1046
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 text-primary">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="text-gray-600">English, Spanish</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button size="lg" className="w-full">
                    Book Now
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Chat
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* About Section */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  About Lily Woods
                </h2>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit nunc
                  venenatis ridiculus nisl cursus sodales amet eu consequat sit
                  sodales tortor vulputate nisl adipiscing nec iaculis
                  ullamcorper pulvinar at proin vitae lobortis egestas egestas
                  id dui in fringilla arcu etiam tortor nunc arcu consectetur
                  sit amet a praesent amet sit pellentesque amet ut venenatis at
                  ac mattis nulla quam.
                </p>
                <p>
                  Felis nunc at vitae, donec nunc habitasse molestie elementum
                  placerat amet velit cursus sed aenean non egestas urna auctor
                  commodo elementum pretium quis nibh purus neque habitant
                  aliquam arcu sit amet imperdiet convallis at enim leo magna
                  vitae facilisis neque lacus aliquam urna morbi leo at
                  pellentesque velit nunc quam commodo amet aliquam cursus
                  commodo.
                </p>
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Badge
                    variant="outline"
                    className="px-6 py-3 text-base justify-center"
                  >
                    <span className="mr-2">📱</span>
                    UI/UX Design
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-6 py-3 text-base justify-center"
                  >
                    <span className="mr-2">📦</span>
                    Product Design
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-6 py-3 text-base justify-center"
                  >
                    <span className="mr-2">🌐</span>
                    Web Design
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Badge
                    variant="outline"
                    className="px-6 py-3 text-base justify-center"
                  >
                    <span className="mr-2">🎨</span>
                    Brand Design
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-6 py-3 text-base justify-center"
                  >
                    <span className="mr-2">💻</span>
                    Motion Graphics
                  </Badge>
                </div>
              </div>
            </section>

            {/* Ratings & Reviews Section */}
            <section>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Ratings & Reviews
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Review 1 */}
                <Card className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet consectetur non adipiscing elit
                    gravida posuere odio metus adipiscing tincidunt venenatis
                    amet sagittis tellus porttitor enim blandit venenatis
                    tellus.
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-900">Sandra Hills</div>
                    <div className="text-primary">Developer at Facebook</div>
                    <div className="text-blue-600 mt-2">facebook</div>
                  </div>
                </Card>

                {/* Review 2 */}
                <Card className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet consectetur non adipiscing elit
                    gravida posuere odio metus adipiscing tincidunt venenatis
                    amet sagittis tellus porttitor enim blandit.
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-900">Mark Carmon</div>
                    <div className="text-primary">Product Manager</div>
                    <div className="text-red-600 mt-2">youtube</div>
                  </div>
                </Card>
              </div>
            </section>
          </div>

          {/* Right Column - Testimonials */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Testimonial Card 1 */}
              <Card className="p-6 bg-gray-900 text-white relative">
                <div className="absolute top-4 right-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>KW</AvatarFallback>
                  </Avatar>
                </div>
                <div className="mb-4">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm">
                    Lorem ipsum dolor sit amet conse dolor camelsit itsum der.
                  </p>
                </div>
                <div>
                  <div className="font-bold">Karen Wills</div>
                  <div className="text-primary text-sm">
                    CEO & Founder at Darkbit
                  </div>
                </div>
              </Card>

              {/* Testimonial Card 2 */}
              <Card className="p-6 border shadow-sm">
                <div className="flex items-center mb-3">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-bold text-sm">Sandy Corl</div>
                    <div className="text-primary text-xs">
                      Frontend Developer
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">4.9</span>
                  <span className="text-xs text-gray-500">(60+ reviews)</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

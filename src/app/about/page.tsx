"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  CheckCircle,
  TrendingUp,
  Trophy,
  Zap,
  Eye,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* About our company section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  About our company
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed font-light text-left">
                  <div className="mb-20">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center">
                        <div className="max-w-3xl mx-auto">
                          <p className="text-gray-600 mb-0">
                            <span className="font-inter text-left">
                              Notarized, Inc. is here to assist you with
                              notaries for all your signings and notarization
                              needs. Cultivated by Real Estate Industry
                              Professionals with over 15 years of experience,
                              we know and understand what it takes to complete
                              closings properly, and we will be with you every
                              step of the way. Our customer service team is
                              available 24/7 for signing appointments and
                              questions. At Notarized, Inc., we have a vast
                              range of signing knowledge to support you, in
                              combination with the experience and skill set to
                              handle your signings properly the first time.
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative text-gray-600">
                    <div className="max-w-3xl mx-auto">
                    </div>
                  </div>
                </p>
              </div>

              {/* Left image */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=450&fit=crop"
                    alt="Professional woman working on laptop"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Right image */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=450&fit=crop"
                    alt="Professional man working in office"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  <div>
                    Notarized, Inc. is here to assist you with notaries for
                    all your signings and notarization needs. Cultivated by
                    Real Estate Industry Professionals with over 15 years of
                    experience, we know and understand what it takes to
                    complete closings properly, and we will be with you every
                    step of the way. Our customer service team is available
                    24/7 for signing appointments and questions. At Notarized,
                    Inc., we have a vast range of signing knowledge to support
                    you, in combination with the experience and skill set to
                    handle your signings properly the first time.
                  </div>
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Hire Notary
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6"
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our amazing numbers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Our amazing numbers
            </h2>
            <p className="text-xl text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipiscing elit ac non sit
              duis sollicitudin quam blandit amet id mi ac eget facilisi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-5xl font-bold text-gray-900">200K</div>
              <div className="text-xl font-bold text-gray-900">Notaries</div>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-5xl font-bold text-gray-900">Over 1K</div>
              <div className="text-xl font-bold text-gray-900">
                Active Clients
              </div>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-5xl font-bold text-gray-900">All 50 States</div>
              <div className="text-xl font-bold text-gray-900">
                Happy clients
              </div>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-5xl font-bold text-gray-900">20Y +</div>
              <div className="text-xl font-bold text-gray-900">
                Experience
              </div>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit our office */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - 3D office mockup */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop"
                  alt="Modern office space"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right side - Contact info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Visit our office
                </h2>
                <p className="text-lg text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit varius
                  sit ac arcu libero augue arcu vestibulum bibendum.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-600">Email:</div>
                    <div className="font-medium text-gray-900">
                      contact@workplace.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-600">Phone number:</div>
                    <div className="font-medium text-gray-900">
                      (414) 570 - 3246
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-600">Address:</div>
                    <div className="font-medium text-gray-900">
                      680 High Noon Circle
                      <br />
                      Bronx, NY 1046
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Visit our office
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The values that drive everything we do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left side - Title and navigation */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  The values that drive everything we do
                </h2>
                <p className="text-lg text-gray-600">
                  <div>
                    Our core values are the foundation upon which we've built
                    our platform. These values guide our daily operations, our
                    long-term vision, and our commitment to both the notaries
                    and the public we serve.
                  </div>
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <button className="w-14 h-14 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Value cards */}
            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-10 h-10 text-blue-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Integrity</h3>
                <p className="text-gray-600">
                  <div>
                    We hold ourselves to the highest standards of honesty and
                    transparency in all our interactions and endeavors.
                  </div>
                </p>
              </div>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Excellence</h3>
                <p className="text-gray-600">
                  <div>
                    We continuously strive for the highest quality in our
                    services, ensuring that our members and users receive the
                    best experience possible.
                  </div>
                </p>
              </div>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-10 h-10 text-purple-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Community</h3>
                <p className="text-gray-600">
                  <div>
                    We value the power of collective strength and endeavor to
                    create a supportive environment where notaries can
                    connect, share, and grow together.
                  </div>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why join us? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">
                  Why join us?
                </h2>
                <p className="text-lg text-gray-600">
                  <div>
                    Join our community and showcase your expertise to those
                    who need it most. With Notarized, you're not just getting
                    a listing; you're becoming part of a dedicated network
                    committed to elevating the notary profession.
                  </div>
                </p>
              </div>

              {/* Benefits list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Good leads</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Work remotely</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <RotateCcw className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Constant work</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">
                    Hundreds of visitors an jobs
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">
                    Work on your time
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">
                    Low commission: Pay only 10%
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Main image */}
              <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=700&fit=crop"
                  alt="Happy woman using mobile phone"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Testimonial card overlay */}
              <Card className="absolute bottom-8 left-4 right-16 p-6 space-y-4 bg-white shadow-xl">
                <h3 className="text-xl font-bold text-gray-900">
                  "Thanks to Workplaces I've found my best clients"
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur non adipiscing elit
                  gravida posuere.
                </p>
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-gray-900">Lilly Woods</span>
                  <span className="text-gray-400">—</span>
                  <span className="text-primary">Brand Designer</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

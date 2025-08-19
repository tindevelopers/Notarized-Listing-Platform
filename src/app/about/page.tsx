'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Menu,
  X,
  CheckCircle,
  TrendingUp,
  Trophy,
  Zap,
  Eye,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Notarized
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Notary Services
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Remote Services
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Deed Prep
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700">
                List your business
              </Button>
              <Button>Search Notaries</Button>
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
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Notary Services
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Remote Services
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Deed Prep
                </a>
                <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    className="text-gray-700 justify-start"
                  >
                    List your business
                  </Button>
                  <Button className="justify-start">Search Notaries</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* About our company section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  About our company
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit donec
                  magna pharetra dignissim nibh turpis pretium id leo sit dolor
                  vitae mi arcu sit est sem fames integer placerat in magna
                  laoreet nibh.
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
                  Sit pellentesque eget arcu elementum phasellus et risus
                  convallis nulla porttitor diam porttitor euismod quis senectus
                  lobortis ut consequat neque tempor tortor tincidunt posuere
                  tincidunt arcu.
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
              <div className="text-5xl font-bold text-gray-900">2,000</div>
              <div className="text-xl font-bold text-gray-900">Notarys</div>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-5xl font-bold text-gray-900">30,000+</div>
              <div className="text-xl font-bold text-gray-900">
                Successful projects
              </div>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-5xl font-bold text-gray-900">1,500</div>
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
              <div className="text-5xl font-bold text-gray-900">500</div>
              <div className="text-xl font-bold text-gray-900">
                5 stars reviews
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
                  Lorem ipsum dolor sit amet consectetur adipiscing elit ac non
                  sit duis sollicitudin quam blandit amet id mi ac eget facilisi
                  gravida.
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
                <h3 className="text-2xl font-bold text-gray-900">Growth</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit nibh
                  libero ultrices vulputate congue.
                </p>
              </div>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Quality</h3>
                <p className="text-gray-600">
                  Semper id tellus hac duis vitae arcu dui elementum id in sed
                  lectus pellentesque praesent.
                </p>
              </div>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-10 h-10 text-purple-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Teamwork</h3>
                <p className="text-gray-600">
                  Tortor vitae nulla bibendum integer sociis blandit augue sit
                  morbi aliquam vitae neque.
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
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sapien
                  eget eu elementum velit nunc tortor pulvinar ornare at mi sed
                  nisl in proin sollicitudin ultricies aliquet malesuada
                  aliquet.
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
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-6">
              <div className="text-2xl font-bold text-primary">Notarized</div>
              <p className="text-gray-400">
                Connecting you with certified notaries nationwide. Fast,
                reliable, and professional services.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-sm">yt</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Main Pages</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog Post
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Notarys
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Notarys Single
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Skills Category
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Utility Pages</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Start here
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Styleguide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    404 Not Found
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Password Protected
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Licenses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white text-primary underline"
                  >
                    More Webflow Templates
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Freelance categories</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Design</div>
                    <div className="text-gray-400 text-sm">
                      Explore category →
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Development</div>
                    <div className="text-gray-400 text-sm">
                      Explore category →
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Marketing</div>
                    <div className="text-gray-400 text-sm">
                      Explore category →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>Copyright © Notarized Inc | Powered by TIN</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

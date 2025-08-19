import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NotaryProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary">
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

      {/* Gray background section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Notarys */}
          <Link
            to="/"
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
                        Lily Woods
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

            {/* Blogs Section */}
            <section>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Blogs</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Blog 1 */}
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 relative">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=240&fit=crop"
                      alt="Sezane Stationary Brand Design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-3">
                      Sezane Stationary Brand Design
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Lorem ipsum dolor sit amet consectetur non adipiscing elit
                      massa dignissim leo.
                    </p>
                    <Link
                      to="#"
                      className="inline-flex items-center text-primary font-bold hover:underline"
                    >
                      View more
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </Card>

                {/* Blog 2 */}
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 relative">
                    <img
                      src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=240&fit=crop"
                      alt="Haus Packaging Brand Design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-3">
                      Haus Packaging Brand Design
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Lorem ipsum dolor sit amet consectetur non adipiscing elit
                      massa dignissim leo.
                    </p>
                    <Link
                      to="#"
                      className="inline-flex items-center text-primary font-bold hover:underline"
                    >
                      View more
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
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

      {/* More Notarys Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">More Notarys</h2>
            <Button variant="outline">Browse all Notarys</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Notary 1 */}
            <Card className="p-6 text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                John Carter
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Lorem ipsum dolor sit amet id consectetur adipiscing elit.
              </p>
              <div className="flex justify-center space-x-3 mb-4">
                <Badge className="bg-blue-500 text-white">Design</Badge>
                <Badge variant="outline">$80/hr</Badge>
              </div>
            </Card>

            {/* Notary 2 */}
            <Card className="p-6 text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" />
                <AvatarFallback>SH</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sandy Hung
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Ut nibh pulvinar nisi et sit ac venenatis at cursus semper.
              </p>
              <div className="flex justify-center space-x-3 mb-4">
                <Badge className="bg-blue-500 text-white">Design</Badge>
                <Badge variant="outline">$210/hr</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Find the talent needed to get your business growing.
              </h2>
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit egestas
                et in egestas dui eget egestas a erat leo nec quam pretium.
              </p>
              <div className="flex">
                <div className="flex-1 bg-white rounded-full p-1 flex items-center">
                  <div className="flex items-center px-4 flex-1">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                      type="email"
                      placeholder="Enter your business email"
                      className="flex-1 text-gray-700 bg-transparent outline-none"
                    />
                  </div>
                  <Button size="sm" className="rounded-full">
                    Hire a Notary
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop"
                alt="Professional woman"
                className="rounded-lg"
              />
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
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
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
                    Notarys
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
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    404 Not Found
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Licenses
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Freelance categories</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">🎨</span>
                  </div>
                  <div>
                    <div className="font-bold">Design</div>
                    <div className="text-gray-400 text-sm">
                      Explore category →
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white">⚙️</span>
                  </div>
                  <div>
                    <div className="font-bold">Development</div>
                    <div className="text-gray-400 text-sm">
                      Explore category →
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">📈</span>
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

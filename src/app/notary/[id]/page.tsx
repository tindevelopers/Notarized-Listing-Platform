"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Loader2,
  AlertCircle,
  Calendar,
  Clock,
  DollarSign,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useNotary } from "@/hooks/use-notaries";
import { formatPhoneNumber, formatCurrency, formatDate } from "@/lib/utils";

interface PageProps {
  params: { id: string };
}

export default function NotaryProfile({ params }: PageProps) {
  const { data, error, isLoading } = useNotary(params.id);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              {/* Back button placeholder */}
              <div className="h-6 bg-gray-200 rounded w-32 mb-8" />
              
              {/* Profile card placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="p-8 bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-44 h-44 rounded-full bg-gray-200" />
                      <div className="flex-1 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                        <div className="h-8 bg-gray-200 rounded w-64" />
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded" />
                          <div className="h-3 bg-gray-200 rounded w-5/6" />
                          <div className="h-3 bg-gray-200 rounded w-4/6" />
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-32" />
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <Card className="p-6 bg-white shadow-sm">
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-24 mx-auto" />
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 bg-gray-200 rounded" />
                        <div className="h-12 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading notary profile. Please try again.
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  if (!data?.notary) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Notary profile not found.
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  const notary = data.notary;
  const profile = notary.profiles;
  const reviews = notary.reviews || [];

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
                    <Avatar className="w-44 h-44">
                      <AvatarImage
                        src={profile?.avatar_url || ""}
                        alt={profile?.full_name || "Notary"}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {profile?.full_name
                          ?.split(" ")
                          ?.map((n) => n[0])
                          ?.join("")
                          ?.toUpperCase() || "N"}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <div className="text-primary text-lg">
                        {notary?.city}, {notary?.state}
                      </div>
                      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        {profile?.full_name || "Unknown Notary"}
                      </h1>
                      {notary?.business_name && (
                        <p className="text-xl text-gray-600 font-medium">
                          {notary.business_name}
                        </p>
                      )}
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {notary?.description || "Professional notary services available."}
                      </p>
                    </div>

                    {/* Service Badges */}
                    <div className="flex flex-wrap gap-2">
                      {notary?.services?.slice(0, 4)?.map((service) => (
                        <Badge 
                          key={service} 
                          className="bg-primary text-white px-4 py-2 text-sm rounded-full"
                        >
                          {service}
                        </Badge>
                      ))}
                      {notary?.services && notary.services.length > 4 && (
                        <Badge variant="outline" className="px-4 py-2 text-sm rounded-full">
                          +{notary.services.length - 4} more services
                        </Badge>
                      )}
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
                        className={`w-6 h-6 ${
                          i < Math.floor(notary?.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-600">
                    {notary?.rating?.toFixed(1) || "0.0"} ({notary?.review_count || 0} Reviews)
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6 mb-8">
                  {notary?.phone && (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 text-primary">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="text-gray-600">
                        {formatPhoneNumber(notary.phone)}
                      </div>
                    </div>
                  )}

                  {profile?.email && (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 text-primary">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="text-gray-600">
                        {profile.email}
                      </div>
                    </div>
                  )}

                  {(notary?.address || notary?.city) && (
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 text-primary mt-1">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="text-gray-600">
                        {notary.address && (
                          <>
                            {notary.address}
                            <br />
                          </>
                        )}
                        {notary?.city}, {notary?.state} {notary?.zip_code}
                      </div>
                    </div>
                  )}

                  {notary?.hourly_rate && (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 text-primary">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div className="text-gray-600">
                        {formatCurrency(notary.hourly_rate)}/hour
                      </div>
                    </div>
                  )}

                  {notary?.languages && notary.languages.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 text-primary">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="text-gray-600">
                        {notary.languages.join(", ")}
                      </div>
                    </div>
                  )}

                  {notary?.travel_radius && (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="text-gray-600">
                        {notary.travel_radius} mile radius
                      </div>
                    </div>
                  )}
                </div>

                {/* Service Features */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {notary?.is_mobile && (
                      <Badge className="bg-green-100 text-green-800">
                        <MapPin className="w-3 h-3 mr-1" />
                        Mobile Service
                      </Badge>
                    )}
                    {notary?.is_online && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Globe className="w-3 h-3 mr-1" />
                        Online Notary
                      </Badge>
                    )}
                    {notary?.is_verified && (
                      <Badge className="bg-purple-100 text-purple-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
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
                  About {profile?.full_name}
                </h2>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  {notary?.description || "Professional notary services available with attention to detail and commitment to excellence."}
                </p>
                
                {notary?.business_name && (
                  <p>
                    Operating as <strong>{notary.business_name}</strong>, providing reliable notarization services
                    {notary.city && notary.state && ` in the ${notary.city}, ${notary.state} area`}.
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Service Area</h4>
                    <p className="text-gray-600">
                      {notary?.city}, {notary?.state}
                      {notary?.travel_radius && ` • ${notary.travel_radius} mile radius`}
                    </p>
                  </div>
                  
                  {notary?.hourly_rate && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Service Rate</h4>
                      <p className="text-gray-600">
                        {formatCurrency(notary.hourly_rate)} per hour
                      </p>
                    </div>
                  )}
                  
                  {notary?.languages && notary.languages.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                      <p className="text-gray-600">
                        {notary.languages.join(", ")}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Service Types</h4>
                    <p className="text-gray-600">
                      {notary?.is_mobile && "Mobile Service"}
                      {notary?.is_mobile && notary?.is_online && " • "}
                      {notary?.is_online && "Online Notarization"}
                      {(!notary?.is_mobile && !notary?.is_online) && "In-Office Service"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            {notary?.services && notary.services.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Services Offered
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {notary.services.map((service) => (
                    <Badge
                      key={service}
                      variant="outline"
                      className="px-6 py-3 text-base justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

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

              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {reviews.slice(0, 6).map((review) => (
                    <Card key={review.id} className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      {review.comment && (
                        <p className="text-gray-600 mb-4">
                          "{review.comment}"
                        </p>
                      )}
                      <div className="border-t pt-4">
                        <div className="font-bold text-gray-900">
                          {review.profiles?.full_name || "Anonymous"}
                        </div>
                        {review.service_date && (
                          <div className="text-sm text-gray-500 mt-1">
                            Service date: {formatDate(review.service_date)}
                          </div>
                        )}
                        <div className="text-xs text-gray-400 mt-2">
                          {formatDate(review.created_at)}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No reviews yet
                  </h3>
                  <p className="text-gray-600">
                    Be the first to leave a review for {profile?.full_name}
                  </p>
                </div>
              )}
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

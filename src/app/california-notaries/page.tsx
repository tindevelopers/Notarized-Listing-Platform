
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Search,
  Filter,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useNotaries } from "@/hooks/use-notaries";
import { SERVICE_TYPES } from "@/shared/api";
import { formatPhoneNumber, formatCurrency } from "@/lib/utils";
import { SupabaseNotice } from "@/components/dev/SupabaseNotice";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function CaliforniaNotaries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("rating");

  // Fetch notaries for California
  const { data, error, isLoading } = useNotaries({
    state: "CA",
    service: selectedService || undefined,
    city: selectedCity || undefined,
    limit: 20,
  });

  // Filter based on search term (client-side for real-time experience)
  const filteredNotaries = data?.notaries?.filter((notary) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      notary?.profiles?.full_name?.toLowerCase().includes(searchLower) ||
      notary?.business_name?.toLowerCase().includes(searchLower) ||
      notary?.city?.toLowerCase().includes(searchLower) ||
      notary?.description?.toLowerCase().includes(searchLower)
    );
  }) || [];

  // Sort notaries
  const sortedNotaries = [...filteredNotaries].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b?.rating || 0) - (a?.rating || 0);
      case "reviews":
        return (b?.review_count || 0) - (a?.review_count || 0);
      case "name":
        return (a?.profiles?.full_name || "").localeCompare(b?.profiles?.full_name || "");
      case "city":
        return (a?.city || "").localeCompare(b?.city || "");
      default:
        return 0;
    }
  });

  const cities = Array.from(
    new Set(data?.notaries?.map((notary) => notary?.city).filter(Boolean))
  ).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              California Notaries
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find certified notary publics throughout California
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Search notaries..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Service Filter */}
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Services</SelectItem>
                    {SERVICE_TYPES.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* City Filter */}
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="city">City A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedService && (
                  <Badge variant="secondary" className="px-3 py-1">
                    {selectedService}
                    <button
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedService("")}
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCity && (
                  <Badge variant="secondary" className="px-3 py-1">
                    {selectedCity}
                    <button
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedCity("")}
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {searchTerm && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Search: "{searchTerm}"
                    <button
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setSearchTerm("")}
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SupabaseNotice />
        
        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading notaries...</span>
                </div>
              ) : (
                `${sortedNotaries.length} notaries found`
              )}
            </h2>
            {data?.total && (
              <p className="text-gray-600 mt-1">
                Showing {sortedNotaries.length} of {data.total} total results
              </p>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error Loading Notaries
            </h3>
            <p className="text-gray-600 mb-4">
              We're having trouble loading the notary listings. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-8 bg-gray-200 rounded" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Notaries Grid */}
        {!isLoading && !error && sortedNotaries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedNotaries.map((notary) => (
              <Card
                key={notary.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage 
                      src={notary?.profiles?.avatar_url || ""} 
                      alt={notary?.profiles?.full_name || "Notary"} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {notary?.profiles?.full_name
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")
                        ?.toUpperCase() || "N"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {notary?.profiles?.full_name || "Unknown Notary"}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {notary?.city}, {notary?.state}
                    </p>
                    {notary?.business_name && (
                      <p className="text-sm text-gray-500 mt-1">
                        {notary.business_name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(notary?.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {notary?.rating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({notary?.review_count || 0} reviews)
                  </span>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {notary?.services?.slice(0, 3)?.map((service) => (
                      <Badge
                        key={service}
                        variant="outline"
                        className="text-xs"
                      >
                        {service}
                      </Badge>
                    ))}
                    {notary?.services && notary.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{notary.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  {notary?.phone && (
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-2" />
                      {formatPhoneNumber(notary.phone)}
                    </div>
                  )}
                  {notary?.hourly_rate && (
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-2" />
                      {formatCurrency(notary.hourly_rate)}/hour
                    </div>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {notary?.is_mobile && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Mobile Service
                    </Badge>
                  )}
                  {notary?.is_online && (
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      Online Notary
                    </Badge>
                  )}
                  {notary?.is_verified && (
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Book Now
                  </Button>
                  <Link href={`/notary/${notary.id}`}>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && sortedNotaries.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No notaries found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedService("");
                setSelectedCity("");
              }}
            >
              Clear all filters
            </Button>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}

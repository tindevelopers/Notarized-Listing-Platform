"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { Star, MapPin, Phone, Clock, Loader2, Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { formatPhoneNumber, formatCurrency } from "@/lib/utils";
import NotarySearchFilters, { SearchFilters } from "@/components/NotarySearchFilters";
import { SupabaseNotice } from "@/components/dev/SupabaseNotice";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useSearchNotaries } from "@/hooks/use-notaries";
import { NotaryWithProfile } from "@/types/supabase";
import { Input } from "@/components/ui/input";

// Client Component - uses search functionality
export default function CaliforniaNotariesPage() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    q: "",
    service: "all",
    city: "all",
    priceRange: "all",
    isOnline: false,
    isMobile: false,
    availability: "all",
  });
  
  const [mainSearchTerm, setMainSearchTerm] = useState("");

  // Use the search hook with current filters
  const { data: searchResults, isLoading, error } = useSearchNotaries({
    q: searchFilters.q || mainSearchTerm,
    state: "CA", // Always search California
    city: searchFilters.city !== "all" ? searchFilters.city : undefined,
    service: searchFilters.service !== "all" ? searchFilters.service : undefined,
    priceRange: searchFilters.priceRange !== "all" ? searchFilters.priceRange : undefined,
    isOnline: searchFilters.isOnline ? searchFilters.isOnline : undefined,
    isMobile: searchFilters.isMobile ? searchFilters.isMobile : undefined,
    availability: searchFilters.availability !== "all" ? searchFilters.availability : undefined,
    limit: 20,
  });

  const handleFiltersChange = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const handleMainSearch = () => {
    setSearchFilters(prev => ({
      ...prev,
      q: mainSearchTerm
    }));
  };

  const notaries = searchResults?.notaries || [];
  const totalResults = searchResults?.total || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section with Search */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Certified Notaries in California
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Search for qualified, licensed notaries across California for all your document needs
            </p>

            {/* Main Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by name or specialty (e.g., real estate, immigration, business)"
                  value={mainSearchTerm}
                  onChange={(e) => setMainSearchTerm(e.target.value)}
                  className="pl-12 pr-24 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-[#005DFF]"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleMainSearch();
                    }
                  }}
                />
                <Button
                  onClick={handleMainSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#005DFF] hover:bg-[#0052E6] px-6 py-2 rounded-full"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Show Supabase notice if not configured */}
            {!isSupabaseConfigured && <SupabaseNotice />}

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {totalResults} Active Notaries
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Average Response: 2 hours
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Licensed & Insured
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Client Component */}
          <div className="lg:w-80">
            <NotarySearchFilters 
              onFiltersChange={handleFiltersChange}
              initialFilters={searchFilters}
            />
          </div>

          {/* Search Results */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {isLoading ? "Searching..." : `${totalResults} Notaries Found`}
              </h2>

              <div className="text-sm text-gray-500">
                {searchFilters.q && `Results for "${searchFilters.q}"`}
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#005DFF]" />
                <span className="ml-2 text-gray-600">Searching notaries...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Error loading notaries. Please try again.</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Retry
                </Button>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !error && notaries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No notaries found matching your search criteria.</p>
                <p className="text-sm text-gray-500">Try adjusting your filters or search terms.</p>
              </div>
            )}

            {/* Notary Results */}
            {!isLoading && !error && notaries.length > 0 && (
              <div className="space-y-6">
                {notaries.map((notary: NotaryWithProfile) => (
                  <Card
                    key={notary.id}
                    className="p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Notary Info */}
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src={notary.profiles?.avatar_url || ""}
                            alt={notary.profiles?.full_name || "Notary"}
                          />
                          <AvatarFallback>
                            {notary.profiles?.full_name
                              ?.split(" ")
                              ?.map((n) => n?.[0])
                              ?.join("") || "N"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {notary.profiles?.full_name || "Professional Notary"}
                            </h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">
                                {notary.rating || 5.0}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({notary.review_count || 0} reviews)
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {notary.city}, {notary.state}
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-3">
                            {notary.description || "Professional notary services"}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {notary.services?.slice(0, 3)?.map((service, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {service}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {(notary.availability as string) || "Business Hours"}
                            </div>
                            {notary.phone && (
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {formatPhoneNumber(notary.phone)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Services & Pricing */}
                      <div className="md:w-64">
                        <div className="space-y-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {formatCurrency(notary.hourly_rate || 75)}/hr
                            </div>
                            <div className="text-sm text-gray-500">
                              Starting rate
                            </div>
                          </div>

                          <div className="flex gap-2 mb-4">
                            {notary.is_mobile && (
                              <Badge variant="outline" className="text-xs">
                                Mobile
                              </Badge>
                            )}
                            {notary.is_online && (
                              <Badge variant="outline" className="text-xs">
                                Online
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 pt-2">
                            <Button size="sm" className="w-full">
                              Book Now
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <Link href={`/notary/${notary.id}`}>
                                View Profile
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

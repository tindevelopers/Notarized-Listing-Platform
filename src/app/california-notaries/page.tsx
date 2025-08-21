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
  Clock,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { formatPhoneNumber, formatCurrency } from "@/lib/utils";
import NotarySearchFilters from "@/components/NotarySearchFilters";
import { SupabaseNotice } from "@/components/dev/SupabaseNotice";
import { isSupabaseConfigured } from "@/lib/supabase/client";

// Mock data for California notaries - in a real app, this would be fetched from a database
const mockNotaries = [
  {
    id: "1",
    profiles: {
      full_name: "Sarah Johnson",
      phone: "555-123-4567",
      email: "sarah@example.com",
      avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b39c0e6e?w=300&h=300&fit=crop&crop=face",
      bio: "Experienced notary with 10+ years in real estate transactions.",
      certifications: ["California State Notary", "Real Estate Specialist"],
      years_experience: 10,
    },
    location: {
      city: "Los Angeles",
      state: "CA",
      zip: "90210",
      address: "123 Main St",
    },
    services: [
      { name: "Real Estate", price: 75, duration: 60 },
      { name: "Business Documents", price: 50, duration: 30 },
    ],
    rating: 4.9,
    review_count: 127,
    hourly_rate: 75,
    is_mobile: true,
    is_online: true,
    availability_hours: "Mon-Fri 9AM-5PM",
  },
  {
    id: "2",
    profiles: {
      full_name: "Michael Chen",
      phone: "555-234-5678",
      email: "michael@example.com",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Specializing in business and legal document notarization.",
      certifications: ["California State Notary", "Business Law Certified"],
      years_experience: 8,
    },
    location: {
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      address: "456 Market St",
    },
    services: [
      { name: "Business Documents", price: 60, duration: 45 },
      { name: "Legal Documents", price: 80, duration: 60 },
    ],
    rating: 5.0,
    review_count: 203,
    hourly_rate: 80,
    is_mobile: true,
    is_online: true,
    availability_hours: "24/7 Available",
  },
  {
    id: "3",
    profiles: {
      full_name: "Emily Davis",
      phone: "555-345-6789",
      email: "emily@example.com",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Mobile notary service specializing in real estate and healthcare.",
      certifications: ["California State Notary", "Healthcare Documents"],
      years_experience: 6,
    },
    location: {
      city: "San Diego",
      state: "CA",
      zip: "92101",
      address: "789 Beach Ave",
    },
    services: [
      { name: "Real Estate", price: 70, duration: 60 },
      { name: "Healthcare", price: 55, duration: 30 },
    ],
    rating: 4.8,
    review_count: 156,
    hourly_rate: 70,
    is_mobile: true,
    is_online: false,
    availability_hours: "Mon-Sat 8AM-6PM",
  },
  {
    id: "4",
    profiles: {
      full_name: "David Wilson",
      phone: "555-456-7890",
      email: "david@example.com",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Online notarization specialist available 24/7.",
      certifications: ["California State Notary", "Remote Online Notary"],
      years_experience: 12,
    },
    location: {
      city: "Sacramento",
      state: "CA",
      zip: "95814",
      address: "321 Capitol Way",
    },
    services: [
      { name: "Online Notarization", price: 65, duration: 30 },
      { name: "Business Documents", price: 55, duration: 45 },
    ],
    rating: 4.9,
    review_count: 189,
    hourly_rate: 65,
    is_mobile: false,
    is_online: true,
    availability_hours: "24/7 Online",
  },
];

// Server Component - renders notary listings on the server
export default function CaliforniaNotariesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Certified Notaries in California
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find qualified, licensed notaries across California for all your document needs
            </p>
            
            {/* Show Supabase notice if not configured */}
            {!isSupabaseConfigured && <SupabaseNotice />}
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {mockNotaries.length} Active Notaries
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
            <NotarySearchFilters />
          </div>

          {/* Notary Listings - Server Rendered */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {mockNotaries.length} Notaries Found
              </h2>
              
              <div className="text-sm text-gray-500">
                Showing all results for California
              </div>
            </div>

            {/* Notary Cards - Server Rendered */}
            <div className="space-y-6">
              {mockNotaries.map((notary) => (
                <Card key={notary.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Notary Info */}
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage 
                          src={notary.profiles.avatar_url} 
                          alt={notary.profiles.full_name} 
                        />
                        <AvatarFallback>
                          {notary.profiles.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {notary.profiles.full_name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{notary.rating}</span>
                            <span className="text-sm text-gray-500">
                              ({notary.review_count} reviews)
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">
                            {notary.location.city}, {notary.location.state}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">
                          {notary.profiles.bio}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {notary.profiles.certifications.map((cert, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {notary.availability_hours}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {formatPhoneNumber(notary.profiles.phone)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Services & Pricing */}
                    <div className="md:w-64">
                      <div className="space-y-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {formatCurrency(notary.hourly_rate)}/hr
                          </div>
                          <div className="text-sm text-gray-500">Starting rate</div>
                        </div>
                        
                        <div className="space-y-2">
                          {notary.services.slice(0, 2).map((service, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">{service.name}</span>
                              <span className="font-medium">
                                {formatCurrency(service.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
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
                          <Button variant="outline" size="sm" className="w-full" asChild>
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
            
            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Notaries
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

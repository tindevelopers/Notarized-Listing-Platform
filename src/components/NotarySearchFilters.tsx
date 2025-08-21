"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

// Client component for interactive search and filtering
export default function NotarySearchFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [availability, setAvailability] = useState("");

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedService("all");
    setSelectedCity("all");
    setPriceRange("all");
    setIsOnline(false);
    setIsMobile(false);
    setAvailability("all");
  };

  const handleSearch = () => {
    // In a real app, this would trigger a new search with the current filters
    console.log("Searching with filters:", {
      searchTerm,
      selectedService,
      selectedCity,
      priceRange,
      isOnline,
      isMobile,
      availability,
    });
  };

  return (
    <Card className="p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search by name or specialty
          </Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              type="text"
              placeholder="Search notaries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Service Type */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            Service Type
          </Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="business">Business Documents</SelectItem>
              <SelectItem value="legal">Legal Documents</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="online">Online Notarization</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            City
          </Label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
              <SelectItem value="san-francisco">San Francisco</SelectItem>
              <SelectItem value="san-diego">San Diego</SelectItem>
              <SelectItem value="sacramento">Sacramento</SelectItem>
              <SelectItem value="fresno">Fresno</SelectItem>
              <SelectItem value="oakland">Oakland</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            Price Range
          </Label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="0-50">$0 - $50</SelectItem>
              <SelectItem value="50-75">$50 - $75</SelectItem>
              <SelectItem value="75-100">$75 - $100</SelectItem>
              <SelectItem value="100+">$100+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Service Options */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Service Options
          </Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="online"
                checked={isOnline}
                onCheckedChange={setIsOnline}
              />
              <Label htmlFor="online" className="text-sm text-gray-600">
                Online Notarization
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile"
                checked={isMobile}
                onCheckedChange={setIsMobile}
              />
              <Label htmlFor="mobile" className="text-sm text-gray-600">
                Mobile Service
              </Label>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            Availability
          </Label>
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Any time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Time</SelectItem>
              <SelectItem value="24-7">24/7 Available</SelectItem>
              <SelectItem value="business-hours">Business Hours</SelectItem>
              <SelectItem value="evenings">Evenings</SelectItem>
              <SelectItem value="weekends">Weekends</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply Filters Button */}
        <Button onClick={handleSearch} className="w-full">
          <Search className="w-4 h-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [distance, setDistance] = useState("25");
  const router = useRouter();

  const handleSearch = () => {
    // Navigate to California notaries page when search is clicked
    router.push("/california-notaries");
  };

  const handleUseLocation = () => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location:", position.coords);
          // TODO: Reverse geocoding to get location details
        },
        (error) => {
          console.error("Location error:", error);
        },
      );
    }
  };

  return (
    <div className="bg-white rounded-[18px] border border-[#EAECF2] p-8 lg:p-10 shadow-xl">
      {/* Search Form Header */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-[#1C1F23] mb-2">Find Your Perfect Notary</h3>
        <p className="text-base text-[#5F687A]">Search by location and preferences to connect with certified professionals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {/* State Selection */}
        <div>
          <label className="block text-sm font-semibold text-[#1C1F23] mb-3">
            State
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F687A] z-10" />
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full pl-12 h-12 border-[#EAECF2] rounded-lg bg-white hover:border-[#005DFF] focus:border-[#005DFF] transition-colors">
                <SelectValue placeholder="Select State" className="text-[#5F687A]" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-[#EAECF2]">
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
                <SelectItem value="fl">Florida</SelectItem>
                <SelectItem value="il">Illinois</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-sm font-semibold text-[#1C1F23] mb-3">
            City
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F687A] z-10" />
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full pl-12 h-12 border-[#EAECF2] rounded-lg bg-white hover:border-[#005DFF] focus:border-[#005DFF] transition-colors">
                <SelectValue placeholder="Select City" className="text-[#5F687A]" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-[#EAECF2]">
                <SelectItem value="los-angeles">Los Angeles</SelectItem>
                <SelectItem value="san-francisco">San Francisco</SelectItem>
                <SelectItem value="san-diego">San Diego</SelectItem>
                <SelectItem value="sacramento">Sacramento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ZIP Code */}
        <div>
          <label className="block text-sm font-semibold text-[#1C1F23] mb-3">
            ZIP Code
          </label>
          <Input
            type="text"
            placeholder="Enter ZIP"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full h-12 border-[#EAECF2] rounded-lg bg-white hover:border-[#005DFF] focus:border-[#005DFF] transition-colors px-4 placeholder:text-[#5F687A]"
          />
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-semibold text-[#1C1F23] mb-3">
            Radius
          </label>
          <Select value={distance} onValueChange={setDistance}>
            <SelectTrigger className="w-full h-12 border-[#EAECF2] rounded-lg bg-white hover:border-[#005DFF] focus:border-[#005DFF] transition-colors">
              <SelectValue className="text-[#1C1F23]" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-[#EAECF2]">
              <SelectItem value="5">5 miles</SelectItem>
              <SelectItem value="10">10 miles</SelectItem>
              <SelectItem value="25">25 miles</SelectItem>
              <SelectItem value="50">50 miles</SelectItem>
              <SelectItem value="100">100 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button
          onClick={handleSearch}
          size="lg"
          className="w-full sm:w-auto bg-[#005DFF] hover:bg-[#0052E6] text-white px-8 py-4 text-base font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden"
        >
          <Search className="w-5 h-5 mr-2" />
          Find Notaries
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleUseLocation}
          className="w-full sm:w-auto border-[#005DFF] text-[#005DFF] hover:bg-[#005DFF] hover:text-white px-6 py-4 text-base font-medium rounded-full transition-all duration-200 overflow-hidden"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Use My Location
        </Button>
      </div>

      {/* Search Tips */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[#5F687A]">
          💡 Tip: Leave fields blank to search all available notaries in your area
        </p>
      </div>
    </div>
  );
}

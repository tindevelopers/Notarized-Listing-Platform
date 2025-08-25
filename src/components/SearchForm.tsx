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
    <div className="bg-white rounded-2xl p-8 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* State Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ca">California</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="tx">Texas</SelectItem>
              <SelectItem value="fl">Florida</SelectItem>
              <SelectItem value="il">Illinois</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
              <SelectItem value="san-francisco">San Francisco</SelectItem>
              <SelectItem value="san-diego">San Diego</SelectItem>
              <SelectItem value="sacramento">Sacramento</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ZIP Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code
          </label>
          <Input
            type="text"
            placeholder="ZIP Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance
          </label>
          <Select value={distance} onValueChange={setDistance}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 miles</SelectItem>
              <SelectItem value="10">10 miles</SelectItem>
              <SelectItem value="25">25 miles</SelectItem>
              <SelectItem value="50">50 miles</SelectItem>
              <SelectItem value="100">100 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button
          onClick={handleSearch}
          className="w-full sm:w-auto bg-[#005DFF] hover:bg-[#0052E6] text-white px-8 py-3 text-lg font-semibold"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>

        <Button
          variant="outline"
          onClick={handleUseLocation}
          className="w-full sm:w-auto"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Use My Location
        </Button>
      </div>
    </div>
  );
}

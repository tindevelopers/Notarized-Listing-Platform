import { Button } from "@/components/ui/button";
import { Search, MapPin, MessageCircleQuestion } from "lucide-react";
import SearchForm from "./SearchForm";

// Server Component - static content rendered on server
export default function DualSearchBanner() {
  return (
    <section className="bg-[#005DFF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Server Rendered */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Your Notary Solution Hub
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Ask questions about notarization or find certified notaries in your
            area
          </p>
        </div>

        {/* Tab Selection - Server Rendered with Client Interactivity */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="flex items-center gap-2 text-lg px-6 py-4"
            >
              <MapPin className="w-5 h-5" />
              Find a Notary
            </Button>
            <Button
              size="lg"
              className="flex items-center gap-2 text-lg px-6 py-4 bg-white text-blue-600 border-2 border-white hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-roboto-mono font-medium"
            >
              <MessageCircleQuestion className="w-5 h-5" />
              Ask Questions
            </Button>
          </div>

          {/* Search Form - Client Component */}
          <SearchForm />

          {/* Popular Searches - Server Rendered */}
          <div className="mt-8 text-center">
            <p className="text-blue-100 mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                size="sm"
                className="bg-white/10 border border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200 font-medium backdrop-blur-sm"
              >
                Real Estate Notary
              </Button>
              <Button
                size="sm"
                className="bg-white/10 border border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200 font-medium backdrop-blur-sm"
              >
                Mobile Notary
              </Button>
              <Button
                size="sm"
                className="bg-white/10 border border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200 font-medium backdrop-blur-sm"
              >
                Online Notarization
              </Button>
            </div>
          </div>

          {/* Features - Server Rendered */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                ✓
              </div>
              <h3 className="font-semibold mb-2">
                Licensed & Insured Notaries
              </h3>
            </div>
            <div className="text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                ✓
              </div>
              <h3 className="font-semibold mb-2">Available 24/7</h3>
            </div>
            <div className="text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                ✓
              </div>
              <h3 className="font-semibold mb-2">Instant AI Assistance</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

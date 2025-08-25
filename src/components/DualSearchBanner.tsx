"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, MessageCircleQuestion } from "lucide-react";
import SearchForm from "./SearchForm";
import ChatModal from "./chat/ChatModal";

export default function DualSearchBanner() {
  const [isChatOpen, setIsChatOpen] = useState(false);
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
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
            <Button
              size="lg"
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-3 text-lg px-8 py-4 bg-white text-[#005DFF] border-2 border-white hover:bg-blue-50 hover:text-[#0052E6] transition-all duration-200 font-semibold rounded-lg shadow-lg hover:shadow-xl"
            >
              <MessageCircleQuestion className="w-5 h-5" />
              Ask Questions About Notarization
            </Button>
          </div>

          {/* Search Form - Client Component */}
          <SearchForm />

          {/* Popular Searches - Server Rendered */}
          <div className="mt-10 text-center">
            <p className="text-blue-100 mb-6 text-lg font-medium">
              Popular searches:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                size="sm"
                className="bg-white/15 border border-white/30 text-white hover:bg-white hover:text-[#005DFF] transition-all duration-200 font-medium backdrop-blur-sm rounded-full px-6 py-2"
              >
                Real Estate Notary
              </Button>
              <Button
                size="sm"
                className="bg-white/15 border border-white/30 text-white hover:bg-white hover:text-[#005DFF] transition-all duration-200 font-medium backdrop-blur-sm rounded-full px-6 py-2"
              >
                Mobile Notary
              </Button>
              <Button
                size="sm"
                className="bg-white/15 border border-white/30 text-white hover:bg-white hover:text-[#005DFF] transition-all duration-200 font-medium backdrop-blur-sm rounded-full px-6 py-2"
              >
                Online Notarization
              </Button>
            </div>
          </div>

          {/* Features - Server Rendered */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-xl font-bold">✓</span>
              </div>
              <h3 className="font-semibold mb-2 text-lg">
                Licensed & Insured Notaries
              </h3>
              <p className="text-blue-100 text-sm">
                Verified professionals you can trust
              </p>
            </div>
            <div className="text-white">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-xl font-bold">⏰</span>
              </div>
              <h3 className="font-semibold mb-2 text-lg">Available 24/7</h3>
              <p className="text-blue-100 text-sm">
                Round-the-clock service when you need it
              </p>
            </div>
            <div className="text-white">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-xl font-bold">🤖</span>
              </div>
              <h3 className="font-semibold mb-2 text-lg">
                Instant AI Assistance
              </h3>
              <p className="text-blue-100 text-sm">
                Get answers to your questions immediately
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  );
}

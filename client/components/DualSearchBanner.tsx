import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DualSearchBanner() {
  const [activeTab, setActiveTab] = useState("find-notary");

  return (
    <section className="bg-[#005DFF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center text-white mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Your Notary Solution Hub
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Ask questions about notarization or find certified notaries in your area
          </p>
        </div>

        {/* Dual Search Interface */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 border-none h-14">
              <TabsTrigger 
                value="find-notary" 
                className={cn(
                  "text-white data-[state=active]:text-gray-900 data-[state=active]:bg-white",
                  "flex items-center gap-2 text-lg font-medium h-12"
                )}
              >
                <MapPin className="w-5 h-5" />
                Find a Notary
              </TabsTrigger>
              <TabsTrigger 
                value="ask-questions" 
                className={cn(
                  "text-white data-[state=active]:text-gray-900 data-[state=active]:bg-white",
                  "flex items-center gap-2 text-lg font-medium h-12"
                )}
              >
                <MessageCircleQuestion className="w-5 h-5" />
                Ask Questions
              </TabsTrigger>
            </TabsList>

            {/* Find Notary Tab Content */}
            <TabsContent value="find-notary" className="mt-0">
              <div className="bg-white rounded-3xl p-6 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                  {/* Country */}
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <Select defaultValue="usa">
                      <SelectTrigger className="h-12 rounded-full border-gray-200">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* State */}
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 rounded-full border-gray-200">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <SelectValue placeholder="State" />
                        </div>
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

                  {/* County */}
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      County
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 rounded-full border-gray-200">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <SelectValue placeholder="County" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="los-angeles">Los Angeles</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="san-diego">San Diego</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City */}
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 rounded-full border-gray-200">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <SelectValue placeholder="City" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="los-angeles">Los Angeles</SelectItem>
                        <SelectItem value="san-francisco">San Francisco</SelectItem>
                        <SelectItem value="san-diego">San Diego</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* ZIP Code */}
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input 
                        placeholder="ZIP Code" 
                        className="h-12 rounded-full border-gray-200 pl-10"
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="lg:col-span-1">
                    <Button 
                      className="w-full h-12 bg-[#FFC700] hover:bg-[#FFB800] text-gray-700 font-medium rounded-full"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <span className="text-sm text-gray-600">Popular searches:</span>
                  <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                    Real Estate Notary
                  </button>
                  <span className="text-gray-300">•</span>
                  <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                    Mobile Notary
                  </button>
                  <span className="text-gray-300">•</span>
                  <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                    Online Notarization
                  </button>
                </div>
              </div>
            </TabsContent>

            {/* Ask Questions Tab Content */}
            <TabsContent value="ask-questions" className="mt-0">
              <div className="bg-white rounded-3xl p-6 shadow-2xl">
                <div className="max-w-3xl mx-auto">
                  {/* Search Input */}
                  <div className="relative mb-6">
                    <MessageCircleQuestion className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input 
                      placeholder="Ask anything about notarization... (e.g., 'What documents need to be notarized for a home sale?')"
                      className="h-16 rounded-full border-gray-200 pl-12 pr-32 text-lg"
                    />
                    <Button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 bg-[#FFC700] hover:bg-[#FFB800] text-gray-700 font-medium rounded-full px-6"
                    >
                      Ask Question
                    </Button>
                  </div>

                  {/* Popular Questions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-center">
                      Popular Questions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "What documents need notarization?",
                        "How much does notarization cost?",
                        "Can I get documents notarized online?",
                        "What ID do I need for notarization?",
                        "How does mobile notary work?",
                        "What is an apostille?"
                      ].map((question, index) => (
                        <button
                          key={index}
                          className="text-left p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-sm text-gray-700">{question}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AI Assistant Note */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageCircleQuestion className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">AI Notary Assistant</h4>
                        <p className="text-sm text-blue-700">
                          Get instant answers to your notarization questions from our AI assistant, backed by legal expertise and up-to-date regulations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">✓</span>
              </div>
              <span className="text-blue-100">Licensed & Insured Notaries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">✓</span>
              </div>
              <span className="text-blue-100">Available 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">✓</span>
              </div>
              <span className="text-blue-100">Instant AI Assistance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

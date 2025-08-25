import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import DualSearchBanner from "@/components/DualSearchBanner";
import { Star, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Search */}
      <DualSearchBanner />

      {/* Our Notaries Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header with Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C1F23]">
              Our Notaries
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-base font-medium text-black">
                Filter by:
              </span>
              <div className="relative">
                <select className="appearance-none bg-white border border-[#EAECF2] rounded-full px-6 py-4 pr-12 text-sm text-[#5F687A] focus:outline-none focus:ring-2 focus:ring-[#005DFF] min-w-[226px]">
                  <option value="">Category</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.75 6.44287L9 11.4012L14.25 6.44287"
                      stroke="#005DFF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 5.92188H2.5C1.94772 5.92188 1.5 6.36959 1.5 6.92188V14.9219C1.5 15.4742 1.94772 15.9219 2.5 15.9219H15.5C16.0523 15.9219 16.5 15.4742 16.5 14.9219V6.92188C16.5 6.36959 16.0523 5.92188 15.5 5.92188Z"
                      stroke="#5F687A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5.92188C12 5.12623 11.6839 4.36316 11.1213 3.80055C10.5587 3.23795 9.79565 2.92188 9 2.92188C8.20435 2.92188 7.44129 3.23795 6.87868 3.80055C6.31607 4.36316 6 5.12623 6 5.92188"
                      stroke="#5F687A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Notaries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                name: "Andy Smith",
                description:
                  "At donec morbi in urna nunc quis ac ipsum sem purus orci.",
                category: "Marketing",
                categoryColor: "#6C38FF",
                price: "$120/hr",
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/4ac93c89ff6980e3834fecf2040e4a02a58ba61d?width=330",
              },
              {
                name: "John Carter",
                description:
                  "Lorem ipsum dolor sit amet id consectetur adipiscing elit.",
                category: "Design",
                categoryColor: "#4BA9FF",
                price: "$80/hr",
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/a2c900ca27f2d7045807d4c11987aab4da9e662c?width=301",
              },
              {
                name: "Kathie Corl",
                description:
                  "Lorem ipsum dolor sit amet id consectetur adipiscing elit.",
                category: "Development",
                categoryColor: "#005DFF",
                price: "$240/hr",
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/9503a637df9aeaa8fc9a4bab07c2f51e18786f2e?width=342",
              },
              {
                name: "Lilly Woods",
                description:
                  "Enim etiam nisi id convallis id non luctus enim, et venenatis.",
                category: "Design",
                categoryColor: "#4BA9FF",
                price: "$160/hr",
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/e425efddc3e88381ae17de7b13b8ba5a64f8f4fc?width=342",
              },
              {
                name: "Matt Cannon",
                description:
                  "Amet tincidunt non congue vel massa molestie magna eget.",
                category: "Development",
                categoryColor: "#005DFF",
                price: "$280/hr",
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/e51c99e2304ada58e0f7516d39a019c78158ca83?width=340",
              },
              {
                name: "Patrick Meyer",
                description:
                  "Donec tincidunt magna lorem elementum non nullam lectus.",
                category: "Marketing",
                categoryColor: "#6C38FF",
                price: "$140/hr",
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/600b8b95cefeab2fd8ca5975947b32bb87b31067?width=342",
              },
              {
                name: "Sandy Hung",
                description:
                  "Ut nibh pulvinar nisi et sit ac venenatis at cursus semper.",
                category: "Design",
                categoryColor: "#4BA9FF",
                price: "$210/hr",
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/f250c1247811d56a2207e6f0a2eabe020a1db5c6?width=870",
              },
              {
                name: "Sophie Moore",
                description:
                  "Vulputate faucibus arcu nunc vestibulum mauris etiam ut.",
                category: "Marketing",
                categoryColor: "#6C38FF",
                price: "$120/hr",
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/62525cbaaf1cb812c41d0500c4e4341425b61d8d?width=365",
              },
            ].map((notary, index) => (
              <div
                key={index}
                className="bg-white rounded-[18px] border border-[#EAECF2] p-6 hover:shadow-lg transition-shadow"
                style={{ boxShadow: "0 2px 8px 0 rgba(42, 42, 43, 0.06)" }}
              >
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-[143px] h-[140px] rounded-full bg-[#EFF3FA] overflow-hidden">
                    <img
                      src={notary.image}
                      alt={notary.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-[#1C1F23] text-center mb-4">
                  {notary.name}
                </h3>

                {/* Description */}
                <p className="text-base text-[#5F687A] text-center mb-6 leading-relaxed min-h-[52px]">
                  {notary.description}
                </p>

                {/* Badges */}
                <div className="flex justify-center items-center gap-3 mb-6">
                  <span
                    className="px-3 py-2 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: notary.categoryColor }}
                  >
                    {notary.category}
                  </span>
                  <span className="px-3 py-2 rounded-full border border-[#B1B9CA] text-[#1C1F23] text-sm">
                    {notary.price}
                  </span>
                </div>

                {/* View Profile Button */}
                <div className="flex justify-center">
                  <Button
                    asChild
                    className="w-full bg-[#005DFF] hover:bg-[#0052E6] text-white font-medium rounded-full overflow-hidden"
                  >
                    <Link href={`/notary/${index + 1}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Browse All Button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-[#101B44] text-[#101B44] hover:bg-[#101B44] hover:text-white rounded-full px-7 py-5 text-base font-normal"
            >
              <Link href="/california-notaries">Browse all Notaries</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Notary Talent Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EFF3FA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Image/Video */}
            <div className="relative">
              <div className="relative w-full aspect-[680/489] rounded-[18px] bg-[#DFE5EE] overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/49729f35320c45ad4da15dcbdb46ffe94f0f621b?width=1382"
                  alt="Professional notary at work"
                  className="w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="group">
                    <div className="w-[102px] h-[100px] bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-200" style={{ filter: 'drop-shadow(0px 2px 12px rgba(30, 30, 30, 0.08))' }}>
                      <svg width="24" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5576 10.3906C22.584 11.54 22.584 14.4599 20.5576 15.6094L5.40136 24.2067C3.40151 25.3412 0.921265 23.8966 0.921265 21.5973L0.921265 4.40268C0.921265 2.10343 3.40151 0.658798 5.40136 1.79322L20.5576 10.3906Z" fill="#4BA9FF"/>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              {/* Main Headline */}
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1F23] leading-tight mb-8">
                  Why Notarized?
                </h2>
              </div>

              {/* Features List */}
              <div className="space-y-8">
                {/* Feature 1: Budget */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 relative">
                    <svg width="50" height="49" viewBox="0 0 50 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.778809" y="6.99756" width="34.781" height="41.3701" rx="4" stroke="#1C1F23" strokeWidth="1.2" strokeLinecap="round"/>
                      <rect x="5.46094" y="0.367676" width="34.971" height="42.4647" rx="4" fill="white"/>
                      <path d="M34.6839 19.96H12.3691" stroke="#1C1F23" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M34.6839 24.96H12.3691" stroke="#1C1F23" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M26.0284 29.96H12.3691" stroke="#1C1F23" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M15.75 4.93018L15.75 6.1416" stroke="#1C1F23" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.75 14.2185L15.75 15.4299" stroke="#1C1F23" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5767 8.16083C18.5767 7.89566 18.5245 7.63309 18.423 7.38811C18.3216 7.14312 18.1728 6.92052 17.9853 6.73302C17.7978 6.54552 17.5752 6.39678 17.3302 6.29531C17.0852 6.19383 16.8227 6.1416 16.5575 6.1416H14.7402C14.2047 6.1416 13.6911 6.35434 13.3124 6.73302C12.9337 7.1117 12.721 7.6253 12.721 8.16083C12.721 8.69637 12.9337 9.20997 13.3124 9.58864C13.6911 9.96732 14.2047 10.1801 14.7402 10.1801H16.9614C17.4969 10.1801 18.0105 10.3928 18.3892 10.7715C18.7678 11.1502 18.9806 11.6638 18.9806 12.1993C18.9806 12.7348 18.7678 13.2484 18.3892 13.6271C18.0105 14.0058 17.4969 14.2185 16.9614 14.2185H14.5383C14.0027 14.2185 13.4891 14.0058 13.1105 13.6271C12.7318 13.2484 12.519 12.7348 12.519 12.1993" stroke="#1C1F23" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="40.3645" cy="36.1445" r="9.39427" fill="#005DFF"/>
                      <path d="M36.8118 39.697L43.917 32.5918" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M43.917 39.2905V32.5917H37.2182" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1C1F23] mb-2">
                      Informative Guides
                    </h3>
                    <p className="text-base text-[#5F687A] leading-relaxed">
                      Dive deep into the world of notarization. Learn its importance, how it works, and when you might require it.
                    </p>
                  </div>
                </div>

                {/* Feature 2: Quality */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 relative">
                    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 23.3894C1 21.1803 2.79086 19.3894 5 19.3894H25.9783C28.1875 19.3894 29.9783 21.1803 29.9783 23.3894V44.3677C29.9783 46.5769 28.1875 48.3677 25.9783 48.3677H5C2.79086 48.3677 1 46.5769 1 44.3677V23.3894Z" stroke="#1C1F23" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="5 5"/>
                      <rect x="9.47021" y="0.367676" width="39.5293" height="39.5293" rx="4" fill="white"/>
                      <path d="M29.2349 30.1323C34.7577 30.1323 39.2349 25.6552 39.2349 20.1323C39.2349 14.6095 34.7577 10.1323 29.2349 10.1323C23.712 10.1323 19.2349 14.6095 19.2349 20.1323C19.2349 25.6552 23.712 30.1323 29.2349 30.1323Z" fill="#6C38FF"/>
                      <path d="M29.2349 14.2991V20.1324H35.0682" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1C1F23] mb-2">
                      Nationwide Listings
                    </h3>
                    <p className="text-base text-[#5F687A] leading-relaxed">
                      Find trusted notaries across all 50 states with our comprehensive directory.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#005DFF] hover:bg-[#0052E6] text-white rounded-full px-8 py-4 text-base font-bold transition-all duration-200"
                >
                  <Link href="/california-notaries">
                    Find A Notary
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C1F23] mb-4">
              How it works
            </h2>
            <p className="text-base text-[#5F687A] leading-relaxed max-w-lg mx-auto">
              Navigating the world of notarization can be daunting, but we've streamlined the process. Whether you're an individual or a business, find your notary match in just three easy steps:
            </p>
          </div>

          {/* Steps Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Step 1: Search for Notaries */}
            <div
              className="bg-white rounded-[18px] border border-[#DFE5EE] p-6 lg:p-8 text-center"
              style={{ boxShadow: "0 2px 8px 0 rgba(42, 42, 43, 0.06)" }}
            >
              <div className="flex justify-center mb-8">
                <div className="w-[140px] h-[140px] bg-[#EFF3FA] rounded-full flex items-center justify-center relative">
                  {/* Dashed Rectangle */}
                  <div className="w-[55px] h-[55px] border-[1.5px] border-dashed border-[#1C1F23] bg-[#EFF3FA] rounded-lg absolute"></div>
                  {/* User Icon */}
                  <svg
                    width="55"
                    height="55"
                    viewBox="0 0 55 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute"
                  >
                    <rect
                      x="0.375"
                      y="0.116211"
                      width="54.5"
                      height="54.5"
                      rx="7"
                      fill="white"
                    />
                    <circle
                      cx="27.6248"
                      cy="20.8416"
                      r="7.28596"
                      fill="#4BA9FF"
                    />
                    <path
                      d="M39.8441 41.1767C40.5147 41.1767 41.0641 40.6319 41.0036 39.964C40.8813 38.6156 40.5557 37.291 40.0358 36.0359C39.3607 34.4061 38.3712 32.9252 37.1238 31.6777C35.8764 30.4303 34.3955 29.4408 32.7657 28.7657C31.1359 28.0906 29.389 27.7432 27.6249 27.7432C25.8608 27.7432 24.114 28.0906 22.4841 28.7657C20.8543 29.4408 19.3734 30.4303 18.126 31.6777C16.8786 32.9252 15.8891 34.4061 15.214 36.0359C14.6941 37.291 14.3685 38.6156 14.2463 39.964C14.1857 40.6319 14.7351 41.1767 15.4057 41.1767L27.6249 41.1767H39.8441Z"
                      fill="#4BA9FF"
                    />
                  </svg>
                  {/* Search Icon */}
                  <svg
                    width="41"
                    height="41"
                    viewBox="0 0 41 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-2 right-2"
                  >
                    <path
                      d="M18.7733 33.1052C26.9553 33.1052 33.5881 26.4724 33.5881 18.2904C33.5881 10.1084 26.9553 3.47559 18.7733 3.47559C10.5913 3.47559 3.9585 10.1084 3.9585 18.2904C3.9585 26.4724 10.5913 33.1052 18.7733 33.1052Z"
                      stroke="#1C1F23"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M37.2914 36.809L29.2358 28.7534"
                      stroke="#1C1F23"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1C1F23] mb-4">
                1. Search for Notaries
              </h3>
              <p className="text-base text-[#5F687A] leading-relaxed">
                Our directory is designed to provide you with a comprehensive view of each notary's expertise and credentials.
              </p>
            </div>

            {/* Step 2: Review their profile */}
            <div
              className="bg-white rounded-[18px] border border-[#DFE5EE] p-6 lg:p-8 text-center"
              style={{ boxShadow: "0 2px 8px 0 rgba(42, 42, 43, 0.06)" }}
            >
              <div className="flex justify-center mb-8">
                <div className="w-[140px] h-[140px] bg-[#EFF3FA] rounded-full flex items-center justify-center relative">
                  {/* Document with Arrow */}
                  <svg
                    width="80"
                    height="79"
                    viewBox="0 0 80 79"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="9.44287"
                      y="9.50879"
                      width="56.125"
                      height="68.6923"
                      rx="7"
                      fill="white"
                    />
                    <path
                      d="M56.0091 30.3418H19.002"
                      stroke="#1C1F23"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M56.0091 38.3418H19.002"
                      stroke="#1C1F23"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M41.6546 46.3418H19.002"
                      stroke="#1C1F23"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M70.5615 51.0713L79.0224 59.1796L70.5615 67.288"
                      stroke="#1C1F23"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M79.0224 59.1797L41.6548 59.1797"
                      stroke="#1C1F23"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12.9775" cy="12.1582" r="12" fill="#005DFF" />
                    <path
                      d="M12.9771 6.84766V17.0582"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.87158 11.9531H18.0821"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1C1F23] mb-4">
                2. Review their profile
              </h3>
              <p className="text-base text-[#5F687A] leading-relaxed">
                Go through detailed profiles of notaries, read reviews from previous clients, and select the one that aligns best with your needs.
              </p>
            </div>

            {/* Step 3: Book an appointment */}
            <div
              className="bg-white rounded-[18px] border border-[#DFE5EE] p-6 lg:p-8 text-center"
              style={{ boxShadow: "0 2px 8px 0 rgba(42, 42, 43, 0.06)" }}
            >
              <div className="flex justify-center mb-8">
                <div className="w-[140px] h-[140px] bg-[#EFF3FA] rounded-full flex items-center justify-center relative">
                  {/* Booking/Calendar Icon */}
                  <div className="relative">
                    {/* Dashed Rectangle */}
                    <div className="w-[55px] h-[55px] border-[1.5px] border-dashed border-[#1C1F23] bg-[#EAECF2] rounded-lg"></div>
                    {/* White Rectangle */}
                    <div className="w-[35px] h-[35px] bg-white rounded-md absolute -top-4 -left-4"></div>
                    {/* Purple Rectangle with Check */}
                    <div className="w-[35px] h-[35px] bg-[#6C38FF] rounded-md absolute -bottom-4 -right-4 flex items-center justify-center">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.18994 9.36662L5.93858 13.1153L15.3102 3.74365"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* Purple Check on White */}
                    <div className="absolute -top-3 -left-3">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.68994 9.86662L5.43858 13.6153L14.8102 4.24365"
                          stroke="#6C38FF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1C1F23] mb-4">
                3. Book an appointment
              </h3>
              <p className="text-base text-[#5F687A] leading-relaxed">
                Once you've made your choice, get in touch directly through our platform. Set up an appointment or ask any questions you might have.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101B44]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 max-w-md">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Here's what our great customers say.
              </h2>
              <p className="text-base text-white leading-relaxed mb-8">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed
                accumsan ultrices aliquam nibh lectus non feugiat placerat ut
                facilisis velit neque.
              </p>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-4">
                {/* Left Arrow - Outlined */}
                <button
                  className="w-[58px] h-[58px] rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#101B44] transition-colors group"
                  aria-label="Previous testimonial"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M11.4785 3.7749L3.29968 11.9537L11.4785 20.1326"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.2998 11.9536L20.6997 11.9536"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Right Arrow - Filled */}
                <button
                  className="w-[58px] h-[58px] rounded-full bg-[#005DFF] hover:bg-[#0052E6] flex items-center justify-center transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0542 3.7749L21.233 11.9537L13.0542 20.1326"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.2329 11.9536L3.83301 11.9536"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Content - Testimonial Carousel Area */}
            <div className="flex-1 min-h-[200px] flex items-center justify-center">
              {/* Placeholder for testimonial content - can be expanded later */}
              <div className="text-center text-[#5F687A]">
                <p className="text-lg italic">Testimonial content area</p>
                <p className="text-sm mt-2">
                  Ready for testimonial carousel implementation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C1F23] max-w-md">
              Browse articles & news
            </h2>
            <p className="text-base text-[#5F687A] leading-relaxed max-w-md lg:text-right">
              Dive into the world of notarization with our curated collection of articles. At Notarized, we don't just connect you with the best notaries; we also ensure you're well-informed.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Article 1 */}
            <article className="group">
              <div className="relative mb-6">
                <div className="w-full h-[273px] rounded-[18px] bg-[#F9FAFC] overflow-hidden">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/4d8ab46e1a621708164fea6a050dbf3639851652?width=776"
                    alt="How to stay organized and productive as a Notary"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center px-3 py-2 rounded-full bg-[#4BA9FF] text-white text-sm font-medium">
                    Articles
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-[22px] font-bold text-[#1C1F23] leading-tight">
                  How to stay organized and productive as a Notary
                </h3>
                <p className="text-base text-[#5F687A] leading-relaxed">
                  Porta mauris at sem placerat vulputate porttitor arcu
                  suspendisse dui mi duis non tristique.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#1C1F23]">
                    Jan 30, 2024
                  </span>
                  <Link
                    href="/blog/stay-organized-productive-notary"
                    className="inline-flex items-center gap-2 text-base font-bold text-[#005DFF] hover:text-[#0052E6] transition-colors"
                  >
                    Read more
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.66781 13.8213L13.3345 3.15462"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.3345 13.2109V3.15437H3.2779"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>

            {/* Article 2 */}
            <article className="group">
              <div className="relative mb-6">
                <div className="w-full h-[273px] rounded-[18px] bg-[#F9FAFC] overflow-hidden">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/a5db12b1cbbb6de511dc37dfcd8ad7db604d47db?width=776"
                    alt="Essential tips on how much to charge for your freelance work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center px-3 py-2 rounded-full bg-[#6C38FF] text-white text-sm font-medium">
                    Resources
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-[22px] font-bold text-[#1C1F23] leading-tight">
                  Essential tips on how much to charge for your freelance work
                </h3>
                <p className="text-base text-[#5F687A] leading-relaxed">
                  Aliquam senectus turpis quam odio proin nis nec massa nisl ac
                  etiam sed feugiat nullam neque.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#1C1F23]">
                    Jan 27, 2024
                  </span>
                  <Link
                    href="/blog/freelance-pricing-tips"
                    className="inline-flex items-center gap-2 text-base font-bold text-[#005DFF] hover:text-[#0052E6] transition-colors"
                  >
                    Read more
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.66781 13.8213L13.3345 3.15462"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.3345 13.2109V3.15437H3.2779"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>

            {/* Article 3 */}
            <article className="group">
              <div className="relative mb-6">
                <div className="w-full h-[273px] rounded-[18px] bg-[#F9FAFC] overflow-hidden">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/36c030a610162c3a32906a742b971cc2c4671e5d?width=776"
                    alt="7 tips to help you succeed as Notary professional"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center px-3 py-2 rounded-full bg-[#005DFF] text-white text-sm font-medium">
                    Tips
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-[22px] font-bold text-[#1C1F23] leading-tight">
                  7 tips to help you succeed as Notary professional
                </h3>
                <p className="text-base text-[#5F687A] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit amet
                  nisl fringilla lectus lorem ipsum.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#1C1F23]">
                    Jan 24, 2024
                  </span>
                  <Link
                    href="/blog/succeed-notary-professional"
                    className="inline-flex items-center gap-2 text-base font-bold text-[#005DFF] hover:text-[#0052E6] transition-colors"
                  >
                    Read more
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.66781 13.8213L13.3345 3.15462"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.3345 13.2109V3.15437H3.2779"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* Browse All Articles Button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-[#101B44] text-[#101B44] hover:bg-[#101B44] hover:text-white rounded-full px-7 py-5 text-base font-normal"
            >
              <Link href="/blog">Browse all articles</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

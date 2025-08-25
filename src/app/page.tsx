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
              <span className="text-base font-medium text-black">Filter by:</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-[#EAECF2] rounded-full px-6 py-4 pr-12 text-sm text-[#5F687A] focus:outline-none focus:ring-2 focus:ring-[#005DFF] min-w-[226px]">
                  <option value="">Category</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 6.44287L9 11.4012L14.25 6.44287" stroke="#005DFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 5.92188H2.5C1.94772 5.92188 1.5 6.36959 1.5 6.92188V14.9219C1.5 15.4742 1.94772 15.9219 2.5 15.9219H15.5C16.0523 15.9219 16.5 15.4742 16.5 14.9219V6.92188C16.5 6.36959 16.0523 5.92188 15.5 5.92188Z" stroke="#5F687A" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5.92188C12 5.12623 11.6839 4.36316 11.1213 3.80055C10.5587 3.23795 9.79565 2.92188 9 2.92188C8.20435 2.92188 7.44129 3.23795 6.87868 3.80055C6.31607 4.36316 6 5.12623 6 5.92188" stroke="#5F687A" strokeLinecap="round" strokeLinejoin="round"/>
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
                description: "At donec morbi in urna nunc quis ac ipsum sem purus orci.",
                category: "Marketing",
                categoryColor: "#6C38FF",
                price: "$120/hr",
                image: "https://api.builder.io/api/v1/image/assets/TEMP/4ac93c89ff6980e3834fecf2040e4a02a58ba61d?width=330"
              },
              {
                name: "John Carter",
                description: "Lorem ipsum dolor sit amet id consectetur adipiscing elit.",
                category: "Design",
                categoryColor: "#4BA9FF",
                price: "$80/hr",
                image: "https://api.builder.io/api/v1/image/assets/TEMP/a2c900ca27f2d7045807d4c11987aab4da9e662c?width=301"
              },
              {
                name: "Kathie Corl",
                description: "Lorem ipsum dolor sit amet id consectetur adipiscing elit.",
                category: "Development",
                categoryColor: "#005DFF",
                price: "$240/hr",
                image: "https://api.builder.io/api/v1/image/assets/TEMP/9503a637df9aeaa8fc9a4bab07c2f51e18786f2e?width=342"
              },
              {
                name: "Lilly Woods",
                description: "Enim etiam nisi id convallis id non luctus enim, et venenatis.",
                category: "Design",
                categoryColor: "#4BA9FF",
                price: "$160/hr",
                image: "https://api.builder.io/api/v1/image/assets/TEMP/e425efddc3e88381ae17de7b13b8ba5a64f8f4fc?width=342"
              },
              {
                name: "Matt Cannon",
                description: "Amet tincidunt non congue vel massa molestie magna eget.",
                category: "Development",
                categoryColor: "#005DFF",
                price: "$280/hr",
                image: "https://api.builder.io/api/v1/image/assets/TEMP/e51c99e2304ada58e0f7516d39a019c78158ca83?width=340"
              },
              {
                name: "Patrick Meyer",
                description: "Donec tincidunt magna lorem elementum non nullam lectus.",
                category: "Marketing",
                categoryColor: "#6C38FF",
                price: "$140/hr",
                image: "https://api.builder.io/api/v1/image/assets/TEMP/600b8b95cefeab2fd8ca5975947b32bb87b31067?width=342"
              },
              {
                name: "Sandy Hung",
                description: "Ut nibh pulvinar nisi et sit ac venenatis at cursus semper.",
                category: "Design",
                categoryColor: "#4BA9FF",
                price: "$210/hr",
                image: "https://api.builder.io/api/v1/image/assets/TEMP/f250c1247811d56a2207e6f0a2eabe020a1db5c6?width=870"
              },
              {
                name: "Sophie Moore",
                description: "Vulputate faucibus arcu nunc vestibulum mauris etiam ut.",
                category: "Marketing",
                categoryColor: "#6C38FF",
                price: "$120/hr",
                image: "https://api.builder.io/api/v1/image/assets/TEMP/62525cbaaf1cb812c41d0500c4e4341425b61d8d?width=365"
              },
            ].map((notary, index) => (
              <div
                key={index}
                className="bg-white rounded-[18px] border border-[#EAECF2] p-6 hover:shadow-lg transition-shadow"
                style={{ boxShadow: '0 2px 8px 0 rgba(42, 42, 43, 0.06)' }}
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
                <div className="flex justify-center items-center gap-3 mb-4">
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
              <Link href="/california-notaries">
                Browse all Notaries
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Get your documents notarized in three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Find a Notary",
                description:
                  "Search for certified notaries in your area or book an online session",
              },
              {
                step: "2",
                title: "Schedule Appointment",
                description:
                  "Choose a convenient time and location for your notarization",
              },
              {
                step: "3",
                title: "Get Notarized",
                description:
                  "Meet with your notary and get your documents officially notarized",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

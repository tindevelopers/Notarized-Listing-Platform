import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";

export const dynamic = "force-dynamic";

// Mock blog data - replace with API calls
const blogPosts = [
  {
    id: 1,
    title: "How to stay organized and productive as a Notary",
    excerpt:
      "Porta mauris at sem placerat vulputate porttitor arcu suspendisse dui mi duis non tristique.",
    category: "Articles",
    categoryColor: "bg-[#4BA9FF]",
    date: "Jan 30, 2024",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/226845328f8dbd5882fd4d1be833f9a516770f0f?width=776",
    featured: true,
  },
  {
    id: 2,
    title: "Essential tips on how much to charge for your freelance work",
    excerpt:
      "Aliquam senectus turpis quam odio proin nis nec massa nisl ac etiam sed feugiat nullam neque.",
    category: "Resources",
    categoryColor: "bg-[#6C38FF]",
    date: "Jan 27, 2024",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/4f52c8653982d42009da5aafa5db05db111d32ee?width=776",
  },
  {
    id: 3,
    title: "7 tips to help you succeed as a Notary professional",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit amet nisl fringilla lectus lorem ipsum.",
    category: "Tips",
    categoryColor: "bg-[#005DFF]",
    date: "Jan 24, 2024",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/19e8811565e13295a267398a8969d99af3dec386?width=776",
  },
  {
    id: 4,
    title: "How to get your first Notary client with no experience",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit amet nisl fringilla lectus lorem ipsum.",
    category: "Tips",
    categoryColor: "bg-[#005DFF]",
    date: "Jan 18, 2024",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/a9e8400e829e82ae34c1591a8d067ff521e6c4a8?width=776",
  },
  {
    id: 5,
    title: "15 must-have tools all Notarys should check out",
    excerpt:
      "Porta mauris at sem placerat vulputate porttitor arcu suspendisse dui mi duis non tristique.",
    category: "Articles",
    categoryColor: "bg-[#4BA9FF]",
    date: "Jan 15, 2024",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/3a58c65ce6aa18d2c6b4107ae22372538d5fe1f2?width=776",
  },
  {
    id: 6,
    title: "When and how to raise your freelance rates",
    excerpt:
      "Aliquam senectus turpis quam odio proin nis nec massa nisl ac etiam sed feugiat nullam neque.",
    category: "Resources",
    categoryColor: "bg-[#6C38FF]",
    date: "Jan 21, 2024",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/8311bac88b6906d14301c7c240ed0112fad2a775?width=776",
  },
];

const categories = [
  { name: "All", active: true },
  { name: "Tips", active: false },
  { name: "Articles", active: false },
  { name: "Resources", active: false },
];

function BlogContent() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1C1F23] mb-4">
              News & articles
            </h1>
            <p className="text-lg text-[#5F687A] max-w-md mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit non lorem
              morbi suscipit interdum cras vulputate amet arcu.
            </p>
          </div>

          {/* Featured Article */}
          {featuredPost && (
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <Badge
                    className={`${featuredPost.categoryColor} text-white border-0 px-4 py-2 text-sm font-medium`}
                  >
                    {featuredPost.category}
                  </Badge>
                  <span className="text-[#1C1F23] font-bold text-sm">
                    {featuredPost.date}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1C1F23] mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-[#5F687A] text-lg mb-6 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing id eliglarim
                  vel tempor elit risus sollicitudin sit lorem.
                </p>
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 text-[#005DFF] font-bold text-lg hover:gap-3 transition-all"
                >
                  Read article
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-[#1C1F23]">
              Latest articles
            </h2>
            <div className="flex items-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.active ? "default" : "outline"}
                  className={`px-6 py-3 rounded-full font-medium ${
                    category.active
                      ? "bg-[#005DFF] text-white border-0"
                      : "border-[#B1B9CA] text-[#1C1F23] hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {regularPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    className={`${post.categoryColor} text-white border-0 absolute top-6 left-6 px-3 py-1.5 text-sm font-medium`}
                  >
                    {post.category}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <span className="text-[#1C1F23] font-bold text-sm">
                    {post.date}
                  </span>
                  <h3 className="text-xl font-bold text-[#1C1F23] group-hover:text-[#005DFF] transition-colors leading-tight">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-[#5F687A] leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-[#005DFF] font-bold hover:gap-3 transition-all"
                  >
                    Read more
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-5">
            <Button
              variant="outline"
              className="px-7 py-3 rounded-full border-[#101B44] text-[#101B44] hover:bg-[#101B44] hover:text-white"
            >
              Previous
            </Button>
            <Button className="px-7 py-3 rounded-full bg-[#005DFF] text-white hover:bg-[#004BCC]">
              Next
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#101B44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/bfd4e23467f46983b9273dfe2e58ea1caedcbe06?width=1988"
                alt="Subscribe to newsletter"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Subscribe to our weekly email newsletter
              </h2>
              <p className="text-[#DFE5EE] text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit egestas
                et in egestas dui eget egestas a erat leo nec.
              </p>
              <div className="flex items-center bg-white rounded-full p-1.5 max-w-md">
                <div className="flex items-center gap-3 px-4 flex-1">
                  <svg
                    className="w-5 h-5 text-[#5F687A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.6}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="text-[#5F687A] text-sm placeholder:text-[#5F687A] border-0 outline-0 flex-1 bg-transparent"
                  />
                </div>
                <Button className="bg-[#005DFF] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#004BCC]">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#005DFF]"></div>
              <p className="mt-4 text-[#5F687A]">Loading blog...</p>
            </div>
          </div>
        }
      >
        <BlogContent />
      </Suspense>
      <Footer />
    </>
  );
}

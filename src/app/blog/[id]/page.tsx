import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpRight, Calendar, User } from "lucide-react";

// Mock blog data - replace with API calls
const blogPosts = [
  {
    id: 1,
    title: "How to stay organized and productive as a Notary",
    excerpt: "Porta mauris at sem placerat vulputate porttitor arcu suspendisse dui mi duis non tristique.",
    category: "Articles",
    categoryColor: "bg-[#4BA9FF]",
    date: "Jan 30, 2024",
    author: "Sarah Wilson",
    readTime: "8 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/226845328f8dbd5882fd4d1be833f9a516770f0f?width=776",
    content: `
      <p>As a notary public, staying organized and maintaining productivity is crucial for providing excellent service to your clients while building a successful practice. Here are comprehensive strategies to help you streamline your workflow and maximize your efficiency.</p>

      <h2>Creating an Efficient Workspace</h2>
      <p>Your physical and digital workspace directly impacts your productivity. Start by setting up a dedicated area for your notary work, whether it's a home office or a section of your existing workspace.</p>

      <h3>Essential Organization Tools</h3>
      <ul>
        <li>Digital calendar for appointment scheduling</li>
        <li>Document management system</li>
        <li>Client relationship management (CRM) software</li>
        <li>Secure file storage solutions</li>
        <li>Mobile scanning apps for on-the-go documentation</li>
      </ul>

      <h2>Time Management Strategies</h2>
      <p>Effective time management is the cornerstone of a productive notary practice. Consider implementing these proven techniques:</p>

      <h3>Block Scheduling</h3>
      <p>Group similar tasks together and dedicate specific time blocks to different activities. For example, reserve mornings for client appointments and afternoons for administrative tasks.</p>

      <h3>The Two-Minute Rule</h3>
      <p>If a task takes less than two minutes to complete, do it immediately. This prevents small tasks from accumulating and becoming overwhelming.</p>

      <h2>Client Communication Best Practices</h2>
      <p>Clear communication with clients not only improves their experience but also reduces the time you spend on back-and-forth exchanges.</p>

      <h3>Setting Clear Expectations</h3>
      <p>Provide clients with detailed information about what to expect during the notarization process, including required documents and identification.</p>

      <h2>Document Management Systems</h2>
      <p>Implementing a robust document management system is essential for maintaining organization and ensuring compliance with legal requirements.</p>

      <h3>Digital vs. Physical Records</h3>
      <p>While maintaining physical records may be required by law in your jurisdiction, having digital copies can significantly improve accessibility and organization.</p>

      <h2>Leveraging Technology</h2>
      <p>Modern technology offers numerous tools to enhance your productivity as a notary public. From mobile apps to cloud-based solutions, these tools can help streamline your operations.</p>

      <h3>Essential Software Solutions</h3>
      <ul>
        <li>NotaryPro for comprehensive practice management</li>
        <li>DocuSign for remote online notarization</li>
        <li>QuickBooks for financial tracking</li>
        <li>Google Workspace for document collaboration</li>
      </ul>

      <h2>Building Efficient Workflows</h2>
      <p>Developing standardized workflows for common tasks can significantly reduce the time spent on routine activities while ensuring consistency in your service delivery.</p>

      <h3>Pre-Appointment Checklist</h3>
      <ol>
        <li>Confirm appointment details with client</li>
        <li>Review required documents</li>
        <li>Prepare necessary forms and supplies</li>
        <li>Update travel route if mobile service</li>
      </ol>

      <h2>Continuous Improvement</h2>
      <p>Regularly assess your processes and look for opportunities to improve efficiency. Stay updated with industry best practices and new technologies that could benefit your practice.</p>

      <h3>Professional Development</h3>
      <p>Invest in continuing education and professional development opportunities to stay current with regulations and improve your skills.</p>

      <p>By implementing these strategies, you'll be well on your way to building a more organized and productive notary practice that serves your clients effectively while supporting your professional growth.</p>
    `
  },
  {
    id: 2,
    title: "Essential tips on how much to charge for your freelance work",
    excerpt: "Aliquam senectus turpis quam odio proin nis nec massa nisl ac etiam sed feugiat nullam neque.",
    category: "Resources",
    categoryColor: "bg-[#6C38FF]",
    date: "Jan 27, 2024",
    author: "Michael Chen",
    readTime: "6 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/4f52c8653982d42009da5aafa5db05db111d32ee?width=776",
    content: `
      <p>Setting the right price for your freelance notary services is crucial for building a sustainable and profitable business. This comprehensive guide will help you understand the factors that influence pricing and provide strategies for setting competitive rates.</p>

      <h2>Understanding Your Market</h2>
      <p>Before setting your rates, it's essential to research your local market and understand what other notaries are charging for similar services.</p>
      
      <p>Continue reading for detailed pricing strategies and market analysis...</p>
    `
  },
  {
    id: 3,
    title: "7 tips to help you succeed as a Notary professional",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipiscing elit amet nisl fringilla lectus lorem ipsum.",
    category: "Tips",
    categoryColor: "bg-[#005DFF]",
    date: "Jan 24, 2024",
    author: "Jennifer Martinez",
    readTime: "5 min read",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/19e8811565e13295a267398a8969d99af3dec386?width=776",
    content: `
      <p>Success as a notary professional requires more than just completing the certification process. Here are seven essential tips to help you build a thriving notary practice.</p>
      
      <p>Continue reading for detailed success strategies...</p>
    `
  }
];

const relatedPosts = [
  {
    id: 4,
    title: "How to get your first Notary client with no experience",
    category: "Tips",
    categoryColor: "bg-[#005DFF]",
    date: "Jan 18, 2024",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/a9e8400e829e82ae34c1591a8d067ff521e6c4a8?width=776"
  },
  {
    id: 5,
    title: "15 must-have tools all Notarys should check out",
    category: "Articles",
    categoryColor: "bg-[#4BA9FF]",
    date: "Jan 15, 2024",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/3a58c65ce6aa18d2c6b4107ae22372538d5fe1f2?width=776"
  },
  {
    id: 6,
    title: "When and how to raise your freelance rates",
    category: "Resources",
    categoryColor: "bg-[#6C38FF]",
    date: "Jan 21, 2024",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/8311bac88b6906d14301c7c240ed0112fad2a775?width=776"
  }
];

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

function BlogPostContent({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === parseInt(params.id));

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[#5F687A] hover:text-[#005DFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Badge className={`${post.categoryColor} text-white border-0 px-4 py-2 text-sm font-medium`}>
              {post.category}
            </Badge>
            <span className="text-[#5F687A] text-sm">{post.date}</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1C1F23] mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-[#5F687A] text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-12">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-[#1C1F23] prose-headings:font-bold prose-p:text-[#5F687A] prose-p:leading-relaxed prose-a:text-[#005DFF] prose-a:no-underline hover:prose-a:underline prose-ul:text-[#5F687A] prose-ol:text-[#5F687A] prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#005DFF] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#1C1F23]">{post.author}</p>
                <p className="text-sm text-[#5F687A]">Notary Professional</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#5F687A]">Share this article:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <span className="sr-only">Share on Twitter</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Button>
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <span className="sr-only">Share on LinkedIn</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-[#F9FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1C1F23] mb-12 text-center">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] relative">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`${relatedPost.categoryColor} text-white border-0 absolute top-6 left-6 px-3 py-1.5 text-sm font-medium`}>
                    {relatedPost.category}
                  </Badge>
                </div>
                <div className="p-6 space-y-4">
                  <span className="text-[#1C1F23] font-bold text-sm">
                    {relatedPost.date}
                  </span>
                  <h3 className="text-xl font-bold text-[#1C1F23] group-hover:text-[#005DFF] transition-colors leading-tight">
                    <Link href={`/blog/${relatedPost.id}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <Link 
                    href={`/blog/${relatedPost.id}`}
                    className="inline-flex items-center gap-2 text-[#005DFF] font-bold hover:gap-3 transition-all"
                  >
                    Read more
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#101B44]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Subscribe to our weekly email newsletter
          </h2>
          <p className="text-[#DFE5EE] text-lg mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit egestas et in egestas dui eget egestas a erat leo nec.
          </p>
          <div className="flex items-center bg-white rounded-full p-1.5 max-w-md mx-auto">
            <div className="flex items-center gap-3 px-4 flex-1">
              <svg className="w-5 h-5 text-[#5F687A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
      </section>
    </div>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#005DFF]"></div>
            <p className="mt-4 text-[#5F687A]">Loading article...</p>
          </div>
        </div>
      }
    >
      <BlogPostContent params={params} />
    </Suspense>
  );
}

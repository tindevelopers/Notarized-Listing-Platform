import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ExternalLink, Mail } from "lucide-react";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";

// Mock blog data - replace with API calls
const blogPosts = [
  {
    id: 3,
    title: "7 tips to help you succeed as a Notary professional",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit pharetra eget sagittis sapien neque pellentesque rhoncus iaculis purus erat neque ultrices amet odio diam tristique eu id.",
    category: "Tips",
    categoryColor: "bg-[#005DFF]",
    date: "Jan 24, 2024",
    heroImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/17e6b9ce14195373e99cb1b9f87fec54ce8647af?width=2392",
    content: `
      Lorem ipsum dolor sit amet consectetur adipiscing elit duis mauris fringilla et integer sed posuere nisl tortor et sagittis molestie aenean cursus amet et amet tortor sem vel diam est morbi tellus viverra urna pellentesque sit ac amet vitae arcu mi eu mus at lectus lectus eu scelerisque ut tincidunt nec tristique.

      • Neque sodales ut etiam sit amet nisl purus non tellus orci ac auctor
      • Adipiscing elit ut aliquam purus sit amet viverra suspendisse potenti
      • Mauris commodo quis imperdiet massa tincidunt nunc pulvinar
      • Adipiscing elit ut aliquam purus sit amet viverra suspendisse potenti

      Lorem ipsum dolor sit amet, consectetur adipiscing elit quis ultricies sed non sodales morbi ornare non ullamcorper nulla aliquet viverra non est nulla bibendum nunc ac egestas habitant.

      1. Neque sodales ut etiam sit amet nisl purus non tellus orci ac auctor
      2. Adipiscing elit ut aliquam purus sit amet viverra suspendisse potenti
      3. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar
      4. Adipiscing elit ut aliquam purus sit amet viverra suspendisse potenti

      Lorem ipsum dolor sit amet consectetur adipiscing elit orci fringilla massa tellus id nunc non facilisi velit ultrices aliquam fusce mauris consequat ultricies sed ut cras tortor amet risus viverra augue proin eget sem elit pharetra blandit dolor senectus amet ante nulla convallis.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id odio duis est, et aliquet lectus nunc eu est ut enim tristique nunc quis pellentesque sit leo volutpat in quam cursus sit euismod.

      Eget lorem dolor sed viverra ipsum nunc aliquet bibendum felis donec et odio pellentesque diam volutpat commodo sed egestas aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod eu tincidunt tortor aliquam nulla facilisi aenean sed adipiscing diam donec.
    `,
  },
  {
    id: 1,
    title: "How to stay organized and productive as a Notary",
    excerpt:
      "Porta mauris at sem placerat vulputate porttitor arcu suspendisse dui mi duis non tristique.",
    category: "Articles",
    categoryColor: "bg-[#4BA9FF]",
    date: "Jan 30, 2024",
    heroImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/226845328f8dbd5882fd4d1be833f9a516770f0f?width=776",
    content: `Sample content for this article...`,
  },
  {
    id: 2,
    title: "Essential tips on how much to charge for your freelance work",
    excerpt:
      "Aliquam senectus turpis quam odio proin nis nec massa nisl ac etiam sed feugiat nullam neque.",
    category: "Resources",
    categoryColor: "bg-[#6C38FF]",
    date: "Jan 27, 2024",
    heroImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/4f52c8653982d42009da5aafa5db05db111d32ee?width=776",
    content: `Sample content for this article...`,
  },
];

const relatedPosts = [
  {
    id: 6,
    title: "When and how to raise your freelance rates",
    category: "Resources",
    categoryColor: "bg-[#6C38FF]",
    date: "Jan 21, 2024",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/65ba2bd750e8ba043cee9de1e51e0571dfd571d3?width=776",
    excerpt:
      "Aliquam senectus turpis quam odio proin nis nec massa nisl ac etiam sed feugiat nullam neque.",
  },
  {
    id: 4,
    title: "How to get your first Notary client with no experience",
    category: "Tips",
    categoryColor: "bg-[#005DFF]",
    date: "Jan 18, 2024",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/47b7f003a9c226f500d78c6a84737b9b47e8855c?width=776",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit amet nisl fringilla lectus lorem ipsum.",
  },
  {
    id: 5,
    title: "15 must-have tools all Notarys should check out",
    category: "Articles",
    categoryColor: "bg-[#4BA9FF]",
    date: "Jan 15, 2024",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/e2567beafe6f11747291c2b6b6a6a87d46327c66?width=776",
    excerpt:
      "Porta mauris at sem placerat vulputate porttitor arcu suspendisse dui mi duis non tristique.",
  },
];

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

function BlogPostContent({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.id === parseInt(params.id));

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-32 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge
                className={`${post.categoryColor} text-white border-0 px-6 py-3.5 text-base font-medium rounded-full`}
              >
                {post.category}
              </Badge>
              <span className="text-[#1C1F23] font-bold text-base">
                {post.date}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-[#1C1F23] mb-6 leading-tight max-w-4xl mx-auto">
              {post.title}
            </h1>

            <p className="text-[#5F687A] text-base leading-relaxed max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          </div>

          {/* Hero Image */}
          <div className="aspect-[2/1] rounded-3xl overflow-hidden mb-16">
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Consider how much you want to earn */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-[#1C1F23] mb-6">
                  Consider how much you want to earn
                </h2>
                <div className="space-y-6 text-[#5F687A] text-base leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit duis
                    mauris fringilla et integer sed posuere nisl tortor et
                    sagittis molestie aenean cursus amet et amet tortor sem vel
                    diam est morbi tellus viverra urna pellentesque sit ac amet
                    vitae arcu mi eu mus at lectus lectus eu scelerisque ut
                    tincidunt nec tristique.
                  </p>

                  <div className="pl-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-[#5F687A] rounded-full mt-3 flex-shrink-0"></div>
                      <p>
                        Neque sodales ut etiam sit amet nisl purus non tellus
                        orci ac auctor
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-[#5F687A] rounded-full mt-3 flex-shrink-0"></div>
                      <p>
                        Adipiscing elit ut aliquam purus sit amet viverra
                        suspendisse potenti
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-[#5F687A] rounded-full mt-3 flex-shrink-0"></div>
                      <p>
                        Mauris commodo quis imperdiet massa tincidunt nunc
                        pulvinar
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-[#5F687A] rounded-full mt-3 flex-shrink-0"></div>
                      <p>
                        Adipiscing elit ut aliquam purus sit amet viverra
                        suspendisse potenti
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Choose your pricing strategy */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#1C1F23] mb-6">
                  Choose your pricing strategy
                </h3>
                <div className="space-y-6 text-[#5F687A] text-base leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit quis
                    ultricies sed non sodales morbi ornare non ullamcorper nulla
                    aliquet viverra non est nulla bibendum{" "}
                    <a href="#" className="text-[#005DFF] underline">
                      nunc ac egestas
                    </a>{" "}
                    habitant.
                  </p>

                  <div className="pl-8 space-y-4">
                    <div className="flex gap-4">
                      <span className="text-[#5F687A] font-normal">1.</span>
                      <p>
                        Neque sodales ut etiam sit amet nisl purus non tellus
                        orci ac auctor
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[#5F687A] font-normal">2.</span>
                      <p>
                        Adipiscing elit ut aliquam purus sit amet viverra
                        suspendisse potenti
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[#5F687A] font-normal">3.</span>
                      <p>
                        Mauris commodo quis imperdiet massa tincidunt nunc
                        pulvinar
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[#5F687A] font-normal">4.</span>
                      <p>
                        Adipiscing elit ut aliquam purus sit amet viverra
                        suspendisse potenti
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Image */}
              <div className="mb-12">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/853e6273d49c4069c7a3f26b1d4259a51d617e5c?width=1575"
                  alt="Content illustration"
                  className="w-full rounded-lg"
                />
              </div>

              {/* Every project is different */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-[#1C1F23] mb-6">
                  Every project is different
                </h3>
                <p className="text-[#5F687A] text-base leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit orci
                  fringilla massa tellus id nunc non facilisi velit ultrices
                  aliquam fusce mauris consequat ultricies sed ut cras tortor
                  amet risus viverra augue proin eget sem elit pharetra blandit
                  dolor senectus amet{" "}
                  <span className="font-bold text-[#1C1F23]">
                    ante nulla convallis.
                  </span>
                </p>
              </div>

              {/* Create rate charts */}
              <div className="mb-12">
                <h4 className="text-lg font-bold text-[#1C1F23] mb-4">
                  Create rate charts
                </h4>
                <p className="text-[#5F687A] text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                  odio duis est, et aliquet lectus nunc eu est ut enim tristique
                  nunc quis pellentesque sit leo volutpat in quam cursus sit
                  euismod.
                </p>
              </div>

              {/* Quote Section */}
              <div className="bg-[#005DFF] rounded-lg p-16 mb-12 text-center">
                <blockquote className="text-white text-2xl lg:text-3xl font-bold leading-tight">
                  "Nisi quis eleifend quam adipiscing vitae aliquet bibendum
                  enim facilisis gravida neque velit in pellentesque"
                </blockquote>
              </div>

              {/* Conclusion */}
              <div className="mb-12">
                <h4 className="text-base font-bold text-[#1C1F23] mb-4">
                  Conclusion
                </h4>
                <p className="text-[#5F687A] text-base leading-relaxed">
                  Eget lorem dolor sed viverra ipsum nunc aliquet bibendum felis
                  donec et odio pellentesque diam volutpat commodo sed egestas
                  aliquam sem fringilla ut morbi tincidunt{" "}
                  <a href="#" className="text-[#005DFF] underline">
                    augue interdum
                  </a>{" "}
                  velit euismod eu tincidunt tortor aliquam nulla facilisi
                  aenean sed adipiscing diam donec.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#EFF3FA] rounded-lg p-12 shadow-sm">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-[#EFF3FA] rounded-full mx-auto flex items-center justify-center">
                    <svg
                      width="60"
                      height="61"
                      viewBox="0 0 60 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-15 h-15"
                    >
                      <path
                        d="M35.2389 30.3422H33.7984V14.197H26.6861V30.3422H25.2757L21.9746 40.8155C21.9746 40.8155 26.5661 46.6974 28.2766 55.0101H29.597V42.7662C28.6968 42.4961 28.0365 41.6558 28.0365 40.6955C28.0365 39.4951 28.9969 38.5348 30.1972 38.5348C31.3976 38.5348 32.3579 39.4951 32.3579 40.6955C32.3579 41.6858 31.6977 42.4961 30.7974 42.7662V55.0101H32.1179C33.8284 46.6974 38.4199 40.8155 38.4199 40.8155L35.2389 30.3422Z"
                        fill="#FFC700"
                      />
                      <path
                        d="M41.6011 28.9317C41.6011 27.7313 42.5614 26.771 43.7618 26.771C44.9622 26.771 45.9225 27.7313 45.9225 28.9317V55.04H44.7821L41.6011 28.9317ZM18.8839 28.9317C18.8839 27.7313 17.9235 26.771 16.7232 26.771C15.5228 26.771 14.5625 27.7313 14.5625 28.9317V55.04H15.7028L18.8839 28.9317ZM21.4347 11.196H39.0803L40.7608 8.37511H19.7241L21.4347 11.196ZM59.2468 11.106C58.4065 8.10503 56.3358 5.67425 53.665 4.11375C52.3446 3.3335 50.8741 2.79333 49.3436 2.49323C48.8034 2.4032 48.2633 2.31317 47.6931 2.28316C47.453 2.28316 46.8528 2.25315 46.7628 2.22314H13.7522C13.6622 2.22314 13.062 2.25315 12.8219 2.28316C12.2817 2.31317 11.7116 2.37319 11.1714 2.49323C9.64089 2.76332 8.17042 3.3335 6.85 4.11375C4.17915 5.67425 2.10848 8.10503 1.26821 11.106C0.457955 14.0169 0.84808 17.1979 2.34856 19.8088C3.84904 22.4496 6.51989 24.3702 9.55086 24.7604C12.4018 25.1505 15.3727 24.1602 17.3834 22.0895C19.304 20.1089 20.0842 17.288 19.364 14.6171C18.6738 12.0663 16.6631 9.93561 14.0223 9.45546C11.5915 9.03532 8.98068 10.0857 7.81031 12.3064C7.09008 13.6568 7.00005 15.3073 7.75029 16.6578C8.44051 17.8882 9.79094 18.7884 11.2314 18.6684C11.9816 18.6084 12.7319 18.2783 13.242 17.7381C13.3921 17.5881 13.5121 17.408 13.6022 17.2279C13.6622 17.1079 13.7222 17.0779 13.6022 16.9879C13.4521 16.8978 13.3621 16.7778 13.212 16.8978C13.032 17.0179 12.8819 17.1679 12.6719 17.288C12.3718 17.468 11.9816 17.5581 11.6515 17.5581C10.9313 17.5881 10.3011 17.258 9.82095 16.7478C9.28078 16.1776 9.0407 15.1273 9.31079 14.347C9.55086 13.5968 10.091 12.9666 10.7512 12.5765C11.5015 12.1263 12.4318 11.9763 13.3021 12.1563C14.0823 12.3064 14.7725 12.7565 15.2527 13.2367C15.7028 13.7468 16.0629 14.287 16.303 14.9472C16.7832 16.3577 16.5731 17.9482 15.7028 19.1786C14.8326 20.409 13.3921 21.2192 11.9216 21.4893C10.3611 21.7594 8.71059 21.3993 7.39017 20.499C6.18979 19.6587 5.25949 18.4283 4.74933 17.0479C3.69899 14.317 4.20915 11.136 6.06975 8.88528C7.51021 7.14472 9.55086 6.00435 11.7416 5.49419C12.6419 5.28412 13.5421 5.1941 14.4724 5.1941H45.9825C46.9128 5.1941 47.8131 5.28412 48.7134 5.49419C50.9041 6.00435 52.9147 7.14472 54.3852 8.88528C56.2458 11.136 56.786 14.317 55.7056 17.0479C55.1655 18.3983 54.2652 19.6587 53.0648 20.499C51.7444 21.3993 50.1238 21.7594 48.5333 21.4893C47.0629 21.2192 45.6224 20.409 44.7521 19.1786C43.8819 17.9482 43.6718 16.3577 44.1519 14.9472C44.362 14.287 44.7521 13.7468 45.2023 13.2367C45.6824 12.7565 46.4027 12.3064 47.1529 12.1563C48.0232 11.9763 48.9535 12.0963 49.7037 12.5765C50.3639 12.9666 50.9041 13.6268 51.1442 14.347C51.3843 15.1573 51.1742 16.1776 50.634 16.7478C50.1238 17.258 49.5237 17.5881 48.8034 17.5581C48.4733 17.5581 48.0532 17.468 47.7831 17.288C47.603 17.1679 47.423 17.0179 47.2429 16.8978C47.0929 16.7778 47.0028 16.8978 46.8528 16.9879C46.7328 17.0779 46.7628 17.1079 46.8528 17.2279C46.9428 17.408 47.0929 17.5881 47.2129 17.7381C47.7231 18.3083 48.4733 18.6084 49.2236 18.6684C50.664 18.7884 52.0145 17.8882 52.7047 16.6578C53.4549 15.3073 53.3949 13.6568 52.6747 12.3064C51.4743 10.0857 48.8935 9.03532 46.4627 9.45546C43.8218 9.9056 41.8112 12.0663 41.121 14.6171C40.4007 17.288 41.151 20.1089 43.1016 22.0895C45.1122 24.1602 48.0832 25.1505 50.9341 24.7604C53.9651 24.3402 56.6359 22.4496 58.1364 19.8088C59.6369 17.1979 60.057 14.0169 59.2468 11.106Z"
                        fill="#005DFF"
                      />
                    </svg>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-[#1C1F23]">
                      Workplace
                    </h3>
                    <p className="text-[#5F687A] text-base leading-relaxed">
                      Diam sed vitae ullamcorper eu urna vitae odio in iaculis
                      massa.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full w-9 h-9 p-0 bg-[#EFF3FA] border-0"
                    >
                      <svg
                        className="w-4 h-4 text-[#005DFF]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full w-9 h-9 p-0 bg-[#EFF3FA] border-0"
                    >
                      <svg
                        className="w-4 h-4 text-[#005DFF]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full w-9 h-9 p-0 bg-[#EFF3FA] border-0"
                    >
                      <svg
                        className="w-4 h-4 text-[#005DFF]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 9.97559C0 6.38045 0 4.58288 0.856692 3.28814C1.23925 2.70997 1.73439 2.21483 2.31255 1.83228C3.60729 0.975586 5.40486 0.975586 9 0.975586C12.5951 0.975586 14.3927 0.975586 15.6874 1.83228C16.2656 2.21483 16.7608 2.70997 17.1433 3.28814C18 4.58288 18 6.38045 18 9.97559C18 13.5707 18 15.3683 17.1433 16.663C16.7608 17.2412 16.2656 17.7363 15.6874 18.1189C14.3927 18.9756 12.5951 18.9756 9 18.9756C5.40486 18.9756 3.60729 18.9756 2.31255 18.1189C1.73439 17.7363 1.23925 17.2412 0.856692 16.663C0 15.3683 0 13.5707 0 9.97559ZM13.6593 9.97581C13.6593 12.5491 11.5732 14.6352 8.99984 14.6352C6.42652 14.6352 4.34043 12.5491 4.34043 9.97581C4.34043 7.40249 6.42652 5.3164 8.99984 5.3164C11.5732 5.3164 13.6593 7.40249 13.6593 9.97581ZM8.99984 13.0588C10.7025 13.0588 12.0828 11.6785 12.0828 9.97581C12.0828 8.27312 10.7025 6.89281 8.99984 6.89281C7.29714 6.89281 5.91684 8.27312 5.91684 9.97581C5.91684 11.6785 7.29714 13.0588 8.99984 13.0588ZM13.8433 6.17713C14.4479 6.17713 14.9381 5.68697 14.9381 5.08231C14.9381 4.47766 14.4479 3.98749 13.8433 3.98749C13.2386 3.98749 12.7485 4.47766 12.7485 5.08231C12.7485 5.68697 13.2386 6.17713 13.8433 6.17713Z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#101B44] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/90b6e47aecf9fe491a08ac4702688251ba396e23?width=1988"
                alt="Subscribe to newsletter"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Subcribe to our weekly email newsletter
              </h2>
              <p className="text-[#DFE5EE] text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit egestas
                et in egestas dui eget egestas a erat leo nec.
              </p>
              <div className="flex items-center bg-white rounded-full p-1.5 max-w-md">
                <div className="flex items-center gap-3 px-4 flex-1">
                  <Mail className="w-5 h-5 text-[#5F687A]" />
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

      {/* Related Articles */}
      <section className="bg-[#F9FAFC] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-[#1C1F23]">
              Related articles
            </h2>
            <Button
              variant="outline"
              className="border-[#101B44] text-[#101B44] px-5 py-3 rounded-full font-normal hover:bg-[#101B44] hover:text-white"
            >
              Browse all articles
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`${relatedPost.categoryColor} text-white border-0 absolute top-6 left-6 px-3 py-2 text-sm font-medium rounded-full`}
                  >
                    {relatedPost.category}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#1C1F23] leading-tight">
                    <Link
                      href={`/blog/${relatedPost.id}`}
                      className="hover:text-[#005DFF] transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-[#5F687A] text-base leading-relaxed">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1C1F23] font-bold text-base">
                      {relatedPost.date}
                    </span>
                    <Link
                      href={`/blog/${relatedPost.id}`}
                      className="inline-flex items-center gap-2 text-[#005DFF] font-bold text-base hover:gap-3 transition-all"
                    >
                      Read more
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

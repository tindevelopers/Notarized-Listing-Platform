import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import MobileMenuToggle from "./MobileMenuToggle";
import AuthButtons from "./AuthButtons";

// Server Component - most of the header is static
export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Notarized
            </Link>
          </div>

          {/* Desktop Navigation - Static, server-rendered */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/california-notaries"
              className="transition-colors hover:text-primary"
            >
              Find a Notary
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link href="/blog" className="transition-colors hover:text-primary">
              Blog
            </Link>
            <Link
              href="#services"
              className="transition-colors hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-primary"
            >
              How it Works
            </Link>
          </nav>

          {/* Desktop Actions - Static */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/?signup=true">List Your Business</Link>
            </Button>
            <Button asChild>
              <Link href="/california-notaries">Search Notaries</Link>
            </Button>
            <AuthButtons />
          </div>

          {/* Mobile Menu Toggle - Client Component */}
          <MobileMenuToggle />
        </div>
      </div>
    </header>
  );
}

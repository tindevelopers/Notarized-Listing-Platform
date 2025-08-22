"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { HydrationBoundary } from "../HydrationBoundary";

// Minimal client component for mobile menu interactivity
function MobileMenuToggleContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/california-notaries"
              className="block text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find a Notary
            </Link>
            <Link
              href="/about"
              className="block text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="block text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="#services"
              className="block text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#how-it-works"
              className="block text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/?signup=true" onClick={() => setIsMenuOpen(false)}>
                  List Your Business
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link
                  href="/california-notaries"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Search Notaries
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Wrapper with hydration boundary
export default function MobileMenuToggle() {
  return (
    <HydrationBoundary
      fallback={
        <div className="md:hidden">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      }
    >
      <MobileMenuToggleContent />
    </HydrationBoundary>
  );
}

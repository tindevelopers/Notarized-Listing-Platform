
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/california-notaries"
              className={`transition-colors ${
                pathname === "/california-notaries"
                  ? "text-primary font-semibold"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Find a Notary
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                pathname === "/about"
                  ? "text-primary font-semibold"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              About
            </Link>
            <a
              href="#services"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              How it Works
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700">
              List Your Business
            </Button>
            <Link href="/california-notaries">
              <Button>Search Notaries</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/california-notaries"
                className={`transition-colors ${
                  pathname === "/california-notaries"
                    ? "text-primary font-semibold"
                    : "text-gray-700 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Find a Notary
              </Link>
              <Link
                href="/about"
                className={`transition-colors ${
                  pathname === "/about"
                    ? "text-primary font-semibold"
                    : "text-gray-700 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <a
                href="#services"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </a>
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="text-gray-700 justify-start"
                >
                  List Your Business
                </Button>
                <Link href="/california-notaries">
                  <Button className="justify-start w-full" onClick={() => setIsMenuOpen(false)}>
                    Search Notaries
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

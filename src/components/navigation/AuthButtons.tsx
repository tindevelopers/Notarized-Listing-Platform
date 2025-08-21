"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileDropdown } from "@/components/auth/ProfileDropdown";

export default function AuthButtons() {
  const searchParams = useSearchParams();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">(
    "signin",
  );
  const { user, loading } = useAuth();

  // Check URL parameters to auto-open auth modal
  useEffect(() => {
    const signupParam = searchParams.get("signup");
    const authParam = searchParams.get("auth");

    if (signupParam === "true" || authParam === "signup") {
      setAuthModalTab("signup");
      setAuthModalOpen(true);
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    } else if (authParam === "signin") {
      setAuthModalTab("signin");
      setAuthModalOpen(true);
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  // Don't render during loading
  if (loading) {
    return (
      <div className="flex space-x-2">
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  // Show profile dropdown if user is authenticated
  if (user) {
    return <ProfileDropdown />;
  }

  // Show auth buttons for unauthenticated users
  return (
    <>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setAuthModalTab("signin");
            setAuthModalOpen(true);
          }}
        >
          Sign In
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setAuthModalTab("signup");
            setAuthModalOpen(true);
          }}
        >
          Sign Up
        </Button>
      </div>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authModalTab}
      />
    </>
  );
}

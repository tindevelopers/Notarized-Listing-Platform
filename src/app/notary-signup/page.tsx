"use client";

import { useEffect } from "react";

// Force dynamic rendering for auth pages
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function NotarySignupPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // If user is logged in, redirect to complete profile
        redirect("/complete-profile");
      } else {
        // If user is not logged in, redirect to home page where they can sign up via popup
        redirect("/?signup=true");
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
          <p className="mt-4 text-[#575757]">Redirecting...</p>
        </div>
      </div>
    );
  }

  return null;
}

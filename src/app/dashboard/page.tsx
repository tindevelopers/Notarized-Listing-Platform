"use client";

import { useState, useEffect, Suspense } from "react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Bell,
  Calendar,
  CheckCircle,
  ChevronRight,
  House,
  X,
  AlertCircle,
  User,
} from "lucide-react";
import {
  PencilSimpleLine,
  Files,
  CalendarBlank,
  BookBookmark,
  UserCircle,
} from "@/components/icons/dashboard-icons";
import Link from "next/link";

interface ProfileCompletion {
  profileSetup: boolean;
  signatureCreated: boolean;
  credentialsUploaded: boolean;
  paymentDetailsAdded: boolean;
  firstTransactionAccepted: boolean;
}

interface NotaryProfile {
  profilePicture: string;
  businessName: string;
  notaryState: string;
  notaryCounty: string;
  commissionNumber: string;
  commissionExpiry: string;
  notaryType: string;
  languages: string[];
  documentTypes: string[];
}

function DashboardContent() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const [profileCompletion, setProfileCompletion] = useState<ProfileCompletion>(
    {
      profileSetup: false,
      signatureCreated: false,
      credentialsUploaded: false,
      paymentDetailsAdded: false,
      firstTransactionAccepted: false,
    },
  );
  const [showSuccessBanner, setShowSuccessBanner] = useState(true);
  const [notaryProfileComplete, setNotaryProfileComplete] = useState(false);
  const [showProfileAlert, setShowProfileAlert] = useState(true);

  // Mock activity logs - in real app, fetch from API
  const [activityLogs] = useState([
    {
      id: 1,
      date: "1 Oct 2024, 11:00 GMT",
      message: "This is an example activity log.",
    },
    {
      id: 2,
      date: "1 Oct 2024, 11:00 GMT",
      message: "This is an example activity log.",
    },
    {
      id: 3,
      date: "1 Oct 2024, 11:00 GMT",
      message: "This is an example activity log.",
    },
  ]);

  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
    }
  }, [user, loading]);

  // Check profile completion status
  useEffect(() => {
    // Check if user just completed their profile
    const profileCompleteParam = searchParams.get("profile-complete");
    if (profileCompleteParam === "true") {
      setNotaryProfileComplete(true);
      setShowProfileAlert(false);
      setShowSuccessBanner(true);

      // Clean up URL params
      window.history.replaceState({}, "", "/dashboard");
    } else {
      // Check if notary profile is complete
      // This would be replaced with actual API calls to check completion status
      const checkNotaryProfile = () => {
        // Simulate checking if user has completed notary profile (Step 3)
        const profileComplete = false; // Set to false to show the notification
        setNotaryProfileComplete(profileComplete);
      };

      checkNotaryProfile();
    }

    // This would be replaced with actual API calls to check completion status
    setProfileCompletion({
      profileSetup: true, // Assume basic profile exists after signup
      signatureCreated: true, // Assume signature was created during signup
      credentialsUploaded: false, // Still needs to upload credentials
      paymentDetailsAdded: false, // Still needs payment setup
      firstTransactionAccepted: false, // Still needs first transaction
    });
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
          <p className="mt-4 text-[#575757]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const completedTasks =
    Object.values(profileCompletion).filter(Boolean).length +
    (notaryProfileComplete ? 1 : 0);
  const totalTasks = Object.keys(profileCompletion).length + 1; // +1 for notary profile

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Sidebar */}
      <div className="w-[270px] bg-[#0E2237] flex flex-col">
        {/* Logo */}
        <div className="h-[70px] flex items-center justify-center border-b border-white/20">
          <Link href="/" className="text-xl font-bold text-white">
            Notarized
            <span className="w-2 h-2 bg-[#22D2FA] rounded-full inline-block ml-1" />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-5">
          <nav className="space-y-1">
            <div className="bg-gradient-to-r from-[#22D2FA]/55 to-[#3632F5]/55 bg-white/5 rounded-md">
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2.5 text-sm font-medium text-black rounded-md"
              >
                <House className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </div>
            <Link
              href="/transactions"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <PencilSimpleLine className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Transactions
            </Link>
            <Link
              href="/documents"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <Files className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Documents
            </Link>
            <Link
              href="/meetings"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <CalendarBlank className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Meetings
            </Link>
            <Link
              href="/journal"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <BookBookmark className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Journal
            </Link>
          </nav>
        </div>

        {/* My Account */}
        <div className="p-5">
          <Link
            href="/profile"
            className="flex items-center justify-between p-4 border border-white/50 rounded-md text-white hover:bg-white/10"
          >
            <div className="flex items-center">
              <UserCircle className="mr-3 h-5 w-5 text-[#22D2FA]" />
              <span className="text-sm font-medium">My Account</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="h-[70px] bg-white border-b border-[#E5E7EB] flex items-center justify-between px-10">
          <h1 className="text-xl font-semibold text-black">Dashboard</h1>
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-10 space-y-6">
          {/* Profile Completion Alert */}
          {!notaryProfileComplete && showProfileAlert && (
            <Alert className="bg-[#FEF3C7] border-[#F59E0B] border">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-[#D97706] mt-0.5" />
                  <div>
                    <AlertDescription className="text-[#92400E] font-semibold">
                      Complete your notary profile to get listed!
                    </AlertDescription>
                    <AlertDescription className="text-[#78350F] text-sm mt-1">
                      Add your notary credentials, commission details, and
                      services to start accepting clients.
                    </AlertDescription>
                    <Link href="/complete-profile">
                      <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-white mt-3 h-9">
                        <User className="h-4 w-4 mr-2" />
                        Complete Profile
                      </Button>
                    </Link>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => setShowProfileAlert(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </Alert>
          )}

          {/* Success Banner */}
          {showSuccessBanner && notaryProfileComplete && (
            <Alert className="bg-[#E8F5EB] border-[#1A963F] border">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#1D4D35] mt-0.5" />
                  <div>
                    <AlertDescription className="text-[#1D4D35] font-semibold">
                      Profile complete!
                    </AlertDescription>
                    <AlertDescription className="text-black text-sm mt-1">
                      Your notary profile is now live and you can start
                      accepting clients.
                    </AlertDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => setShowSuccessBanner(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </Alert>
          )}

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-black">
              Hello,{" "}
              {user.user_metadata?.full_name ||
                user.email?.split("@")[0] ||
                "Steven"}{" "}
              👋
            </h2>
            <p className="text-[#575757]">
              Here's an overview of your activity.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Complete Setup Card */}
            <Card className="lg:col-span-2 border-[#E5E7EB]">
              <CardHeader className="border-b border-[#E5E7EB]">
                <CardTitle className="text-black">
                  Complete set up ({totalTasks - completedTasks})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-5">
                  {/* Completed Tasks */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#1A963F] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-black line-through">
                      Credentials approved
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#1A963F] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-black line-through">
                      Subscribe to the platform
                    </span>
                  </div>

                  {/* Pending Tasks */}
                  {!notaryProfileComplete ? (
                    <Link
                      href="/complete-profile"
                      className="flex items-center gap-3 hover:bg-gray-50 p-2 -m-2 rounded-md"
                    >
                      <div className="w-7 h-7 border border-[#E5E7EB] rounded-full bg-white"></div>
                      <span className="text-black">
                        Complete your notary profile
                      </span>
                      <ChevronRight className="h-5 w-5 text-[#575757] ml-auto" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#1A963F] rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-black line-through">
                        Complete your notary profile
                      </span>
                    </div>
                  )}

                  {profileCompletion.credentialsUploaded ? (
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#1A963F] rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-black line-through">
                        Upload credentials
                      </span>
                    </div>
                  ) : (
                    <Link
                      href="/complete-profile?step=credentials"
                      className="flex items-center gap-3 hover:bg-gray-50 p-2 -m-2 rounded-md"
                    >
                      <div className="w-7 h-7 border border-[#E5E7EB] rounded-full bg-white"></div>
                      <span className="text-black">Upload credentials</span>
                      <ChevronRight className="h-5 w-5 text-[#575757] ml-auto" />
                    </Link>
                  )}

                  <Link
                    href="/complete-profile?step=credentials"
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 -m-2 rounded-md"
                  >
                    <div className="w-7 h-7 border border-[#E5E7EB] rounded-full bg-white"></div>
                    <span className="text-black">
                      Add your earnings payment details
                    </span>
                    <ChevronRight className="h-5 w-5 text-[#575757] ml-auto" />
                  </Link>

                  <Link
                    href="/transactions"
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 -m-2 rounded-md"
                  >
                    <div className="w-7 h-7 border border-[#E5E7EB] rounded-full bg-white"></div>
                    <span className="text-black">
                      Accept your first transaction
                    </span>
                    <ChevronRight className="h-5 w-5 text-[#575757] ml-auto" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Meeting Schedule Card */}
            <Card className="border-[#E5E7EB]">
              <CardHeader className="border-b border-[#E5E7EB]">
                <CardTitle className="text-black">Meeting schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="flex flex-col items-center justify-center h-[300px] bg-[#F7F9FC] rounded-md">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Calendar className="h-10 w-10 text-[#3632F5] opacity-50" />
                  </div>
                  <p className="text-black text-center">
                    Your meetings will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Card */}
          <Card className="border-[#E5E7EB]">
            <CardHeader className="border-b border-[#E5E7EB] flex flex-row items-center justify-between">
              <CardTitle className="text-black">Recent activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-black">
                View all
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-5">
                {activityLogs.map((log, index) => (
                  <div key={log.id}>
                    <div className="space-y-1">
                      <p className="text-[#575757] text-xs">{log.date}</p>
                      <p className="text-black font-semibold text-sm">
                        {log.message}
                      </p>
                    </div>
                    {index < activityLogs.length - 1 && (
                      <div className="h-px bg-[#D9D9D9] mt-5" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
          <p className="mt-4 text-[#575757]">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

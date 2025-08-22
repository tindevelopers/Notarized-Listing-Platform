"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Bell,
  ArrowUp,
  ChevronRight,
  House,
  Files,
  Calendar,
  BookBookmark,
  UserCircle,
} from "lucide-react";
import {
  PencilSimpleLine,
  UsersThree,
  Receipt,
  Money,
  ClockCounterClockwise,
  Gear,
} from "@/components/icons/superadmin-icons";
import Link from "next/link";

interface DashboardStats {
  totalTransactions: number;
  totalInvoiceValue: number;
  activeNotaries: number;
  totalNotaryApplications: number;
  totalClients: number;
  averageClientValue: number;
  monthlyInvoiceTotal: number;
  monthlyInvoiceCount: number;
  monthlyPayments: number;
  monthlyPaymentCount: number;
  pendingNotaries: number;
  pendingTransactions: number;
  pendingInvoices: number;
  lastMonthInvoice: number;
  lastMonthPayment: number;
  invoiceGrowth: number;
  paymentGrowth: number;
}

function SuperAdminContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalTransactions: 2500,
    totalInvoiceValue: 125000,
    activeNotaries: 50,
    totalNotaryApplications: 55,
    totalClients: 1500,
    averageClientValue: 40.0,
    monthlyInvoiceTotal: 50000,
    monthlyInvoiceCount: 1000,
    monthlyPayments: 20000,
    monthlyPaymentCount: 500,
    pendingNotaries: 2,
    pendingTransactions: 25,
    pendingInvoices: 15,
    lastMonthInvoice: 35000,
    lastMonthPayment: 17500,
    invoiceGrowth: 30,
    paymentGrowth: 13.5,
  });

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        console.log(
          "Superadmin: Checking authorization, loading:",
          loading,
          "user:",
          user?.email,
        );

        if (!loading && !user) {
          console.log("Superadmin: No user found, redirecting to home");
          router.push("/?auth=signin");
          return;
        }

        if (user) {
          console.log(
            "Superadmin: User found:",
            user.email,
            "metadata:",
            user.user_metadata,
          );

          // Check if user is superadmin
          const superAdminEmails = [
            "admin@notarized.com",
            "superadmin@notarized.com",
            "support@notarized.com",
          ];

          const isSuperAdmin =
            superAdminEmails.includes(user.email || "") ||
            user.email?.endsWith("@notarized.com") ||
            user.user_metadata?.role === "superadmin";

          console.log(
            "Superadmin: Is superadmin?",
            isSuperAdmin,
            "Email check:",
            superAdminEmails.includes(user.email || ""),
            "Domain check:",
            user.email?.endsWith("@notarized.com"),
            "Role check:",
            user.user_metadata?.role,
          );

          if (!isSuperAdmin) {
            console.log(
              "Superadmin: User not authorized, redirecting to dashboard",
            );
            setError(
              `Access denied. Your email (${user.email}) does not have superadmin privileges.`,
            );
            setTimeout(() => router.push("/dashboard"), 3000);
            return;
          }

          console.log("Superadmin: User authorized, fetching stats");
          setIsAuthorized(true);
          setError(null);
          // Fetch stats after authorization
          fetchStats();
        }
      } catch (err) {
        console.error("Superadmin: Error in authorization check:", err);
        setError(
          `Authorization error: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      } finally {
        setAuthLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        console.log("Superadmin: Fetching stats from API");
        const response = await fetch("/api/superadmin/stats", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Superadmin: Stats API response status:", response.status);

        if (response.ok) {
          const newStats = await response.json();
          console.log("Superadmin: Stats fetched successfully:", newStats);
          setStats(newStats);
        } else {
          const errorText = await response.text();
          console.error(
            "Superadmin: Stats API error:",
            response.status,
            errorText,
          );
          setError(
            `Failed to fetch dashboard stats: ${response.status} ${response.statusText}`,
          );
        }
      } catch (error) {
        console.error("Superadmin: Stats fetch error:", error);
        setError(
          `Network error while fetching stats: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    };

    checkAuthorization();
  }, [user, loading, router]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
          <p className="mt-4 text-[#575757]">Loading dashboard...</p>
          {error && (
            <Alert className="mt-4 max-w-md">
              <AlertDescription className="text-red-600">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center max-w-md">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              <strong>Superadmin Access Error:</strong>
              <br />
              {error}
            </AlertDescription>
          </Alert>
          <p className="mt-4 text-sm text-[#575757]">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Sidebar */}
      <div className="w-[270px] bg-black flex flex-col">
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
                href="/superadmin"
                className="flex items-center px-3 py-2.5 text-sm font-medium text-black rounded-md"
              >
                <House className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </div>
            <Link
              href="/superadmin/transactions"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <PencilSimpleLine className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Transactions
            </Link>
            <Link
              href="/superadmin/notaries"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <UserCircle className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Notaries
            </Link>
            <Link
              href="/superadmin/clients"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <UsersThree className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Clients
            </Link>
            <Link
              href="/superadmin/invoices"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <Receipt className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Invoices
            </Link>
            <Link
              href="/superadmin/payments"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <Money className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Payments
            </Link>
            <Link
              href="/superadmin/activity"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <ClockCounterClockwise className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Activity Logs
            </Link>
            <Link
              href="/superadmin/settings"
              className="flex items-center px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-md"
            >
              <Gear className="mr-3 h-5 w-5 text-[#22D2FA]" />
              Settings
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
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-black">
              Hello,{" "}
              {user.user_metadata?.full_name ||
                user.email?.split("@")[0] ||
                "Shannon"}{" "}
              👋
            </h2>
            <p className="text-[#575757]">
              Here's an overview of the Notarized platform activity.
            </p>
          </div>

          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Transactions */}
            <Card className="border-[#E5E7EB]">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-black font-medium">
                      Total complete transactions
                    </h3>
                    <div className="text-4xl font-bold text-black mt-2">
                      {stats.totalTransactions.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#575757]">
                    <span>Total invoice value:</span>
                    <span className="font-semibold">
                      ${stats.totalInvoiceValue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Notaries */}
            <Card className="border-[#E5E7EB]">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-black font-medium">
                      Total number of active notaries
                    </h3>
                    <div className="text-4xl font-bold text-black mt-2">
                      {stats.activeNotaries}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#575757]">
                    <span>Total notary applications:</span>
                    <span className="font-semibold">
                      {stats.totalNotaryApplications}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Clients */}
            <Card className="border-[#E5E7EB]">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-black font-medium">
                      Total number of clients
                    </h3>
                    <div className="text-4xl font-bold text-black mt-2">
                      {stats.totalClients.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#575757]">
                    <span>Average client value:</span>
                    <span className="font-semibold">
                      ${stats.averageClientValue.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Invoice Total This Month */}
            <Card className="border-[#E5E7EB]">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-black font-medium">
                      Invoice total this month
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="text-3xl font-bold text-black">
                        ${stats.monthlyInvoiceTotal.toLocaleString()}
                      </div>
                      <div className="text-sm text-black">
                        ({stats.monthlyInvoiceCount.toLocaleString()})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-black">
                      <span>Last month:</span>
                      <span className="font-semibold">
                        ${stats.lastMonthInvoice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowUp className="h-4 w-4 text-[#1A963F]" />
                      <span className="text-xs font-semibold text-[#1A963F]">
                        {stats.invoiceGrowth}%
                      </span>
                    </div>
                  </div>
                  <div className="h-24 bg-[#F7F9FC] rounded-md flex items-end justify-end p-4">
                    {/* Simplified chart representation */}
                    <svg
                      width="150"
                      height="60"
                      viewBox="0 0 150 60"
                      className="text-[#1A963F]"
                    >
                      <path
                        d="M10 50 Q30 30 50 35 T90 25 L110 20 L130 15 L150 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payments This Month */}
            <Card className="border-[#E5E7EB]">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-black font-medium">
                      Payments made this month
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="text-3xl font-bold text-black">
                        ${stats.monthlyPayments.toLocaleString()}
                      </div>
                      <div className="text-sm text-black">
                        ({stats.monthlyPaymentCount})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-black">
                      <span>Last month:</span>
                      <span className="font-semibold">
                        ${stats.lastMonthPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowUp className="h-4 w-4 text-[#1A963F]" />
                      <span className="text-xs font-semibold text-[#1A963F]">
                        {stats.paymentGrowth}%
                      </span>
                    </div>
                  </div>
                  <div className="h-24 bg-[#F7F9FC] rounded-md flex items-end justify-end p-4">
                    {/* Simplified chart representation */}
                    <svg
                      width="150"
                      height="60"
                      viewBox="0 0 150 60"
                      className="text-[#1A963F]"
                    >
                      <path
                        d="M10 30 Q30 45 50 40 T90 35 L110 30 L130 25 L150 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Notaries Awaiting Approval */}
            <Card className="border-[#E5E7EB]">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-black font-medium">
                      Notaries awaiting approval
                    </h3>
                    <div className="text-4xl font-bold text-black mt-2">
                      {stats.pendingNotaries}
                    </div>
                  </div>
                  <Link
                    href="/superadmin/notaries?status=pending"
                    className="flex items-center gap-2 text-xs font-semibold text-[#3632F5] hover:underline"
                  >
                    <span>View applications</span>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Transactions Awaiting Payment */}
            <Card className="border-[#E5E7EB]">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-black font-medium">
                      Transactions awaiting payment
                    </h3>
                    <div className="text-4xl font-bold text-black mt-2">
                      {stats.pendingTransactions}
                    </div>
                  </div>
                  <Link
                    href="/superadmin/transactions?status=pending"
                    className="flex items-center gap-2 text-xs font-semibold text-[#3632F5] hover:underline"
                  >
                    <span>View transactions</span>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Invoices Awaiting Payment */}
            <Card className="border-[#E5E7EB]">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-black font-medium">
                      Invoices awaiting payment
                    </h3>
                    <div className="text-4xl font-bold text-black mt-2">
                      {stats.pendingInvoices}
                    </div>
                  </div>
                  <Link
                    href="/superadmin/invoices?status=pending"
                    className="flex items-center gap-2 text-xs font-semibold text-[#3632F5] hover:underline"
                  >
                    <span>View invoices</span>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuperAdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
            <p className="mt-4 text-[#575757]">Loading dashboard...</p>
          </div>
        </div>
      }
    >
      <SuperAdminContent />
    </Suspense>
  );
}

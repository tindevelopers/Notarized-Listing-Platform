"use client";

import { useState, useEffect } from "react";

// Force dynamic rendering for auth pages
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, FileText, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

export default function TransactionsPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
          <p className="mt-4 text-[#575757]">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-[#3632F5] hover:text-[#3632F5]/80 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-black">Transactions</h1>
          <p className="text-[#575757] mt-2">
            Manage your notary transactions and earnings
          </p>
        </div>

        {/* Empty State */}
        <Card className="border-[#E5E7EB]">
          <CardContent className="p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#F7F9FC] rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-[#3632F5] opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                No transactions yet
              </h3>
              <p className="text-[#575757] mb-6">
                Complete your profile setup to start receiving notary requests.
              </p>
              <Alert className="bg-blue-50 border-blue-200 mb-6">
                <AlertDescription className="text-blue-800">
                  📋 Complete your profile setup to get listed and start
                  accepting transactions.
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <Link href="/dashboard">
                  <Button className="bg-[#3632F5] hover:bg-[#3632F5]/90 text-white">
                    Complete Profile Setup
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Stats Cards (Placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="border-[#E5E7EB]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#575757]">
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-[#575757] mr-2" />
                <span className="text-2xl font-bold text-black">0</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#575757]">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-[#1A963F] mr-2" />
                <span className="text-2xl font-bold text-black">0</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#575757]">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-[#1A963F] mr-2" />
                <span className="text-2xl font-bold text-black">$0.00</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

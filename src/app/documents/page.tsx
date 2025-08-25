"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Upload } from "lucide-react";
import Link from "next/link";

export default function DocumentsPage() {
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
          <p className="mt-4 text-[#575757]">Loading documents...</p>
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
          <h1 className="text-3xl font-bold text-black">Documents</h1>
          <p className="text-[#575757] mt-2">
            Manage your notary documents and credentials
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
                No documents uploaded
              </h3>
              <p className="text-[#575757] mb-6">
                Upload your notary credentials to complete your profile setup.
              </p>
              <div className="space-y-4">
                <Link href="/complete-profile">
                  <Button className="bg-[#3632F5] hover:bg-[#3632F5]/90 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Credentials
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

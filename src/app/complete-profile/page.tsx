"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotaryProfileStep } from "@/components/onboarding/steps/NotaryProfileStep";
import { CredentialsUploadStep } from "@/components/onboarding/steps/CredentialsUploadStep";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

interface NotaryProfileData {
  profilePicture: File | null;
  profilePictureUrl: string;
  businessName: string;
  notaryState: string;
  notaryCounty: string;
  commissionNumber: string;
  commissionExpiry: string;
  notaryType: string;
  languages: string[];
  documentTypes: string[];
}

interface DocumentUpload {
  file: File | null;
  expiryDate: string;
  uploadedAt?: Date;
}

interface CredentialsData {
  identification: DocumentUpload | null;
  w9: DocumentUpload | null;
  commissionCertificate: DocumentUpload | null;
  bond: DocumentUpload | null;
  eo: DocumentUpload | null;
  backgroundCheck: DocumentUpload | null;
}

type Step = "profile" | "credentials";

function CompleteProfileContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("profile");

  // Profile data state
  const [profileData, setProfileData] = useState<NotaryProfileData>({
    profilePicture: null,
    profilePictureUrl: "",
    businessName: "",
    notaryState: "",
    notaryCounty: "",
    commissionNumber: "",
    commissionExpiry: "",
    notaryType: "",
    languages: [],
    documentTypes: [],
  });

  // Credentials data state
  const [credentialsData, setCredentialsData] = useState<CredentialsData>({
    identification: null,
    w9: null,
    commissionCertificate: null,
    bond: null,
    eo: null,
    backgroundCheck: null,
  });

  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
    }
  }, [user, loading]);

  // Handle step parameter from URL
  useEffect(() => {
    const step = searchParams.get("step");
    if (step === "credentials") {
      setCurrentStep("credentials");
    } else {
      setCurrentStep("profile");
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Here you would save the data to your backend
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (currentStep === "profile") {
        console.log("Saving profile data:", profileData);
        // Move to credentials step
        setCurrentStep("credentials");
        router.push("/complete-profile?step=credentials");
      } else {
        console.log("Saving credentials data:", credentialsData);
        // Redirect back to dashboard with success
        router.push("/dashboard?profile-complete=true");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isProfileValid =
    profileData.commissionNumber &&
    profileData.commissionExpiry &&
    profileData.notaryType &&
    profileData.languages.length > 0 &&
    profileData.documentTypes.length > 0;

  const isCredentialsValid = Object.values(credentialsData).every(
    (doc) => doc !== null,
  );

  const isCurrentStepValid =
    currentStep === "profile" ? isProfileValid : isCredentialsValid;

  const getBackHref = () => {
    if (currentStep === "credentials") {
      return "/complete-profile";
    }
    return "/dashboard";
  };

  const getBackLabel = () => {
    if (currentStep === "credentials") {
      return "Back to Profile";
    }
    return "Back to Dashboard";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
          <p className="mt-4 text-[#575757]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={getBackHref()}
              className="inline-flex items-center text-[#3632F5] hover:text-[#3632F5]/80"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {getBackLabel()}
            </Link>
            <div className="h-6 w-px bg-[#E5E7EB]" />
            <Link href="/" className="text-xl font-bold text-black">
              Notarized
              <span className="w-2 h-2 bg-[#22D2FA] rounded-full inline-block ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Background blur effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-7 bg-gradient-to-r from-[#3632F5] to-[#22D2FA] blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Card className="border-[#E5E7EB] shadow-sm overflow-hidden">
            <CardContent className="p-8">
              {currentStep === "profile" ? (
                <NotaryProfileStep
                  data={profileData}
                  updateData={setProfileData}
                  userName={
                    user.user_metadata?.full_name ||
                    user.email?.split("@")[0] ||
                    "User"
                  }
                />
              ) : (
                <CredentialsUploadStep
                  data={credentialsData}
                  updateData={setCredentialsData}
                />
              )}

              {/* Footer with actions */}
              <div className="border-t border-[#E5E7EB] pt-6 mt-8">
                <div className="flex justify-between items-center">
                  <Link href={getBackHref()}>
                    <Button
                      variant="outline"
                      className="px-6 h-11 rounded-full border-[#A1A1A1]"
                    >
                      {currentStep === "credentials" ? "Back" : "Cancel"}
                    </Button>
                  </Link>

                  <Button
                    onClick={handleSubmit}
                    disabled={!isCurrentStepValid || isSubmitting}
                    className={`px-6 h-11 rounded-full font-semibold ${
                      isCurrentStepValid && !isSubmitting
                        ? "bg-[#3632F5] hover:bg-[#3632F5]/90 text-white"
                        : "bg-[#E5E7EB] text-[#A1A1A1] cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                        {currentStep === "profile"
                          ? "Saving Profile..."
                          : "Submitting Documents..."}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {currentStep === "profile"
                          ? "Continue to Documents"
                          : "Submit Documents"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CompleteProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
          <p className="mt-4 text-[#575757]">Loading...</p>
        </div>
      </div>
    }>
      <CompleteProfileContent />
    </Suspense>
  );
}

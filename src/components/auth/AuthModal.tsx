"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, User, AlertCircle, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { EmailVerificationPopup } from "./EmailVerificationPopup";
import { OnboardingWizard } from "../onboarding/OnboardingWizard";
import { DuplicateRegistrationPopup } from "./DuplicateRegistrationPopup";
import Link from "next/link";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "signin" | "signup";
}

export function AuthModal({
  open,
  onOpenChange,
  defaultTab = "signin",
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDuplicateRegistration, setShowDuplicateRegistration] =
    useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [duplicateEmail, setDuplicateEmail] = useState("");
  const [developmentMode, setDevelopmentMode] = useState(false);
  const [developmentCode, setDevelopmentCode] = useState("");

  // Form states
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const { signIn, signUp } = useAuth();

  const resetForms = () => {
    setSignInData({ email: "", password: "" });
    setSignUpData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
    setError(null);
    setSuccess(null);
    setShowVerification(false);
    setShowOnboarding(false);
    setShowDuplicateRegistration(false);
    setVerificationEmail("");
    setDuplicateEmail("");
    setDevelopmentMode(false);
    setDevelopmentCode("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!signInData.email || !signInData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const { error } = await signIn(signInData.email, signInData.password);

    if (error) {
      setError(error.message || "An error occurred during sign in");
    } else {
      resetForms();
      onOpenChange(false);
    }

    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.confirmPassword
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (signUpData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const {
      error,
      requiresVerification,
      developmentMode,
      verificationCode,
      isDuplicate,
    } = await signUp(
      signUpData.email,
      signUpData.password,
      signUpData.fullName,
    );

    console.log("Sign up result:", {
      error,
      requiresVerification,
      developmentMode,
      verificationCode,
      isDuplicate,
    });

    if (error && isDuplicate) {
      // Handle duplicate registration
      console.log(
        "Showing duplicate registration popup for:",
        signUpData.email,
      );
      setDuplicateEmail(signUpData.email);
      setShowDuplicateRegistration(true);
      setSignUpData({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
      });
    } else if (error) {
      setError(error.message || "An error occurred during sign up");
    } else {
      // Always require verification for the new flow
      console.log("Showing verification popup for:", signUpData.email);
      setVerificationEmail(signUpData.email);
      setShowVerification(true);

      // If in development mode, store the verification code to display
      if (developmentMode && verificationCode) {
        setDevelopmentMode(true);
        setDevelopmentCode(verificationCode);
      }

      setSignUpData({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
      });
    }

    setLoading(false);
  };

  const handleVerificationSuccess = () => {
    setShowVerification(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setSuccess("Welcome! Your profile has been created successfully.");
    // The user will be automatically signed in via the verification process
    resetForms();
    onOpenChange(false);
  };

  const handleDuplicateTryAgain = () => {
    setShowDuplicateRegistration(false);
    setDuplicateEmail("");
    setActiveTab("signup");
    // The signup form will be cleared but the user can enter a new email
  };

  const handleDuplicateResetPassword = () => {
    setShowDuplicateRegistration(false);
    onOpenChange(false);
    // Navigate to reset password page with the email pre-filled
    const resetUrl = `/auth/reset-password?email=${encodeURIComponent(duplicateEmail)}`;
    window.location.href = resetUrl;
  };

  return (
    <>
      {/* Main Auth Modal */}
      <Dialog
        open={
          open &&
          !showVerification &&
          !showOnboarding &&
          !showDuplicateRegistration
        }
        onOpenChange={(newOpen) => {
          if (!newOpen) resetForms();
          onOpenChange(newOpen);
        }}
      >
        <DialogContent className="sm:max-w-5xl p-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>
              {activeTab === "signin"
                ? "Sign In to Notarized"
                : "Create Notarized Account"}
            </DialogTitle>
          </VisuallyHidden>
          {/* Background blur effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-7 bg-gradient-to-r from-[#3632F5] to-[#22D2FA] blur-[100px]" />
          </div>

          <div className="relative bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden w-full min-h-[600px] flex flex-col lg:flex-row">
            {/* Left Panel */}
            <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col">
              {/* Logo and Close Button */}
              <div className="mb-8 lg:mb-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-black">
                  Notarized
                  <span className="w-2 h-2 bg-[#22D2FA] rounded-full inline-block ml-1" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-3 text-center">
                    <h1 className="text-xl lg:text-2xl font-bold text-black">
                      Welcome to Notarized
                    </h1>
                    <p className="text-sm text-[#575757]">
                      {activeTab === "signin"
                        ? "Sign in to your account to continue."
                        : "Create your account to get started."}
                    </p>
                  </div>

                  {error && (
                    <Alert
                      variant="destructive"
                      className="border-red-200 bg-red-50"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-800">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="border-green-200 bg-green-50">
                      <AlertCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        {success}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Tabs
                    value={activeTab}
                    onValueChange={(value) => {
                      setActiveTab(value as "signin" | "signup");
                      setError(null);
                      setSuccess(null);
                    }}
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-[#F7F9FC] rounded-full h-12">
                      <TabsTrigger
                        value="signin"
                        className="rounded-full font-semibold data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                      >
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger
                        value="signup"
                        className="rounded-full font-semibold data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                      >
                        Sign Up
                      </TabsTrigger>
                    </TabsList>

                    {/* Sign In Tab */}
                    <TabsContent value="signin" className="space-y-4 mt-6">
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-1">
                          <Label
                            htmlFor="signin-email"
                            className="text-sm text-black"
                          >
                            Email
                            <span className="text-[#E42B38] ml-0.5">*</span>
                          </Label>
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-11 border-[#949494] rounded-md"
                            value={signInData.email}
                            onChange={(e) =>
                              setSignInData({
                                ...signInData,
                                email: e.target.value,
                              })
                            }
                            disabled={loading}
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <Label
                            htmlFor="signin-password"
                            className="text-sm text-black"
                          >
                            Password
                            <span className="text-[#E42B38] ml-0.5">*</span>
                          </Label>
                          <Input
                            id="signin-password"
                            type="password"
                            placeholder="Enter your password"
                            className="h-11 border-[#949494] rounded-md"
                            value={signInData.password}
                            onChange={(e) =>
                              setSignInData({
                                ...signInData,
                                password: e.target.value,
                              })
                            }
                            disabled={loading}
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-11 rounded-full font-semibold bg-[#3632F5] hover:bg-[#3632F5]/90 text-white"
                          disabled={loading}
                        >
                          {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Sign In
                        </Button>

                        <div className="text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-sm text-[#3632F5] hover:text-[#3632F5]/80 font-semibold"
                            onClick={() => {
                              onOpenChange(false);
                              window.location.href = "/auth/reset-password";
                            }}
                          >
                            Forgot your password?
                          </Button>
                        </div>
                      </form>
                    </TabsContent>

                    {/* Sign Up Tab */}
                    <TabsContent value="signup" className="space-y-4 mt-6">
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-1">
                          <Label
                            htmlFor="signup-name"
                            className="text-sm text-black"
                          >
                            Full Name
                          </Label>
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="Enter your full name"
                            className="h-11 border-[#949494] rounded-md"
                            value={signUpData.fullName}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                fullName: e.target.value,
                              })
                            }
                            disabled={loading}
                          />
                        </div>

                        <div className="space-y-1">
                          <Label
                            htmlFor="signup-email"
                            className="text-sm text-black"
                          >
                            Email
                            <span className="text-[#E42B38] ml-0.5">*</span>
                          </Label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-11 border-[#949494] rounded-md"
                            value={signUpData.email}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                email: e.target.value,
                              })
                            }
                            disabled={loading}
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <Label
                            htmlFor="signup-password"
                            className="text-sm text-black"
                          >
                            Password
                            <span className="text-[#E42B38] ml-0.5">*</span>
                          </Label>
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="Enter your password (min 6 characters)"
                            className="h-11 border-[#949494] rounded-md"
                            value={signUpData.password}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                password: e.target.value,
                              })
                            }
                            disabled={loading}
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <Label
                            htmlFor="signup-confirm-password"
                            className="text-sm text-black"
                          >
                            Confirm Password
                            <span className="text-[#E42B38] ml-0.5">*</span>
                          </Label>
                          <Input
                            id="signup-confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            className="h-11 border-[#949494] rounded-md"
                            value={signUpData.confirmPassword}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                confirmPassword: e.target.value,
                              })
                            }
                            disabled={loading}
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-11 rounded-full font-semibold bg-[#3632F5] hover:bg-[#3632F5]/90 text-white"
                          disabled={loading}
                        >
                          {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Create Account
                        </Button>

                        <p className="text-sm text-center">
                          <span className="text-[#575757]">
                            Already have an account?{" "}
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveTab("signin")}
                            className="text-[#3632F5] font-semibold hover:underline"
                          >
                            Sign in
                          </button>
                        </p>
                      </form>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-1/2 bg-[#F7F9FC] p-6 lg:p-12 flex flex-col relative min-h-[400px] lg:min-h-[600px]">
              {/* Background blur effect for right panel */}
              <div className="absolute bottom-0 left-0 w-full h-[435px] rounded-full opacity-7 bg-gradient-to-r from-[#3632F5] to-[#22D2FA] blur-[100px]" />

              <div className="relative z-10">
                {/* Title */}
                <div className="mb-6 lg:mb-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-black leading-tight">
                    Join the Ultimate
                  </h2>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#3632F5] to-[#22D2FA] bg-clip-text text-transparent leading-tight">
                    Notarization Platform
                  </h2>
                </div>

                {/* Dashboard preview */}
                <div className="flex-1 flex items-center justify-center mb-6 lg:mb-0">
                  <div className="w-full max-w-md h-[200px] lg:h-[300px] bg-white rounded-xl shadow-lg overflow-hidden relative">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/2675737cf0d4b88a9d7b228710ad2190d0b50703?width=864"
                      alt="Dashboard preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom logos */}
                <div className="flex justify-between items-center pt-8">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/7c54bfba527e2553d429e5960abffdf1292b9637?width=274"
                    alt="Logo 1"
                    className="h-6 opacity-60"
                  />
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/e821b593ab7debf9aea047f103e0ceb6ddd9fd43?width=284"
                    alt="Logo 2"
                    className="h-6 opacity-60"
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Verification Popup */}
      <EmailVerificationPopup
        open={showVerification}
        onOpenChange={setShowVerification}
        email={verificationEmail}
        onVerificationSuccess={handleVerificationSuccess}
        developmentMode={developmentMode}
        developmentCode={developmentCode}
      />

      {/* Onboarding Wizard */}
      <OnboardingWizard
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={handleOnboardingComplete}
        userEmail={verificationEmail}
      />

      {/* Duplicate Registration Popup */}
      <DuplicateRegistrationPopup
        open={showDuplicateRegistration}
        onOpenChange={setShowDuplicateRegistration}
        email={duplicateEmail}
        onTryAgain={handleDuplicateTryAgain}
        onResetPassword={handleDuplicateResetPassword}
      />
    </>
  );
}

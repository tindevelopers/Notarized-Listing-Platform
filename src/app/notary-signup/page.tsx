"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ChevronLeft, Upload, Plus, Calendar, PenTool, Camera, Type } from "lucide-react";
import Link from "next/link";

type SignupStep = "email" | "verification" | "details" | "profile" | "signature" | "credentials";

export default function NotarySignupPage() {
  const [currentStep, setCurrentStep] = useState<SignupStep>("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  });

  // Profile step data
  const [profileData, setProfileData] = useState({
    profilePicture: null as File | null,
    businessName: "",
    notaryState: "",
    notaryCounty: "",
    commissionNumber: "",
    commissionExpiry: "",
    notaryType: "",
    languages: [] as string[],
    documentTypes: [] as string[],
  });

  // Signature step data
  const [signatureData, setSignatureData] = useState({
    signatureType: "draw" as "draw" | "upload" | "type",
    signatureImage: null as string | null,
    signatureText: "",
  });

  // Document upload modal
  const [uploadModal, setUploadModal] = useState({
    isOpen: false,
    documentType: "",
    file: null as File | null,
    expiryDate: "",
  });

  // Documents state
  const [documents, setDocuments] = useState({
    identification: null as { file: File; expiryDate: string } | null,
    w9: null as { file: File; expiryDate: string } | null,
    commissionCertificate: null as { file: File; expiryDate: string } | null,
    bond: null as { file: File; expiryDate: string } | null,
    eo: null as { file: File; expiryDate: string } | null,
    backgroundCheck: null as { file: File; expiryDate: string } | null,
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setCurrentStep("verification");
    }
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length === 6) {
      setCurrentStep("details");
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDetailsValid) {
      setCurrentStep("profile");
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProfileValid) {
      setCurrentStep("signature");
    }
  };

  const handleSignatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignatureValid) {
      setCurrentStep("credentials");
    }
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final form submission
    console.log("Complete signup data:", {
      email,
      verificationCode,
      formData,
      profileData,
      signatureData,
      documents,
    });
  };

  const handleDocumentUpload = (documentType: string) => {
    setUploadModal({
      isOpen: true,
      documentType,
      file: null,
      expiryDate: "",
    });
  };

  const handleDocumentSave = () => {
    if (uploadModal.file && uploadModal.expiryDate) {
      setDocuments(prev => ({
        ...prev,
        [uploadModal.documentType]: {
          file: uploadModal.file!,
          expiryDate: uploadModal.expiryDate,
        },
      }));
      setUploadModal({ isOpen: false, documentType: "", file: null, expiryDate: "" });
    }
  };

  const isEmailValid = email.length > 0;
  const isVerificationValid = verificationCode.length === 6;
  const isDetailsValid =
    formData.firstName &&
    formData.lastName &&
    formData.phoneNumber &&
    formData.password;
  const isProfileValid =
    profileData.commissionNumber &&
    profileData.commissionExpiry &&
    profileData.notaryState &&
    profileData.notaryType &&
    profileData.languages.length > 0 &&
    profileData.documentTypes.length > 0;
  const isSignatureValid = signatureData.signatureImage || signatureData.signatureText;
  const isCredentialsValid = Object.values(documents).every(doc => doc !== null);

  // Auto-advance when verification code is complete
  useEffect(() => {
    if (verificationCode.length === 6) {
      // Small delay to show the complete code before advancing
      const timer = setTimeout(() => {
        setCurrentStep("details");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [verificationCode]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4">
      {/* Background blur effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-7 bg-gradient-to-r from-[#3632F5] to-[#22D2FA] blur-[100px]" />
      </div>

      {/* Main card */}
      <div className="relative bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden w-full max-w-5xl min-h-[600px] flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col">
          {/* Logo */}
          <div className="mb-8 lg:mb-16">
            <Link href="/" className="text-xl font-bold text-black">
              Notarized
              <span className="w-2 h-2 bg-[#22D2FA] rounded-full inline-block ml-1" />
            </Link>
          </div>

          {/* Content based on current step */}
          {currentStep === "email" && (
            <form
              onSubmit={handleEmailSubmit}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="space-y-6">
                {/* Back button */}
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-1 text-sm font-semibold text-black mb-8"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                <div className="space-y-3">
                  <h1 className="text-xl lg:text-2xl font-bold text-black">
                    Enter your email
                  </h1>
                  <p className="text-sm text-[#575757]">
                    This will be used to create your notary account.
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 border-[#949494] rounded-md"
                    placeholder=""
                  />

                  <Button
                    type="submit"
                    disabled={!isEmailValid}
                    className={`w-full h-11 rounded-full font-semibold ${
                      isEmailValid
                        ? "bg-[#3632F5] hover:bg-[#3632F5]/90 text-white"
                        : "bg-[#E5E7EB] text-[#A1A1A1] cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </Button>

                  <p className="text-sm">
                    <span className="text-black">
                      Already have an account?{" "}
                    </span>
                    <Link
                      href="/signin"
                      className="text-[#3632F5] font-semibold underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          )}

          {currentStep === "verification" && (
            <form
              onSubmit={handleVerificationSubmit}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1 className="text-xl lg:text-2xl font-bold text-black">
                    Check your emails
                  </h1>
                  <p className="text-sm">
                    <span className="text-[#575757]">
                      To continue, enter the 6 digit code we just sent to{" "}
                    </span>
                    <span className="text-black font-bold">{email}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={(value) => setVerificationCode(value)}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot
                        index={0}
                        className="w-11 h-11 border-[#E5E7EB] rounded"
                      />
                      <InputOTPSlot
                        index={1}
                        className="w-11 h-11 border-[#E5E7EB] rounded"
                      />
                      <InputOTPSlot
                        index={2}
                        className="w-11 h-11 border-[#E5E7EB] rounded"
                      />
                      <InputOTPSlot
                        index={3}
                        className="w-11 h-11 border-[#E5E7EB] rounded"
                      />
                      <InputOTPSlot
                        index={4}
                        className="w-11 h-11 border-[#E5E7EB] rounded"
                      />
                      <InputOTPSlot
                        index={5}
                        className="w-11 h-11 border-[#E5E7EB] rounded"
                      />
                    </InputOTPGroup>
                  </InputOTP>

                  <p className="text-sm">
                    <span className="text-[#575757]">Code didn't arrive? </span>
                    <button
                      type="button"
                      className="text-[#3632F5] font-bold"
                      onClick={() => {
                        // Handle resend code
                        console.log("Resend code");
                      }}
                    >
                      Resend code
                    </button>
                  </p>
                </div>
              </div>
            </form>
          )}

          {currentStep === "details" && (
            <form
              onSubmit={handleDetailsSubmit}
              className="flex-1 flex flex-col"
            >
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <p className="text-sm text-[#575757]">Step 1 / 5</p>
                  <h1 className="text-xl lg:text-2xl font-bold text-black">
                    Add your details
                  </h1>
                  <p className="text-sm text-[#575757]">
                    Enter your name and phone number, then choose a password for
                    your account.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-black">
                        First name
                        <span className="text-[#E42B38] ml-0.5">*</span>
                      </Label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        className="h-11 border-[#949494] rounded-md"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-black">
                        Last name
                        <span className="text-[#E42B38] ml-0.5">*</span>
                      </Label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        className="h-11 border-[#949494] rounded-md"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm text-black">
                      Phone number
                      <span className="text-[#E42B38] ml-0.5">*</span>
                    </Label>
                    <Input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value,
                        }))
                      }
                      className="h-11 border-[#949494] rounded-md"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm text-black">
                      Create password
                      <span className="text-[#E42B38] ml-0.5">*</span>
                    </Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="h-11 border-[#949494] rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Footer with button */}
              <div className="border-t border-[#E5E7EB] pt-5 mt-8">
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={!isDetailsValid}
                    className={`px-5 h-11 rounded-full font-semibold ${
                      isDetailsValid
                        ? "bg-[#3632F5] hover:bg-[#3632F5]/90 text-white"
                        : "bg-[#E5E7EB] text-[#A1A1A1] cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </form>
          )}

          {currentStep === "profile" && (
            <form onSubmit={handleProfileSubmit} className="flex-1 flex flex-col">
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <p className="text-sm text-[#575757]">Step 3 / 5</p>
                  <h1 className="text-xl lg:text-2xl font-bold text-black">
                    Your notary profile
                  </h1>
                </div>

                <div className="space-y-4">
                  {/* Profile Picture */}
                  <div className="space-y-2">
                    <Label className="text-sm text-black">
                      Profile picture<span className="text-[#E42B38] ml-0.5">*</span>
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 rounded-full border-[#A1A1A1]"
                      onClick={() => document.getElementById('profile-picture')?.click()}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload profile picture
                    </Button>
                    <input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setProfileData(prev => ({ ...prev, profilePicture: file }));
                        }
                      }}
                    />
                  </div>

                  {/* Business Name */}
                  <div className="space-y-1">
                    <Label className="text-sm text-black">Business name (optional)</Label>
                    <Input
                      value={profileData.businessName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, businessName: e.target.value }))}
                      className="h-11 border-[#949494] rounded-md"
                    />
                  </div>

                  {/* Notary State and County */}
                  <div className="space-y-1">
                    <Label className="text-sm text-black">
                      Notary state and county:<span className="text-[#E42B38] ml-0.5">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        value={`${profileData.notaryState} ${profileData.notaryCounty}`.trim()}
                        placeholder="Select state and county"
                        className="h-11 border-[#949494] rounded-md pr-10"
                        readOnly
                      />
                      <Plus className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    </div>
                  </div>

                  {/* Commission Number */}
                  <div className="space-y-1">
                    <Label className="text-sm text-black">
                      Commission number<span className="text-[#E42B38] ml-0.5">*</span>
                    </Label>
                    <Input
                      value={profileData.commissionNumber}
                      onChange={(e) => setProfileData(prev => ({ ...prev, commissionNumber: e.target.value }))}
                      className="h-11 border-[#949494] rounded-md"
                    />
                  </div>

                  {/* Commission Expiry */}
                  <div className="space-y-1">
                    <Label className="text-sm text-black">
                      Commission expiration date:<span className="text-[#E42B38] ml-0.5">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                      <Input
                        type="date"
                        value={profileData.commissionExpiry}
                        onChange={(e) => setProfileData(prev => ({ ...prev, commissionExpiry: e.target.value }))}
                        className="h-11 border-[#949494] rounded-md pl-10"
                      />
                    </div>
                    <p className="text-xs text-[#575757]">You will need to upload proof of this later.</p>
                  </div>

                  {/* Type */}
                  <div className="space-y-1">
                    <Label className="text-sm text-black">
                      Type<span className="text-[#E42B38] ml-0.5">*</span>
                    </Label>
                    <Select value={profileData.notaryType} onValueChange={(value) => setProfileData(prev => ({ ...prev, notaryType: value }))}>
                      <SelectTrigger className="h-11 border-[#949494] rounded-md">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traditional">Traditional Notary</SelectItem>
                        <SelectItem value="electronic">Electronic Notary</SelectItem>
                        <SelectItem value="remote">Remote Online Notary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Languages */}
                  <div className="space-y-1">
                    <Label className="text-sm text-black">
                      Languages you speak<span className="text-[#E42B38] ml-0.5">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        value={profileData.languages.join(", ")}
                        placeholder="Select languages"
                        className="h-11 border-[#949494] rounded-md pr-10"
                        readOnly
                      />
                      <Plus className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    </div>
                  </div>

                  {/* Document Types */}
                  <div className="space-y-1">
                    <Label className="text-sm text-black">
                      Document types you can notarize<span className="text-[#E42B38] ml-0.5">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        value={profileData.documentTypes.join(", ")}
                        placeholder="Select document types"
                        className="h-11 border-[#949494] rounded-md pr-10"
                        readOnly
                      />
                      <Plus className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with button */}
              <div className="border-t border-[#E5E7EB] pt-5 mt-8">
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("details")}
                    className="px-5 h-11 rounded-full border-[#A1A1A1]"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isProfileValid}
                    className={`px-5 h-11 rounded-full font-semibold ${
                      isProfileValid
                        ? "bg-[#3632F5] hover:bg-[#3632F5]/90 text-white"
                        : "bg-[#E5E7EB] text-[#A1A1A1] cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </form>
          )}

          {currentStep === "signature" && (
            <div className="flex-1 flex flex-col">
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <p className="text-sm text-[#575757]">Step 4 / 5</p>
                  <h1 className="text-xl lg:text-2xl font-bold text-black">
                    Create your signature
                  </h1>
                  <p className="text-sm text-[#575757]">
                    This will be used when signing notarizations.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Signature type options */}
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant={signatureData.signatureType === "draw" ? "default" : "outline"}
                      className="h-11 justify-start"
                      onClick={() => setSignatureData(prev => ({ ...prev, signatureType: "draw" }))}
                    >
                      <PenTool className="w-5 h-5 mr-2" />
                      Draw
                    </Button>
                    <Button
                      type="button"
                      variant={signatureData.signatureType === "upload" ? "default" : "outline"}
                      className="h-11 justify-start"
                      onClick={() => setSignatureData(prev => ({ ...prev, signatureType: "upload" }))}
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Upload image
                    </Button>
                    <Button
                      type="button"
                      variant={signatureData.signatureType === "type" ? "default" : "outline"}
                      className="h-11 justify-start"
                      onClick={() => setSignatureData(prev => ({ ...prev, signatureType: "type" }))}
                    >
                      <Type className="w-5 h-5 mr-2" />
                      Type
                    </Button>
                  </div>

                  {/* Signature canvas/area */}
                  <div className="h-60 border border-[#E5E7EB] rounded-md bg-[#F7F9FC] flex items-center justify-center">
                    {signatureData.signatureType === "draw" && (
                      <p className="text-[#575757]">Draw your signature here</p>
                    )}
                    {signatureData.signatureType === "upload" && (
                      <p className="text-[#575757]">Upload signature image</p>
                    )}
                    {signatureData.signatureType === "type" && (
                      <Input
                        value={signatureData.signatureText}
                        onChange={(e) => setSignatureData(prev => ({ ...prev, signatureText: e.target.value }))}
                        placeholder="Type your signature"
                        className="text-2xl border-none bg-transparent text-center"
                        style={{ fontFamily: "cursive" }}
                      />
                    )}
                  </div>

                  {/* Signature controls */}
                  <div className="flex justify-between items-center">
                    <Button type="button" variant="outline" className="border-[#E5E7EB]">
                      Clear and draw again
                    </Button>
                    <div className="flex items-center gap-4">
                      <Label className="text-sm text-black">Stroke width</Label>
                      <div className="w-32 h-2 bg-[#91BDFF] rounded-full relative">
                        <div className="w-16 h-2 bg-[#3632F5] rounded-full"></div>
                        <div className="absolute left-14 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#3632F5] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with buttons */}
              <div className="border-t border-[#E5E7EB] pt-5 mt-8">
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("profile")}
                    className="px-5 h-11 rounded-full border-[#A1A1A1]"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    disabled={!isSignatureValid}
                    onClick={handleSignatureSubmit}
                    className={`px-5 h-11 rounded-full font-semibold ${
                      isSignatureValid
                        ? "bg-[#3632F5] hover:bg-[#3632F5]/90 text-white"
                        : "bg-[#E5E7EB] text-[#A1A1A1] cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === "credentials" && (
            <form onSubmit={handleCredentialsSubmit} className="flex-1 flex flex-col">
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <p className="text-sm text-[#575757]">Step 5 / 5</p>
                  <h1 className="text-xl lg:text-2xl font-bold text-black">
                    Upload your credentials
                  </h1>
                  <p className="text-sm text-[#575757]">
                    Provide the documents requested, then submit for approval.
                  </p>
                </div>

                {/* Documents table */}
                <div className="border border-[#E5E7EB] rounded-lg bg-white">
                  {/* Table header */}
                  <div className="flex justify-between items-center p-4 border-b border-[#E5E7EB]">
                    <span className="text-sm text-[#575757]">Credential required</span>
                    <span className="text-sm text-[#575757]">Document provided</span>
                  </div>

                  {/* Table rows */}
                  {[
                    { key: "identification", label: "Identification" },
                    { key: "w9", label: "W9" },
                    { key: "commissionCertificate", label: "Commission Certificate" },
                    { key: "bond", label: "Bond" },
                    { key: "eo", label: "E&O" },
                    { key: "backgroundCheck", label: "Background Check Report" },
                  ].map((doc) => (
                    <div key={doc.key} className="flex justify-between items-center p-4 border-b border-[#E5E7EB] last:border-b-0">
                      <span className="text-sm font-semibold text-black">{doc.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#575757]">
                          {documents[doc.key as keyof typeof documents] ? "✓ Uploaded" : "-"}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDocumentUpload(doc.key)}
                          className="border-[#E5E7EB] rounded-full"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add document
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer with buttons */}
              <div className="border-t border-[#E5E7EB] pt-5 mt-8">
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("signature")}
                    className="px-5 h-11 rounded-full border-[#A1A1A1]"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isCredentialsValid}
                    className={`px-5 h-11 rounded-full font-semibold ${
                      isCredentialsValid
                        ? "bg-[#3632F5] hover:bg-[#3632F5]/90 text-white"
                        : "bg-[#E5E7EB] text-[#A1A1A1] cursor-not-allowed"
                    }`}
                  >
                    Submit credentials
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 bg-[#F7F9FC] p-6 lg:p-12 flex flex-col relative min-h-[400px] lg:min-h-[600px]">
          {/* Background blur effect for right panel */}
          {currentStep === "details" && (
            <div className="absolute bottom-0 left-0 w-full h-[435px] rounded-full opacity-7 bg-gradient-to-r from-[#3632F5] to-[#22D2FA] blur-[100px]" />
          )}

          {(currentStep === "email" || currentStep === "verification") && (
            <>
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
            </>
          )}

          {currentStep === "details" && (
            <div className="relative z-10">
              {/* Title */}
              <div className="mb-6 lg:mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-black leading-tight">
                  Simple, yet
                </h2>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#3632F5] to-[#22D2FA] bg-clip-text text-transparent leading-tight">
                  powerful features
                </h2>
              </div>

              {/* Quote section */}
              <div className="space-y-10">
                <div className="space-y-3">
                  <div className="w-5 h-4 text-[#22D2FA]">
                    <svg viewBox="0 0 21 15" fill="currentColor">
                      <path d="M0 9.68023C0 8.13953 0.530523 6.50436 1.59157 4.77471C2.66715 3.03052 4.60029 1.43895 7.39099 0L7.91424 0.981105C6.5189 1.96948 5.48692 2.79797 4.81831 3.46657C3.64099 4.67297 3.05233 5.82849 3.05233 6.93314C3.05233 7.31105 3.16134 7.55814 3.37936 7.67442C3.59738 7.80523 3.78634 7.87064 3.94622 7.87064C4.49855 7.79797 4.86192 7.76163 5.03634 7.76163C5.96657 7.76163 6.72965 8.1032 7.32558 8.78634C7.92151 9.45494 8.21948 10.2689 8.21948 11.2282C8.21948 12.3038 7.89244 13.2049 7.23837 13.9317C6.5843 14.6439 5.68314 15 4.53488 15C3.18314 15 2.08576 14.5203 1.24273 13.561C0.414244 12.5872 0 11.2936 0 9.68023ZM12.0349 9.68023C12.0349 8.05233 12.6017 6.37355 13.7355 4.6439C14.8692 2.91424 16.766 1.36628 19.4259 0L19.9491 0.981105C18.641 1.8968 17.6381 2.70349 16.9404 3.40116C15.7049 4.63663 15.0872 5.78488 15.0872 6.84593C15.0872 7.15116 15.1672 7.39826 15.327 7.58721C15.4869 7.77616 15.7049 7.87064 15.9811 7.87064C16.5334 7.79797 16.8968 7.76163 17.0712 7.76163C17.9869 7.76163 18.7427 8.09593 19.3387 8.76453C19.9491 9.43314 20.2544 10.2544 20.2544 11.2282C20.2544 12.3619 19.9201 13.2776 19.2515 13.9753C18.5828 14.6584 17.6744 15 16.5262 15C15.218 15 14.1424 14.5203 13.2994 13.561C12.4564 12.5872 12.0349 11.2936 12.0349 9.68023Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-black leading-relaxed">
                    We use Notarized, Inc for our closings. We love the way they
                    update us at every phase of the process.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E5E7EB] overflow-hidden">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/33abbbf2752e43bf0ae07f58700d4d2036ea52ed?width=90"
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-black">J. Allen</p>
                      <p className="text-xs text-black">Dallas, TX</p>
                    </div>
                  </div>
                </div>

                {/* Logos */}
                <div className="space-y-5">
                  <div className="w-full h-px bg-[#A1A1A1]" />
                  <div className="flex justify-between items-center">
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
          )}
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 bg-[#F7F9FC] p-6 lg:p-12 flex flex-col relative min-h-[400px] lg:min-h-[600px]">
          {/* Show preview card for profile step */}
          {currentStep === "profile" && (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 border border-[#E5E7EB]">
                {/* Avatar */}
                <div className="w-24 h-24 bg-[#E5E7EB] rounded-full mx-auto mb-4"></div>

                {/* Name */}
                <h3 className="text-xl font-bold text-center bg-gradient-to-r from-[#3632F5] to-[#22D2FA] bg-clip-text text-transparent mb-6">
                  {formData.firstName} {formData.lastName}
                </h3>

                {/* Info sections */}
                <div className="space-y-4 text-sm">
                  <div className="border-t border-[#E5E7EB] pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#575757] text-xs">Commission number:</p>
                        <p className="text-black">-</p>
                      </div>
                      <div>
                        <p className="text-[#575757] text-xs">Commission expiration date:</p>
                        <p className="text-black">-</p>
                      </div>
                      <div>
                        <p className="text-[#575757] text-xs">Type:</p>
                        <p className="text-black">-</p>
                      </div>
                      <div>
                        <p className="text-[#575757] text-xs">Languages:</p>
                        <p className="text-black">-</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-[#E5E7EB] pt-4 text-center">
                    <p className="text-xs font-bold text-black">Document types notarized:</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty or minimal content for signature and credentials steps */}
          {(currentStep === "signature" || currentStep === "credentials") && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#3632F5] to-[#22D2FA] rounded-full mx-auto opacity-20"></div>
                <p className="text-[#575757] text-sm">
                  {currentStep === "signature"
                    ? "Complete your signature setup to continue"
                    : "Upload all required documents to finish registration"
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document Upload Modal */}
      <Dialog open={uploadModal.isOpen} onOpenChange={(open) => setUploadModal(prev => ({ ...prev, isOpen: open }))}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add document</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-sm font-semibold text-black">
              Upload your "{uploadModal.documentType}" document and add it's expiry date below.
            </p>

            {/* File upload area */}
            <div className="border-2 border-dashed border-[#A1A1A1] rounded-md p-8 text-center bg-[#F7F9FC]">
              <Upload className="w-8 h-8 text-[#A1A1A1] mx-auto mb-4" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-black">
                  Drag file here, or <span className="underline">select file</span>
                </p>
                <p className="text-xs text-[#575757]">PDF, DOC or ZIP.</p>
              </div>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploadModal(prev => ({ ...prev, file }));
                  }
                }}
              />
            </div>

            {/* Expiry date */}
            <div className="space-y-2">
              <Label className="text-sm text-black">
                Document expiry date: <span className="text-[#E42B38]">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                <Input
                  type="date"
                  value={uploadModal.expiryDate}
                  onChange={(e) => setUploadModal(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="pl-10"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <p className="text-xs text-[#575757]">
                This must match any expiry date detailed in the uploaded document.
              </p>
            </div>

            {/* Modal buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setUploadModal(prev => ({ ...prev, isOpen: false }))}
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!uploadModal.file || !uploadModal.expiryDate}
                onClick={handleDocumentSave}
                className="bg-[#3632F5] hover:bg-[#3632F5]/90"
              >
                Add document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

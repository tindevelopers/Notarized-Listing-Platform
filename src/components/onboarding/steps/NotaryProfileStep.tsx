"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Upload, Plus, RotateCw, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface NotaryProfileStepProps {
  data: NotaryProfileData;
  updateData: (data: NotaryProfileData) => void;
  userName?: string;
}

const documentTypeOptions = [
  "First example",
  "Second example",
  "Third example",
  "Fourth example",
  "Fifth example",
  "Sixth example",
  "Seventh example",
];

const languageOptions = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "German",
  "Italian",
  "Portuguese",
];

const notaryTypeOptions = [
  "Parent/Child",
  "Traditional Notary",
  "Electronic Notary",
  "Remote Online Notary",
];

export function NotaryProfileStep({
  data,
  updateData,
  userName = "Steven Wakeling",
}: NotaryProfileStepProps) {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof NotaryProfileData, value: string) => {
    updateData({
      ...data,
      [field]: value,
    });
  };

  const handlePhotoUpload = async (file: File) => {
    setUploadingPhoto(true);
    try {
      // Create a local URL for preview
      const url = URL.createObjectURL(file);
      updateData({
        ...data,
        profilePicture: file,
        profilePictureUrl: url,
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  const setDemoData = () => {
    // Create demo profile picture URL
    const demoImageUrl =
      "https://api.builder.io/api/v1/image/assets/TEMP/a451632811dd5018fbcf03aa54327d1b4e59ca84?width=414";

    updateData({
      ...data,
      profilePictureUrl: demoImageUrl,
      businessName: "Your Top Notary",
      notaryState: "New York",
      notaryCounty: "Bronx County",
      commissionNumber: "01234ABCDE56789",
      commissionExpiry: "2027-01-01",
      notaryType: "Parent/Child",
      languages: ["English"],
      documentTypes: [
        "First example",
        "Second example",
        "Third example",
        "Fourth example",
        "Fifth example",
        "Sixth example",
        "Seventh example",
      ],
    });
  };

  const toggleLanguage = (language: string) => {
    const currentLanguages = data.languages || [];
    if (currentLanguages.includes(language)) {
      updateData({
        ...data,
        languages: currentLanguages.filter((l) => l !== language),
      });
    } else {
      updateData({
        ...data,
        languages: [...currentLanguages, language],
      });
    }
  };

  const toggleDocumentType = (docType: string) => {
    const currentTypes = data.documentTypes || [];
    if (currentTypes.includes(docType)) {
      updateData({
        ...data,
        documentTypes: currentTypes.filter((t) => t !== docType),
      });
    } else {
      updateData({
        ...data,
        documentTypes: [...currentTypes, docType],
      });
    }
  };

  const getDisplayValue = (items: string[], placeholder: string) => {
    if (items.length === 0) return placeholder;
    if (items.length === 1) return "1 selected";
    return `${items.length} selected`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Left Panel - Form */}
      <div className="space-y-6">
        {/* Step indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#575757]">Step 3 / 5</p>
              <h1 className="text-2xl font-bold text-black">
                Your notary profile
              </h1>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={setDemoData}
              className="text-xs"
            >
              Fill demo data
            </Button>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="space-y-2">
          <Label className="text-sm text-black">
            Profile picture
            <span className="text-[#E42B38] ml-0.5">*</span>
          </Label>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full border-[#A1A1A1] gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingPhoto}
          >
            {data.profilePictureUrl ? (
              <>
                <RotateCw className="w-5 h-5" />
                Change profile picture
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload profile picture
              </>
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Business Name */}
        <div className="space-y-1">
          <Label className="text-sm text-black">Business name (optional)</Label>
          <Input
            value={data.businessName}
            onChange={(e) => handleInputChange("businessName", e.target.value)}
            className="h-11 border-[#949494] rounded-md"
            placeholder="Your Top Notary"
          />
        </div>

        {/* Notary State and County */}
        <div className="space-y-1">
          <Label className="text-sm text-black">
            Notary state and county:
            <span className="text-[#E42B38] ml-0.5">*</span>
          </Label>
          <div
            className="relative cursor-pointer"
            onClick={() => {
              // Set demo data if empty
              if (!data.notaryState || !data.notaryCounty) {
                updateData({
                  ...data,
                  notaryState: "New York",
                  notaryCounty: "Bronx County",
                });
              }
            }}
          >
            <Input
              value={
                data.notaryState && data.notaryCounty
                  ? `${data.notaryState}, ${data.notaryCounty}`
                  : ""
              }
              placeholder="Select state and county"
              className="h-11 border-[#949494] rounded-md pr-10 cursor-pointer"
              readOnly
            />
            <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Commission Number */}
        <div className="space-y-1">
          <Label className="text-sm text-black">
            Commission number
            <span className="text-[#E42B38] ml-0.5">*</span>
          </Label>
          <Input
            value={data.commissionNumber}
            onChange={(e) =>
              handleInputChange("commissionNumber", e.target.value)
            }
            className="h-11 border-[#949494] rounded-md"
            placeholder="01234ABCDE56789"
          />
        </div>

        {/* Commission Expiry */}
        <div className="space-y-1">
          <Label className="text-sm text-black">
            Commission expiration date:
            <span className="text-[#E42B38] ml-0.5">*</span>
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
            <Input
              type="date"
              value={data.commissionExpiry}
              onChange={(e) =>
                handleInputChange("commissionExpiry", e.target.value)
              }
              className="h-11 border-[#949494] rounded-md pl-10"
            />
          </div>
          <p className="text-xs text-[#575757]">
            You will need to upload proof of this later.
          </p>
        </div>

        {/* Type */}
        <div className="space-y-1">
          <Label className="text-sm text-black">
            Type<span className="text-[#E42B38] ml-0.5">*</span>
          </Label>
          <Select
            value={data.notaryType}
            onValueChange={(value) => handleInputChange("notaryType", value)}
          >
            <SelectTrigger className="h-11 border-[#949494] rounded-md">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {notaryTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Languages */}
        <div className="space-y-1">
          <Label className="text-sm text-black">
            Languages you speak
            <span className="text-[#E42B38] ml-0.5">*</span>
          </Label>
          <div className="relative">
            <Input
              value={getDisplayValue(data.languages, "Select languages")}
              className="h-11 border-[#949494] rounded-md pr-10"
              readOnly
            />
            <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
          {/* Language selection */}
          <div className="flex flex-wrap gap-2 mt-2">
            {languageOptions.map((language) => (
              <Button
                key={language}
                type="button"
                variant={
                  data.languages?.includes(language) ? "default" : "outline"
                }
                size="sm"
                onClick={() => toggleLanguage(language)}
                className="text-xs"
              >
                {language}
              </Button>
            ))}
          </div>
        </div>

        {/* Document Types */}
        <div className="space-y-1">
          <Label className="text-sm text-black">
            Document types you can notarize
            <span className="text-[#E42B38] ml-0.5">*</span>
          </Label>
          <div className="relative">
            <Input
              value={getDisplayValue(
                data.documentTypes,
                "Select document types",
              )}
              className="h-11 border-[#949494] rounded-md pr-10"
              readOnly
            />
            <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
          {/* Document type selection */}
          <div className="flex flex-wrap gap-2 mt-2">
            {documentTypeOptions.map((docType) => (
              <Button
                key={docType}
                type="button"
                variant={
                  data.documentTypes?.includes(docType) ? "default" : "outline"
                }
                size="sm"
                onClick={() => toggleDocumentType(docType)}
                className="text-xs"
              >
                {docType}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Preview Card */}
      <div className="flex items-center justify-center bg-[#F7F9FC] rounded-lg p-6">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
          {/* Profile Section */}
          <div className="p-6 text-center border-b border-[#E5E7EB]">
            <Avatar className="w-28 h-28 mx-auto mb-4">
              <AvatarImage src={data.profilePictureUrl} alt={userName} />
              <AvatarFallback className="bg-[#E5E7EB] text-2xl">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#3632F5] to-[#22D2FA] bg-clip-text text-transparent mb-2">
              {userName}
            </h3>
            {data.notaryState && data.notaryCounty && (
              <p className="text-xs font-bold text-black">
                {data.notaryState}, {data.notaryCounty}
              </p>
            )}
          </div>

          {/* Details Section */}
          <div className="p-5 space-y-4 border-b border-[#E5E7EB]">
            <div className="grid grid-cols-1 gap-3 text-center">
              <div>
                <p className="text-xs text-[#575757]">Commission number:</p>
                <p className="text-sm text-black">
                  {data.commissionNumber || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#575757]">
                  Commission expiration date:
                </p>
                <p className="text-sm text-black">
                  {data.commissionExpiry
                    ? new Date(data.commissionExpiry).toLocaleDateString()
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#575757]">Type:</p>
                <p className="text-sm text-black">{data.notaryType || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-[#575757]">Languages:</p>
                <p className="text-sm text-black">
                  {data.languages?.join(", ") || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Document Types Section */}
          <div className="p-5">
            <p className="text-xs font-bold text-black text-center mb-4">
              Document types notarized:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {data.documentTypes?.map((docType) => (
                <Badge
                  key={docType}
                  variant="secondary"
                  className="bg-[#E5E7EB] text-[#575757] text-xs"
                >
                  {docType}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

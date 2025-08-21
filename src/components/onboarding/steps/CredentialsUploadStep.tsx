"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, Calendar, FileText, CheckCircle, X } from "lucide-react";

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

interface CredentialsUploadStepProps {
  data: CredentialsData;
  updateData: (data: CredentialsData) => void;
}

interface UploadModalData {
  isOpen: boolean;
  documentType: keyof CredentialsData | "";
  documentLabel: string;
  file: File | null;
  expiryDate: string;
}

const documentTypes = [
  { key: "identification" as keyof CredentialsData, label: "Identification", required: true },
  { key: "w9" as keyof CredentialsData, label: "W9", required: true },
  { key: "commissionCertificate" as keyof CredentialsData, label: "Commission Certificate", required: true },
  { key: "bond" as keyof CredentialsData, label: "Bond", required: true },
  { key: "eo" as keyof CredentialsData, label: "E&O", required: true },
  { key: "backgroundCheck" as keyof CredentialsData, label: "Background Check Report", required: true },
];

export function CredentialsUploadStep({ data, updateData }: CredentialsUploadStepProps) {
  const [uploadModal, setUploadModal] = useState<UploadModalData>({
    isOpen: false,
    documentType: "",
    documentLabel: "",
    file: null,
    expiryDate: "",
  });

  const handleDocumentUpload = (documentType: keyof CredentialsData, label: string) => {
    setUploadModal({
      isOpen: true,
      documentType,
      documentLabel: label,
      file: null,
      expiryDate: data[documentType]?.expiryDate || "",
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadModal(prev => ({
        ...prev,
        file
      }));
    }
  };

  const handleSaveDocument = () => {
    if (uploadModal.file && uploadModal.expiryDate && uploadModal.documentType) {
      updateData({
        ...data,
        [uploadModal.documentType]: {
          file: uploadModal.file,
          expiryDate: uploadModal.expiryDate,
          uploadedAt: new Date(),
        }
      });

      setUploadModal({
        isOpen: false,
        documentType: "",
        documentLabel: "",
        file: null,
        expiryDate: "",
      });
    }
  };

  const handleRemoveDocument = (documentType: keyof CredentialsData) => {
    updateData({
      ...data,
      [documentType]: null
    });
  };

  const getUploadedCount = () => {
    return Object.values(data).filter(doc => doc !== null).length;
  };

  const getTotalCount = () => {
    return documentTypes.length;
  };

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="space-y-2">
        <p className="text-sm text-[#575757]">Step 4 / 5</p>
        <h1 className="text-2xl font-bold text-black">Upload your credentials</h1>
        <p className="text-sm text-[#575757]">
          Provide the documents requested, then submit for approval.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="bg-[#F7F9FC] rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-black">
            Documents uploaded: {getUploadedCount()}/{getTotalCount()}
          </span>
          <span className="text-sm text-[#575757]">
            {Math.round((getUploadedCount() / getTotalCount()) * 100)}%
          </span>
        </div>
        <div className="w-full bg-[#E5E7EB] rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#3632F5] to-[#22D2FA] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(getUploadedCount() / getTotalCount()) * 100}%` }}
          />
        </div>
      </div>

      {/* Documents table */}
      <Card className="border-[#E5E7EB]">
        <CardContent className="p-0">
          {/* Table header */}
          <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB] bg-[#F7F9FC]">
            <span className="text-sm font-medium text-[#575757]">
              Credential required
            </span>
            <span className="text-sm font-medium text-[#575757]">
              Document provided
            </span>
          </div>

          {/* Table rows */}
          {documentTypes.map((docType) => {
            const document = data[docType.key];
            const isUploaded = document !== null;

            return (
              <div
                key={docType.key}
                className="flex justify-between items-center p-6 border-b border-[#E5E7EB] last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#575757]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-black">
                        {docType.label}
                      </span>
                      {docType.required && (
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    {isUploaded && (
                      <p className="text-xs text-[#575757] mt-1">
                        Expires: {new Date(document.expiryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isUploaded && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#1A963F]" />
                      <span className="text-sm text-[#1A963F] font-medium">
                        {document.file?.name || 'Uploaded'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDocument(docType.key)}
                        className="h-6 w-6 p-0 text-[#E42B38] hover:text-[#E42B38] hover:bg-[#E42B38]/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDocumentUpload(docType.key, docType.label)}
                    className="border-[#E5E7EB] rounded-full text-[#3632F5] hover:bg-[#3632F5]/5"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {isUploaded ? 'Replace' : 'Add document'}
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Document Upload Modal */}
      <Dialog open={uploadModal.isOpen} onOpenChange={(open) => 
        setUploadModal(prev => ({ ...prev, isOpen: open }))
      }>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">
              Add document
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-sm font-medium text-black">
              Upload your "{uploadModal.documentLabel}" document and add its expiry date below.
            </p>

            {/* File upload area */}
            <div className="relative border-2 border-dashed border-[#A1A1A1] rounded-lg p-8 text-center bg-[#F7F9FC] hover:bg-[#F0F4F8] transition-colors">
              <Upload className="w-8 h-8 text-[#A1A1A1] mx-auto mb-4" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-black">
                  {uploadModal.file ? (
                    <span className="text-[#3632F5]">
                      {uploadModal.file.name}
                    </span>
                  ) : (
                    <>
                      Drag file here, or{" "}
                      <span className="underline text-[#3632F5] cursor-pointer">select file</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-[#575757]">PDF, DOC or ZIP.</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Expiry date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-black">
                Document expiry date: <span className="text-[#E42B38]">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#575757]" />
                <Input
                  type="date"
                  value={uploadModal.expiryDate}
                  onChange={(e) =>
                    setUploadModal(prev => ({
                      ...prev,
                      expiryDate: e.target.value,
                    }))
                  }
                  className="pl-10 border-[#949494]"
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
                variant="outline"
                onClick={() => setUploadModal(prev => ({ ...prev, isOpen: false }))}
                className="border-[#A1A1A1]"
              >
                Cancel
              </Button>
              <Button
                disabled={!uploadModal.file || !uploadModal.expiryDate}
                onClick={handleSaveDocument}
                className="bg-[#3632F5] hover:bg-[#3632F5]/90 text-white"
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

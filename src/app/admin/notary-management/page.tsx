"use client";

import { useState, useEffect } from "react";

// Force dynamic rendering for admin pages - prevent static generation
export const runtime = 'edge';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  User,
  MapPin,
  Phone,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NotaryApplication {
  id: string;
  profiles: {
    full_name: string;
    email: string;
  };
  city: string;
  state: string;
  phone?: string;
  business_name?: string;
  verification_status: "pending" | "approved" | "rejected";
  is_verified: boolean;
  created_at: string;
  commission_number?: string;
  years_experience?: number;
}

export default function NotaryManagementPage() {
  const [applications, setApplications] = useState<NotaryApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuth();

  // Status update form
  const [selectedApplication, setSelectedApplication] =
    useState<NotaryApplication | null>(null);
  const [statusUpdateForm, setStatusUpdateForm] = useState({
    status: "pending" as "approved" | "rejected" | "pending",
    message: "",
    nextSteps: "",
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/notary-applications");

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load notary applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedApplication) return;

    try {
      setProcessingId(selectedApplication.id);
      setError(null);
      setSuccess(null);

      const response = await fetch("/api/email/notary-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedApplication.profiles.email,
          notaryId: selectedApplication.id,
          status: statusUpdateForm.status,
          message: statusUpdateForm.message,
          nextSteps: statusUpdateForm.nextSteps,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(
          `Notary status updated to "${statusUpdateForm.status}" and notification sent!`,
        );

        // Update the local state
        setApplications((prev) =>
          prev.map((app) =>
            app.id === selectedApplication.id
              ? {
                  ...app,
                  verification_status: statusUpdateForm.status,
                  is_verified: statusUpdateForm.status === "approved",
                }
              : app,
          ),
        );

        // Reset form
        setSelectedApplication(null);
        setStatusUpdateForm({ status: "pending", message: "", nextSteps: "" });
      } else {
        setError(data.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setError("An error occurred while updating the status");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string, isVerified: boolean) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  // Simple admin check - in production, implement proper role-based access
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Notary Application Management
        </h1>
        <p className="text-gray-600">Review and manage notary applications</p>
      </div>

      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="status-update">Status Update</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading applications...</span>
            </div>
          ) : applications.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No notary applications found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {applications.map((application) => (
                <Card
                  key={application.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(application.verification_status)}
                        <div>
                          <h3 className="text-lg font-semibold flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            {application.profiles.full_name ||
                              "Unnamed Applicant"}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            {application.profiles.email}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        {getStatusBadge(
                          application.verification_status,
                          application.is_verified,
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Applied:{" "}
                          {application.created_at?.slice(0, 10) || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-2 h-4 w-4" />
                        {application.city}, {application.state}
                      </div>

                      {application.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-2 h-4 w-4" />
                          {application.phone}
                        </div>
                      )}

                      {application.business_name && (
                        <div className="text-sm text-gray-600">
                          <strong>Business:</strong> {application.business_name}
                        </div>
                      )}

                      {application.commission_number && (
                        <div className="text-sm text-gray-600">
                          <strong>Commission #:</strong>{" "}
                          {application.commission_number}
                        </div>
                      )}

                      {application.years_experience && (
                        <div className="text-sm text-gray-600">
                          <strong>Experience:</strong>{" "}
                          {application.years_experience} years
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedApplication(application);
                          setStatusUpdateForm({
                            status: "approved",
                            message:
                              "Congratulations! Your notary application has been approved.",
                            nextSteps:
                              "You can now start accepting bookings through our platform.",
                          });
                        }}
                        disabled={
                          application.verification_status === "approved" ||
                          processingId === application.id
                        }
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedApplication(application);
                          setStatusUpdateForm({
                            status: "rejected",
                            message:
                              "Thank you for your application. Unfortunately, we cannot approve it at this time.",
                            nextSteps:
                              "Please review our requirements and feel free to reapply when ready.",
                          });
                        }}
                        disabled={
                          application.verification_status === "rejected" ||
                          processingId === application.id
                        }
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedApplication(application);
                          setStatusUpdateForm({
                            status: "pending",
                            message:
                              "We are currently reviewing your notary application.",
                            nextSteps:
                              "We will notify you once our review is complete.",
                          });
                        }}
                        disabled={processingId === application.id}
                      >
                        <Clock className="mr-1 h-4 w-4" />
                        Set Pending
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="status-update">
          {selectedApplication ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Update Status & Send Notification
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Notary: {selectedApplication.profiles.full_name} (
                  {selectedApplication.profiles.email})
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStatusUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={statusUpdateForm.status}
                      onChange={(e) =>
                        setStatusUpdateForm({
                          ...statusUpdateForm,
                          status: e.target.value as
                            | "approved"
                            | "rejected"
                            | "pending",
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Additional message for the notary..."
                      value={statusUpdateForm.message}
                      onChange={(e) =>
                        setStatusUpdateForm({
                          ...statusUpdateForm,
                          message: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nextSteps">Next Steps (Optional)</Label>
                    <Textarea
                      id="nextSteps"
                      placeholder="What should the notary do next..."
                      value={statusUpdateForm.nextSteps}
                      onChange={(e) =>
                        setStatusUpdateForm({
                          ...statusUpdateForm,
                          nextSteps: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      disabled={processingId === selectedApplication.id}
                    >
                      {processingId === selectedApplication.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Update Status & Send Email
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedApplication(null);
                        setStatusUpdateForm({
                          status: "pending",
                          message: "",
                          nextSteps: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">
                  Select an application from the Applications tab to update its
                  status.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  User,
  Settings,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function EmailTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuth();

  // Test forms
  const [verificationTest, setVerificationTest] = useState({
    email: "",
    userName: "",
  });

  const [passwordResetTest, setPasswordResetTest] = useState({
    email: "",
  });

  const [notaryStatusTest, setNotaryStatusTest] = useState({
    email: "",
    notaryName: "",
    status: "approved" as "approved" | "rejected" | "pending",
    message: "",
    nextSteps: "",
  });

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleVerificationTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    try {
      const response = await fetch("/api/email/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: verificationTest.email,
          userName:
            verificationTest.userName || verificationTest.email.split("@")[0],
          verificationToken:
            "test-token-static-" + verificationTest.email.split("@")[0],
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Verification email sent successfully!");
        setVerificationTest({ email: "", userName: "" });
      } else {
        setError(data.error || "Failed to send verification email");
      }
    } catch (error) {
      console.error("Verification email test error:", error);
      setError("An error occurred while sending the test email");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordResetTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    try {
      const response = await fetch("/api/email/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: passwordResetTest.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset email sent successfully!");
        setPasswordResetTest({ email: "" });
      } else {
        setError(data.error || "Failed to send password reset email");
      }
    } catch (error) {
      console.error("Password reset test error:", error);
      setError("An error occurred while sending the test email");
    } finally {
      setLoading(false);
    }
  };

  const handleNotaryStatusTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    try {
      // For testing, we'll create a mock notary ID
      const mockNotaryId =
        "test-notary-static-" + notaryStatusTest.email.split("@")[0];

      const response = await fetch("/api/email/test/notary-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: notaryStatusTest.email,
          notaryName:
            notaryStatusTest.notaryName || notaryStatusTest.email.split("@")[0],
          status: notaryStatusTest.status,
          message: notaryStatusTest.message,
          nextSteps: notaryStatusTest.nextSteps,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Notary status email sent successfully!");
        setNotaryStatusTest({
          email: "",
          notaryName: "",
          status: "approved",
          message: "",
          nextSteps: "",
        });
      } else {
        setError(data.error || "Failed to send notary status email");
      }
    } catch (error) {
      console.error("Notary status test error:", error);
      setError("An error occurred while sending the test email");
    } finally {
      setLoading(false);
    }
  };

  // Simple admin check
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to access the email testing panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Mail className="mr-3 h-8 w-8" />
          Email System Testing
        </h1>
        <p className="text-gray-600">
          Test the AWS SES integration and email templates
        </p>
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

      <Tabs defaultValue="verification" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verification">Email Verification</TabsTrigger>
          <TabsTrigger value="password-reset">Password Reset</TabsTrigger>
          <TabsTrigger value="notary-status">Notary Status</TabsTrigger>
        </TabsList>

        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Test Email Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerificationTest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verify-email">Email Address</Label>
                  <Input
                    id="verify-email"
                    type="email"
                    placeholder="test@example.com"
                    value={verificationTest.email}
                    onChange={(e) =>
                      setVerificationTest({
                        ...verificationTest,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verify-name">User Name (Optional)</Label>
                  <Input
                    id="verify-name"
                    type="text"
                    placeholder="John Doe"
                    value={verificationTest.userName}
                    onChange={(e) =>
                      setVerificationTest({
                        ...verificationTest,
                        userName: e.target.value,
                      })
                    }
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Test Verification Email
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password-reset">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Test Password Reset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordResetTest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email Address</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="test@example.com"
                    value={passwordResetTest.email}
                    onChange={(e) =>
                      setPasswordResetTest({
                        ...passwordResetTest,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Test Password Reset Email
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notary-status">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Test Notary Status Update
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotaryStatusTest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notary-email">Email Address</Label>
                  <Input
                    id="notary-email"
                    type="email"
                    placeholder="notary@example.com"
                    value={notaryStatusTest.email}
                    onChange={(e) =>
                      setNotaryStatusTest({
                        ...notaryStatusTest,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notary-name">Notary Name (Optional)</Label>
                  <Input
                    id="notary-name"
                    type="text"
                    placeholder="Jane Smith"
                    value={notaryStatusTest.notaryName}
                    onChange={(e) =>
                      setNotaryStatusTest({
                        ...notaryStatusTest,
                        notaryName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notary-status">Status</Label>
                  <select
                    id="notary-status"
                    value={notaryStatusTest.status}
                    onChange={(e) =>
                      setNotaryStatusTest({
                        ...notaryStatusTest,
                        status: e.target.value as
                          | "approved"
                          | "rejected"
                          | "pending",
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notary-message">Message (Optional)</Label>
                  <Textarea
                    id="notary-message"
                    placeholder="Custom message for the notary..."
                    value={notaryStatusTest.message}
                    onChange={(e) =>
                      setNotaryStatusTest({
                        ...notaryStatusTest,
                        message: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notary-next-steps">
                    Next Steps (Optional)
                  </Label>
                  <Textarea
                    id="notary-next-steps"
                    placeholder="What should the notary do next..."
                    value={notaryStatusTest.nextSteps}
                    onChange={(e) =>
                      setNotaryStatusTest({
                        ...notaryStatusTest,
                        nextSteps: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Test Status Email
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Email Configuration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>AWS Region:</strong>{" "}
                {process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1"}
              </p>
              <p>
                <strong>From Email:</strong>{" "}
                {process.env.NEXT_PUBLIC_SES_FROM_EMAIL || "Not configured"}
              </p>
              <p>
                <strong>From Name:</strong>{" "}
                {process.env.NEXT_PUBLIC_SES_FROM_NAME || "Notarized Platform"}
              </p>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800">
                  <strong>Note:</strong> Make sure to update your .env file with
                  actual AWS SES credentials before testing in production.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

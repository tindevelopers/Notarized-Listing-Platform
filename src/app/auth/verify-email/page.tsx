"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

function VerifyEmailContent() {
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "expired"
  >("loading");
  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams?.get("token");
  const email = searchParams?.get("email");

  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      setMessage(
        "Invalid verification link. Please check your email for the correct link.",
      );
      return;
    }

    verifyEmail();
  }, [token, email]); // eslint-disable-line react-hooks/exhaustive-deps

  const verifyEmail = async () => {
    try {
      setStatus("loading");

      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage("Your email has been verified successfully!");

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Email verification error:", error);
      setStatus("error");
      setMessage("An error occurred during verification. Please try again.");
    }
  };

  const handleResendVerification = async () => {
    if (!email) return;

    try {
      setResending(true);

      const response = await fetch("/api/email/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("A new verification email has been sent to your inbox.");
      } else {
        setMessage(data.error || "Failed to resend verification email.");
      }
    } catch (error) {
      console.error("Error resending verification:", error);
      setMessage("An error occurred while resending the verification email.");
    } finally {
      setResending(false);
    }
  };

  const getIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />;
      case "success":
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case "error":
      case "expired":
        return <XCircle className="h-12 w-12 text-red-500" />;
      default:
        return <Mail className="h-12 w-12 text-gray-500" />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case "loading":
        return "Verifying Your Email...";
      case "success":
        return "Email Verified!";
      case "error":
        return "Verification Failed";
      case "expired":
        return "Link Expired";
      default:
        return "Email Verification";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">{getIcon()}</div>
            <CardTitle className="text-2xl font-bold">{getTitle()}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>

            {status === "success" && (
              <div className="text-center text-sm text-gray-600">
                <p>Redirecting to homepage in a few seconds...</p>
              </div>
            )}

            {status === "error" && email && (
              <div className="text-center">
                <Button
                  onClick={handleResendVerification}
                  disabled={resending}
                  variant="outline"
                  className="w-full"
                >
                  {resending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              </div>
            )}

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="text-sm"
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex items-center">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading...</span>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

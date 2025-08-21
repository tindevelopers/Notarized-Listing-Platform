"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuperAdminSetup() {
  const [formData, setFormData] = useState({
    setupKey: "",
    email: "",
    password: "",
    fullName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [setupRequired, setSetupRequired] = useState(false);
  const [checkingSetup, setCheckingSetup] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkSetupRequired();
  }, []);

  const checkSetupRequired = async () => {
    try {
      const response = await fetch("/api/superadmin/setup");
      const data = await response.json();
      
      if (data.setup_required) {
        setSetupRequired(true);
      } else {
        // Redirect to login if setup is already complete
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to check setup status:", error);
      setError("Failed to check setup status");
    } finally {
      setCheckingSetup(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.setupKey || !formData.email || !formData.password || !formData.fullName) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/superadmin/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Superadmin user created successfully! You can now log in.");
        setFormData({
          setupKey: "",
          email: "",
          password: "",
          fullName: "",
        });
        
        // Redirect to login after a delay
        setTimeout(() => {
          router.push("/?auth=signin");
        }, 2000);
      } else {
        setError(data.error || "Failed to create superadmin user");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (checkingSetup) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
          <p className="mt-4 text-[#575757]">Checking setup status...</p>
        </div>
      </div>
    );
  }

  if (!setupRequired) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="text-xl font-bold text-black">
              Notarized
              <span className="w-2 h-2 bg-[#22D2FA] rounded-full inline-block ml-1" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Superadmin Setup
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Create the first superadmin account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="setupKey">Setup Key</Label>
              <Input
                id="setupKey"
                name="setupKey"
                type="password"
                value={formData.setupKey}
                onChange={handleInputChange}
                placeholder="Enter the superadmin setup key"
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Contact your system administrator for the setup key
              </p>
            </div>

            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@notarized.com"
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter a strong password"
                  disabled={loading}
                  required
                  minLength={8}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-[#3632F5] hover:bg-[#3632F5]/90"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Superadmin Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              This setup page will be disabled after the first superadmin account is created.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

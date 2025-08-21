"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function SuperAdminNotaries() {
  const { user, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
      return;
    }

    if (user) {
      const superAdminEmails = [
        'admin@notarized.com',
        'superadmin@notarized.com',
        'support@notarized.com'
      ];
      
      const isSuperAdmin = superAdminEmails.includes(user.email || '') || 
                         user.email?.endsWith('@notarized.com');

      if (!isSuperAdmin) {
        redirect("/dashboard");
        return;
      }

      setIsAuthorized(true);
    }
  }, [user, loading]);

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3632F5]"></div>
          <p className="mt-4 text-[#575757]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/superadmin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Notary Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">50</div>
              <div className="text-sm text-gray-600">Active Notaries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-600">Pending Approval</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">48</div>
              <div className="text-sm text-gray-600">Verified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">55</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </CardContent>
          </Card>
        </div>

        {/* Notaries Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Notaries</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertDescription>
                This is a placeholder page. The full notary management system would include:
                notary approval workflows, credential verification, status management, and detailed profiles.
              </AlertDescription>
            </Alert>
            
            {/* Sample Data */}
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  name: "Sarah Johnson",
                  email: "sarah.johnson@email.com",
                  status: "approved",
                  location: "Los Angeles, CA",
                  joinDate: "2024-01-15",
                },
                {
                  id: 2,
                  name: "Michael Chen",
                  email: "m.chen@email.com",
                  status: "pending",
                  location: "San Francisco, CA",
                  joinDate: "2024-01-20",
                },
                {
                  id: 3,
                  name: "Emily Davis",
                  email: "emily.davis@email.com",
                  status: "approved",
                  location: "San Diego, CA",
                  joinDate: "2024-01-10",
                },
              ].map((notary) => (
                <div
                  key={notary.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {notary.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{notary.name}</div>
                      <div className="text-sm text-gray-600">{notary.email}</div>
                      <div className="text-sm text-gray-500">{notary.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={notary.status === "approved" ? "default" : "secondary"}
                      className={
                        notary.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }
                    >
                      {notary.status === "approved" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {notary.status}
                    </Badge>
                    <div className="text-sm text-gray-500">{notary.joinDate}</div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


"use client"

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export function SupabaseNotice() {
  if (isSupabaseConfigured) {
    return null;
  }

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <strong>Development Mode:</strong> Supabase is not configured. 
        Please set up your Supabase project and update the environment variables to enable authentication and database features.
      </AlertDescription>
    </Alert>
  );
}

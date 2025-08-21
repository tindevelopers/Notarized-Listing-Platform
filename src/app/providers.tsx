"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { suppressDevelopmentErrors } from "@/lib/error-suppression";
import "@/lib/fetch-wrapper"; // Initialize fetch wrapper

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
          },
        },
      }),
  );

  // Comprehensive error handling for development
  useEffect(() => {
    const cleanup = suppressDevelopmentErrors({
      suppressResizeObserver: true,
      suppressNextRedirect: true,
      suppressBrowserExtensions: true,
      suppressThirdPartyScripts: true,
      suppressFetchErrors: true,
      suppressRSCErrors: true,
      logSuppressedErrors:
        process.env.NODE_ENV === "development" &&
        process.env.DEBUG_ERRORS === "true",
    });

    if (process.env.NODE_ENV === "development") {
      console.log("🛡️ Development error suppression enabled");
    }

    return cleanup;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

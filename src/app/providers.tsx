"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { suppressResizeObserverErrors } from "@/lib/resize-observer-fix";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }));

  // Global error handling
  useEffect(() => {
    // Suppress ResizeObserver errors
    const resizeCleanup = suppressResizeObserverErrors();

    // Suppress NEXT_REDIRECT errors (these are expected Next.js behavior)
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('NEXT_REDIRECT') ||
          event.error?.digest?.includes('NEXT_REDIRECT')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes('NEXT_REDIRECT') ||
          event.reason?.digest?.includes('NEXT_REDIRECT')) {
        event.preventDefault();
        return false;
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
    }

    return () => {
      resizeCleanup?.();
      if (typeof window !== 'undefined') {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}

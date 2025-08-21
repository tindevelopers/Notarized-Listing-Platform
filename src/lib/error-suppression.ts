/**
 * Comprehensive error suppression utility for development environment
 * Handles browser extensions, third-party scripts, and Next.js errors
 */

export interface ErrorSuppressionOptions {
  suppressResizeObserver?: boolean;
  suppressNextRedirect?: boolean;
  suppressBrowserExtensions?: boolean;
  suppressThirdPartyScripts?: boolean;
  suppressFetchErrors?: boolean;
  suppressRSCErrors?: boolean;
  logSuppressedErrors?: boolean;
}

const defaultOptions: ErrorSuppressionOptions = {
  suppressResizeObserver: true,
  suppressNextRedirect: true,
  suppressBrowserExtensions: true,
  suppressThirdPartyScripts: true,
  suppressFetchErrors: true,
  suppressRSCErrors: true,
  logSuppressedErrors: false,
};

export const suppressDevelopmentErrors = (
  options: ErrorSuppressionOptions = {},
) => {
  if (typeof window === "undefined") return;

  const config = { ...defaultOptions, ...options };
  const cleanupFunctions: (() => void)[] = [];

  // Global error handler
  const globalErrorHandler = (event: ErrorEvent) => {
    const { message, filename, error } = event;
    let shouldSuppress = false;
    let suppressionReason = "";

    // ResizeObserver errors
    if (
      config.suppressResizeObserver &&
      (message?.includes(
        "ResizeObserver loop completed with undelivered notifications",
      ) ||
        message?.includes("ResizeObserver loop limit exceeded"))
    ) {
      shouldSuppress = true;
      suppressionReason = "ResizeObserver";
    }

    // Browser extension errors
    if (
      config.suppressBrowserExtensions &&
      (filename?.includes("chrome-extension://") ||
        filename?.includes("moz-extension://") ||
        filename?.includes("safari-extension://") ||
        message?.includes("Extension context invalidated") ||
        message?.includes("chrome.runtime"))
    ) {
      shouldSuppress = true;
      suppressionReason = "Browser Extension";
    }

    // Third-party script errors
    if (
      config.suppressThirdPartyScripts &&
      (filename?.includes("fullstory.com") ||
        filename?.includes("googletagmanager.com") ||
        filename?.includes("google-analytics.com") ||
        filename?.includes("hotjar.com") ||
        filename?.includes("segment.com") ||
        filename?.includes("mixpanel.com") ||
        filename?.includes("intercom.io") ||
        message?.includes("Script error"))
    ) {
      shouldSuppress = true;
      suppressionReason = "Third-party Script";
    }

    // Next.js redirect errors (expected behavior)
    if (
      config.suppressNextRedirect &&
      (message?.includes("NEXT_REDIRECT") ||
        error?.digest?.includes("NEXT_REDIRECT"))
    ) {
      shouldSuppress = true;
      suppressionReason = "Next.js Redirect";
    }

    // Fetch errors from extensions/third-parties
    if (
      config.suppressFetchErrors &&
      (message?.includes("Failed to fetch") ||
       message?.includes("RobustFetchError") ||
       message?.includes("Third-party script interference")) &&
      (filename?.includes("chrome-extension://") ||
        filename?.includes("fullstory.com") ||
        filename?.includes("frame_ant.js") ||
        filename?.includes("fetch-wrapper"))
    ) {
      shouldSuppress = true;
      suppressionReason = "Third-party Fetch";
    }

    // RSC payload errors
    if (
      config.suppressRSCErrors &&
      (message?.includes("Failed to fetch RSC payload") ||
        message?.includes("RSC payload"))
    ) {
      shouldSuppress = true;
      suppressionReason = "RSC Payload";
    }

    if (shouldSuppress) {
      if (config.logSuppressedErrors) {
        console.debug(`🔇 Suppressed ${suppressionReason} error:`, {
          message,
          filename,
          error,
        });
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
  };

  // Unhandled promise rejection handler
  const rejectionHandler = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    let shouldSuppress = false;
    let suppressionReason = "";

    // ResizeObserver promise rejections
    if (
      config.suppressResizeObserver &&
      (reason?.message?.includes("ResizeObserver") ||
        reason?.toString?.()?.includes("ResizeObserver"))
    ) {
      shouldSuppress = true;
      suppressionReason = "ResizeObserver Promise";
    }

    // Next.js redirect promise rejections
    if (
      config.suppressNextRedirect &&
      (reason?.message?.includes("NEXT_REDIRECT") ||
        reason?.digest?.includes("NEXT_REDIRECT"))
    ) {
      shouldSuppress = true;
      suppressionReason = "Next.js Redirect Promise";
    }

    // Browser extension promise rejections
    if (
      config.suppressBrowserExtensions &&
      (reason?.message?.includes("Extension context") ||
        reason?.toString?.()?.includes("chrome-extension"))
    ) {
      shouldSuppress = true;
      suppressionReason = "Browser Extension Promise";
    }

    // Third-party fetch promise rejections
    if (
      config.suppressThirdPartyScripts &&
      (reason?.message?.includes("fullstory") ||
        (reason?.message?.includes("Failed to fetch") &&
          reason?.stack?.includes("fullstory")))
    ) {
      shouldSuppress = true;
      suppressionReason = "Third-party Promise";
    }

    if (shouldSuppress) {
      if (config.logSuppressedErrors) {
        console.debug(`🔇 Suppressed ${suppressionReason}:`, reason);
      }
      event.preventDefault();
      return false;
    }
  };

  // Add event listeners
  window.addEventListener("error", globalErrorHandler, { passive: true });
  window.addEventListener("unhandledrejection", rejectionHandler, {
    passive: true,
  });

  cleanupFunctions.push(() => {
    window.removeEventListener("error", globalErrorHandler);
    window.removeEventListener("unhandledrejection", rejectionHandler);
  });

  // Override console.error for development to reduce noise
  if (process.env.NODE_ENV === "development") {
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      const message = args.join(" ");

      // Suppress known development noise
      if (
        message.includes("Warning: Extra attributes from the server") ||
        message.includes("Warning: Prop") ||
        message.includes("ResizeObserver") ||
        message.includes("chrome-extension") ||
        message.includes("fullstory") ||
        message.includes("NEXT_REDIRECT")
      ) {
        if (config.logSuppressedErrors) {
          console.debug("🔇 Suppressed console error:", ...args);
        }
        return;
      }

      originalConsoleError.apply(console, args);
    };

    cleanupFunctions.push(() => {
      console.error = originalConsoleError;
    });
  }

  // Return cleanup function
  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
};

// Legacy function for backward compatibility
export const suppressResizeObserverErrors = () => {
  return suppressDevelopmentErrors({
    suppressResizeObserver: true,
    suppressNextRedirect: false,
    suppressBrowserExtensions: false,
    suppressThirdPartyScripts: false,
    suppressFetchErrors: false,
    suppressRSCErrors: false,
  });
};

// Auto-suppress common development errors
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  suppressDevelopmentErrors();
}

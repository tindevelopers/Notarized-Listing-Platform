/**
 * Utility to suppress ResizeObserver loop errors
 * These errors are harmless but can be annoying during development
 */

export const suppressResizeObserverErrors = () => {
  if (typeof window === "undefined") return;

  // Suppress ResizeObserver loop completed errors
  const resizeObserverErrorHandler = (event: ErrorEvent) => {
    const { message } = event;

    if (
      message?.includes(
        "ResizeObserver loop completed with undelivered notifications",
      ) ||
      message?.includes("ResizeObserver loop limit exceeded")
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
  };

  // Listen for global errors
  window.addEventListener("error", resizeObserverErrorHandler, {
    passive: true,
  });

  // Also handle unhandled promise rejections that might contain ResizeObserver errors
  const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    if (
      reason?.message?.includes("ResizeObserver") ||
      reason?.toString?.()?.includes("ResizeObserver")
    ) {
      event.preventDefault();
      console.warn("Suppressed ResizeObserver error:", reason);
    }
  };

  window.addEventListener("unhandledrejection", unhandledRejectionHandler, {
    passive: true,
  });

  // Return cleanup function
  return () => {
    window.removeEventListener("error", resizeObserverErrorHandler);
    window.removeEventListener("unhandledrejection", unhandledRejectionHandler);
  };
};

// For environments without React hooks - auto-suppress on client
if (typeof window !== "undefined") {
  suppressResizeObserverErrors();
}

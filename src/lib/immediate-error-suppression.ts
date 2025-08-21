/**
 * Immediate error suppression that runs as soon as this module is loaded
 * This catches errors that occur before React components mount
 */

import { errorMonitor } from "./error-monitor";

if (typeof window !== "undefined") {
  // Override console methods IMMEDIATELY before any other code runs
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.error = (...args: any[]) => {
    const message = args.join(" ");
    if (
      message.includes("ResizeObserver") ||
      message.toLowerCase().includes("resizeobserver") ||
      message.includes("loop completed with undelivered") ||
      message.includes("observer loop") ||
      /resize.*observer/i.test(message) ||
      /observer.*loop/i.test(message)
    ) {
      return; // Completely suppress
    }
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args.join(" ");
    if (
      message.includes("ResizeObserver") ||
      message.toLowerCase().includes("resizeobserver") ||
      message.includes("loop completed with undelivered") ||
      message.includes("observer loop") ||
      /resize.*observer/i.test(message) ||
      /observer.*loop/i.test(message)
    ) {
      return; // Completely suppress
    }
    originalConsoleWarn.apply(console, args);
  };

  // Immediate ResizeObserver error suppression
  const immediateErrorHandler = (event: ErrorEvent) => {
    const { message, error } = event;

    // Check for ResizeObserver errors with comprehensive patterns
    if (
      message?.includes(
        "ResizeObserver loop completed with undelivered notifications",
      ) ||
      message?.includes("ResizeObserver loop limit exceeded") ||
      message?.includes("ResizeObserver loop") ||
      message?.includes("ResizeObserver") ||
      error?.message?.includes("ResizeObserver") ||
      error?.name === "ResizeObserver" ||
      error?.constructor?.name === "ResizeObserver" ||
      message?.toLowerCase().includes("resizeobserver") ||
      error?.toString?.()?.includes("ResizeObserver") ||
      message?.includes("loop completed with undelivered") ||
      message?.includes("observer loop") ||
      /resize.*observer/i.test(message || "") ||
      /observer.*loop/i.test(message || "")
    ) {
      // Log the suppressed error
      errorMonitor.logError({
        type: "error",
        message: message || "ResizeObserver error",
        suppressed: true,
        reason: "ResizeObserver",
        details: { error, filename: event.filename },
      });

      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
  };

  // Immediate promise rejection handler
  const immediateRejectionHandler = (event: PromiseRejectionEvent) => {
    const reason = event.reason;

    if (
      reason?.message?.includes("ResizeObserver") ||
      reason?.toString?.()?.includes("ResizeObserver") ||
      reason?.name === "ResizeObserver" ||
      reason?.constructor?.name === "ResizeObserver" ||
      /resize.*observer/i.test(reason?.message || "") ||
      /observer.*loop/i.test(reason?.message || "") ||
      reason?.message?.includes("loop completed with undelivered") ||
      reason?.message?.includes("observer loop")
    ) {
      // Log the suppressed promise rejection
      errorMonitor.logError({
        type: "rejection",
        message:
          reason?.message || reason?.toString?.() || "ResizeObserver rejection",
        suppressed: true,
        reason: "ResizeObserver",
        details: { reason },
      });

      event.preventDefault();
      return false;
    }
  };

  // Add event listeners immediately
  window.addEventListener("error", immediateErrorHandler, { passive: true });
  window.addEventListener("unhandledrejection", immediateRejectionHandler, {
    passive: true,
  });

  // Console overrides are now handled immediately at the top of this file

  console.log("🛡️ Immediate ResizeObserver error suppression initialized");
}

export {}; // Make this a module

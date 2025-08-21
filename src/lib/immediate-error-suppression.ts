/**
 * Immediate error suppression that runs as soon as this module is loaded
 * This catches errors that occur before React components mount
 */

import { errorMonitor } from "./error-monitor";

if (typeof window !== "undefined") {
  // Immediate ResizeObserver error suppression
  const immediateErrorHandler = (event: ErrorEvent) => {
    const { message, error } = event;
    
    // Check for ResizeObserver errors with comprehensive patterns
    if (
      message?.includes("ResizeObserver loop completed with undelivered notifications") ||
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
      event.preventDefault();
      return false;
    }
  };

  // Add event listeners immediately
  window.addEventListener("error", immediateErrorHandler, { passive: true });
  window.addEventListener("unhandledrejection", immediateRejectionHandler, { passive: true });

  // Override console methods immediately for development
  if (process.env.NODE_ENV === "development") {
    const originalConsoleError = console.error;
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
        return; // Suppress completely
      }
      
      originalConsoleError.apply(console, args);
    };

    const originalConsoleWarn = console.warn;
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
        return; // Suppress completely
      }
      
      originalConsoleWarn.apply(console, args);
    };
  }

  console.log("🛡️ Immediate ResizeObserver error suppression initialized");
}

export {}; // Make this a module

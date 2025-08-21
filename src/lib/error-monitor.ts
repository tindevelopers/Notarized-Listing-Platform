/**
 * Error monitoring utility to track suppressed errors in development
 * This helps debug which errors are being caught and suppressed
 */

interface ErrorLog {
  type: "error" | "warning" | "rejection";
  message: string;
  timestamp: number;
  suppressed: boolean;
  reason?: string;
  details?: any;
}

class ErrorMonitor {
  private static instance: ErrorMonitor;
  private logs: ErrorLog[] = [];
  private maxLogs = 100; // Keep last 100 logs

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  private constructor() {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      // Add to window for debugging
      (window as any).__errorMonitor = this;
    }
  }

  logError(log: Omit<ErrorLog, "timestamp">) {
    const entry: ErrorLog = {
      ...log,
      timestamp: Date.now(),
    };

    this.logs.push(entry);

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console in development if it's a suppressed ResizeObserver error
    if (
      process.env.NODE_ENV === "development" &&
      log.suppressed &&
      log.reason === "ResizeObserver"
    ) {
      console.debug(
        `🔇 [${new Date(entry.timestamp).toTimeString()}] Suppressed ${log.reason}:`,
        log.message,
      );
    }
  }

  getSuppressedErrors(): ErrorLog[] {
    return this.logs.filter((log) => log.suppressed);
  }

  getRecentErrors(minutes: number = 5): ErrorLog[] {
    const cutoff = Date.now() - minutes * 60 * 1000;
    return this.logs.filter((log) => log.timestamp > cutoff);
  }

  getErrorsByType(type: ErrorLog["type"]): ErrorLog[] {
    return this.logs.filter((log) => log.type === type);
  }

  getErrorsByReason(reason: string): ErrorLog[] {
    return this.logs.filter((log) => log.reason === reason);
  }

  clearLogs(): void {
    this.logs = [];
  }

  getAllLogs(): ErrorLog[] {
    return [...this.logs];
  }

  printStats(): void {
    const total = this.logs.length;
    const suppressed = this.logs.filter((log) => log.suppressed).length;
    const byReason = this.logs.reduce(
      (acc, log) => {
        if (log.suppressed && log.reason) {
          acc[log.reason] = (acc[log.reason] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    console.group("🛡️ Error Suppression Stats");
    console.log(`Total errors logged: ${total}`);
    console.log(`Suppressed errors: ${suppressed}`);
    console.log("Suppressed by reason:", byReason);
    console.groupEnd();
  }
}

export const errorMonitor = ErrorMonitor.getInstance();

// Auto-setup in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // Add global debugging functions
  (window as any).printErrorStats = () => errorMonitor.printStats();
  (window as any).getResizeObserverErrors = () =>
    errorMonitor.getErrorsByReason("ResizeObserver");
  (window as any).clearErrorLogs = () => errorMonitor.clearLogs();

  console.log(
    "🔍 Error monitoring enabled. Use printErrorStats(), getResizeObserverErrors(), clearErrorLogs() in console",
  );
}

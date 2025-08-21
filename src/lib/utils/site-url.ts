
/**
 * Utility functions for site URL management
 * Handles both development and production URL configuration
 */

/**
 * Get the current site URL based on environment and request headers
 * Priority order:
 * 1. NEXT_PUBLIC_SITE_URL environment variable (production)
 * 2. Request origin header (dynamic)
 * 3. Localhost fallback (development)
 */
export function getSiteUrl(request?: Request): string {
  // First priority: explicit site URL from environment
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Second priority: origin from request headers
  if (request) {
    const origin = request.headers.get('origin') || request.headers.get('host');
    if (origin) {
      // If host header doesn't include protocol, add https for production-like domains
      if (origin.includes('vercel.app') || origin.includes('netlify.app') || origin.includes('heroku.com')) {
        return origin.startsWith('http') ? origin : `https://${origin}`;
      }
      return origin.startsWith('http') ? origin : `http://${origin}`;
    }
  }

  // Fallback to localhost for development
  return 'http://localhost:3000';
}

/**
 * Get the Supabase site URL for email redirects
 */
export function getSupabaseSiteUrl(): string {
  return process.env.SUPABASE_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

/**
 * Create a full URL path from base URL and path
 */
export function createUrl(basePath: string, request?: Request): string {
  const baseUrl = getSiteUrl(request);
  return `${baseUrl}${basePath.startsWith('/') ? basePath : `/${basePath}`}`;
}

/**
 * Validate if a URL is a valid production URL
 */
export function isProductionUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && !parsed.hostname.includes('localhost');
  } catch {
    return false;
  }
}

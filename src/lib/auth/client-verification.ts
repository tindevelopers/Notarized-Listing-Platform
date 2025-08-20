

"use client"

// Client-side verification utilities

// Generate secure verification token (client-side version)
export function generateVerificationToken(): string {
  // Use crypto.getRandomValues for client-side random token generation
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// Validate email address
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

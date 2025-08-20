

"use client"

// Client-side verification utilities

// Generate 6-digit verification code
export function generateVerificationCode(): string {
  // Generate a 6-digit random code
  const array = new Uint8Array(3)
  crypto.getRandomValues(array)
  
  // Convert to 6-digit string
  let code = ''
  for (let i = 0; i < 3; i++) {
    code += array[i].toString().padStart(2, '0')
  }
  
  // Ensure it's exactly 6 digits
  const number = parseInt(code) % 1000000
  return number.toString().padStart(6, '0')
}

// Legacy function name for backward compatibility
export function generateVerificationToken(): string {
  return generateVerificationCode()
}

// Validate email address
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

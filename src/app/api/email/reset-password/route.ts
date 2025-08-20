

import { NextRequest, NextResponse } from "next/server"
import { sendPasswordReset, isValidEmail, checkEmailRateLimit } from "@/lib/ses/email-service"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

// Validation schema
const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = resetPasswordSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Check rate limiting
    const rateCheck = checkEmailRateLimit(email)
    if (!rateCheck.allowed) {
      const remainingMinutes = Math.ceil((rateCheck.remainingTime || 0) / (1000 * 60))
      return NextResponse.json(
        { 
          error: "Too many email requests", 
          message: `Please wait ${remainingMinutes} minutes before requesting another email` 
        },
        { status: 429 }
      )
    }

    const supabase = await createClient()

    // Check if user exists (but don't reveal this to prevent email enumeration)
    // We'll always return success to prevent email enumeration attacks
    
    try {
      // Generate password reset token using Supabase
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${request.headers.get('origin') || 'http://localhost:3000'}/auth/reset-password`,
      })

      if (error) {
        console.error('Supabase password reset error:', error)
        // Still continue to try sending custom email
      }

      // Get user profile for name
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('email', email)
        .single()

      const userName = profiles?.full_name || email.split('@')[0]

      // Create reset link (you might want to implement your own token system)
      const baseUrl = request.headers.get('origin') || 'http://localhost:3000'
      const resetToken = generateResetToken() // Implement this function
      const resetLink = `${baseUrl}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

      // Store reset token in database with expiration (implement this)
      // await storePasswordResetToken(email, resetToken)

      // Send email
      const result = await sendPasswordReset(email, {
        userName,
        resetLink,
        supportEmail: process.env.SUPPORT_EMAIL || 'support@notarized.com'
      })

      if (!result.success) {
        console.error('Failed to send password reset email:', result.error)
        // Still return success to prevent email enumeration
      } else {
        console.log(`Password reset email sent successfully to ${email}`)
      }

    } catch (error) {
      console.error('Error processing password reset:', error)
      // Still return success to prevent email enumeration
    }

    // Always return success to prevent email enumeration attacks
    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, we've sent password reset instructions to it."
    })

  } catch (error) {
    console.error("Error in password reset endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Simple token generation function - in production, use a more secure method
function generateResetToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// TODO: Implement these functions for production use
// async function storePasswordResetToken(email: string, token: string) {
//   // Store in database with expiration (1 hour)
//   const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
//   // Implementation depends on your database setup
// }

// export async function verifyResetToken(token: string, email: string) {
//   // Verify token is valid and not expired
//   // Implementation depends on your database setup
// }

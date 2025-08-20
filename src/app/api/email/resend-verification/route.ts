

import { NextRequest, NextResponse } from "next/server"
import { sendEmailVerification, checkEmailRateLimit } from "@/lib/ses/email-service"
import { generateVerificationToken, storeVerificationToken } from "@/lib/auth/verification"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

// Validation schema
const resendVerificationSchema = z.object({
  email: z.string().email("Valid email is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = resendVerificationSchema.safeParse(body)
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

    // Check if user exists
    const supabase = await createClient()
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('email', email)
      .single()

    if (profileError || !profile) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, we've sent a new verification email."
      })
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken()
    
    // Store the token
    const storeResult = await storeVerificationToken(email, verificationToken, 'email_verification')
    
    if (!storeResult.success) {
      console.error('Failed to store verification token:', storeResult.error)
      return NextResponse.json(
        { error: "Failed to generate verification link" },
        { status: 500 }
      )
    }

    // Create verification link
    const baseUrl = request.headers.get('origin') || 'http://localhost:3000'
    const verificationLink = `${baseUrl}/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`

    // Send email
    const result = await sendEmailVerification(email, {
      userName: profile.full_name || email.split('@')[0],
      verificationLink,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@notarized.com'
    })

    if (!result.success) {
      console.error('Failed to resend verification email:', result.error)
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      )
    }

    console.log(`Verification email resent successfully to ${email}`)

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully"
    })

  } catch (error) {
    console.error("Error in resend verification endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

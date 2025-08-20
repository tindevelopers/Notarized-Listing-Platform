

import { NextRequest, NextResponse } from "next/server"
import { sendEmailVerification, isValidEmail, checkEmailRateLimit } from "@/lib/ses/email-service"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

// Validation schema
const verifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  userName: z.string().min(1, "User name is required"),
  verificationToken: z.string().min(1, "Verification token is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = verifyEmailSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      )
    }

    const { email, userName, verificationToken } = validation.data

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

    // Create verification link
    const baseUrl = request.headers.get('origin') || 'http://localhost:3000'
    const verificationLink = `${baseUrl}/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`

    // Send email
    const result = await sendEmailVerification(email, {
      userName,
      verificationLink,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@notarized.com'
    })

    if (!result.success) {
      console.error('Failed to send verification email:', result.error)
      return NextResponse.json(
        { error: "Failed to send verification email", details: result.error },
        { status: 500 }
      )
    }

    // Log successful send (don't expose messageId to client for security)
    console.log(`Verification email sent successfully to ${email}`)

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully"
    })

  } catch (error) {
    console.error("Error in email verification endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to check if email verification is needed
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Valid email parameter is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    // Check if user exists and if email is verified
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const isVerified = user.email_confirmed_at !== null
    
    return NextResponse.json({
      email: user.email,
      isVerified,
      needsVerification: !isVerified
    })

  } catch (error) {
    console.error("Error checking email verification status:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

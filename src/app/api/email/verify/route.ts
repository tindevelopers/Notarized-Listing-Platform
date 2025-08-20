

import { NextRequest, NextResponse } from "next/server"
import { sendEmailVerification, isValidEmail, checkEmailRateLimit } from "@/lib/ses/email-service"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

// Validation schema
const verifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  userName: z.string().min(1, "User name is required"),
  verificationCode: z.string().length(6, "Verification code must be 6 digits").regex(/^\d{6}$/, "Verification code must contain only digits"),
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

    const { email, userName, verificationCode } = validation.data

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

    // Store verification code in a simple in-memory store with expiration (15 minutes)
    ;(global as any).verificationCodes = (global as any).verificationCodes || new Map()
    ;(global as any).verificationCodes.set(email.toLowerCase(), {
      code: verificationCode,
      expiresAt: Date.now() + (15 * 60 * 1000), // 15 minutes
      createdAt: Date.now()
    })

    // Send email with verification code
    const result = await sendEmailVerification(email, {
      userName,
      verificationCode,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@notarized.com'
    })

    if (!result.success && !result.messageId) {
      // Only fail if it's a real error, not development mode
      console.error('Failed to send verification email:', result.error)
      return NextResponse.json(
        { error: "Failed to send verification email", details: result.error },
        { status: 500 }
      )
    }

    // Log successful send (don't expose messageId to client for security)
    if (result.messageId?.startsWith('dev-mode-')) {
      console.log(`📧 Verification email logged to console for ${email} (development mode)`)
    } else {
      console.log(`✅ Verification email sent successfully to ${email}`)
    }

    return NextResponse.json({
      success: true,
      message: result.messageId?.startsWith('dev-mode-') 
        ? "Verification email logged to console (development mode)" 
        : "Verification email sent successfully",
      error: result.error // Include development mode message if present
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

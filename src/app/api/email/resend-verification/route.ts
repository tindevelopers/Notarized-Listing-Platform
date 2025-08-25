import { NextRequest, NextResponse } from "next/server"
import { sendEmailVerification, checkEmailRateLimit } from "@/lib/ses/email-service"
import { 
  generateVerificationCode, 
  storeVerificationCode, 
  hasRecentVerificationCode 
} from "@/lib/auth/verification-codes"
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

    // Check rate limiting for emails
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

    // Check if user has requested a code recently (prevent spam)
    const recentCodeCheck = await hasRecentVerificationCode(email, 'email_verification', 1)
    if (recentCodeCheck.error) {
      console.error('Error checking recent verification codes:', recentCodeCheck.error)
    } else if (recentCodeCheck.hasRecent) {
      return NextResponse.json(
        { 
          error: "Verification code already sent", 
          message: "Please wait at least 1 minute before requesting another verification code" 
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

    // Generate new verification code
    const verificationCode = generateVerificationCode()
    
    // Store verification code in database with 15-minute expiration
    const expiresAt = new Date(Date.now() + (15 * 60 * 1000)) // 15 minutes
    const storeResult = await storeVerificationCode({
      email: email.toLowerCase(),
      code: verificationCode,
      type: 'email_verification',
      expiresAt
    })

    if (!storeResult.success) {
      console.error('Failed to store verification code:', storeResult.error)
      return NextResponse.json(
        { error: "Failed to generate verification code", details: storeResult.error },
        { status: 500 }
      )
    }

    // Send email
    const result = await sendEmailVerification(email, {
      userName: profile.full_name || email.split('@')[0],
      verificationCode: verificationCode,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@notarized.com'
    })

    if (!result.success && !result.messageId) {
      console.error('Failed to resend verification email:', result.error)
      return NextResponse.json(
        { error: "Failed to send verification email", details: result.error },
        { status: 500 }
      )
    }

    // Log successful send
    if (result.messageId?.startsWith('dev-mode-')) {
      console.log(`📧 Verification email resent and logged to console for ${email} (development mode)`)
    } else {
      console.log(`✅ Verification email resent successfully to ${email}`)
    }

    return NextResponse.json({
      success: true,
      message: result.messageId?.startsWith('dev-mode-') 
        ? "Verification email logged to console (development mode)" 
        : "Verification email sent successfully",
      // In development mode, include the verification code so the UI can display it
      ...(result.messageId?.startsWith('dev-mode-') && { 
        developmentMode: true,
        verificationCode: verificationCode 
      })
    })

  } catch (error) {
    console.error("Error in resend verification endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

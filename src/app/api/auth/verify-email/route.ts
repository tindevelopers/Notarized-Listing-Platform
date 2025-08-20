

import { NextRequest, NextResponse } from "next/server"
import { verifyToken, markEmailVerified } from "@/lib/auth/verification"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

// Validation schema
const verifyEmailRequestSchema = z.object({
  token: z.string().min(1, "Token is required"),
  email: z.string().email("Valid email is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = verifyEmailRequestSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      )
    }

    const { token, email } = validation.data

    // Verify the token
    const tokenVerification = await verifyToken(email, token, 'email_verification')
    
    if (!tokenVerification.valid) {
      if (tokenVerification.expired) {
        return NextResponse.json(
          { error: "Verification link has expired. Please request a new one." },
          { status: 410 } // Gone
        )
      }
      
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      )
    }

    // Mark email as verified
    const verificationResult = await markEmailVerified(email)
    
    if (!verificationResult.success) {
      console.error('Failed to mark email as verified:', verificationResult.error)
      return NextResponse.json(
        { error: "Failed to verify email. Please try again." },
        { status: 500 }
      )
    }

    // Update Supabase auth user email verification status if possible
    try {
      const supabase = await createClient()
      
      // Note: In production, you might need to use the Supabase Admin API
      // to update the user's email_confirmed_at field
      
      console.log(`Email verification completed for ${email}`)
      
    } catch (error) {
      console.error('Error updating Supabase auth status:', error)
      // Continue even if this fails - the main verification is done
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully"
    })

  } catch (error) {
    console.error("Error in email verification endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

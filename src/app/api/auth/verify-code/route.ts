import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { verifyVerificationCode } from "@/lib/auth/verification-codes"
import { z } from "zod"

export const dynamic = "force-dynamic"

// Validation schema for verification code
const verifyCodeSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().length(6, "Verification code must be 6 digits").regex(/^\d{6}$/, "Verification code must contain only digits"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = verifyCodeSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      )
    }

    const { email, code } = validation.data

    // Verify the code using our database helper
    const verificationResult = await verifyVerificationCode(
      email.toLowerCase(),
      code,
      'email_verification'
    )

    if (!verificationResult.valid) {
      if (verificationResult.expired) {
        return NextResponse.json(
          { error: "Verification code has expired. Please request a new code." },
          { status: 410 }
        )
      }
      
      return NextResponse.json(
        { 
          error: verificationResult.error || "Invalid verification code. Please check and try again." 
        },
        { status: 400 }
      )
    }

    // Code is valid - mark user as verified in Supabase
    const supabase = await createClient()
    
    try {
      // Get the user by email
      const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1000, // adjust as needed
      })

      if (getUserError) {
        console.error('Error getting users:', getUserError)
        return NextResponse.json(
          { error: "Unable to verify email at this time" },
          { status: 500 }
        )
      }

      const user = users?.find((u: any) => u.email === email)
      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        )
      }

      // Mark user as verified
      const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
        email_confirm: true
      })

      if (updateError) {
        console.error('Error updating user verification:', updateError)
        return NextResponse.json(
          { error: "Unable to verify email at this time" },
          { status: 500 }
        )
      }

      console.log(`✅ Email verified successfully for ${email}`)

      return NextResponse.json({
        success: true,
        message: "Email verified successfully"
      })

    } catch (supabaseError) {
      console.error('Supabase error:', supabaseError)
      return NextResponse.json(
        { error: "Unable to verify email at this time" },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("Error in code verification endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

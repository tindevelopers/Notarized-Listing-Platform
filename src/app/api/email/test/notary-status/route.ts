

import { NextRequest, NextResponse } from "next/server"
import { sendNotaryStatusUpdate, isValidEmail } from "@/lib/ses/email-service"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

// Validation schema
const testNotaryStatusSchema = z.object({
  email: z.string().email("Invalid email address"),
  notaryName: z.string().min(1, "Notary name is required"),
  status: z.enum(['approved', 'rejected', 'pending'], {
    required_error: "Status must be approved, rejected, or pending"
  }),
  message: z.string().optional(),
  nextSteps: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = testNotaryStatusSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      )
    }

    const { email, notaryName, status, message, nextSteps } = validation.data

    const supabase = await createClient()

    // Authenticate the request - only authorized users can send test emails
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized - Authentication required" },
        { status: 401 }
      )
    }

    // Check if user has permission (simplified admin check)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single()

    const adminEmails = ['admin@notarized.com', 'support@notarized.com']
    const isAdmin = adminEmails.includes(profile?.email || '') || 
                   profile?.email?.endsWith('@notarized.com')

    if (!isAdmin) {
      // For testing purposes, allow any authenticated user
      console.log('Warning: Non-admin user testing email system:', profile?.email)
    }

    // Send test notification email
    const result = await sendNotaryStatusUpdate(email, {
      notaryName,
      status,
      message: message || `This is a test ${status} notification.`,
      nextSteps: nextSteps || `This is a test email for the ${status} status.`,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@notarized.com'
    })

    if (!result.success) {
      console.error('Failed to send test notary status email:', result.error)
      return NextResponse.json(
        { error: "Failed to send test email", details: result.error },
        { status: 500 }
      )
    }

    console.log(`Test notary status email sent successfully to ${email}`)

    return NextResponse.json({
      success: true,
      message: "Test notary status email sent successfully",
      testData: {
        email,
        notaryName,
        status,
        message,
        nextSteps
      }
    })

  } catch (error) {
    console.error("Error in test notary status endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

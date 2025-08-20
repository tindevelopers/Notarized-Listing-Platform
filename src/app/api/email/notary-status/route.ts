

import { NextRequest, NextResponse } from "next/server"
import { sendNotaryStatusUpdate, isValidEmail } from "@/lib/ses/email-service"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

// Validation schema
const notaryStatusSchema = z.object({
  email: z.string().email("Invalid email address"),
  notaryId: z.string().min(1, "Notary ID is required"),
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
    const validation = notaryStatusSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      )
    }

    const { email, notaryId, status, message, nextSteps } = validation.data

    const supabase = await createClient()

    // Authenticate the request - only authorized users can send status updates
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized - Authentication required" },
        { status: 401 }
      )
    }

    // Check if user has permission to send notifications (e.g., admin role)
    // This is a simplified check - implement proper role-based authorization
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single()

    // For now, let's check if the user is an admin based on email domain or specific emails
    const adminEmails = ['admin@notarized.com', 'support@notarized.com']
    const isAdmin = adminEmails.includes(profile?.email || '') || 
                   profile?.email?.endsWith('@notarized.com')

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      )
    }

    // Get notary information
    const { data: notary, error: notaryError } = await supabase
      .from('notaries')
      .select(`
        *,
        profiles!notaries_profile_id_fkey (
          full_name,
          email
        )
      `)
      .eq('id', notaryId)
      .single()

    if (notaryError || !notary) {
      return NextResponse.json(
        { error: "Notary not found" },
        { status: 404 }
      )
    }

    const notaryProfile = notary.profiles as any
    const notaryName = notaryProfile?.full_name || notaryProfile?.email?.split('@')[0] || 'Notary'
    const notaryEmail = email || notaryProfile?.email

    if (!notaryEmail) {
      return NextResponse.json(
        { error: "Notary email not found" },
        { status: 400 }
      )
    }

    // Update notary verification status in database
    const { error: updateError } = await supabase
      .from('notaries')
      .update({
        verification_status: status,
        updated_at: new Date().toISOString(),
        is_verified: status === 'approved'
      })
      .eq('id', notaryId)

    if (updateError) {
      console.error('Error updating notary status:', updateError)
      return NextResponse.json(
        { error: "Failed to update notary status" },
        { status: 500 }
      )
    }

    // Send notification email
    const result = await sendNotaryStatusUpdate(notaryEmail, {
      notaryName,
      status,
      message,
      nextSteps,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@notarized.com'
    })

    if (!result.success) {
      console.error('Failed to send notary status email:', result.error)
      return NextResponse.json(
        { error: "Failed to send notification email", details: result.error },
        { status: 500 }
      )
    }

    console.log(`Notary status email sent successfully to ${notaryEmail} for notary ${notaryId}`)

    return NextResponse.json({
      success: true,
      message: "Notary status updated and notification sent successfully",
      notaryId,
      status,
      emailSent: true
    })

  } catch (error) {
    console.error("Error in notary status endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve notary status history (optional)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const notaryId = searchParams.get('notaryId')

    if (!notaryId) {
      return NextResponse.json(
        { error: "Notary ID parameter is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Authenticate the request
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get notary information with current status
    const { data: notary, error } = await supabase
      .from('notaries')
      .select(`
        id,
        verification_status,
        is_verified,
        updated_at,
        profiles!notaries_profile_id_fkey (
          full_name,
          email
        )
      `)
      .eq('id', notaryId)
      .single()

    if (error || !notary) {
      return NextResponse.json(
        { error: "Notary not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      notaryId: notary.id,
      status: notary.verification_status,
      isVerified: notary.is_verified,
      lastUpdated: notary.updated_at,
      notaryInfo: notary.profiles
    })

  } catch (error) {
    console.error("Error in notary status GET endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

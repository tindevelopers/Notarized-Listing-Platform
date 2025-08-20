

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Authenticate the request - only authorized users can access applications
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized - Authentication required" },
        { status: 401 }
      )
    }

    // Check if user has admin permissions
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single()

    // Simple admin check - in production, implement proper role-based authorization
    const adminEmails = ['admin@notarized.com', 'support@notarized.com']
    const isAdmin = adminEmails.includes(profile?.email || '') || 
                   profile?.email?.endsWith('@notarized.com')

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      )
    }

    // Fetch notary applications with profile information
    const { data: applications, error } = await supabase
      .from('notaries')
      .select(`
        id,
        city,
        state,
        phone,
        business_name,
        verification_status,
        is_verified,
        created_at,
        commission_number,
        years_experience,
        profiles!notaries_profile_id_fkey (
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching notary applications:', error)
      return NextResponse.json(
        { error: "Failed to fetch applications" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      applications: applications || [],
      total: applications?.length || 0
    })

  } catch (error) {
    console.error("Error in notary applications endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

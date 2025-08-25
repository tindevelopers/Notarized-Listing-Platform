import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get the current user session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const userEmail = session.user.email;
    const adminEmails = [
      'admin@notarized.com',
      'superadmin@notarized.com',
      'support@notarized.com'
    ];

    const isAdmin = adminEmails.includes(userEmail || '') || 
                   userEmail?.endsWith('@notarized.com') ||
                   session.user.user_metadata?.role === 'superadmin';

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    // For now, return mock data
    // In a real implementation, this would query the notaries table
    const applications = [
      {
        id: '1',
        full_name: 'John Smith',
        email: 'john.smith@example.com',
        state: 'California',
        commission_number: 'CA123456',
        status: 'pending',
        submitted_at: '2024-01-15T10:00:00Z',
        documents: ['commission_certificate.pdf', 'bond_document.pdf']
      },
      {
        id: '2',
        full_name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        state: 'Texas',
        commission_number: 'TX789012',
        status: 'approved',
        submitted_at: '2024-01-10T14:30:00Z',
        documents: ['commission_certificate.pdf', 'bond_document.pdf', 'seal_image.jpg']
      }
    ];

    /* 
    // Real implementation would query the database like this:
    
    const { data: applications, error } = await supabase
      .from('notaries')
      .select(`
        id,
        profile_id,
        commission_number,
        verification_status,
        created_at,
        profiles!inner(
          full_name,
          email
        )
      `)
      .eq('verification_status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch applications" },
        { status: 500 }
      );
    }
    */

    return NextResponse.json({
      applications,
      total: applications.length
    });

  } catch (error) {
    console.error("Admin notary applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { applicationId, action, notes } = await request.json();

    const supabase = await createClient();

    // Get the current user session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const userEmail = session.user.email;
    const adminEmails = [
      'admin@notarized.com',
      'superadmin@notarized.com',
      'support@notarized.com'
    ];

    const isAdmin = adminEmails.includes(userEmail || '') || 
                   userEmail?.endsWith('@notarized.com') ||
                   session.user.user_metadata?.role === 'superadmin';

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    // Validate action
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    // For now, return success response
    // In a real implementation, this would update the notaries table
    
    /* 
    // Real implementation would update the database like this:
    
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    
    const { error } = await supabase
      .from('notaries')
      .update({
        verification_status: newStatus,
        verification_notes: notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update application" },
        { status: 500 }
      );
    }
    */

    return NextResponse.json({
      success: true,
      message: `Application ${action}d successfully`,
      applicationId,
      action,
      notes
    });

  } catch (error) {
    console.error("Admin application action error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

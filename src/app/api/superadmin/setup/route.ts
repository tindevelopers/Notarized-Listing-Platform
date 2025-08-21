import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { setupKey, email, password, fullName } = await request.json();

    // Security check - only allow setup with special key
    if (setupKey !== process.env.SUPERADMIN_SETUP_KEY) {
      return NextResponse.json(
        { error: "Invalid setup key" },
        { status: 403 }
      );
    }

    const supabase = await createClient();

    // Check if superadmin already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const superAdminExists = existingUsers?.users?.some((user: User) =>
      user.email === email ||
      user.email?.endsWith('@notarized.com') ||
      ['admin@notarized.com', 'superadmin@notarized.com', 'support@notarized.com'].includes(user.email || '')
    );

    if (superAdminExists) {
      return NextResponse.json(
        { error: "Superadmin user already exists" },
        { status: 400 }
      );
    }

    // Create superadmin user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: {
        full_name: fullName,
        role: 'superadmin',
        is_superadmin: true,
      },
      email_confirm: true,
    });

    if (createError) {
      return NextResponse.json(
        { error: "Failed to create superadmin user", details: createError.message },
        { status: 500 }
      );
    }

    // Create profile in profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: newUser.user.id,
        email: email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error("Failed to create profile:", profileError);
      // Don't fail the request if profile creation fails
    }

    return NextResponse.json({
      success: true,
      message: "Superadmin user created successfully",
      user: {
        id: newUser.user.id,
        email: newUser.user.email,
        full_name: fullName,
      }
    });

  } catch (error) {
    console.error("Superadmin setup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Check if any superadmin users exist
    const { data: users } = await supabase.auth.admin.listUsers();
    const superAdminExists = users?.users?.some(user => 
      user.email?.endsWith('@notarized.com') ||
      ['admin@notarized.com', 'superadmin@notarized.com', 'support@notarized.com'].includes(user.email || '') ||
      user.user_metadata?.role === 'superadmin'
    );

    return NextResponse.json({
      superadmin_exists: !!superAdminExists,
      setup_required: !superAdminExists,
    });

  } catch (error) {
    console.error("Superadmin check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

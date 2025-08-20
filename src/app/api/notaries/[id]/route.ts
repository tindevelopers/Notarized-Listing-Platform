
import { NextRequest, NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getMockNotaryWithReviews } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: { id: string };
}

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = params;

    // Use mock data if Supabase is not configured
    if (!isSupabaseConfigured) {
      const result = getMockNotaryWithReviews(id);
      if (!result) {
        return NextResponse.json(
          { error: "Notary not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(result);
    }

    const supabase = await createClient();

    // First try to find by ID (UUID format)
    let { data: notary, error } = await supabase
      .from("notaries")
      .select(`
        *,
        profiles (
          id,
          full_name,
          email,
          avatar_url
        ),
        reviews (
          id,
          rating,
          comment,
          service_date,
          created_at,
          profiles (
            id,
            full_name,
            avatar_url
          )
        )
      `)
      .eq("id", id)
      .single();

    // If not found by ID and the identifier looks like a slug, try finding by name
    if (error?.code === 'PGRST116' && id.includes('-')) {
      // Get all notaries and find by slug
      const { data: allNotaries } = await supabase
        .from("notaries")
        .select(`
          *,
          profiles (
            id,
            full_name,
            email,
            avatar_url
          ),
          reviews (
            id,
            rating,
            comment,
            service_date,
            created_at,
            profiles (
              id,
              full_name,
              avatar_url
            )
          )
        `);

      if (allNotaries) {
        notary = allNotaries.find((n: any) => {
          const slug = generateSlug(n.profiles?.full_name || '');
          return slug === id;
        });
        error = notary ? null : { code: 'PGRST116', message: 'No rows found' };
      }
    }

    if (error) {
      // If tables don't exist, fall back to mock data
      if (error.code === 'PGRST205' && error.message?.includes('schema cache')) {
        const result = getMockNotaryWithReviews(id);
        if (result) {
          return NextResponse.json(result);
        }
      }
      
      return NextResponse.json(
        { error: "Notary not found" },
        { status: 404 }
      );
    }

    if (!notary) {
      return NextResponse.json(
        { error: "Notary not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ notary });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get("q");
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const zipCode = searchParams.get("zip");
    const service = searchParams.get("service");
    const radius = parseInt(searchParams.get("radius") || "25");
    const limit = parseInt(searchParams.get("limit") || "20");
    
    if (!query && !state && !city && !zipCode) {
      return NextResponse.json(
        { error: "At least one search parameter is required" },
        { status: 400 }
      );
    }

    let supabaseQuery = supabase
      .from("notaries")
      .select(`
        *,
        profiles (
          id,
          full_name,
          email,
          avatar_url
        )
      `)
      .eq("is_verified", true)
      .order("rating", { ascending: false })
      .limit(limit);

    // Text search across multiple fields
    if (query) {
      supabaseQuery = supabaseQuery.or(`
        business_name.ilike.%${query}%,
        description.ilike.%${query}%,
        city.ilike.%${query}%,
        services.cs.{${query}}
      `);
    }

    // Location filters
    if (state) {
      supabaseQuery = supabaseQuery.eq("state", state.toUpperCase());
    }
    
    if (city) {
      supabaseQuery = supabaseQuery.ilike("city", `%${city}%`);
    }
    
    if (zipCode) {
      supabaseQuery = supabaseQuery.eq("zip_code", zipCode);
    }
    
    if (service) {
      supabaseQuery = supabaseQuery.contains("services", [service]);
    }

    const { data: notaries, error } = await supabaseQuery;

    if (error) {
      console.error("Error searching notaries:", error);
      return NextResponse.json(
        { error: "Failed to search notaries" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      notaries: notaries || [],
      total: notaries?.length || 0,
      query: {
        q: query,
        state,
        city,
        zipCode,
        service,
        radius,
        limit
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

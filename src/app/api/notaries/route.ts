
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    const city = searchParams.get("city");
    const state = searchParams.get("state");
    const service = searchParams.get("service");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
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
      .range(offset, offset + limit - 1);

    // Apply filters
    if (city) {
      query = query.ilike("city", `%${city}%`);
    }
    
    if (state) {
      query = query.eq("state", state.toUpperCase());
    }
    
    if (service) {
      query = query.contains("services", [service]);
    }

    const { data: notaries, error, count } = await query;

    if (error) {
      console.error("Error fetching notaries:", error);
      return NextResponse.json(
        { error: "Failed to fetch notaries" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      notaries: notaries || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  try {
    const supabase = await createClient();
    const { id } = params;

    const { data: notary, error } = await supabase
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

    if (error) {
      console.error("Error fetching notary:", error);
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


import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

const checkVerificationSchema = z.object({
  email: z.string().email("Invalid email address")
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    const validation = checkVerificationSchema.safeParse({ email })
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid email parameter" },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    try {
      // Get all users and find the one with matching email
      const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      })

      if (getUserError) {
        console.error('Error getting users:', getUserError)
        return NextResponse.json(
          { error: "Unable to check verification status" },
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

      const isVerified = user.email_confirmed_at !== null

      return NextResponse.json({
        email: user.email,
        isVerified,
        user_id: user.id
      })

    } catch (supabaseError) {
      console.error('Supabase error:', supabaseError)
      return NextResponse.json(
        { error: "Unable to check verification status" },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("Error in check verification endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

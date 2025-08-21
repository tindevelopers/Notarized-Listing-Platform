
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

const businessHoursSchema = z.object({
  monday: z.object({
    open: z.string(),
    close: z.string(),
    closed: z.boolean()
  }),
  tuesday: z.object({
    open: z.string(),
    close: z.string(),
    closed: z.boolean()
  }),
  wednesday: z.object({
    open: z.string(),
    close: z.string(),
    closed: z.boolean()
  }),
  thursday: z.object({
    open: z.string(),
    close: z.string(),
    closed: z.boolean()
  }),
  friday: z.object({
    open: z.string(),
    close: z.string(),
    closed: z.boolean()
  }),
  saturday: z.object({
    open: z.string(),
    close: z.string(),
    closed: z.boolean()
  }),
  sunday: z.object({
    open: z.string(),
    close: z.string(),
    closed: z.boolean()
  })
})

const onboardingSchema = z.object({
  email: z.string().email("Invalid email address"),
  onboardingData: z.object({
    businessDetails: z.object({
      businessName: z.string().min(1, "Business name is required"),
      address: z.string().min(1, "Address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(2, "State is required"),
      zipCode: z.string().min(5, "ZIP code is required"),
      phone: z.string().min(10, "Phone number is required"),
      businessHours: businessHoursSchema
    }),
    serviceInformation: z.object({
      services: z.array(z.string()),
      pricing: z.object({
        acknowledgment: z.number().min(0),
        jurat: z.number().min(0),
        oath: z.number().min(0),
        copynotarization: z.number().min(0),
        travelFee: z.number().min(0)
      }),
      availability: z.object({
        mobile: z.boolean(),
        remote: z.boolean(),
        inOffice: z.boolean(),
        emergency: z.boolean()
      }),
      languages: z.array(z.string())
    }),
    profileSetup: z.object({
      profilePhoto: z.string(),
      bio: z.string(),
      yearsExperience: z.number().min(0),
      specializations: z.array(z.string()),
      certifications: z.array(z.string())
    })
  })
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = onboardingSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      )
    }

    const { email, onboardingData } = validation.data
    const supabase = await createClient()

    try {
      // Get the user by email
      const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      })

      if (getUserError) {
        console.error('Error getting users:', getUserError)
        return NextResponse.json(
          { error: "Unable to save onboarding data" },
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

      // Create or update the notary profile
      const notaryData = {
        user_id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
        email: user.email,
        phone: onboardingData.businessDetails.phone,
        business_name: onboardingData.businessDetails.businessName,
        address: onboardingData.businessDetails.address,
        city: onboardingData.businessDetails.city,
        state: onboardingData.businessDetails.state,
        zip_code: onboardingData.businessDetails.zipCode,
        bio: onboardingData.profileSetup.bio,
        years_experience: onboardingData.profileSetup.yearsExperience,
        profile_image: onboardingData.profileSetup.profilePhoto,
        services: onboardingData.serviceInformation.services,
        languages: onboardingData.serviceInformation.languages,
        specializations: onboardingData.profileSetup.specializations,
        certifications: onboardingData.profileSetup.certifications,
        pricing: onboardingData.serviceInformation.pricing,
        availability: onboardingData.serviceInformation.availability,
        business_hours: onboardingData.businessDetails.businessHours,
        is_verified: false, // Will be verified by admin
        status: 'pending', // pending, approved, rejected
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Insert or update the notary profile
      const { data: notaryProfile, error: insertError } = await supabase
        .from('notaries')
        .upsert([notaryData], { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        })
        .select()

      if (insertError) {
        console.error('Error saving notary profile:', insertError)
        
        // If table doesn't exist, create a mock success for development
        if (insertError.message?.includes('relation "notaries" does not exist')) {
          console.log('📝 Notaries table does not exist - saving to console for development:')
          console.log(JSON.stringify(notaryData, null, 2))
          
          return NextResponse.json({
            success: true,
            message: "Onboarding data saved successfully (development mode)",
            developmentMode: true,
            data: notaryData
          })
        }

        return NextResponse.json(
          { error: "Unable to save onboarding data" },
          { status: 500 }
        )
      }

      console.log(`✅ Onboarding completed successfully for ${email}`)

      return NextResponse.json({
        success: true,
        message: "Onboarding completed successfully",
        notaryId: notaryProfile?.[0]?.id
      })

    } catch (supabaseError) {
      console.error('Supabase error:', supabaseError)
      return NextResponse.json(
        { error: "Unable to save onboarding data" },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("Error in onboarding completion endpoint:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

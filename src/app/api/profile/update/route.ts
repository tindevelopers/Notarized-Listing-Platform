
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  userId: z.string().min(1, 'User ID is required'),
})

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to update your profile' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    // Ensure user can only update their own profile
    if (session.user.id !== validatedData.userId) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'You can only update your own profile' },
        { status: 403 }
      )
    }

    // Combine first name and last name into full_name
    const fullName = `${validatedData.firstName} ${validatedData.lastName}`.trim()

    // Check if email is being changed and if it's different from current
    const isEmailChanged = validatedData.email !== session.user.email

    // Update profile in database
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        email: validatedData.email,
        updated_at: new Date().toISOString(),
      })
      .eq('id', validatedData.userId)
      .select()
      .single()

    if (profileError) {
      console.error('Profile update error:', profileError)
      return NextResponse.json(
        { 
          error: 'Database error', 
          message: 'Failed to update profile in database',
          details: profileError.message 
        },
        { status: 500 }
      )
    }

    // If email was changed, also update it in Supabase Auth
    if (isEmailChanged) {
      try {
        const { error: authUpdateError } = await supabase.auth.updateUser({
          email: validatedData.email,
          data: {
            full_name: fullName,
          },
        })

        if (authUpdateError) {
          console.error('Auth update error:', authUpdateError)
          
          // Revert the profile update if auth update failed
          await supabase
            .from('profiles')
            .update({
              email: session.user.email, // revert to original email
              updated_at: new Date().toISOString(),
            })
            .eq('id', validatedData.userId)

          return NextResponse.json(
            { 
              error: 'Auth update failed', 
              message: 'Failed to update email in authentication system',
              details: authUpdateError.message 
            },
            { status: 500 }
          )
        }

        // Note: When email is updated in Supabase Auth, it typically requires email confirmation
        console.log('✅ Email update initiated. User may need to confirm new email address.')
      } catch (authError: any) {
        console.error('Unexpected auth error:', authError)
        return NextResponse.json(
          { 
            error: 'Auth system error', 
            message: 'Unexpected error updating authentication data',
            details: authError?.message || 'Unknown auth error' 
          },
          { status: 500 }
        )
      }
    } else {
      // If email wasn't changed, just update the user metadata
      try {
        await supabase.auth.updateUser({
          data: {
            full_name: fullName,
          },
        })
      } catch (metadataError: any) {
        // This is not critical, so we'll log it but not fail the request
        console.warn('Failed to update user metadata:', metadataError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      profile: profileData,
      emailChanged: isEmailChanged,
    })

  } catch (error: any) {
    console.error('Profile update error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error', 
          message: 'Invalid data provided',
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'An unexpected error occurred while updating your profile',
        details: error?.message || 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

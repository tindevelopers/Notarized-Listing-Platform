
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from '@/components/profile/profile-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError || !session?.user) {
    redirect('/auth/signin')
  }

  // Fetch user profile data
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  // If profile doesn't exist, create one with basic user data
  let userProfile = profile
  if (!profile && !profileError) {
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({
        id: session.user.id,
        email: session.user.email || '',
        full_name: session.user.user_metadata?.full_name || null,
      })
      .select()
      .single()
    
    if (!createError) {
      userProfile = newProfile
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Update your personal information and password
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your profile details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm 
              initialData={{
                email: userProfile?.email || session.user.email || '',
                full_name: userProfile?.full_name || session.user.user_metadata?.full_name || '',
                avatar_url: userProfile?.avatar_url || session.user.user_metadata?.avatar_url || null,
              }}
              userId={session.user.id}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

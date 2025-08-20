
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'your-supabase-url-here' && 
  supabaseKey !== 'your-supabase-anon-key-here' &&
  supabaseUrl.startsWith('https://')

export function createClient() {
  if (!isSupabaseConfigured) {
    // Return a mock client that throws helpful errors
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: new Error('Supabase not configured') }),
        getUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
        signUp: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
        signInWithPassword: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: new Error('Supabase not configured') }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }),
      })
    } as any
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}

export const supabase = createClient()

export { isSupabaseConfigured }

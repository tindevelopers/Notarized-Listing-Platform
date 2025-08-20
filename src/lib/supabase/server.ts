
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
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

export async function createClient() {
  if (!isSupabaseConfigured) {
    // Return a mock client that provides fallback behavior
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: new Error('Supabase not configured') }),
        getUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({ 
            single: async () => ({ data: null, error: new Error('Supabase not configured') }),
            order: () => ({
              range: async () => ({ data: [], error: new Error('Supabase not configured'), count: 0 }),
            }),
            limit: async () => ({ data: [], error: new Error('Supabase not configured') }),
          }),
          ilike: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }),
          contains: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }),
          or: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }),
        }),
        insert: () => ({ select: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }) }),
      })
    } as any
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export { isSupabaseConfigured }

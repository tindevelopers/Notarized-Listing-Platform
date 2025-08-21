
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import { 
  env, 
  isSupabaseConfigured, 
  configValidation, 
  logSupabaseConfig,
  getSupabaseConfigInstructions
} from './config'


// Log configuration status for debugging (server-side)
logSupabaseConfig('server')

export async function createClient() {
  if (!isSupabaseConfigured) {
    console.error('[Supabase Server] Configuration error:', configValidation.error)
    
    const instructions = getSupabaseConfigInstructions()
    console.error('[Supabase Server] Fix instructions:', instructions)
    
    // Return a mock client that provides fallback behavior
    const errorMessage = `Supabase not configured: ${configValidation.error}`
    
    return {
      auth: {
        getSession: async () => ({ 
          data: { session: null }, 
          error: new Error(errorMessage) 
        }),
        getUser: async () => ({ 
          data: { user: null }, 
          error: new Error(errorMessage) 
        }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({ 
            single: async () => ({ 
              data: null, 
              error: new Error(errorMessage) 
            }),
            order: () => ({
              range: async () => ({ 
                data: [], 
                error: new Error(errorMessage), 
                count: 0 
              }),
            }),
            limit: async () => ({ 
              data: [], 
              error: new Error(errorMessage) 
            }),
          }),
          ilike: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error(errorMessage) }) }) }),
          contains: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error(errorMessage) }) }) }),
          or: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error(errorMessage) }) }) }),
        }),
        insert: () => ({ select: () => ({ single: async () => ({ data: null, error: new Error(errorMessage) }) }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: async () => ({ data: null, error: new Error(errorMessage) }) }) }) }),
      })
    } as any
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(
    env.supabaseUrl!,
    env.supabaseAnonKey!,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
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

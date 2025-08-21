
import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { Database } from '@/types/supabase'
import { 
  env, 
  isSupabaseConfigured, 
  configValidation,
  logSupabaseConfig 
} from './config'

// Log configuration status for debugging (middleware runs on server)
logSupabaseConfig('server')

export function createClient(request: NextRequest, response: NextResponse) {
  if (!isSupabaseConfigured) {
    console.error('[Supabase Middleware] Configuration error:', configValidation.error)
    
    // Return a mock client that provides fallback behavior for middleware
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
    } as any
  }

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
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )
}

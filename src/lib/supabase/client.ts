
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'
import { 
  env, 
  isSupabaseConfigured, 
  configValidation, 
  logSupabaseConfig,
  getSupabaseConfigInstructions
} from './config'

// Log configuration status for debugging
logSupabaseConfig('client')

export function createClient() {
  if (!isSupabaseConfigured) {
    console.error('[Supabase Client] Configuration error:', configValidation.error)
    
    const instructions = getSupabaseConfigInstructions()
    console.error('[Supabase Client] Fix instructions:', instructions)
    
    // Return a mock client that throws helpful errors
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
        signUp: async () => ({ 
          data: { user: null }, 
          error: new Error(errorMessage) 
        }),
        signInWithPassword: async () => ({ 
          data: { user: null }, 
          error: new Error(errorMessage) 
        }),
        signOut: async () => ({ 
          error: new Error(errorMessage) 
        }),
        onAuthStateChange: () => ({ 
          data: { subscription: { unsubscribe: () => {} } } 
        }),
      },
      from: () => ({
        select: () => ({ 
          eq: () => ({ 
            single: async () => ({ 
              data: null, 
              error: new Error(errorMessage) 
            }) 
          }) 
        }),
      })
    } as any
  }

  return createBrowserClient<Database>(env.supabaseUrl!, env.supabaseAnonKey!)
}

export const supabase = createClient()

export { isSupabaseConfigured }

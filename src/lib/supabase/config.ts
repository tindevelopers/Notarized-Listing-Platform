
/**
 * Supabase configuration utilities and environment validation
 * This file provides centralized configuration validation and debugging tools
 */

// Environment variables
export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  nodeEnv: process.env.NODE_ENV
}

// Enhanced environment variable validation
export function validateSupabaseConfig() {
  const { supabaseUrl, supabaseAnonKey } = env

  if (!supabaseUrl) {
    return { 
      isValid: false, 
      error: 'NEXT_PUBLIC_SUPABASE_URL environment variable is not set',
      code: 'MISSING_URL'
    }
  }
  
  if (!supabaseAnonKey) {
    return { 
      isValid: false, 
      error: 'NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is not set',
      code: 'MISSING_KEY'
    }
  }
  
  if (supabaseUrl === 'your-supabase-url-here' || supabaseUrl === 'https://your-project-id.supabase.co') {
    return { 
      isValid: false, 
      error: 'NEXT_PUBLIC_SUPABASE_URL contains placeholder value',
      code: 'PLACEHOLDER_URL'
    }
  }
  
  if (supabaseAnonKey === 'your-supabase-anon-key-here' || supabaseAnonKey === 'your-anon-key-here') {
    return { 
      isValid: false, 
      error: 'NEXT_PUBLIC_SUPABASE_ANON_KEY contains placeholder value',
      code: 'PLACEHOLDER_KEY'
    }
  }
  
  if (!supabaseUrl.startsWith('https://')) {
    return { 
      isValid: false, 
      error: 'NEXT_PUBLIC_SUPABASE_URL must start with https://',
      code: 'INVALID_URL_PROTOCOL'
    }
  }
  
  if (!supabaseUrl.includes('.supabase.co')) {
    return { 
      isValid: false, 
      error: 'NEXT_PUBLIC_SUPABASE_URL must be a valid Supabase URL',
      code: 'INVALID_URL_FORMAT'
    }
  }
  
  return { isValid: true, code: 'OK' }
}

// Configuration status
export const configValidation = validateSupabaseConfig()
export const isSupabaseConfigured = configValidation.isValid

// Debug helper function
export function logSupabaseConfig(context: 'client' | 'server' = 'client') {
  const config = {
    configured: isSupabaseConfigured,
    error: configValidation.error,
    errorCode: configValidation.code,
    hasUrl: !!env.supabaseUrl,
    hasKey: !!env.supabaseAnonKey,
    urlPreview: env.supabaseUrl ? `${env.supabaseUrl.substring(0, 30)}...` : 'undefined',
    keyPreview: env.supabaseAnonKey ? `${env.supabaseAnonKey.substring(0, 20)}...` : 'undefined',
    nodeEnv: env.nodeEnv,
    context
  }

  if (context === 'client' && typeof window !== 'undefined') {
    console.log('[Supabase Config] Client-side status:', config)
  } else if (context === 'server') {
    console.log('[Supabase Config] Server-side status:', config)
  }

  return config
}

// Production deployment helper
export function getSupabaseConfigInstructions() {
  const { code } = configValidation
  
  const instructions = {
    'MISSING_URL': {
      issue: 'NEXT_PUBLIC_SUPABASE_URL is not set',
      solution: 'Add NEXT_PUBLIC_SUPABASE_URL to your environment variables',
      example: 'NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co'
    },
    'MISSING_KEY': {
      issue: 'NEXT_PUBLIC_SUPABASE_ANON_KEY is not set',
      solution: 'Add NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables',
      example: 'NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here'
    },
    'PLACEHOLDER_URL': {
      issue: 'Supabase URL contains placeholder value',
      solution: 'Replace with your actual Supabase project URL',
      example: 'Get it from Supabase Dashboard > Settings > API'
    },
    'PLACEHOLDER_KEY': {
      issue: 'Supabase anon key contains placeholder value',
      solution: 'Replace with your actual Supabase anon key',
      example: 'Get it from Supabase Dashboard > Settings > API'
    },
    'INVALID_URL_PROTOCOL': {
      issue: 'Supabase URL must use HTTPS',
      solution: 'Ensure your URL starts with https://',
      example: 'https://your-project.supabase.co'
    },
    'INVALID_URL_FORMAT': {
      issue: 'Invalid Supabase URL format',
      solution: 'Use the official Supabase project URL format',
      example: 'https://your-project-id.supabase.co'
    },
    'OK': {
      issue: 'Configuration is valid',
      solution: 'No action needed',
      example: ''
    }
  }

  return instructions[code as keyof typeof instructions] || {
    issue: 'Unknown configuration error',
    solution: 'Check all environment variables',
    example: ''
  }
}

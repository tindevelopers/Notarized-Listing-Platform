import { createClient } from "@/lib/supabase/server"
import { Tables, TablesInsert } from "@/types/supabase"

export type VerificationCodeType = 'email_verification' | 'password_reset'

export interface VerificationCodeData {
  email: string
  code: string
  type: VerificationCodeType
  expiresAt: Date
}

// Generate a 6-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Store verification code in database
export async function storeVerificationCode(
  data: VerificationCodeData
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    
    // First, clean up any existing codes for this email and type
    await supabase
      .from('verification_codes')
      .delete()
      .eq('email', data.email)
      .eq('type', data.type)
    
    // Insert new verification code
    const insertData: TablesInsert<'verification_codes'> = {
      email: data.email,
      code: data.code,
      type: data.type,
      expires_at: data.expiresAt.toISOString(),
      used: false
    }

    const { error } = await supabase
      .from('verification_codes')
      .insert(insertData)

    if (error) {
      console.error('Error storing verification code:', error)
      return { 
        success: false, 
        error: error.message 
      }
    }

    console.log(`Stored ${data.type} code for ${data.email} (expires: ${data.expiresAt})`)
    return { success: true }
    
  } catch (error) {
    console.error('Error storing verification code:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Verify and consume verification code
export async function verifyVerificationCode(
  email: string, 
  code: string, 
  type: VerificationCodeType
): Promise<{ valid: boolean; expired?: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    
    // Find the verification code
    const { data: verificationCode, error: fetchError } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('type', type)
      .eq('used', false)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        // No matching record found
        return { valid: false, error: 'Invalid verification code' }
      }
      console.error('Error fetching verification code:', fetchError)
      return { valid: false, error: 'Database error' }
    }

    // Check if code has expired
    const now = new Date()
    const expiresAt = new Date(verificationCode.expires_at)
    
    if (now > expiresAt) {
      // Mark as used to prevent reuse
      await supabase
        .from('verification_codes')
        .update({ used: true, updated_at: now.toISOString() })
        .eq('id', verificationCode.id)
      
      return { valid: false, expired: true, error: 'Verification code has expired' }
    }

    // Mark code as used
    const { error: updateError } = await supabase
      .from('verification_codes')
      .update({ used: true, updated_at: now.toISOString() })
      .eq('id', verificationCode.id)

    if (updateError) {
      console.error('Error marking verification code as used:', updateError)
      return { valid: false, error: 'Failed to process verification code' }
    }

    console.log(`Successfully verified ${type} code for ${email}`)
    return { valid: true }
    
  } catch (error) {
    console.error('Error verifying verification code:', error)
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Get valid verification code for email and type (for development/testing)
export async function getVerificationCode(
  email: string, 
  type: VerificationCodeType
): Promise<{ code?: string; error?: string }> {
  try {
    const supabase = await createClient()
    
    const { data: verificationCode, error } = await supabase
      .from('verification_codes')
      .select('code, expires_at')
      .eq('email', email)
      .eq('type', type)
      .eq('used', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return { error: 'No valid verification code found' }
      }
      return { error: error.message }
    }

    return { code: verificationCode.code }
    
  } catch (error) {
    console.error('Error getting verification code:', error)
    return { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Clean up expired verification codes (run periodically)
export async function cleanupExpiredVerificationCodes(): Promise<{ deletedCount: number; error?: string }> {
  try {
    const supabase = await createClient()
    
    const now = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('verification_codes')
      .delete()
      .lt('expires_at', now)
      .select('id')

    if (error) {
      console.error('Error cleaning up expired verification codes:', error)
      return { deletedCount: 0, error: error.message }
    }

    const deletedCount = data?.length || 0
    console.log(`Cleaned up ${deletedCount} expired verification codes`)
    
    return { deletedCount }
    
  } catch (error) {
    console.error('Error cleaning up expired verification codes:', error)
    return { 
      deletedCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Check if verification code exists for email (for rate limiting)
export async function hasRecentVerificationCode(
  email: string, 
  type: VerificationCodeType,
  withinMinutes: number = 1
): Promise<{ hasRecent: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    
    const cutoffTime = new Date(Date.now() - withinMinutes * 60 * 1000).toISOString()
    
    const { data, error } = await supabase
      .from('verification_codes')
      .select('id')
      .eq('email', email)
      .eq('type', type)
      .gte('created_at', cutoffTime)
      .limit(1)

    if (error) {
      console.error('Error checking recent verification codes:', error)
      return { hasRecent: false, error: error.message }
    }

    return { hasRecent: (data?.length || 0) > 0 }
    
  } catch (error) {
    console.error('Error checking recent verification codes:', error)
    return { 
      hasRecent: false,
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

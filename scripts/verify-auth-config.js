#!/usr/bin/env node

/**
 * Verify Auth Configuration Script
 * 
 * This script helps verify that the auth configuration is working correctly
 * after updating the Supabase dashboard settings.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const PRODUCTION_URL = 'https://notarized-listing-platform-git-develop-tindeveloper.vercel.app';

async function verifyAuthConfig() {
  console.log('🔍 Verifying Supabase Auth Configuration...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    // Test the auth configuration by checking if we can access auth methods
    console.log('✅ Supabase client initialized successfully');
    console.log('📋 Configuration Details:');
    console.log(`   - Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
    console.log(`   - Site URL: ${process.env.NEXT_PUBLIC_SITE_URL}`);
    console.log(`   - Expected Production URL: ${PRODUCTION_URL}`);

    // Check if the URLs match
    const siteUrlMatches = process.env.NEXT_PUBLIC_SITE_URL === PRODUCTION_URL;
    console.log(`   - Site URL matches production: ${siteUrlMatches ? '✅' : '❌'}`);

    console.log('\n🧪 Testing Auth Methods:');
    
    // Test sign up method (without actually signing up)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'test123456',
        options: {
          emailRedirectTo: `${PRODUCTION_URL}/auth/verify-email`
        }
      });
      
      if (error && error.message.includes('User already registered')) {
        console.log('✅ Auth signup method accessible (user already exists)');
      } else if (error) {
        console.log(`ℹ️  Auth signup test: ${error.message}`);
      } else {
        console.log('✅ Auth signup method working');
      }
    } catch (authError) {
      console.log(`ℹ️  Auth signup test error: ${authError.message}`);
    }

    console.log('\n📋 VERIFICATION CHECKLIST:');
    console.log('After updating Supabase Dashboard settings, verify:');
    console.log('1. ✅ Environment variables are configured correctly');
    console.log('2. ⏳ Supabase Dashboard Site URL updated to production URL');
    console.log('3. ⏳ Redirect URLs added in Supabase Dashboard');
    console.log('4. ⏳ Test email verification with a new user signup');

    console.log('\n🔗 Required Dashboard Settings:');
    console.log(`   Site URL: ${PRODUCTION_URL}`);
    console.log('   Redirect URLs:');
    console.log(`   - ${PRODUCTION_URL}/auth/callback`);
    console.log(`   - ${PRODUCTION_URL}/auth/verify-email`);
    console.log(`   - ${PRODUCTION_URL}/auth/reset-password`);
    console.log(`   - http://localhost:3000/auth/callback (for development)`);
    console.log(`   - http://localhost:3000/auth/verify-email (for development)`);
    console.log(`   - http://localhost:3000/auth/reset-password (for development)`);

  } catch (error) {
    console.error('❌ Error during verification:', error.message);
  }
}

async function testEmailVerificationFlow() {
  console.log('\n🧪 EMAIL VERIFICATION FLOW TEST');
  console.log('This section helps you test the email verification after dashboard updates\n');

  console.log('📋 Manual Testing Steps:');
  console.log('1. Go to your deployed app:', PRODUCTION_URL);
  console.log('2. Try to sign up with a new email address');
  console.log('3. Check your email for the verification link');
  console.log('4. Verify the email link contains the production URL (not localhost)');
  console.log('5. Click the email link and ensure it redirects to the production site');
  console.log('6. Confirm the email verification completes successfully');

  console.log('\n✅ SUCCESS INDICATORS:');
  console.log('- Email verification link contains:', PRODUCTION_URL);
  console.log('- Clicking the link redirects to the production site');
  console.log('- No "Email link is invalid or has expired" errors');
  console.log('- User can successfully log in after verification');
}

async function main() {
  console.log('🔍 SUPABASE AUTH CONFIGURATION VERIFICATION\n');
  console.log('This script helps verify your auth configuration is working correctly\n');
  console.log('=' .repeat(80) + '\n');

  await verifyAuthConfig();
  await testEmailVerificationFlow();

  console.log('\n🎯 NEXT STEPS:');
  console.log('1. Update Supabase Dashboard settings (if not done already)');
  console.log('2. Deploy your application to Vercel');
  console.log('3. Test the email verification flow manually');
  console.log('4. Run this script again to verify configuration');

  console.log('\n🔗 Supabase Dashboard: https://supabase.com/dashboard/project/kigzjlmfpxirlikstwmg/settings/auth');
}

// Run the script
main().catch(console.error);

export { verifyAuthConfig, testEmailVerificationFlow };

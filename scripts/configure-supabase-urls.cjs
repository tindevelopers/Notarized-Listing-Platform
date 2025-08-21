
/**
 * Supabase URL Configuration Script
 * 
 * This script provides instructions and verification for setting up
 * the correct site URLs in Supabase to fix email verification links.
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PRODUCTION_URL = 'https://notarized-listing-platform-git-develop-tindeveloper.vercel.app';
const LOCALHOST_URL = 'http://localhost:3000';

function checkEnvironmentConfig() {
  console.log('🔍 Checking Environment Configuration...\n');
  
  const config = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    supabaseSiteUrl: process.env.SUPABASE_SITE_URL,
  };

  console.log('Environment Variables:');
  console.log(`- NEXT_PUBLIC_SUPABASE_URL: ${config.supabaseUrl}`);
  console.log(`- NEXT_PUBLIC_SITE_URL: ${config.siteUrl}`);
  console.log(`- SUPABASE_SITE_URL: ${config.supabaseSiteUrl}\n`);

  return config;
}

function printSupabaseDashboardInstructions() {
  console.log('📋 SUPABASE DASHBOARD CONFIGURATION REQUIRED\n');
  console.log('To fix email verification links, you MUST update these settings in your Supabase dashboard:\n');
  
  console.log('🔗 Step-by-Step Instructions:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project: kigzjlmfpxirlikstwmg');
  console.log('3. Navigate to Settings > Auth');
  console.log('4. Find the "Site URL" field');
  console.log(`5. Change the Site URL from localhost to: ${PRODUCTION_URL}`);
  console.log('6. Find the "Redirect URLs" section');
  console.log('7. Add these redirect URLs:');
  console.log(`   - ${PRODUCTION_URL}/auth/callback`);
  console.log(`   - ${PRODUCTION_URL}/auth/verify-email`);
  console.log(`   - ${PRODUCTION_URL}/auth/reset-password`);
  console.log(`   - ${LOCALHOST_URL}/auth/callback (for development)`);
  console.log(`   - ${LOCALHOST_URL}/auth/verify-email (for development)`);
  console.log(`   - ${LOCALHOST_URL}/auth/reset-password (for development)`);
  console.log('8. Click "Save"\n');

  console.log('⚠️  IMPORTANT NOTES:');
  console.log('- The Site URL is the primary setting that affects email links');
  console.log('- This change will fix the "access_denied" error in email verification');
  console.log('- After making these changes, new emails will use the correct URLs');
  console.log('- Existing email links will still have the old localhost URL\n');
}

function printEnvironmentInstructions() {
  console.log('🌍 ENVIRONMENT VARIABLE SETUP (COMPLETED)\n');
  console.log('✅ The following environment variables have been added to your .env file:');
  console.log(`- NEXT_PUBLIC_SITE_URL=${PRODUCTION_URL}`);
  console.log(`- SUPABASE_SITE_URL=${PRODUCTION_URL}`);
  console.log('- SUPPORT_EMAIL=support@notarized.com\n');
}

function printVerificationInstructions() {
  console.log('✅ VERIFICATION STEPS\n');
  console.log('After updating the Supabase dashboard settings:');
  console.log('1. Deploy your application to Vercel (if not already done)');
  console.log('2. Test the sign-up process with a new email address');
  console.log('3. Check that the verification email contains the correct production URL');
  console.log('4. Verify that clicking the email link redirects to the production site\n');
}

function main() {
  console.log('🔧 SUPABASE EMAIL VERIFICATION FIX\n');
  console.log('This script helps configure Supabase to use the correct production URLs\n');
  console.log('=' .repeat(80) + '\n');

  checkEnvironmentConfig();
  printEnvironmentInstructions();
  printSupabaseDashboardInstructions();
  printVerificationInstructions();

  console.log('🎯 SUMMARY:');
  console.log('1. ✅ Environment variables have been configured in your .env file');
  console.log('2. ✅ API routes have been updated to use production URLs');
  console.log('3. ✅ Supabase client configuration has been updated');
  console.log('4. ⏳ Manual step required: Update Supabase dashboard settings');
  console.log('5. ⏳ Deploy the application to make changes live\n');

  console.log('🚀 Once completed, email verification links will work correctly!');
}

if (require.main === module) {
  main();
}

module.exports = { 
  checkEnvironmentConfig, 
  printSupabaseDashboardInstructions,
  PRODUCTION_URL,
  LOCALHOST_URL 
};

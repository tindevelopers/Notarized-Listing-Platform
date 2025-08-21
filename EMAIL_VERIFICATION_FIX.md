# Email Verification Fix - Complete Guide

## Problem Summary
Email verification links from Supabase are pointing to `localhost:3000` instead of the production URL `https://notarized-listing-platform-git-develop-tindeveloper.vercel.app`, causing "Email link is invalid or has expired" errors.

## Current Status ✅
- **Environment Variables**: ✅ Properly configured
- **Application Code**: ✅ Ready for production URLs
- **Supabase Dashboard**: ⏳ **REQUIRES MANUAL UPDATE**

## Required Action: Update Supabase Dashboard Settings

### Step-by-Step Instructions

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `kigzjlmfpxirlikstwmg`

2. **Navigate to Auth Settings**
   - Go to: Settings → Auth
   - Or direct link: https://supabase.com/dashboard/project/kigzjlmfpxirlikstwmg/settings/auth

3. **Update Site URL**
   - Find the "Site URL" field
   - Change from: `http://localhost:3000`
   - Change to: `https://notarized-listing-platform-git-develop-tindeveloper.vercel.app`

4. **Add Redirect URLs**
   - Find the "Redirect URLs" section
   - Add these URLs (one per line):
   ```
   https://notarized-listing-platform-git-develop-tindeveloper.vercel.app/auth/callback
   https://notarized-listing-platform-git-develop-tindeveloper.vercel.app/auth/verify-email
   https://notarized-listing-platform-git-develop-tindeveloper.vercel.app/auth/reset-password
   http://localhost:3000/auth/callback
   http://localhost:3000/auth/verify-email
   http://localhost:3000/auth/reset-password
   ```

5. **Save Changes**
   - Click the "Save" button
   - Wait for the confirmation message

## Verification Steps

After updating the dashboard settings:

1. **Test Email Verification**
   - Go to: https://notarized-listing-platform-git-develop-tindeveloper.vercel.app
   - Sign up with a new email address
   - Check your email for the verification link
   - Verify the link contains the production URL (not localhost)
   - Click the link and ensure it works correctly

2. **Run Verification Script**
   ```bash
   cd /home/ubuntu/Notarized-Listing-Platform
   node scripts/verify-auth-config.js
   ```

## Important Notes

- **Site URL** is the primary setting that affects email links
- This change will fix the "access_denied" error in email verification
- After making these changes, **new emails** will use the correct URLs
- **Existing email links** will still have the old localhost URL
- Users with pending verification emails will need new verification emails

## Environment Variables (Already Configured ✅)

Your `.env` file already contains the correct configuration:

```env
NEXT_PUBLIC_SITE_URL=https://notarized-listing-platform-git-develop-tindeveloper.vercel.app
SUPABASE_SITE_URL=https://notarized-listing-platform-git-develop-tindeveloper.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://kigzjlmfpxirlikstwmg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Troubleshooting

If you still experience issues after updating the dashboard:

1. **Clear Browser Cache**: Clear your browser cache and cookies
2. **Check Email Links**: Ensure new verification emails contain the production URL
3. **Verify Deployment**: Make sure your latest code is deployed to Vercel
4. **Test with New Email**: Use a completely new email address for testing

## Scripts Available

- `scripts/configure-supabase-urls.cjs` - Shows configuration instructions
- `scripts/fix-auth-config.js` - Attempts programmatic fix (requires manual dashboard update)
- `scripts/verify-auth-config.js` - Verifies configuration after dashboard update

## Success Indicators

✅ Email verification links contain the production URL  
✅ Clicking email links redirects to the production site  
✅ No "Email link is invalid or has expired" errors  
✅ Users can successfully log in after email verification  

---

**Next Step**: Update the Supabase Dashboard settings as described above, then test the email verification flow.

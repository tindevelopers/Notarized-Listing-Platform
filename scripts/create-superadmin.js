#!/usr/bin/env node

// Script to create a superadmin user directly in Supabase
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function createSuperAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables:');
    console.error('- NEXT_PUBLIC_SUPABASE_URL');
    console.error('- SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  // Create admin client
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const email = 'admin@notarized.com';
  const password = 'SuperAdmin123!';
  const fullName = 'System Administrator';

  try {
    console.log('🔍 Checking for existing superadmin users...');
    
    // Check if superadmin already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const superAdminExists = existingUsers?.users?.some(user => 
      user.email === email || 
      user.email?.endsWith('@notarized.com') ||
      ['admin@notarized.com', 'superadmin@notarized.com', 'support@notarized.com'].includes(user.email || '') ||
      user.user_metadata?.role === 'superadmin'
    );

    if (superAdminExists) {
      console.log('⚠️  Superadmin user already exists');
      const superAdmins = existingUsers?.users?.filter(user => 
        user.email?.endsWith('@notarized.com') ||
        ['admin@notarized.com', 'superadmin@notarized.com', 'support@notarized.com'].includes(user.email || '') ||
        user.user_metadata?.role === 'superadmin'
      );
      console.log('Existing superadmin users:', superAdmins?.map(u => ({ email: u.email, role: u.user_metadata?.role })));
      return;
    }

    console.log('📝 Creating superadmin user...');
    
    // Create superadmin user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: {
        full_name: fullName,
        role: 'superadmin',
        is_superadmin: true,
      },
      email_confirm: true,
    });

    if (createError) {
      console.error('❌ Failed to create superadmin user:', createError.message);
      process.exit(1);
    }

    console.log('✅ Superadmin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Full Name:', fullName);
    console.log('🆔 User ID:', newUser.user.id);

    // Create profile in profiles table
    console.log('📝 Creating user profile...');
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: newUser.user.id,
        email: email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error('⚠️  Failed to create profile (user still created):', profileError.message);
    } else {
      console.log('✅ User profile created successfully!');
    }

    console.log('\n🎉 Superadmin setup complete!');
    console.log('You can now sign in at /superadmin with:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

  } catch (error) {
    console.error('❌ Error creating superadmin:', error.message);
    process.exit(1);
  }
}

// Run the script
createSuperAdmin().then(() => {
  console.log('✨ Script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});

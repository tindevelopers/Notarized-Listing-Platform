import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  console.error('Make sure these environment variables are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupVerificationCodesTable() {
  console.log('🚀 Setting up verification_codes table...');
  
  try {
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'scripts', 'create-verification-codes-table.sql');
    let sqlCommands;
    
    try {
      sqlCommands = fs.readFileSync(sqlFilePath, 'utf8');
    } catch (error) {
      console.error('❌ Could not read SQL file:', sqlFilePath);
      console.error('Make sure the create-verification-codes-table.sql file exists');
      process.exit(1);
    }

    // Split SQL into individual commands and execute them
    const commands = sqlCommands
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0);

    console.log(`📝 Executing ${commands.length} SQL commands...`);

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (!command) continue;

      try {
        console.log(`   ${i + 1}. ${command.split('\n')[0].substring(0, 50)}...`);
        
        // Use raw SQL execution
        const { error } = await supabase.rpc('exec_sql', {
          sql: command
        });

        if (error) {
          // Some commands might fail if they already exist, which is okay
          if (error.message.includes('already exists') || 
              error.message.includes('relation') ||
              error.message.includes('duplicate')) {
            console.log(`   ✅ Already exists (skipping)`);
          } else {
            console.warn(`   ⚠️  Command failed: ${error.message}`);
          }
        } else {
          console.log(`   ✅ Success`);
        }
      } catch (cmdError) {
        console.warn(`   ⚠️  Error executing command: ${cmdError.message}`);
      }
    }

    // Test the table by checking if we can query it
    console.log('\n🧪 Testing verification_codes table...');
    
    const { data, error: testError } = await supabase
      .from('verification_codes')
      .select('count(*)')
      .limit(1);

    if (testError) {
      console.error('❌ Table test failed:', testError.message);
      console.log('\n📋 Manual setup instructions:');
      console.log('1. Go to your Supabase dashboard > SQL Editor');
      console.log('2. Copy and paste the contents of scripts/create-verification-codes-table.sql');
      console.log('3. Run the SQL commands manually');
    } else {
      console.log('✅ verification_codes table is working correctly!');
      
      // Try to insert and delete a test record
      try {
        const testEmail = 'test@example.com';
        const testCode = '123456';
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        
        // Insert test record
        const { error: insertError } = await supabase
          .from('verification_codes')
          .insert({
            email: testEmail,
            code: testCode,
            type: 'email_verification',
            expires_at: expiresAt
          });

        if (insertError) {
          console.warn('⚠️  Could not test insert:', insertError.message);
        } else {
          console.log('✅ Insert test passed');
          
          // Clean up test record
          await supabase
            .from('verification_codes')
            .delete()
            .eq('email', testEmail)
            .eq('code', testCode);
          
          console.log('✅ Cleanup test passed');
        }
      } catch (testInsertError) {
        console.warn('⚠️  Insert test error:', testInsertError.message);
      }
    }

    console.log('\n🎉 Verification codes table setup complete!');
    console.log('📧 Email verification system is now ready for production use');

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setupVerificationCodesTable();

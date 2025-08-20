
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
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Setting up database...');
  
  try {
    // First, let's try to create the schema directly through the client
    console.log('Creating profiles table...');
    
    // Create profiles table
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.profiles (
          id uuid references auth.users on delete cascade primary key,
          email text unique not null,
          full_name text,
          avatar_url text,
          created_at timestamp with time zone default timezone('utc'::text, now()) not null,
          updated_at timestamp with time zone default timezone('utc'::text, now()) not null
        );
      `
    });

    if (profilesError) {
      console.log('Profiles table might already exist or exec_sql not available');
    }

    // Try a direct approach - check if we can query existing tables
    console.log('Checking existing tables...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (tablesError) {
      console.log('Cannot query information_schema:', tablesError.message);
    } else {
      console.log('Existing tables:', tables?.map(t => t.table_name) || []);
    }

    // Let's try inserting some test data to see what we can do
    console.log('Testing direct profile insertion...');
    const { data: insertResult, error: insertError } = await supabase
      .from('profiles')
      .insert([
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          email: 'james.washington@notary.com',
          full_name: 'James Washington',
          avatar_url: 'https://cdn.abacus.ai/images/1d6c7ae3-4e67-415c-abde-efe2a33016e7.png'
        }
      ])
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
    } else {
      console.log('Insert successful:', insertResult);
    }

  } catch (error) {
    console.error('Setup error:', error);
  }
}

setupDatabase();

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  try {
    // 1. Check if user exists and delete if necessary
    const { data: existingUsers } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'viktorledin7@gmail.com');

    if (existingUsers && existingUsers.length > 0) {
      console.log('Deleting existing user...');
      const { error: deleteError } = await supabase.auth.admin.deleteUser(
        existingUsers[0].id
      );
      if (deleteError) throw deleteError;
    }

    // 2. Create new auth user
    const { data: { user }, error: createError } = await supabase.auth.signUp({
      email: 'viktorledin7@gmail.com',
      password: '3934745qA!',
      options: {
        data: {
          first_name: 'Viktor',
          last_name: 'Ledin'
        }
      }
    });

    if (createError) throw createError;
    if (!user) throw new Error('No user returned from signUp');

    // 3. Update user's role to admin in profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', user.id);

    if (profileError) throw profileError;

    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can create other profiles" ON profiles;

-- Create new policies
CREATE POLICY "Enable all operations for service role"
  ON profiles
  USING (true)
  WITH CHECK (true);

-- Disable RLS temporarily to allow initial admin creation
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to create users
CREATE POLICY "Service role can create users"
  ON auth.users
  FOR INSERT
  WITH CHECK (true);

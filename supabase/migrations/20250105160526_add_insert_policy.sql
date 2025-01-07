-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;

-- Create policy to allow service role to insert profiles
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);  -- The service role bypasses RLS anyway, but we need a policy to allow inserts

-- Also add a policy for admin creation
CREATE POLICY "Admins can create other profiles"
  ON profiles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

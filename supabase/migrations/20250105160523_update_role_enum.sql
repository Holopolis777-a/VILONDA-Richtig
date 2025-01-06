-- Update any existing 'user' roles to 'member'
UPDATE profiles 
SET role = 'member'::user_role 
WHERE role::text = 'user';

-- Add constraint to ensure role is one of the allowed values
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

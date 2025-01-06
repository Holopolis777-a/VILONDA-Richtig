-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view regular vehicles" ON regular_vehicles;
  DROP POLICY IF EXISTS "Admins can insert regular vehicles" ON regular_vehicles;
  DROP POLICY IF EXISTS "Admins can update regular vehicles" ON regular_vehicles;
  DROP POLICY IF EXISTS "Admins can delete regular vehicles" ON regular_vehicles;

  DROP POLICY IF EXISTS "Anyone can view pool vehicles" ON pool_vehicles;
  DROP POLICY IF EXISTS "Admins can insert pool vehicles" ON pool_vehicles;
  DROP POLICY IF EXISTS "Admins can update pool vehicles" ON pool_vehicles;
  DROP POLICY IF EXISTS "Admins can delete pool vehicles" ON pool_vehicles;

  DROP POLICY IF EXISTS "Anyone can view salary vehicles" ON salary_vehicles;
  DROP POLICY IF EXISTS "Admins can insert salary vehicles" ON salary_vehicles;
  DROP POLICY IF EXISTS "Admins can update salary vehicles" ON salary_vehicles;
  DROP POLICY IF EXISTS "Admins can delete salary vehicles" ON salary_vehicles;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create updated RLS policies
DO $$ 
BEGIN
  -- Regular vehicles policies
  CREATE POLICY "Anyone can view regular vehicles"
    ON regular_vehicles FOR SELECT
    USING (true);
    
  CREATE POLICY "Admins can insert regular vehicles"
    ON regular_vehicles FOR INSERT
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
    
  CREATE POLICY "Admins can update regular vehicles"
    ON regular_vehicles FOR UPDATE
    USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
    
  CREATE POLICY "Admins can delete regular vehicles"
    ON regular_vehicles FOR DELETE
    USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );

  -- Pool vehicles policies
  CREATE POLICY "Anyone can view pool vehicles"
    ON pool_vehicles FOR SELECT
    USING (true);
    
  CREATE POLICY "Admins can insert pool vehicles"
    ON pool_vehicles FOR INSERT
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
    
  CREATE POLICY "Admins can update pool vehicles"
    ON pool_vehicles FOR UPDATE
    USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
    
  CREATE POLICY "Admins can delete pool vehicles"
    ON pool_vehicles FOR DELETE
    USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );

  -- Salary vehicles policies  
  CREATE POLICY "Anyone can view salary vehicles"
    ON salary_vehicles FOR SELECT
    USING (true);
    
  CREATE POLICY "Admins can insert salary vehicles"
    ON salary_vehicles FOR INSERT
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
    
  CREATE POLICY "Admins can update salary vehicles"
    ON salary_vehicles FOR UPDATE
    USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
    
  CREATE POLICY "Admins can delete salary vehicles"
    ON salary_vehicles FOR DELETE
    USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

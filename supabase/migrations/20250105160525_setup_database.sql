-- Create enum type first
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'broker', 'member', 'employer', 'employee', 'salary-employee');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create profiles table with enum type
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role user_role NOT NULL DEFAULT 'member'::user_role,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();

-- Create trigger to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE handle_new_user();

-- Update any existing 'user' roles to 'member'
UPDATE profiles 
SET role = 'member'::user_role 
WHERE role::text = 'user';

-- Create vehicle tables if they don't exist
CREATE TABLE IF NOT EXISTS regular_vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'available',
  color text,
  mileage integer DEFAULT 0,
  fuel_type text NOT NULL,
  transmission text NOT NULL,
  power integer NOT NULL,
  engine_size integer,
  electric_range integer,
  equipment_variant text NOT NULL,
  delivery_time integer NOT NULL,
  standard_equipment text,
  monthly_starting_rate decimal(10,2),
  gross_list_price decimal(10,2) NOT NULL,
  custom_equipment jsonb DEFAULT '[]'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  custom_features jsonb DEFAULT '{}'::jsonb,
  available_colors jsonb DEFAULT '[]'::jsonb,
  services jsonb NOT NULL DEFAULT '{"insurance":true,"maintenance":true,"delivery":true,"winterTires":true,"gap":true,"roadside":true,"damageManagement":true}'::jsonb,
  service_prices jsonb NOT NULL DEFAULT '{"insurance":89,"maintenance":59,"winterTires":39,"gap":19,"roadside":15,"damageManagement":29}'::jsonb,
  leasing_rates jsonb NOT NULL DEFAULT '{"36_10000":0,"36_15000":0,"36_20000":0,"48_10000":0,"48_15000":0,"48_20000":0}'::jsonb,
  one_time_costs jsonb NOT NULL DEFAULT '{"registration":0,"homeDelivery":0,"transfer":0}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS pool_vehicles (
  LIKE regular_vehicles INCLUDING ALL
);

CREATE TABLE IF NOT EXISTS salary_vehicles (
  LIKE regular_vehicles INCLUDING ALL
);

-- Enable RLS
ALTER TABLE regular_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pool_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_vehicles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
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

-- Create RLS policies
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_regular_vehicles_make_model ON regular_vehicles(make, model);
CREATE INDEX IF NOT EXISTS idx_regular_vehicles_status ON regular_vehicles(status);
CREATE INDEX IF NOT EXISTS idx_regular_vehicles_type ON regular_vehicles(type);
CREATE INDEX IF NOT EXISTS idx_regular_vehicles_fuel_type ON regular_vehicles(fuel_type);

CREATE INDEX IF NOT EXISTS idx_pool_vehicles_make_model ON pool_vehicles(make, model);
CREATE INDEX IF NOT EXISTS idx_pool_vehicles_status ON pool_vehicles(status);
CREATE INDEX IF NOT EXISTS idx_pool_vehicles_type ON pool_vehicles(type);
CREATE INDEX IF NOT EXISTS idx_pool_vehicles_fuel_type ON pool_vehicles(fuel_type);

CREATE INDEX IF NOT EXISTS idx_salary_vehicles_make_model ON salary_vehicles(make, model);
CREATE INDEX IF NOT EXISTS idx_salary_vehicles_status ON salary_vehicles(status);
CREATE INDEX IF NOT EXISTS idx_salary_vehicles_type ON salary_vehicles(type);
CREATE INDEX IF NOT EXISTS idx_salary_vehicles_fuel_type ON salary_vehicles(fuel_type);

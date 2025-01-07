-- Add VIN field to all vehicle tables
ALTER TABLE regular_vehicles ADD COLUMN IF NOT EXISTS vin text;
ALTER TABLE pool_vehicles ADD COLUMN IF NOT EXISTS vin text;
ALTER TABLE salary_vehicles ADD COLUMN IF NOT EXISTS vin text;

-- Add index for VIN search
CREATE INDEX IF NOT EXISTS idx_regular_vehicles_vin ON regular_vehicles(vin);
CREATE INDEX IF NOT EXISTS idx_pool_vehicles_vin ON pool_vehicles(vin);
CREATE INDEX IF NOT EXISTS idx_salary_vehicles_vin ON salary_vehicles(vin);

-- Add unique constraint to prevent duplicate VINs
ALTER TABLE regular_vehicles ADD CONSTRAINT uq_regular_vehicles_vin UNIQUE (vin);
ALTER TABLE pool_vehicles ADD CONSTRAINT uq_pool_vehicles_vin UNIQUE (vin);
ALTER TABLE salary_vehicles ADD CONSTRAINT uq_salary_vehicles_vin UNIQUE (vin);

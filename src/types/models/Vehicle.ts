import { Database } from '../../lib/database.types';

// Base vehicle type from database
type BaseVehicle = Database['public']['Tables']['regular_vehicles']['Row'];

// Custom features interface
export interface VehicleCustomFeatures {
  assigned_to?: string;
  requested_by?: string;
  salary_details?: {
    grossSalary: number;
    deductions: {
      monthly: number;
      annual: number;
      taxBenefit: number;
      insuranceDeduction: number;
      maintenanceDeduction: number;
    };
  };
  deductions?: {
    monthly: number;
    annual: number;
    taxBenefit: number;
    insuranceDeduction: number;
    maintenanceDeduction: number;
  };
  [key: string]: any;
}

// Extended vehicle types with typed custom_features
export interface Vehicle extends Omit<BaseVehicle, 'custom_features'> {
  custom_features: VehicleCustomFeatures;
}

export interface PoolVehicle extends Vehicle {
  custom_features: VehicleCustomFeatures & {
    assigned_to: string | null;
  };
}

export interface SalaryVehicle extends Vehicle {
  custom_features: VehicleCustomFeatures & {
    salary_details?: {
      grossSalary: number;
      deductions: {
        monthly: number;
        annual: number;
        taxBenefit: number;
        insuranceDeduction: number;
        maintenanceDeduction: number;
      };
    };
  };
}

// Vehicle status types
export type VehicleStatus = 'available' | 'assigned' | 'maintenance' | 'requested';

// Vehicle service types
export interface VehicleServices {
  insurance: boolean;
  maintenance: boolean;
  delivery: boolean;
  winterTires: boolean;
  gap: boolean;
  roadside: boolean;
  damageManagement: boolean;
}

export interface VehicleServicePrices {
  insurance: number;
  maintenance: number;
  winterTires: number;
  gap: number;
  roadside: number;
  damageManagement: number;
}

export interface VehicleLeasingRates {
  '36_10000': number;
  '36_15000': number;
  '36_20000': number;
  '48_10000': number;
  '48_15000': number;
  '48_20000': number;
}

export interface VehicleOneTimeCosts {
  registration: number;
  homeDelivery: number;
  transfer: number;
}

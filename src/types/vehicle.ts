export interface VehicleColor {
  name: string;
  code: string;
  type: 'solid' | 'metallic' | 'pearl';
  price?: number;
}

export interface VehicleServices {
  insurance: boolean;
  maintenance: boolean;
  delivery: boolean;
  winterTires: boolean;
  gap: boolean;
  roadside: boolean;
  damageManagement: boolean;
}

export interface OneTimeCosts {
  registration: number;
  homeDelivery: number;
  transfer: number;
}

export type VehicleFormData = Omit<Vehicle, 'id'>;

export interface Vehicle {
  id: string;
  monthlyStartingRate?: number;
  monthlyFrom?: number; // Added for salary sacrifice vehicles - monthly starting price
  standardEquipment: string;
  make: string;
  model: string;
  year: number;
  type: string;
  status: string;
  color?: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  power: number;
  electricRange?: number;
  engineSize?: number;
  equipmentVariant: string;
  deliveryTime: number;
  customEquipment: string[];
  images: string[];
  features: string[];
  services: VehicleServices;
  customFeatures: { [key: string]: string };
  availableColors: VehicleColor[];
  servicePrices: { [key: string]: number };
  leasingRates: { [key: string]: number };
  oneTimeCosts: OneTimeCosts;
  grossListPrice: number;
  vin?: string; // Vehicle Identification Number
}

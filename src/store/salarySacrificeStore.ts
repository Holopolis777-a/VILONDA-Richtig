import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Vehicle, VehicleFormData, VehicleColor, VehicleServices } from '../types/vehicle';
import { useAuthStore } from './authStore';

// Define the database response type with snake_case properties
interface DatabaseVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  status: string;
  color: string;
  mileage: number;
  standard_equipment: string;
  electric_range?: number;
  engine_size?: number;
  equipment_variant: string;
  fuel_type: string;
  gross_list_price: number;
  custom_equipment: string[];
  custom_features: { [key: string]: string };
  available_colors: VehicleColor[];
  service_prices: { [key: string]: number };
  leasing_rates: { [key: string]: number };
  one_time_costs: {
    registration: number;
    homeDelivery: number;
    transfer: number;
  };
  monthly_starting_rate?: number;
  images: string[];
  features: string[];
  services: VehicleServices;
  delivery_time: number;
  power: number;
  transmission: string;
}

interface SalarySacrificeState {
  vehicles: Vehicle[];
  filters: Record<string, any>;
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  addVehicle: (vehicle: VehicleFormData) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
}

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: 'salary-1',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    type: 'limousine',
    status: 'available',
    color: 'Pearl White',
    mileage: 0,
    fuelType: 'elektro',
    transmission: 'automatik',
    power: 325,
    engineSize: 0,
    equipmentVariant: 'Long Range',
    deliveryTime: 8,
    standardEquipment: 'Autopilot\nPremium Interieur\nPanoramadach\nNavigationssystem\nKlimaautomatik',
    grossListPrice: 52000,
    customEquipment: [
      'Enhanced Autopilot',
      'Premium Interior',
      'Premium Connectivity'
    ],
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
    ],
    features: ['Autopilot', 'Premium Audio', 'Glass Roof'],
    customFeatures: {},
    availableColors: [
      {
        name: 'Pearl White',
        code: '#FFFFFF',
        type: 'pearl',
      },
      {
        name: 'Solid Black',
        code: '#000000',
        type: 'solid',
        price: 1000,
      }
    ],
    services: {
      insurance: true,
      maintenance: true,
      delivery: true,
      winterTires: true,
      gap: true,
      roadside: true,
      damageManagement: true,
    },
    servicePrices: {
      insurance: 89,
      maintenance: 59,
      winterTires: 39,
      gap: 19,
      roadside: 15,
      damageManagement: 29,
    },
    leasingRates: {
      '36_10000': 599,
      '36_15000': 649,
      '36_20000': 699,
      '48_10000': 559,
      '48_15000': 609,
      '48_20000': 659,
    },
    oneTimeCosts: {
      registration: 179,
      homeDelivery: 249,
      transfer: 890,
    }
  },
];

// Convert database response to Vehicle type
const convertDatabaseVehicle = (dbVehicle: DatabaseVehicle): Vehicle => ({
  id: dbVehicle.id,
  make: dbVehicle.make,
  model: dbVehicle.model,
  year: dbVehicle.year,
  type: dbVehicle.type,
  status: dbVehicle.status,
  color: dbVehicle.color,
  mileage: dbVehicle.mileage,
  standardEquipment: dbVehicle.standard_equipment,
  electricRange: dbVehicle.electric_range,
  engineSize: dbVehicle.engine_size,
  equipmentVariant: dbVehicle.equipment_variant,
  fuelType: dbVehicle.fuel_type,
  grossListPrice: dbVehicle.gross_list_price,
  customEquipment: dbVehicle.custom_equipment,
  customFeatures: dbVehicle.custom_features,
  availableColors: dbVehicle.available_colors,
  servicePrices: dbVehicle.service_prices,
  leasingRates: dbVehicle.leasing_rates,
  oneTimeCosts: dbVehicle.one_time_costs,
  monthlyStartingRate: dbVehicle.monthly_starting_rate,
  images: dbVehicle.images,
  features: dbVehicle.features,
  services: dbVehicle.services,
  deliveryTime: dbVehicle.delivery_time,
  power: dbVehicle.power,
  transmission: dbVehicle.transmission,
});

export const useSalarySacrificeStore = create<SalarySacrificeState>((set, get) => ({
  vehicles: mockVehicles, // Initialize with mock data
  filters: {},
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('salary_vehicles')
        .select('*');

      if (error) throw error;

      // Transform snake_case to camelCase
      const transformedData = (data || []).map(vehicle => ({
        ...vehicle,
        standardEquipment: vehicle.standard_equipment,
        electricRange: vehicle.electric_range,
        engineSize: vehicle.engine_size,
        equipmentVariant: vehicle.equipment_variant,
        fuelType: vehicle.fuel_type,
        grossListPrice: vehicle.gross_list_price,
        customEquipment: vehicle.custom_equipment,
        customFeatures: vehicle.custom_features,
        availableColors: vehicle.available_colors,
        servicePrices: vehicle.service_prices,
        leasingRates: vehicle.leasing_rates,
        oneTimeCosts: vehicle.one_time_costs,
        monthlyStartingRate: vehicle.monthly_starting_rate,
        monthlyFrom: vehicle.monthly_from,
        createdAt: vehicle.created_at,
        updatedAt: vehicle.updated_at,
        createdBy: vehicle.created_by
      }));

      set({ vehicles: transformedData, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching salary vehicles:', error);
      set({ error: 'Failed to fetch vehicles', loading: false });
    }
  },

  addVehicle: async (vehicleData) => {
    set({ loading: true });
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('salary_vehicles')
        .insert([{
          ...vehicleData,
          status: 'available',
          created_by: userData.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        set(state => ({
          vehicles: [...state.vehicles, data],
          loading: false
        }));
      }
    } catch (error) {
      console.error('Error adding salary vehicle:', error);
      set({ error: 'Failed to add vehicle', loading: false });
      throw error;
    }
  },

  updateVehicle: async (id, updates) => {
    set({ loading: true });
    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      if (!session?.user || session.user.user_metadata.role !== 'admin') {
        throw new Error('Keine Berechtigung zum Aktualisieren des Fahrzeugs');
      }

      // Transform camelCase to snake_case for database
      const dbUpdates: Record<string, any> = {};
      
      // Format fields according to database types
      if ('standardEquipment' in updates) dbUpdates.standard_equipment = String(updates.standardEquipment || '');
      if ('electricRange' in updates) dbUpdates.electric_range = Number(updates.electricRange) || null;
      if ('engineSize' in updates) dbUpdates.engine_size = Number(updates.engineSize) || null;
      if ('equipmentVariant' in updates) dbUpdates.equipment_variant = String(updates.equipmentVariant || '');
      if ('fuelType' in updates) dbUpdates.fuel_type = String(updates.fuelType || '');
      if ('grossListPrice' in updates) dbUpdates.gross_list_price = Number(updates.grossListPrice) || 0;
      if ('customEquipment' in updates) dbUpdates.custom_equipment = JSON.stringify(updates.customEquipment || []);
      if ('customFeatures' in updates) dbUpdates.custom_features = JSON.stringify(updates.customFeatures || {});
      if ('availableColors' in updates) dbUpdates.available_colors = JSON.stringify(updates.availableColors || []);
      if ('servicePrices' in updates) dbUpdates.service_prices = JSON.stringify(updates.servicePrices || {});
      if ('leasingRates' in updates) dbUpdates.leasing_rates = JSON.stringify(updates.leasingRates || {});
      if ('oneTimeCosts' in updates) dbUpdates.one_time_costs = JSON.stringify(updates.oneTimeCosts || {});
      if ('monthlyStartingRate' in updates) dbUpdates.monthly_starting_rate = Number(updates.monthlyStartingRate) || null;
      if ('monthlyFrom' in updates) dbUpdates.monthly_from = Number(updates.monthlyFrom) || null;
      
      // Handle basic fields that don't need transformation
      Object.entries(updates).forEach(([key, value]) => {
        if (!key.match(/[A-Z]/)) { // If key doesn't contain uppercase letters
          if (typeof value === 'number') {
            dbUpdates[key] = Number(value) || 0;
          } else if (typeof value === 'string') {
            dbUpdates[key] = String(value || '');
          } else if (typeof value === 'boolean') {
            dbUpdates[key] = Boolean(value);
          }
        }
      });

      console.log('Updating salary vehicle with:', dbUpdates);

      const { error } = await supabase
        .from('salary_vehicles')
        .update(dbUpdates)
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        if (error.code === 'PGRST116') {
          throw new Error('Keine Berechtigung zum Aktualisieren des Fahrzeugs');
        }
        throw new Error(`Fehler beim Aktualisieren: ${error.message}`);
      }

      // Update local state
      set((state) => ({
        vehicles: state.vehicles.map((v) =>
          v.id === id ? { ...v, ...updates } : v
        ),
        loading: false,
      }));
    } catch (error) {
      console.error('Error updating vehicle:', error);
      set({ error: 'Failed to update vehicle', loading: false });
      throw error;
    }
  },

  deleteVehicle: async (id) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('salary_vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        vehicles: state.vehicles.filter((v) => v.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      set({ error: 'Failed to delete vehicle', loading: false });
      throw error;
    }
  },
}));

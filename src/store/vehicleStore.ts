import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Vehicle, VehicleFormData } from '../types/vehicle';
import { useAuthStore } from './authStore';

interface VehicleState {
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
    id: '1',
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    type: 'limousine',
    status: 'available',
    color: 'Alpine White',
    mileage: 0,
    fuelType: 'benzin',
    transmission: 'automatik',
    power: 374,
    engineSize: 3000,
    equipmentVariant: 'M Sport',
    deliveryTime: 12,
    standardEquipment: 'Klimaanlage\nZentralverriegelung\nElektrische Fensterheber\nBordcomputer\nServolenkung',
    grossListPrice: 45000,
    customEquipment: [
      'Head-up Display',
      'Harman Kardon Soundsystem',
      'Driving Assistant Professional'
    ],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800',
    ],
    features: ['LED Headlights', 'Navigation', 'Leather Seats'],
    customFeatures: {},
    availableColors: [
      {
        name: 'Alpine White',
        code: '#FFFFFF',
        type: 'solid',
      },
      {
        name: 'Black Sapphire',
        code: '#000000',
        type: 'metallic',
        price: 1200,
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
      '36_10000': 499,
      '36_15000': 549,
      '36_20000': 599,
      '48_10000': 459,
      '48_15000': 509,
      '48_20000': 559,
    },
    oneTimeCosts: {
      registration: 179,
      homeDelivery: 249,
      transfer: 890,
    }
  },
];

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: mockVehicles,
  filters: {},
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('regular_vehicles')
        .select('*')

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
        createdAt: vehicle.created_at,
        updatedAt: vehicle.updated_at,
        createdBy: vehicle.created_by
      }));

      set({ vehicles: transformedData, loading: false });
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      set({ error: 'Failed to fetch vehicles', loading: false });
    }
  },

  addVehicle: async (vehicleData) => {
    set({ loading: true });
    try {
      // Validate required fields with specific messages
      type RequiredFields = {
        [K in keyof VehicleFormData]: string;
      };
      
      const requiredFields: Partial<RequiredFields> = {
        make: 'Marke',
        model: 'Modell',
        year: 'Baujahr',
        type: 'Fahrzeugtyp',
        fuelType: 'Kraftstoffart',
        transmission: 'Getriebe',
        power: 'Leistung',
        grossListPrice: 'Bruttolistenpreis'
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([key]) => !vehicleData[key as keyof VehicleFormData])
        .map(([, label]) => label);

      if (missingFields.length > 0) {
        throw new Error(`Bitte füllen Sie folgende Pflichtfelder aus: ${missingFields.join(', ')}`);
      }

      const { data, error } = await supabase
        .from('regular_vehicles')
        .insert([{
          ...vehicleData,
          status: 'available',
          created_by: (await supabase.auth.getUser()).data.user?.id
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
      console.error('Error adding vehicle:', error);
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

      console.log('Updating vehicle with:', dbUpdates);

      const { error } = await supabase
        .from('regular_vehicles')
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        vehicles: state.vehicles.filter((v) => v.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete vehicle', loading: false });
    }
  },
}));

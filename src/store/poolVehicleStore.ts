import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Vehicle } from '../types/vehicle';

interface PoolVehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
}

// Mock data for pool vehicles
const mockPoolVehicles: Vehicle[] = [
  {
    id: 'pool-1',
    make: 'Mercedes-Benz',
    model: 'EQE 350+',
    year: 2024,
    type: 'limousine',
    status: 'available',
    color: 'Obsidianschwarz',
    standardEquipment: 'Klimaautomatik\nLED Scheinwerfer\nNavigationssystem\nParktronic\nRückfahrkamera',
    mileage: 0,
    fuelType: 'elektro',
    transmission: 'automatik',
    power: 292,
    engineSize: 0,
    equipmentVariant: 'AMG Line',
    deliveryTime: 12,
    grossListPrice: 69990,
    customEquipment: [
      'Business Paket',
      'Premium Navigation',
      'Fahrassistenz-Paket'
    ],
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800',
    ],
    features: ['LED Headlights', 'Navigation', 'Leather Seats'],
    customFeatures: {},
    availableColors: [
      {
        name: 'Obsidianschwarz',
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
      '36_10000': 799,
      '36_15000': 849,
      '36_20000': 899,
      '48_10000': 759,
      '48_15000': 809,
      '48_20000': 859,
    },
    oneTimeCosts: {
      registration: 179,
      homeDelivery: 249,
      transfer: 890,
    }
  },
];

export const usePoolVehicleStore = create<PoolVehicleState>((set) => ({
  vehicles: [],
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('pool_vehicles')
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
      console.error('Error fetching pool vehicles:', error);
      set({ error: 'Failed to fetch pool vehicles', loading: false });
    }
  },

  addVehicle: async (vehicle) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('pool_vehicles')
        .insert([{
          ...vehicle,
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
      console.error('Error adding pool vehicle:', error);
      set({ error: 'Failed to add pool vehicle', loading: false });
      throw error;
    }
  },

  updateVehicle: async (id, updates) => {
    set({ loading: true });
    try {
      set((state) => ({
        vehicles: state.vehicles.map((v) =>
          v.id === id ? { ...v, ...updates } : v
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update pool vehicle', loading: false });
    }
  },

  deleteVehicle: async (id) => {
    set({ loading: true });
    try {
      set((state) => ({
        vehicles: state.vehicles.filter((v) => v.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete pool vehicle', loading: false });
    }
  },
}));

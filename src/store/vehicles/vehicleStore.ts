import { create } from 'zustand';
import { supabase } from '../../lib/supabase';
import { Vehicle } from '../../types/models/Vehicle';

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchVehicles: () => Promise<void>;
  fetchVehicleById: (id: string) => Promise<void>;
  createVehicle: (vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,

  fetchVehicles: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('regular_vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ vehicles: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch vehicles',
        loading: false 
      });
    }
  },

  fetchVehicleById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('regular_vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      set({ selectedVehicle: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch vehicle',
        loading: false 
      });
    }
  },

  createVehicle: async (vehicle) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('regular_vehicles')
        .insert([vehicle])
        .select()
        .single();

      if (error) throw error;

      set(state => ({ 
        vehicles: [data, ...state.vehicles],
        loading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create vehicle',
        loading: false 
      });
    }
  },

  updateVehicle: async (id: string, updates: Partial<Vehicle>) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('regular_vehicles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        vehicles: state.vehicles.map(v => v.id === id ? data : v),
        selectedVehicle: state.selectedVehicle?.id === id ? data : state.selectedVehicle,
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update vehicle',
        loading: false 
      });
    }
  },

  deleteVehicle: async (id: string) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('regular_vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        vehicles: state.vehicles.filter(v => v.id !== id),
        selectedVehicle: state.selectedVehicle?.id === id ? null : state.selectedVehicle,
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete vehicle',
        loading: false 
      });
    }
  },

  setSelectedVehicle: (vehicle) => {
    set({ selectedVehicle: vehicle });
  },
}));

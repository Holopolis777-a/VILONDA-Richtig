import { create } from 'zustand';
import { supabase } from '../../lib/supabase';
import { PoolVehicle } from '../../types/models/Vehicle';

interface PoolVehicleState {
  vehicles: PoolVehicle[];
  selectedVehicle: PoolVehicle | null;
  loading: boolean;
  error: string | null;
  
  // Base actions
  fetchVehicles: () => Promise<void>;
  fetchVehicleById: (id: string) => Promise<void>;
  createVehicle: (vehicle: Omit<PoolVehicle, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<PoolVehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  setSelectedVehicle: (vehicle: PoolVehicle | null) => void;
  
  // Pool-specific actions
  assignVehicle: (vehicleId: string, userId: string) => Promise<void>;
  returnVehicle: (vehicleId: string) => Promise<void>;
  getAvailableVehicles: () => Promise<void>;
}

export const usePoolVehicleStore = create<PoolVehicleState>((set, get) => ({
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,

  fetchVehicles: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('pool_vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ vehicles: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch pool vehicles',
        loading: false 
      });
    }
  },

  fetchVehicleById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('pool_vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      set({ selectedVehicle: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch pool vehicle',
        loading: false 
      });
    }
  },

  createVehicle: async (vehicle) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('pool_vehicles')
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
        error: error instanceof Error ? error.message : 'Failed to create pool vehicle',
        loading: false 
      });
    }
  },

  updateVehicle: async (id: string, updates: Partial<PoolVehicle>) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('pool_vehicles')
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
        error: error instanceof Error ? error.message : 'Failed to update pool vehicle',
        loading: false 
      });
    }
  },

  deleteVehicle: async (id: string) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('pool_vehicles')
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
        error: error instanceof Error ? error.message : 'Failed to delete pool vehicle',
        loading: false 
      });
    }
  },

  setSelectedVehicle: (vehicle) => {
    set({ selectedVehicle: vehicle });
  },

  // Pool-specific actions
  assignVehicle: async (vehicleId: string, userId: string) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('pool_vehicles')
        .update({ 
          status: 'assigned',
          custom_features: { assigned_to: userId }
        })
        .eq('id', vehicleId)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        vehicles: state.vehicles.map(v => v.id === vehicleId ? data : v),
        selectedVehicle: state.selectedVehicle?.id === vehicleId ? data : state.selectedVehicle,
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to assign pool vehicle',
        loading: false 
      });
    }
  },

  returnVehicle: async (vehicleId: string) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('pool_vehicles')
        .update({ 
          status: 'available',
          custom_features: { assigned_to: null }
        })
        .eq('id', vehicleId)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        vehicles: state.vehicles.map(v => v.id === vehicleId ? data : v),
        selectedVehicle: state.selectedVehicle?.id === vehicleId ? data : state.selectedVehicle,
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to return pool vehicle',
        loading: false 
      });
    }
  },

  getAvailableVehicles: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('pool_vehicles')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ vehicles: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch available pool vehicles',
        loading: false 
      });
    }
  },
}));

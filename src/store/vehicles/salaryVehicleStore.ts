import { create } from 'zustand';
import { supabase } from '../../lib/supabase';
import { SalaryVehicle } from '../../types/models/Vehicle';

interface SalaryCalculation {
  grossSalary: number;
  netSalary: number;
  vehicleCost: number;
  taxSavings: number;
  insuranceSavings: number;
  totalSavings: number;
}

interface SalaryVehicleState {
  vehicles: SalaryVehicle[];
  selectedVehicle: SalaryVehicle | null;
  salaryCalculation: SalaryCalculation | null;
  loading: boolean;
  error: string | null;
  
  // Base actions
  fetchVehicles: () => Promise<void>;
  fetchVehicleById: (id: string) => Promise<void>;
  createVehicle: (vehicle: Omit<SalaryVehicle, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<SalaryVehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  setSelectedVehicle: (vehicle: SalaryVehicle | null) => void;
  
  // Salary-specific actions
  calculateSavings: (vehicleId: string, grossSalary: number) => Promise<void>;
  getEligibleVehicles: (maxBudget: number) => Promise<void>;
  requestVehicle: (vehicleId: string, employeeId: string, salaryDetails: any) => Promise<void>;
  getSalaryDeductions: (vehicleId: string) => Promise<void>;
}

export const useSalaryVehicleStore = create<SalaryVehicleState>((set, get) => ({
  vehicles: [],
  selectedVehicle: null,
  salaryCalculation: null,
  loading: false,
  error: null,

  fetchVehicles: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('salary_vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ vehicles: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch salary vehicles',
        loading: false 
      });
    }
  },

  fetchVehicleById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('salary_vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      set({ selectedVehicle: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch salary vehicle',
        loading: false 
      });
    }
  },

  createVehicle: async (vehicle) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('salary_vehicles')
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
        error: error instanceof Error ? error.message : 'Failed to create salary vehicle',
        loading: false 
      });
    }
  },

  updateVehicle: async (id: string, updates: Partial<SalaryVehicle>) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('salary_vehicles')
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
        error: error instanceof Error ? error.message : 'Failed to update salary vehicle',
        loading: false 
      });
    }
  },

  deleteVehicle: async (id: string) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('salary_vehicles')
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
        error: error instanceof Error ? error.message : 'Failed to delete salary vehicle',
        loading: false 
      });
    }
  },

  setSelectedVehicle: (vehicle) => {
    set({ selectedVehicle: vehicle });
  },

  // Salary-specific actions
  calculateSavings: async (vehicleId: string, grossSalary: number) => {
    try {
      set({ loading: true, error: null });
      
      const vehicle = get().vehicles.find(v => v.id === vehicleId);
      if (!vehicle) throw new Error('Vehicle not found');

      const monthlyRate = vehicle.monthly_starting_rate || 0;
      
      const calculation: SalaryCalculation = {
        grossSalary,
        netSalary: grossSalary - monthlyRate,
        vehicleCost: monthlyRate,
        taxSavings: monthlyRate * 0.3, // Example: 30% tax savings
        insuranceSavings: 50, // Example: Fixed insurance savings
        totalSavings: (monthlyRate * 0.3) + 50
      };

      set({ salaryCalculation: calculation, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to calculate savings',
        loading: false 
      });
    }
  },

  getEligibleVehicles: async (maxBudget: number) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('salary_vehicles')
        .select('*')
        .lte('monthly_starting_rate', maxBudget)
        .order('monthly_starting_rate', { ascending: true });

      if (error) throw error;

      set({ vehicles: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch eligible vehicles',
        loading: false 
      });
    }
  },

  requestVehicle: async (vehicleId: string, employeeId: string, salaryDetails: any) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('salary_vehicles')
        .update({ 
          status: 'requested',
          custom_features: { 
            requested_by: employeeId,
            salary_details: salaryDetails
          }
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
        error: error instanceof Error ? error.message : 'Failed to request vehicle',
        loading: false 
      });
    }
  },

  getSalaryDeductions: async (vehicleId: string) => {
    try {
      set({ loading: true, error: null });
      
      const vehicle = get().vehicles.find(v => v.id === vehicleId);
      if (!vehicle) throw new Error('Vehicle not found');

      const monthlyRate = vehicle.monthly_starting_rate || 0;
      
      const deductions = {
        monthly: monthlyRate,
        annual: monthlyRate * 12,
        taxBenefit: monthlyRate * 0.01 * 12, // 1% rule for private use
        insuranceDeduction: 50 * 12,
        maintenanceDeduction: 30 * 12
      };

      const updatedVehicle = {
        ...vehicle,
        custom_features: {
          ...vehicle.custom_features,
          deductions
        }
      };

      set(state => ({
        selectedVehicle: updatedVehicle,
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to get salary deductions',
        loading: false 
      });
    }
  }
}));

import { create } from 'zustand';
import { VehicleRequest } from '../types/vehicleRequest';
import { Vehicle } from '../types/vehicle';
import { User } from '../types/auth';
import { useAuthStore } from './authStore';
import { useVehicleStore } from './vehicleStore';

interface VehicleRequestStore {
  requests: VehicleRequest[];
  isLoading: boolean;
  error: string | null;
  createRequest: (vehicleId: string, requestDetails: VehicleRequest['requestDetails']) => Promise<void>;
  fetchUserRequests: (userId: string) => Promise<void>;
  fetchAllRequests: () => Promise<void>;
  updateRequestStatus: (requestId: string, status: VehicleRequest['status']) => Promise<void>;
}

// Mock data store
let mockRequests: VehicleRequest[] = [];

export const useVehicleRequestStore = create<VehicleRequestStore>((set, get) => ({
  requests: [],
  isLoading: false,
  error: null,

  createRequest: async (vehicleId: string, requestDetails: VehicleRequest['requestDetails']) => {
    try {
      set({ isLoading: true, error: null });
      
      const { user } = useAuthStore.getState();
      if (!user) throw new Error('User not authenticated');

      // Use the actual vehicle data passed to the form
      const vehicle = useVehicleStore.getState().vehicles.find((v: Vehicle) => v.id === vehicleId);
      if (!vehicle) throw new Error('Vehicle not found');

      const newRequest: VehicleRequest = {
        id: Math.random().toString(36).substr(2, 9),
        vehicleId,
        userId: user.id,
        vehicle,
        user,
        status: 'pending',
        createdAt: new Date(),
        termsAccepted: true,
        requestDetails,
      };

      // Add to mock data store
      mockRequests = [...mockRequests, newRequest];
      console.log('Added new request to mock store:', newRequest);
      console.log('Current mock requests:', mockRequests);

      // Update the store state
      set(state => ({
        requests: [...state.requests, newRequest],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchUserRequests: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      console.log('Fetching requests for user:', userId);
      console.log('All mock requests:', mockRequests);

      // Filter mock requests for the user
      const userRequests = mockRequests.filter(request => request.userId === userId);
      console.log('Filtered user requests:', userRequests);
      
      set({ 
        requests: userRequests.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchAllRequests: async () => {
    try {
      set({ isLoading: true, error: null });
      console.log('Fetching all requests');
      console.log('All mock requests:', mockRequests);

      // Filter pending requests for admin
      const pendingRequests = mockRequests.filter(request => request.status === 'pending');
      console.log('Filtered pending requests:', pendingRequests);
      
      set({ 
        requests: pendingRequests.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateRequestStatus: async (requestId: string, status: VehicleRequest['status']) => {
    try {
      set({ isLoading: true, error: null });
      console.log('Updating request status:', requestId, status);

      // Update mock request status
      mockRequests = mockRequests.map(request =>
        request.id === requestId ? { ...request, status } : request
      );
      console.log('Updated mock requests:', mockRequests);

      // Update the store state
      set(state => ({
        requests: state.requests.map(request =>
          request.id === requestId ? { ...request, status } : request
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

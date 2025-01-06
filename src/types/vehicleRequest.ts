import { Vehicle } from './vehicle';
import { User } from './auth';

export interface VehicleRequest {
  id: string;
  vehicleId: string;
  userId: string;
  vehicle: Vehicle;
  user: User;
  status: 'pending' | 'approved' | 'rejected' | 'canceled';
  createdAt: Date;
  termsAccepted: boolean;
  requestDetails: {
    leaseDuration: number;
    mileageLimit: number;
    selectedColor: string;
    selectedServices: string[];
  };
}

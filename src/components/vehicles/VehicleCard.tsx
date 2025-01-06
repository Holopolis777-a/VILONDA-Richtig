import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Car, Edit2, Power, Fuel, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { ElectricRangeBadge } from './electric/ElectricRangeBadge';
import { usePermissions } from '../../hooks/usePermissions';
import { toast } from 'react-hot-toast';
import type { Vehicle } from '../../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = usePermissions();
  const isSalaryVehicle = location.pathname.includes('/salary-sacrifice');
  
  // Determine the base path based on the vehicle ID prefix and current location
  const getBasePath = () => {
    if (location.pathname.includes('/vehicles/pool')) {
      return '/vehicles/pool';
    }
    if (location.pathname.includes('/salary-sacrifice')) {
      return '/salary-sacrifice';
    }
    return '/vehicles';
  };

  const monthlyRate = Object.values(vehicle.leasingRates).sort((a, b) => a - b)[0];
  const isElectric = vehicle.fuelType === 'elektro';

  const [isNavigating, setIsNavigating] = React.useState(false);

  const handleViewDetails = async () => {
    try {
      setIsNavigating(true);
      const basePath = getBasePath();
      console.log('Navigating to:', `${basePath}${isSalaryVehicle ? '/details' : ''}/${vehicle.id}`);
      if (isSalaryVehicle) {
        navigate(`${basePath}/details/${vehicle.id}`);
      } else {
        navigate(`${basePath}/${vehicle.id}`);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Fehler beim Laden des Fahrzeugs');
    } finally {
      setIsNavigating(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const basePath = getBasePath();
    navigate(`${basePath}/edit/${vehicle.id}`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      {/* Image and edit button section */}
      <div className="relative">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover"
        />
        {isAdmin && (
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="bg-white/90 hover:bg-white"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Vehicle details section */}
      <div className="p-4">
        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-semibold">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-gray-600">{vehicle.equipmentVariant}</p>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Fuel className="w-4 h-4 mr-2" />
            <span>{vehicle.fuelType.toUpperCase()}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Settings className="w-4 h-4 mr-2" />
            <span>{vehicle.transmission.toUpperCase()}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Power className="w-4 h-4 mr-2" />
            <span>{vehicle.power} PS</span>
          </div>

          {isElectric && vehicle.electricRange && (
            <ElectricRangeBadge range={vehicle.electricRange} />
          )}
        </div>
        
        {/* Price and action section */}
        <div className="mt-4">
          <p className="text-xl font-semibold">
            Ab {isSalaryVehicle 
              ? `${vehicle.monthlyFrom || 'undefined'},-€* im Monat`
              : `${monthlyRate},-€ im Monat`
            }
          </p>
        </div>
        
        <Button 
          onClick={handleViewDetails}
          className="mt-4 w-full"
          disabled={isNavigating}
        >
          {isNavigating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Laden...
            </div>
          ) : (
            'Fahrzeug anzeigen'
          )}
        </Button>
      </div>
    </div>
  );
}

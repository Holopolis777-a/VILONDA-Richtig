import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '../../store/vehicleStore';
import { useAuthStore } from '../../store/authStore';
import { VehicleGallery } from './details/VehicleGallery';
import { VehicleSpecs } from './details/VehicleSpecs';
import { VehicleFeatures } from './details/VehicleFeatures';
import { VehicleServices } from './details/VehicleServices';
import { SubscriptionConfigurator } from '../subscription/SubscriptionConfigurator';
import { VehicleRequestDialog } from './dialogs/VehicleRequestDialog';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../common/Button';

export function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles } = useVehicleStore();
  const { user } = useAuthStore();
  const [isRequestDialogOpen, setIsRequestDialogOpen] = React.useState(false);
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Fahrzeug nicht gefunden.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/vehicles')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Zurück zur Übersicht
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <VehicleGallery images={vehicle.images} />
          <VehicleSpecs vehicle={vehicle} />
          <VehicleFeatures 
            features={vehicle.features}
            standardEquipment={vehicle.standardEquipment}
          />
          <VehicleServices services={vehicle.services} />
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-lg text-gray-600 mt-2">{vehicle.type}</p>
          </div>

          {user?.role === 'member' ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Fahrzeug anfragen</h2>
              <p className="text-gray-600 mb-6">
                Konfigurieren Sie Ihre Anfrage und senden Sie diese zur Prüfung an uns.
              </p>
              <Button
                onClick={() => setIsRequestDialogOpen(true)}
                fullWidth
              >
                Jetzt anfragen
              </Button>
            </div>
          ) : (
            <SubscriptionConfigurator
              vehicle={vehicle}
            />
          )}

          <VehicleRequestDialog
            vehicle={vehicle}
            isOpen={isRequestDialogOpen}
            onClose={() => setIsRequestDialogOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

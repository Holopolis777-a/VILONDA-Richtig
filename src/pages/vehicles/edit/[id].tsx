import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '../../../store/vehicleStore';
import { VehicleForm } from '../../../components/vehicles/forms/VehicleForm';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { usePermissions } from '../../../hooks/usePermissions';
import { toast } from 'react-hot-toast';

export default function EditVehicle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, updateVehicle } = useVehicleStore();
  const { isAdmin } = usePermissions();
  const vehicle = vehicles.find(v => v.id === id);

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Sie haben keine Berechtigung, Fahrzeuge zu bearbeiten.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/vehicles')}
        >
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Fahrzeug nicht gefunden.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/vehicles')}
        >
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  const handleSubmit = async (data: any) => {
    try {
      // Only include fields that have actually changed
      const changes = Object.entries(data).reduce((acc: any, [key, value]) => {
        if (vehicle[key as keyof typeof vehicle] !== value) {
          acc[key] = value;
        }
        return acc;
      }, {});

      console.log('Updating with changes:', changes);
      
      await updateVehicle(id!, changes);
      toast.success('Fahrzeug erfolgreich aktualisiert');
      navigate('/vehicles');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      toast.error(errorMessage);
      console.error('Error updating vehicle:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/vehicles')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück zur Übersicht
          </button>
          <h1 className="text-2xl font-semibold">
            {vehicle.make} {vehicle.model} bearbeiten
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <VehicleForm
          initialData={vehicle}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/vehicles')}
        />
      </div>
    </div>
  );
}

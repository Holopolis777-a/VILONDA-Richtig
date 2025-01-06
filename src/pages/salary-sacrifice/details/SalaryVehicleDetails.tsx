import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSalarySacrificeStore } from '../../../store/salarySacrificeStore';
import { VehicleHeader } from '../../../components/vehicles/details/VehicleHeader';
import { VehicleGallery } from '../../../components/vehicles/details/VehicleGallery';
import { VehicleSpecs } from '../../../components/vehicles/details/VehicleSpecs';
import { VehicleColors } from '../../../components/vehicles/details/VehicleColors';
import { VehicleFeatures } from '../../../components/vehicles/details/VehicleFeatures';
import { InclusiveServices } from '../../../components/vehicles/details/InclusiveServices';
import { SalaryDetails } from '../../../components/salary-sacrifice/SalaryDetails';
import { LeaseConfiguration } from '../../../components/salary-sacrifice/LeaseConfiguration';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { toast } from 'react-hot-toast';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import type { VehicleColor } from '../../../types/vehicle';

function SalaryVehicleDetailsContent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, updateVehicle, fetchVehicles } = useSalarySacrificeStore();
  
  const [isLoading, setIsLoading] = React.useState(true);

  // Load vehicles on mount and when id changes
  React.useEffect(() => {
    const loadVehicle = async () => {
      console.log('SalaryVehicleDetails mounted');
      console.log('ID from params:', id);
      console.log('Initial vehicles:', vehicles);

      try {
        setIsLoading(true);
        await fetchVehicles();
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        toast.error('Fehler beim Laden des Fahrzeugs');
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicle();
  }, [id, fetchVehicles]); // Include fetchVehicles to ensure latest version

  // Update loading state when vehicles change
  React.useEffect(() => {
    console.log('Vehicles updated:', vehicles);
    if (vehicles.length > 0) {
      setIsLoading(false);
    }
  }, [vehicles]);

  const vehicle = React.useMemo(() => {
    console.log('Finding vehicle with id:', id);
    console.log('Current vehicles:', vehicles);
    const found = vehicles.find((v) => v.id === id);
    console.log('Found vehicle:', found);
    return found;
  }, [vehicles, id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-500">Fahrzeug wird geladen...</p>
        </div>
      </div>
    );
  }

  // State für Konfiguration
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(vehicle?.color);
  const [grossSalary, setGrossSalary] = React.useState(4500);
  const [taxClass, setTaxClass] = React.useState('1');
  const [distanceToWork, setDistanceToWork] = React.useState(20);
  const [canChargeAtWork, setCanChargeAtWork] = React.useState(false);
  const [currentMonthlyRate, setCurrentMonthlyRate] = React.useState(() => {
    if (!vehicle?.leasingRates) return 0;
    const rates = Object.values(vehicle.leasingRates);
    return rates.length > 0 ? Math.min(...rates) : 0;
  });

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Fahrzeug nicht gefunden.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/salary-sacrifice')}
        >
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  const handleColorSelect = async (color: VehicleColor) => {
    try {
      await updateVehicle(vehicle.id, { color: color.name });
      setSelectedColor(color.name);
      toast.success(`Farbe ${color.name} ausgewählt`);
    } catch (error) {
      toast.error('Fehler beim Aktualisieren der Farbe');
    }
  };

  const handleConfigurationChange = (months: number, kilometers: number, monthlyRate: number) => {
    setCurrentMonthlyRate(monthlyRate);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/salary-sacrifice')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Zurück zur Übersicht
      </button>

      <VehicleHeader vehicle={vehicle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <VehicleGallery images={vehicle.images} />
          <VehicleSpecs vehicle={vehicle} />
          <VehicleColors 
            colors={vehicle.availableColors} 
            selectedColor={selectedColor}
            onColorSelect={handleColorSelect}
          />
          <VehicleFeatures 
            features={vehicle.features} 
            customFeatures={vehicle.customFeatures}
            standardEquipment={vehicle.standardEquipment}
          />
          <InclusiveServices 
            services={vehicle.services}
            prices={vehicle.servicePrices}
          />
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-lg text-gray-600 mt-2">{vehicle.type}</p>
          </div>

          <LeaseConfiguration
            vehicle={vehicle}
            onConfigurationChange={handleConfigurationChange}
          />

          <SalaryDetails
            grossSalary={grossSalary}
            onGrossSalaryChange={setGrossSalary}
            taxClass={taxClass}
            onTaxClassChange={setTaxClass}
            distanceToWork={distanceToWork}
            onDistanceChange={setDistanceToWork}
            canChargeAtWork={canChargeAtWork}
            onCanChargeAtWorkChange={setCanChargeAtWork}
            monthlyRate={currentMonthlyRate}
            listPrice={vehicle.grossListPrice || 0}
          />
        </div>
      </div>
    </div>
  );
}

export default function SalaryVehicleDetails() {
  return (
    <ErrorBoundary>
      <SalaryVehicleDetailsContent />
    </ErrorBoundary>
  );
}

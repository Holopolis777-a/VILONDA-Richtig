import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Button, Checkbox, type Option } from '../../../components/core';
import { useVehicleRequestStore } from '../../../store/vehicleRequestStore';
import { useAuthStore } from '../../../store/authStore';
import { Vehicle } from '../../../types/vehicle';
import { useTranslation } from '../../../hooks/useTranslation';

interface VehicleRequestFormProps {
  vehicle: Vehicle;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const LEASE_DURATIONS: Option[] = [
  { value: '12', label: '12 Monate' },
  { value: '24', label: '24 Monate' },
  { value: '36', label: '36 Monate' },
  { value: '48', label: '48 Monate' }
];

const MILEAGE_LIMITS: Option[] = [
  { value: '10000', label: '10.000 km' },
  { value: '15000', label: '15.000 km' },
  { value: '20000', label: '20.000 km' },
  { value: '25000', label: '25.000 km' },
  { value: '30000', label: '30.000 km' }
];

export function VehicleRequestForm({ vehicle, onSuccess, onCancel }: VehicleRequestFormProps) {
  const { t } = useTranslation();
  const { createRequest, fetchUserRequests, isLoading, error } = useVehicleRequestStore();
  const { user } = useAuthStore();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [leaseDuration, setLeaseDuration] = React.useState(24);
  const [mileageLimit, setMileageLimit] = React.useState(10000);
  const [selectedColor, setSelectedColor] = React.useState(vehicle.availableColors[0]?.name || '');
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

  const navigate = useNavigate();

  const colorOptions: Option[] = React.useMemo(() => 
    vehicle.availableColors.map(color => ({
      value: color.name,
      label: `${color.name} (${color.type})${color.price ? ` (+${color.price}€)` : ''}`
    })), [vehicle.availableColors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted || !user) return;

    try {
      await createRequest(vehicle.id, {
        leaseDuration,
        mileageLimit,
        selectedColor,
        selectedServices,
      });
      await fetchUserRequests(user.id);
      onSuccess?.();
      navigate('/member/requests', { replace: true });
    } catch (err) {
      console.error('Failed to submit request:', err);
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div className="space-y-6">
        <h3 className="text-lg font-medium">{t('Fahrzeug anfragen')}</h3>
        
        {/* Lease Duration */}
        <Select
          label={t('Laufzeit')}
          value={leaseDuration.toString()}
          options={LEASE_DURATIONS}
          onChange={(value) => setLeaseDuration(Number(value))}
          required
        />

        {/* Mileage Limit */}
        <Select
          label={t('Laufleistung (km/Jahr)')}
          value={mileageLimit.toString()}
          options={MILEAGE_LIMITS}
          onChange={(value) => setMileageLimit(Number(value))}
          required
        />

        {/* Color Selection */}
        {colorOptions.length > 0 && (
          <Select
            label={t('Farbe')}
            value={selectedColor}
            options={colorOptions}
            onChange={(value) => setSelectedColor(value.toString())}
            required
          />
        )}

        {/* Services */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t('Services')}
          </label>
          <div className="grid gap-2">
            {Object.entries(vehicle.services).map(([service, included]) => (
              <Checkbox
                key={service}
                id={service}
                label={`${t(service)}${included ? ` (${t('inklusive')})` : vehicle.servicePrices[service] ? ` (+${vehicle.servicePrices[service]}€)` : ''}`}
                checked={included || selectedServices.includes(service)}
                onChange={() => !included && toggleService(service)}
                disabled={included}
              />
            ))}
          </div>
        </div>

        {/* Terms Checkbox */}
        <Checkbox
          id="terms"
          label={t('Ich bestätige die Richtigkeit meiner Angaben und akzeptiere die Nutzungsbedingungen')}
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          required
          error={error}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          {t('Abbrechen')}
        </Button>
        <Button
          type="submit"
          disabled={!termsAccepted || isLoading}
          loading={isLoading}
        >
          {t('Anfrage senden')}
        </Button>
      </div>
    </form>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicleRequestStore } from '../../../store/vehicleRequestStore';
import { useAuthStore } from '../../../store/authStore';
import { Vehicle } from '../../../types/vehicle';
import { Button } from '../../common/Button';
import { useTranslation } from '../../../hooks/useTranslation';

interface VehicleRequestFormProps {
  vehicle: Vehicle;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function VehicleRequestForm({ vehicle, onSuccess, onCancel }: VehicleRequestFormProps) {
  const { t } = useTranslation();
  const { createRequest, fetchUserRequests, isLoading, error } = useVehicleRequestStore();
  const { user } = useAuthStore();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [leaseDuration, setLeaseDuration] = React.useState(24); // Default 24 months
  const [mileageLimit, setMileageLimit] = React.useState(10000); // Default 10,000 km
  const [selectedColor, setSelectedColor] = React.useState(vehicle.availableColors[0]?.name || '');
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted || !user) return;

    try {
      console.log('Creating request for user:', user.id);
      await createRequest(vehicle.id, {
        leaseDuration,
        mileageLimit,
        selectedColor,
        selectedServices,
      });
      console.log('Request created, fetching updated requests');
      await fetchUserRequests(user.id);
      console.log('Navigating to requests page');
      onSuccess?.();
      navigate('/member/requests', { replace: true });
    } catch (error) {
      console.error('Failed to submit request:', error);
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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('Fahrzeug anfragen')}</h3>
        
        {/* Lease Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('Laufzeit (Monate)')}
          </label>
          <select
            value={leaseDuration}
            onChange={(e) => setLeaseDuration(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value={12}>12 {t('Monate')}</option>
            <option value={24}>24 {t('Monate')}</option>
            <option value={36}>36 {t('Monate')}</option>
            <option value={48}>48 {t('Monate')}</option>
          </select>
        </div>

        {/* Mileage Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('Laufleistung (km/Jahr)')}
          </label>
          <select
            value={mileageLimit}
            onChange={(e) => setMileageLimit(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value={10000}>10.000 km</option>
            <option value={15000}>15.000 km</option>
            <option value={20000}>20.000 km</option>
            <option value={25000}>25.000 km</option>
            <option value={30000}>30.000 km</option>
          </select>
        </div>

        {/* Color Selection */}
        {vehicle.availableColors.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('Farbe')}
            </label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {vehicle.availableColors.map((color) => (
                <option key={color.code} value={color.name}>
                  {color.name} ({color.type})
                  {color.price ? ` (+${color.price}€)` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Services */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('Services')}
          </label>
          <div className="space-y-2">
            {Object.entries(vehicle.services).map(([service, included]) => (
              <label key={service} className="flex items-center">
                <input
                  type="checkbox"
                  checked={included || selectedServices.includes(service)}
                  onChange={() => !included && toggleService(service)}
                  disabled={included}
                  className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {t(service)}
                  {included ? ` (${t('inklusive')})` : vehicle.servicePrices[service] ? ` (+${vehicle.servicePrices[service]}€)` : ''}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
            <span className="ml-2 text-sm text-gray-700">
              {t('Ich bestätige die Richtigkeit meiner Angaben und akzeptiere die Nutzungsbedingungen')}
            </span>
          </label>
        </div>

        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button
          type="button"
          variant="secondary"
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

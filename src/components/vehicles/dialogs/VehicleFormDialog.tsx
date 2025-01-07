import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Button } from '../../../components/core';
import { VehicleForm } from '../forms/VehicleForm';
import { toast } from 'react-hot-toast';
import { useTranslation } from '../../../hooks/useTranslation';
import type { Vehicle } from '../../../types/vehicle';

interface VehicleFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'regular' | 'pool' | 'salary';
  store: {
    addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
  };
}

const REQUIRED_FIELDS = {
  make: 'Marke',
  model: 'Modell',
  year: 'Baujahr',
  type: 'Fahrzeugtyp',
  fuelType: 'Kraftstoffart',
  transmission: 'Getriebe',
  power: 'Leistung',
  grossListPrice: 'Bruttolistenpreis'
} as const;

const DEFAULT_SERVICES: Vehicle['services'] = {
  insurance: true,
  maintenance: true,
  delivery: true,
  winterTires: true,
  gap: true,
  roadside: true,
  damageManagement: true
};

const DEFAULT_SERVICE_PRICES: Vehicle['servicePrices'] = {
  insurance: 89,
  maintenance: 59,
  winterTires: 39,
  gap: 19,
  roadside: 15,
  damageManagement: 29
};

const DEFAULT_LEASING_RATES: Vehicle['leasingRates'] = {
  '36_10000': 0,
  '36_15000': 0,
  '36_20000': 0,
  '48_10000': 0,
  '48_15000': 0,
  '48_20000': 0
};

const DEFAULT_ONE_TIME_COSTS: Vehicle['oneTimeCosts'] = {
  registration: 0,
  homeDelivery: 0,
  transfer: 0
};

export function VehicleFormDialog({ 
  isOpen, 
  onClose, 
  type = 'regular',
  store 
}: VehicleFormDialogProps) {
  const { t } = useTranslation();

  const getDialogTitle = () => {
    switch (type) {
      case 'pool':
        return t('Neues Pool-Fahrzeug anlegen');
      case 'salary':
        return t('Neues Gehaltsumwandlungs-Fahrzeug anlegen');
      default:
        return t('Neues Fahrzeug anlegen');
    }
  };

  const validateRequiredFields = (data: Partial<Vehicle>) => {
    const missingFields = Object.entries(REQUIRED_FIELDS)
      .filter(([key]) => !data[key as keyof typeof REQUIRED_FIELDS])
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      throw new Error(`${t('Bitte füllen Sie folgende Pflichtfelder aus')}: ${missingFields.join(', ')}`);
    }
  };

  const handleSubmit = async (data: Partial<Vehicle>) => {
    try {
      validateRequiredFields(data);

      await store.addVehicle({
        ...data,
        standardEquipment: data.standardEquipment?.trim() || '',
        mileage: data.mileage ?? 0,
        images: data.images ?? [],
        features: data.features ?? [],
        customFeatures: data.customFeatures ?? {},
        availableColors: data.availableColors ?? [],
        services: {
          ...DEFAULT_SERVICES,
          ...(data.services ?? {})
        },
        servicePrices: {
          ...DEFAULT_SERVICE_PRICES,
          ...(data.servicePrices ?? {})
        },
        leasingRates: {
          ...DEFAULT_LEASING_RATES,
          ...(data.leasingRates ?? {})
        },
        oneTimeCosts: {
          ...DEFAULT_ONE_TIME_COSTS,
          ...(data.oneTimeCosts ?? {})
        }
      } as Vehicle);

      toast.success(t(`${
        type === 'pool' 
          ? 'Pool-Fahrzeug' 
          : type === 'salary' 
            ? 'Gehaltsumwandlungs-Fahrzeug'
            : 'Fahrzeug'
      } erfolgreich angelegt`));
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('Unbekannter Fehler');
      toast.error(errorMessage);
      console.error('Error creating vehicle:', error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-xl max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">
              {getDialogTitle()}
            </Dialog.Title>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <VehicleForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            type={type}
          />
        </div>
      </div>
    </Dialog>
  );
}

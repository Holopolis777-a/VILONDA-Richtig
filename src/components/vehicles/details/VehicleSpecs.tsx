import React from 'react';
import {
  Calendar,
  Gauge,
  Car,
  Fuel,
  Settings,
  Power,
  Battery,
  LucideIcon
} from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import type { Vehicle } from '../../../types/vehicle';

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

interface SpecItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  highlight?: boolean;
}

function SpecItem({ icon: Icon, label, value, highlight }: SpecItemProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`p-2 ${highlight ? 'bg-primary-50' : 'bg-gray-100'} rounded-lg`}>
        <Icon className={`w-5 h-5 ${highlight ? 'text-primary-600' : 'text-gray-600'}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`font-medium ${highlight ? 'text-primary-600' : ''}`}>{value}</p>
      </div>
    </div>
  );
}

const getSpecs = (vehicle: Vehicle, t: (key: string) => string): SpecItemProps[] => {
  const isElectric = vehicle.fuelType === 'elektro';
  const baseSpecs = [
    {
      icon: Calendar,
      label: t('Baujahr'),
      value: vehicle.year
    },
    {
      icon: Gauge,
      label: t('Kilometerstand'),
      value: `${vehicle.mileage.toLocaleString()} km`
    },
    {
      icon: Fuel,
      label: t('Kraftstoff'),
      value: t(vehicle.fuelType).toUpperCase()
    },
    {
      icon: Settings,
      label: t('Getriebe'),
      value: t(vehicle.transmission).toUpperCase()
    },
    {
      icon: Power,
      label: t('Leistung'),
      value: `${vehicle.power} PS`
    }
  ];

  const electricRange = isElectric && vehicle.electricRange
    ? [{
        icon: Battery,
        label: t('Elektrische Reichweite'),
        value: `${vehicle.electricRange} km`,
        highlight: true
      }]
    : [];

  const color = vehicle.color
    ? [{
        icon: Car,
        label: t('Farbe'),
        value: vehicle.color
      }]
    : [];

  return [...baseSpecs, ...electricRange, ...color];
};

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const { t } = useTranslation();
  const specs = getSpecs(vehicle, t);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t('Technische Daten')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {specs.map((spec) => (
          <SpecItem key={spec.label} {...spec} />
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Checkbox, Input } from '../../../../components/core';
import { Shield, Wrench, Snowflake, FileText, WrenchIcon, Settings, Car } from 'lucide-react';
import type { Vehicle, VehicleServices as VehicleServicesType } from '../../../../types/vehicle';

interface VehicleServicesProps {
  data: Partial<Vehicle>;
  onChange: (data: Partial<Vehicle>) => void;
}

interface ServiceCardProps {
  id: keyof VehicleServicesType;
  label: string;
  icon: React.ElementType;
  description?: string;
  checked: boolean;
  price?: number;
  onCheckChange: (checked: boolean) => void;
  onPriceChange?: (value: number) => void;
}

function ServiceCard({
  id,
  label,
  icon: Icon,
  description,
  checked,
  price,
  onCheckChange,
  onPriceChange
}: ServiceCardProps) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100">
      <div className="pt-1">
        <Checkbox
          id={id}
          checked={checked}
          onChange={(e) => onCheckChange(e.target.checked)}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-gray-600" />
          <label 
            htmlFor={id}
            className="text-sm font-medium text-gray-900 cursor-pointer"
          >
            {label}
          </label>
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
        {onPriceChange && (
          <div className="mt-2">
            <Input
              type="number"
              min={0}
              step="0.01"
              placeholder="Monatlicher Preis"
              value={price || ''}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              helperText="€/Monat"
              fullWidth
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface ServiceConfig {
  id: keyof VehicleServicesType;
  label: string;
  icon: React.ElementType;
  description?: string;
  hasPrice: boolean;
}

const SERVICES: ServiceConfig[] = [
  {
    id: 'insurance',
    label: 'Vollkasko- & Haftpflichtversicherung',
    icon: Shield,
    description: 'Inkl. Vollkasko, Teilkasko und Haftpflicht',
    hasPrice: true
  },
  {
    id: 'maintenance',
    label: 'Wartung & Verschleiß',
    icon: Wrench,
    hasPrice: true
  },
  {
    id: 'winterTires',
    label: 'Winterreifen',
    icon: Snowflake,
    description: 'Inkl. Einlagerung und Wechsel',
    hasPrice: true
  },
  {
    id: 'gap',
    label: 'GAP Deckung Premium',
    icon: FileText,
    hasPrice: true
  },
  {
    id: 'roadside',
    label: 'KFZ-Schutzbrief & Pannenhilfe',
    icon: WrenchIcon,
    hasPrice: true
  },
  {
    id: 'damageManagement',
    label: 'Schadensmanagement',
    icon: Settings,
    hasPrice: true
  },
  {
    id: 'delivery',
    label: 'Überführung & Zulassung',
    icon: Car,
    hasPrice: false
  }
];

const DEFAULT_SERVICES: VehicleServicesType = {
  insurance: false,
  maintenance: false,
  delivery: false,
  winterTires: false,
  gap: false,
  roadside: false,
  damageManagement: false
};

export function VehicleServices({ data, onChange }: VehicleServicesProps) {
  const services = data.services || DEFAULT_SERVICES;
  const servicePrices = data.servicePrices || {};

  const handleServiceChange = (serviceId: keyof VehicleServicesType, checked: boolean) => {
    onChange({
      services: {
        ...services,
        [serviceId]: checked
      }
    });
  };

  const handlePriceChange = (serviceId: keyof Vehicle['servicePrices'], value: number) => {
    onChange({
      servicePrices: {
        ...servicePrices,
        [serviceId]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Inklusive Leistungen</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map(({ id, label, icon, description, hasPrice }) => (
          <ServiceCard
            key={id}
            id={id}
            label={label}
            icon={icon}
            description={description}
            checked={services[id]}
            price={hasPrice ? servicePrices[id] : undefined}
            onCheckChange={(checked) => handleServiceChange(id, checked)}
            onPriceChange={hasPrice ? (value) => handlePriceChange(id, value) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

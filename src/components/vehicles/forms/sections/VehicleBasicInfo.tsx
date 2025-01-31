import React from 'react';
import { Input, Select, type Option } from '../../../../components/core';
import type { VehicleFormData } from '../../../../types/vehicle';

interface VehicleBasicInfoProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

const vehicleTypeOptions: Option[] = [
  { value: 'limousine', label: 'Limousine' },
  { value: 'kombi', label: 'Kombi' },
  { value: 'suv', label: 'SUV' },
  { value: 'coupe', label: 'Coupé' },
  { value: 'cabrio', label: 'Cabriolet' }
];

export function VehicleBasicInfo({ data, onChange }: VehicleBasicInfoProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Grundinformationen</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Marke *"
          value={data.make}
          onChange={(e) => onChange({ make: e.target.value })}
          required
        />
        <Input
          label="Modell *"
          value={data.model}
          onChange={(e) => onChange({ model: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Ausstattungsvariante *"
          value={data.equipmentVariant}
          onChange={(e) => onChange({ equipmentVariant: e.target.value })}
          placeholder="z.B. Sport Line, M-Paket, Avantgarde"
          required
        />
        <Input
          label="Bruttolistenpreis (€) *"
          type="number"
          min={0}
          step="0.01"
          value={data.grossListPrice || ''}
          onChange={(e) => onChange({ grossListPrice: Number(e.target.value) })}
          placeholder="z.B. 45000"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Lieferzeit (Monate) *"
          type="number"
          min={1}
          max={24}
          value={data.deliveryTime}
          onChange={(e) => onChange({ deliveryTime: Number(e.target.value) })}
          required
        />
        <Input
          label="Fahrgestellnummer (VIN)"
          value={data.vin}
          onChange={(e) => onChange({ vin: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Baujahr *"
          type="number"
          min={1900}
          max={new Date().getFullYear() + 1}
          value={data.year}
          onChange={(e) => onChange({ year: Number(e.target.value) })}
          required
        />
        <Select
          label="Fahrzeugtyp *"
          value={data.type}
          options={vehicleTypeOptions}
          onChange={(value) => onChange({ type: value.toString() })}
          required
        />
      </div>
    </div>
  );
}

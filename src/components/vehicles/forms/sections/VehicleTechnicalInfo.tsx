import React from 'react';
import { Input, Select, type Option } from '../../../../components/core';
import { ElectricRangeInput } from '../../electric/ElectricRangeInput';
import type { Vehicle } from '../../../../types/vehicle';

interface VehicleTechnicalInfoProps {
  data: Partial<Vehicle>;
  onChange: (data: Partial<Vehicle>) => void;
}

const fuelTypeOptions: Option[] = [
  { value: 'benzin', label: 'Benzin' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'elektro', label: 'Elektro' },
  { value: 'hybrid', label: 'Hybrid' }
];

const transmissionOptions: Option[] = [
  { value: 'automatik', label: 'Automatik' },
  { value: 'manuell', label: 'Manuell' }
];

export function VehicleTechnicalInfo({ data, onChange }: VehicleTechnicalInfoProps) {
  const isElectric = data.fuelType === 'elektro';

  const handleFuelTypeChange = (value: string | number) => {
    const newFuelType = value.toString();
    onChange({ 
      fuelType: newFuelType,
      // Only clear electric range when switching from electric to non-electric
      ...(newFuelType !== 'elektro' && { electricRange: undefined })
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Technische Daten</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Kraftstoffart *"
          value={data.fuelType}
          options={fuelTypeOptions}
          onChange={handleFuelTypeChange}
          required
        />
        <Select
          label="Getriebe *"
          value={data.transmission}
          options={transmissionOptions}
          onChange={(value) => onChange({ transmission: value.toString() })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Leistung (PS) *"
          type="number"
          min={1}
          value={data.power}
          onChange={(e) => onChange({ power: Number(e.target.value) })}
          required
        />
        {isElectric ? (
          <ElectricRangeInput
            value={data.electricRange || 0}
            onChange={(value) => onChange({ electricRange: value })}
            required
          />
        ) : (
          <Input
            label="Hubraum (ccm)"
            type="number"
            min={0}
            value={data.engineSize}
            onChange={(e) => onChange({ engineSize: Number(e.target.value) })}
          />
        )}
      </div>
    </div>
  );
}

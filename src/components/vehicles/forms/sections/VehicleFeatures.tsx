import React from 'react';
import { Checkbox, Textarea } from '../../../../components/core';
import { CustomEquipmentInput } from './CustomEquipmentInput';
import type { VehicleFormData } from '../../../../types/vehicle';

interface VehicleFeaturesProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

const AVAILABLE_FEATURES = [
  { id: 'ledHeadlights', label: 'LED Scheinwerfer' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'leatherSeats', label: 'Ledersitze' },
  { id: 'heatedSeats', label: 'Sitzheizung' },
  { id: 'bluetooth', label: 'Bluetooth' },
  { id: 'parkingSensors', label: 'Einparkhilfe' },
  { id: 'cruiseControl', label: 'Tempomat' },
  { id: 'allWheelDrive', label: 'Allradantrieb' },
  { id: 'sunroof', label: 'Panoramadach' },
  { id: 'climateControl', label: 'Klimaautomatik' },
  { id: 'keylessEntry', label: 'Keyless Entry' },
  { id: 'electricMirrors', label: 'Elektrische Außenspiegel' }
] as const;

export function VehicleFeatures({ data, onChange }: VehicleFeaturesProps) {
  const handleFeatureToggle = (featureId: string, checked: boolean) => {
    const newFeatures = checked
      ? [...data.features, featureId]
      : data.features.filter(f => f !== featureId);
    
    onChange({ features: newFeatures });
  };

  const handleStandardEquipmentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ standardEquipment: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Ausstattungsmerkmale</h3>
      
      {/* Standard Equipment */}
      <Textarea
        label="Serienausstattung *"
        value={data.standardEquipment || ''}
        onChange={handleStandardEquipmentChange}
        rows={6}
        placeholder="Geben Sie hier die Serienausstattung ein (z.B. Klimaanlage, Zentralverriegelung, etc.)"
        required
        helperText="Bitte geben Sie die Serienausstattung zeilenweise ein"
      />
      
      {/* Additional Features */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium mb-4">Zusatzausstattung</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {AVAILABLE_FEATURES.map(feature => (
            <div
              key={feature.id}
              className="p-4 bg-white rounded-lg border border-gray-100"
            >
              <Checkbox
                id={feature.id}
                label={feature.label}
                checked={data.features.includes(feature.id)}
                onChange={(e) => handleFeatureToggle(feature.id, e.target.checked)}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <CustomEquipmentInput
            customEquipment={data.customEquipment}
            onChange={(equipment) => onChange({ customEquipment: equipment })}
          />
        </div>
      </div>
    </div>
  );
}

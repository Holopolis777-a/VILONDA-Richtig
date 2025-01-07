import React from 'react';
import { Battery } from 'lucide-react';
import { Input } from '../../../components/core';

interface ElectricRangeInputProps {
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
}

export function ElectricRangeInput({ value, onChange, required }: ElectricRangeInputProps) {
  return (
    <div className="relative">
      <Input
        label="Elektrische Reichweite (km) *"
        type="number"
        min={1}
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        required={required}
        startIcon={<Battery className="text-gray-400 w-5 h-5" />}
      />
    </div>
  );
}

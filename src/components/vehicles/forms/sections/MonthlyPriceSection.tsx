import React from 'react';
import { Input } from '../../../../components/core';

interface MonthlyPriceSectionProps {
  monthlyFrom?: number;
  onChange: (monthlyFrom: number) => void;
}

export function MonthlyPriceSection({ monthlyFrom = 0, onChange }: MonthlyPriceSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Monatlicher Preis</h3>
      <Input
        label="Monatlich ab (€)"
        type="number"
        min={0}
        step="1"
        value={monthlyFrom || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder="z.B. 249"
      />
    </div>
  );
}

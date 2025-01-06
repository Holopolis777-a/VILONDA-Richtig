import React from 'react';
import { Input } from '../../../ui/Input';

interface MonthlyPriceSectionProps {
  monthlyFrom?: number;
  onChange: (monthlyFrom: number) => void;
}

export function MonthlyPriceSection({ monthlyFrom = 0, onChange }: MonthlyPriceSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Monatlicher Preis</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="monthlyFrom" className="block text-sm font-medium text-gray-700 mb-1">
            Monatlich ab (€)
          </label>
          <Input
            id="monthlyFrom"
            type="number"
            min="0"
            step="1"
            value={monthlyFrom || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder="z.B. 249"
          />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Input } from '../../../../components/core';
import type { Vehicle, VehicleFormData } from '../../../../types/vehicle';

interface VehiclePriceMatrixProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
  type?: 'regular' | 'pool' | 'salary';
}

interface PriceMatrixConfig {
  months: number;
  kilometers: number;
  key: keyof Vehicle['leasingRates'];
}

const PRICE_MATRIX_CONFIG: PriceMatrixConfig[] = [
  { months: 36, kilometers: 10000, key: '36_10000' },
  { months: 36, kilometers: 15000, key: '36_15000' },
  { months: 36, kilometers: 20000, key: '36_20000' },
  { months: 48, kilometers: 10000, key: '48_10000' },
  { months: 48, kilometers: 15000, key: '48_15000' },
  { months: 48, kilometers: 20000, key: '48_20000' }
];

const DEFAULT_LEASING_RATES: Vehicle['leasingRates'] = {
  '36_10000': 0,
  '36_15000': 0,
  '36_20000': 0,
  '48_10000': 0,
  '48_15000': 0,
  '48_20000': 0
};

export function VehiclePriceMatrix({ data, onChange, type }: VehiclePriceMatrixProps) {
  const leasingRates = data.leasingRates || DEFAULT_LEASING_RATES;

  const handlePriceChange = (key: keyof Vehicle['leasingRates'], value: string) => {
    onChange({
      leasingRates: {
        ...leasingRates,
        [key]: Number(value)
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Preismatrix</h3>
      
      {type === 'salary' && (
        <div className="mb-6">
          <Input
            label="Monatlich ab (€) *"
            type="number"
            min={0}
            step="0.01"
            value={data.monthlyStartingRate || ''}
            onChange={(e) => onChange({ monthlyStartingRate: Number(e.target.value) })}
            placeholder="Monatliche Rate eingeben"
            required
            helperText="Diese Rate wird als Startpreis angezeigt"
            className="max-w-xs"
          />
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="font-medium">Laufzeit</div>
          <div className="font-medium text-center">10.000 km/Jahr</div>
          <div className="font-medium text-center">15.000 km/Jahr</div>
          <div className="font-medium text-center">20.000 km/Jahr</div>
        </div>
        
        {[36, 48].map((months) => (
          <div key={months} className="grid grid-cols-4 gap-4 mb-4 items-center">
            <div className="font-medium">{months} Monate</div>
            {[10000, 15000, 20000].map((kilometers) => {
              const key = `${months}_${kilometers}` as keyof Vehicle['leasingRates'];
              return (
                <Input
                  key={key}
                  type="number"
                  min={0}
                  step="0.01"
                  value={leasingRates[key] || ''}
                  onChange={(e) => handlePriceChange(key, e.target.value)}
                  placeholder="€"
                />
              );
            })}
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        Alle Preise verstehen sich als monatliche Rate inkl. MwSt.
      </p>
    </div>
  );
}

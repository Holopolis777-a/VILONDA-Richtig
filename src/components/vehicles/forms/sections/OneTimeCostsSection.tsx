import React from 'react';
import { Input } from '../../../../components/core';
import { FileText, Truck, Car } from 'lucide-react';
import type { OneTimeCosts } from '../../../../types/vehicle';

interface OneTimeCostsSectionProps {
  costs: OneTimeCosts;
  onChange: (costs: OneTimeCosts) => void;
}

interface CostItemProps {
  icon: React.ReactNode;
  iconColor: string;
  iconBgColor: string;
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

function CostItem({ 
  icon, 
  iconColor, 
  iconBgColor, 
  label, 
  description, 
  value, 
  onChange 
}: CostItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          <div className={`w-5 h-5 ${iconColor}`}>
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <Input
            label={label}
            type="number"
            min={0}
            step="0.01"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder="0.00"
          />
        </div>
      </div>
      <p className="text-sm text-gray-500 ml-12">
        {description}
      </p>
    </div>
  );
}

export function OneTimeCostsSection({ costs, onChange }: OneTimeCostsSectionProps) {
  const handleChange = (key: keyof OneTimeCosts) => (value: number) => {
    onChange({ ...costs, [key]: value });
  };

  const totalCosts = costs.registration + costs.homeDelivery + costs.transfer;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Einmalkosten</h3>
      
      <div className="grid gap-6">
        <CostItem
          icon={<FileText />}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          label="Zulassungskosten"
          description="Kosten für die Fahrzeugzulassung und Kennzeichen"
          value={costs.registration}
          onChange={handleChange('registration')}
        />

        <CostItem
          icon={<Truck />}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          label="Haustürlieferung"
          description="Kosten für die Lieferung zum Kunden"
          value={costs.homeDelivery}
          onChange={handleChange('homeDelivery')}
        />

        <CostItem
          icon={<Car />}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
          label="Überführungskosten"
          description="Kosten für die Überführung vom Händler"
          value={costs.transfer}
          onChange={handleChange('transfer')}
        />
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Gesamtkosten:</span>
          <span className="text-lg font-semibold">
            {totalCosts.toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { PiggyBank } from 'lucide-react';

interface SavingsDisplayProps {
  taxSavings: number;
  socialInsuranceSavings: number;
  effectiveMonthlyCost: number;
  monthlySavings: number;
}

export function SavingsDisplay({ 
  taxSavings, 
  socialInsuranceSavings, 
  effectiveMonthlyCost,
  monthlySavings 
}: SavingsDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Main cost display */}
      <div className="bg-emerald-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Effektive monatliche Kosten</h3>
          <PiggyBank className="w-8 h-8" />
        </div>
        <p className="text-3xl font-bold">{effectiveMonthlyCost.toFixed(2)}€</p>
      </div>

      {/* Savings breakdown */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div>
          <p className="text-sm text-gray-600">Monatliche Steuerersparnis</p>
          <p className="text-lg font-semibold text-green-600">+{taxSavings.toFixed(2)}€</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Sozialversicherungsersparnis</p>
          <p className="text-lg font-semibold text-green-600">+{socialInsuranceSavings.toFixed(2)}€</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Ihre monatliche Ersparnis</p>
          <p className="text-lg font-semibold text-green-600">{monthlySavings.toFixed(2)}€</p>
        </div>
      </div>
    </div>
  );
}

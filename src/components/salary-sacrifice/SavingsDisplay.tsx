import React from 'react';
import { PiggyBank } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/core';
import { useTranslation } from '../../hooks/useTranslation';

interface SavingsDisplayProps {
  taxSavings: number;
  socialInsuranceSavings: number;
  effectiveMonthlyCost: number;
  monthlySavings: number;
}

interface SavingsItemProps {
  label: string;
  value: number;
  highlight?: boolean;
}

function SavingsItem({ label, value, highlight }: SavingsItemProps) {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-lg font-semibold ${highlight ? 'text-emerald-600' : ''}`}>
        {value > 0 ? '+' : ''}{value.toFixed(2)}€
      </p>
    </div>
  );
}

export function SavingsDisplay({ 
  taxSavings, 
  socialInsuranceSavings, 
  effectiveMonthlyCost,
  monthlySavings 
}: SavingsDisplayProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Main cost display */}
      <Card variant="success" className="p-6">
        <CardHeader>
          <CardTitle>{t('Effektive monatliche Kosten')}</CardTitle>
          <PiggyBank className="w-8 h-8" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{effectiveMonthlyCost.toFixed(2)}€</p>
        </CardContent>
      </Card>

      {/* Savings breakdown */}
      <Card>
        <CardContent>
          <div className="space-y-4">
            <SavingsItem 
              label={t('Monatliche Steuerersparnis')}
              value={taxSavings}
              highlight
            />
            
            <SavingsItem 
              label={t('Sozialversicherungsersparnis')}
              value={socialInsuranceSavings}
              highlight
            />
            
            <SavingsItem 
              label={t('Ihre monatliche Ersparnis')}
              value={monthlySavings}
              highlight
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

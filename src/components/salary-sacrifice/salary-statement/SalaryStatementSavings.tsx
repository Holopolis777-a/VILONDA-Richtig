import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/core';
import { formatCurrency } from '../../../utils/formatters';
import { useTranslation } from '../../../hooks/useTranslation';

interface SalaryStatementSavingsProps {
  effectiveCosts: number;
}

export function SalaryStatementSavings({ effectiveCosts }: SalaryStatementSavingsProps) {
  const { t } = useTranslation();

  return (
    <Card className="bg-emerald-50">
      <CardContent className="p-6">
        <CardHeader className="p-0 mb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-gray-800">
              {t('Effektive monatliche Kosten')}
            </CardTitle>
            <div className="text-3xl font-bold text-gray-900">
              {formatCurrency(effectiveCosts)}
            </div>
          </div>
        </CardHeader>
        <p className="text-sm text-gray-700">
          {t('Dies sind Ihre tatsächlichen monatlichen Kosten nach Berücksichtigung aller Steuer- und Sozialversicherungsvorteile.')}
        </p>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { Card, CardContent } from '../../../components/core';
import { formatCurrency } from '../../../utils/formatters';
import { useTranslation } from '../../../hooks/useTranslation';
import type { SalaryCalculations, SocialSecurity } from '../../../types/salary';

interface SalaryStatementTableProps {
  calculations: SalaryCalculations;
  monthlyRate: number;
}

interface TableRowProps {
  label: string;
  withoutLease: React.ReactNode;
  withLease: React.ReactNode;
  isTotal?: boolean;
  isSubItem?: boolean;
  isNegative?: boolean;
}

function TableRow({ 
  label, 
  withoutLease, 
  withLease, 
  isTotal,
  isSubItem,
  isNegative 
}: TableRowProps) {
  const baseClasses = isTotal ? 'bg-gray-100 font-semibold' : isSubItem ? '' : 'bg-gray-50';
  const valueClasses = isNegative ? 'text-red-600' : '';

  return (
    <tr className={baseClasses}>
      <td className={`px-4 py-2 ${isSubItem ? 'pl-8' : 'font-medium'}`}>{label}</td>
      <td className={`px-4 py-2 text-right ${valueClasses}`}>{withoutLease}</td>
      <td className={`px-4 py-2 text-right ${valueClasses}`}>{withLease}</td>
    </tr>
  );
}

function calculateTotalSocialSecurity(socialSecurity: SocialSecurity): number {
  return Object.values(socialSecurity).reduce((acc, curr) => acc + curr, 0);
}

export function SalaryStatementTable({ calculations, monthlyRate }: SalaryStatementTableProps) {
  const { t } = useTranslation();

  const totalSocialSecurity = {
    withoutLease: calculateTotalSocialSecurity(calculations.withoutLease.socialSecurity),
    withLease: calculateTotalSocialSecurity(calculations.withLease.socialSecurity)
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">{t('Position')}</th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">{t('Ohne Vilonda')}</th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">{t('Mit Vilonda')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <TableRow
                label={t('Grundbrutto')}
                withoutLease={formatCurrency(calculations.withoutLease.gross)}
                withLease={formatCurrency(calculations.withLease.gross)}
              />
              
              <TableRow
                label={t('Entgeltumwandlung Dienstwagen')}
                withoutLease="-"
                withLease={`-${formatCurrency(monthlyRate)}`}
                isNegative
              />

              <TableRow
                label={t('Geldwerter Vorteil Privatfahrten')}
                withoutLease="-"
                withLease={formatCurrency(calculations.withLease.monetaryBenefit.private)}
                isSubItem
              />

              <TableRow
                label={t('Lohnsteuer')}
                withoutLease={`-${formatCurrency(calculations.withoutLease.incomeTax)}`}
                withLease={`-${formatCurrency(calculations.withLease.incomeTax)}`}
                isNegative
              />

              <TableRow
                label={t('Sozialversicherung gesamt')}
                withoutLease={`-${formatCurrency(totalSocialSecurity.withoutLease)}`}
                withLease={`-${formatCurrency(totalSocialSecurity.withLease)}`}
                isNegative
              />

              <TableRow
                label={t('Netto zur Auszahlung')}
                withoutLease={formatCurrency(calculations.withoutLease.net)}
                withLease={formatCurrency(calculations.withLease.net)}
                isTotal
              />
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

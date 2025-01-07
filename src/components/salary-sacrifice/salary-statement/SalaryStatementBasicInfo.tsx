import React from 'react';
import { Card, CardContent } from '../../../components/core';
import { useTranslation } from '../../../hooks/useTranslation';

interface SalaryStatementBasicInfoProps {
  taxClass: string;
  churchTax: boolean;
  distanceToWork: number;
}

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="text-lg font-medium text-gray-900">{value}</div>
    </div>
  );
}

export function SalaryStatementBasicInfo({ 
  taxClass, 
  churchTax, 
  distanceToWork 
}: SalaryStatementBasicInfoProps) {
  const { t } = useTranslation();

  return (
    <Card className="bg-primary-50">
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <InfoItem 
            label={t('Steuerklasse')}
            value={taxClass}
          />
          <InfoItem 
            label={t('Kirchensteuer')}
            value={churchTax ? t('Ja') : t('Nein')}
          />
          <InfoItem 
            label={t('Arbeitsweg in KM')}
            value={distanceToWork}
          />
        </div>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { InfoBox } from '../../components/core';
import { useTranslation } from '../../hooks/useTranslation';

export function SalaryInfoBox() {
  const { t } = useTranslation();

  return (
    <InfoBox 
      variant="info"
      className="mt-6"
      showIcon
    >
      {t('*Rate pro Vilonda-Gehaltsumwandlung. Die tatsächliche Ersparnis hängt von den individuellen steuerlichen Gegebenheiten ab und kann variieren. Für eine genaue Überprüfung wende dich bitte an deinen Steuerberater.')}
    </InfoBox>
  );
}

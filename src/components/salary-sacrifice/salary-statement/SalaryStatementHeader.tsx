import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Download } from 'lucide-react';
import { Button } from '../../../components/core';
import { useTranslation } from '../../../hooks/useTranslation';

interface SalaryStatementHeaderProps {
  onClose: () => void;
  onDownload: () => void;
}

export function SalaryStatementHeader({ onClose, onDownload }: SalaryStatementHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-6">
      <Dialog.Title className="text-xl font-semibold">
        {t('Gehaltsabrechnung Entgeltumwandlung')}
      </Dialog.Title>
      <div className="flex items-center space-x-2">
        <Button 
          onClick={onDownload} 
          variant="outline"
          startIcon={<Download className="w-4 h-4" />}
        >
          {t('PDF herunterladen')}
        </Button>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="rounded-full p-2"
        >
          <X className="w-6 h-6" />
          <span className="sr-only">{t('Schließen')}</span>
        </Button>
      </div>
    </div>
  );
}

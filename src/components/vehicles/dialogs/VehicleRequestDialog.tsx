import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Button } from '../../../components/core';
import { Vehicle } from '../../../types/vehicle';
import { VehicleRequestForm } from '../forms/VehicleRequestForm';
import { useTranslation } from '../../../hooks/useTranslation';

interface VehicleRequestDialogProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function VehicleRequestDialog({ vehicle, isOpen, onClose }: VehicleRequestDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">
              {t('Fahrzeug anfragen')}
            </Dialog.Title>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">{t('Schließen')}</span>
            </Button>
          </div>

          <VehicleRequestForm
            vehicle={vehicle}
            onSuccess={() => {
              onClose();
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </Dialog>
  );
}

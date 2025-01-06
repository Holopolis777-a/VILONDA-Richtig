import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { VehicleForm } from '../forms/VehicleForm';
import type { Vehicle } from '../../../types/vehicle';

interface VehicleEditDialogProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function VehicleEditDialog({ vehicle, isOpen, onClose }: VehicleEditDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-xl max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">
              Fahrzeug bearbeiten
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <VehicleForm
            vehicle={vehicle}
            onClose={onClose}
          />
        </div>
      </div>
    </Dialog>
  );
}
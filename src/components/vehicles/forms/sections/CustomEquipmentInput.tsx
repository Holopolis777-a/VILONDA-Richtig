import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input, Button } from '../../../../components/core';

interface CustomEquipmentInputProps {
  customEquipment: string[];
  onChange: (equipment: string[]) => void;
}

export function CustomEquipmentInput({ customEquipment = [], onChange }: CustomEquipmentInputProps) {
  const [newEquipment, setNewEquipment] = React.useState('');

  const handleAdd = () => {
    if (newEquipment.trim()) {
      onChange([...customEquipment, newEquipment.trim()]);
      setNewEquipment('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(customEquipment.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex gap-2">
          <Input
            label="Zusätzliche Ausstattung"
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="z.B. Panoramadach, Head-up Display"
            className="flex-1"
          />
          <div className="flex items-end">
            <Button
              type="button"
              onClick={handleAdd}
              disabled={!newEquipment.trim()}
              variant="secondary"
              startIcon={<Plus className="w-4 h-4" />}
            >
              Hinzufügen
            </Button>
          </div>
        </div>
      </div>

      {customEquipment.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {customEquipment.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <span className="text-sm text-gray-700">{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Entfernen</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input, Select, Button, type Option } from '../../../../components/core';
import type { VehicleColor, VehicleFormData } from '../../../../types/vehicle';

interface ColorManagementProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

interface ColorCardProps {
  color: VehicleColor;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

function ColorCard({ color, isSelected, onSelect, onRemove }: ColorCardProps) {
  return (
    <div
      className={`flex items-center space-x-4 p-4 bg-white rounded-lg border transition-colors cursor-pointer ${
        isSelected ? 'border-primary-600 ring-1 ring-primary-500' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div
        className="w-8 h-8 rounded-full border border-gray-200 shadow-inner"
        style={{ backgroundColor: color.code }}
      />
      <div className="flex-1">
        <div className="font-medium text-gray-900">{color.name}</div>
        <div className="text-sm text-gray-500">
          {color.type === 'solid' ? 'Uni-Lackierung' : 
           color.type === 'metallic' ? 'Metallic-Lackierung' : 
           'Perleffekt-Lackierung'}
          {color.price ? ` • +${color.price.toFixed(2)}€` : ''}
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

const COLOR_TYPES: Option[] = [
  { value: 'solid', label: 'Uni-Lackierung' },
  { value: 'metallic', label: 'Metallic-Lackierung' },
  { value: 'pearl', label: 'Perleffekt-Lackierung' }
];

export function ColorManagement({ data, onChange }: ColorManagementProps) {
  const [newColor, setNewColor] = React.useState<VehicleColor>({
    name: '',
    code: '',
    type: 'solid',
    price: 0,
  });

  const handleAddColor = () => {
    if (!newColor.name || !newColor.code) return;
    
    const updatedColors = [...(data.availableColors || []), newColor];
    onChange({ 
      availableColors: updatedColors,
      // Set as default color if it's the first one
      color: data.color || newColor.name 
    });
    
    setNewColor({
      name: '',
      code: '',
      type: 'solid',
      price: 0,
    });
  };

  const handleRemoveColor = (index: number) => {
    const updatedColors = data.availableColors.filter((_, i) => i !== index);
    onChange({ 
      availableColors: updatedColors,
      // Update selected color if removed
      color: data.color === data.availableColors[index].name 
        ? updatedColors[0]?.name || ''
        : data.color
    });
  };

  const handleSelectColor = (colorName: string) => {
    onChange({ color: colorName });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Verfügbare Farben</h3>

      {/* Color List */}
      {data.availableColors?.length > 0 && (
        <div className="grid gap-4 mb-6">
          {data.availableColors.map((color, index) => (
            <ColorCard
              key={index}
              color={color}
              isSelected={data.color === color.name}
              onSelect={() => handleSelectColor(color.name)}
              onRemove={() => handleRemoveColor(index)}
            />
          ))}
        </div>
      )}

      {/* Add New Color */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <Input
          label="Farbname"
          value={newColor.name}
          onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
          placeholder="z.B. Alpinweiß"
        />
        <Input
          label="Farbcode"
          value={newColor.code}
          onChange={(e) => setNewColor({ ...newColor, code: e.target.value })}
          placeholder="#FFFFFF oder RGB"
        />
        <Select
          label="Typ"
          value={newColor.type}
          options={COLOR_TYPES}
          onChange={(value) => setNewColor({ ...newColor, type: value as VehicleColor['type'] })}
        />
        <Input
          type="number"
          label="Aufpreis (€)"
          min={0}
          step="0.01"
          value={newColor.price || ''}
          onChange={(e) => setNewColor({ ...newColor, price: Number(e.target.value) })}
          placeholder="0.00"
        />
        <div className="col-span-2">
          <Button
            type="button"
            onClick={handleAddColor}
            disabled={!newColor.name || !newColor.code}
            fullWidth
            startIcon={<Plus className="w-4 h-4" />}
          >
            Farbe hinzufügen
          </Button>
        </div>
      </div>
    </div>
  );
}

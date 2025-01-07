import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';

export interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function Slider({ min, max, step = 1, value, onChange, className }: SliderProps) {
  const handleValueChange = React.useCallback(
    (newValues: number[]) => {
      if (newValues.length > 0) {
        onChange(newValues[0]);
      }
    },
    [onChange]
  );

  return (
    <SliderPrimitive.Root
      className={twMerge(
        'relative flex items-center select-none touch-none w-full h-5',
        className
      )}
      value={[value]}
      onValueChange={handleValueChange}
      max={max}
      min={min}
      step={step}
    >
      <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-2">
        <SliderPrimitive.Range className="absolute bg-primary-600 rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block w-5 h-5 bg-white border-2 border-primary-600 rounded-full hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
      />
    </SliderPrimitive.Root>
  );
}

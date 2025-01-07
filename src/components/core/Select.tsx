import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: Option[];
  value?: Option['value'];
  onChange?: (value: Option['value']) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    error,
    helperText,
    fullWidth = false,
    options,
    value,
    onChange,
    className,
    disabled,
    ...props
  }, ref) => {
    const baseSelectStyles = 'block rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500';
    const errorSelectStyles = 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500';
    
    const selectClasses = twMerge(
      baseSelectStyles,
      error && errorSelectStyles,
      fullWidth && 'w-full',
      className
    );

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      const option = options.find(opt => opt.value.toString() === selectedValue);
      if (option && onChange) {
        onChange(option.value);
      }
    };

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          value={value?.toString() ?? ''}
          onChange={handleChange}
          disabled={disabled}
          className={selectClasses}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {(error || helperText) && (
          <p
            className={twMerge(
              'mt-1 text-sm',
              error ? 'text-red-600' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const checkboxClasses = twMerge(
      'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
      error && 'border-red-300 text-red-500 focus:ring-red-500',
      className
    );

    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            ref={ref}
            className={checkboxClasses}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3 text-sm">
            <label
              htmlFor={props.id}
              className={twMerge(
                'font-medium text-gray-700',
                error && 'text-red-600',
                props.disabled && 'text-gray-500'
              )}
            >
              {label}
            </label>
            {helperText && (
              <p className={twMerge(
                'text-gray-500',
                error && 'text-red-600'
              )}>
                {error || helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

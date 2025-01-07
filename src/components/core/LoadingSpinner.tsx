import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const colors = {
    primary: 'border-primary-600 border-t-transparent',
    secondary: 'border-secondary-600 border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  const spinnerClasses = twMerge(
    'animate-spin rounded-full border-2',
    sizes[size],
    colors[color],
    className
  );

  return (
    <div role="status" className="inline-block">
      <div className={spinnerClasses} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

LoadingSpinner.displayName = 'LoadingSpinner';

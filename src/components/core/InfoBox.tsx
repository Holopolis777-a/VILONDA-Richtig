import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Info } from 'lucide-react';

export type InfoBoxVariant = 'info' | 'warning' | 'success' | 'error';

export interface InfoBoxProps {
  children: React.ReactNode;
  variant?: InfoBoxVariant;
  className?: string;
  showIcon?: boolean;
}

const variants = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-500'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: 'text-yellow-500'
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: 'text-green-500'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: 'text-red-500'
  }
};

export function InfoBox({ 
  children, 
  variant = 'info', 
  className,
  showIcon = false
}: InfoBoxProps) {
  const styles = variants[variant];

  return (
    <div className={twMerge(
      styles.bg,
      'border rounded-lg p-4',
      styles.border,
      className
    )}>
      <div className="flex gap-3">
        {showIcon && (
          <Info className={twMerge('w-5 h-5 flex-shrink-0', styles.icon)} />
        )}
        <div className={twMerge('text-sm', styles.text)}>
          {children}
        </div>
      </div>
    </div>
  );
}

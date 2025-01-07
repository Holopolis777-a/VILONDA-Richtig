import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'success';
}

const variants = {
  default: 'bg-white',
  primary: 'bg-primary-600 text-white',
  success: 'bg-emerald-600 text-white'
};

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div className={twMerge(
      variants[variant],
      'rounded-lg shadow p-4',
      className
    )}>
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function CardHeader({ children, className, action }: CardHeaderProps) {
  return (
    <div className={twMerge(
      'flex items-center justify-between mb-4',
      className
    )}>
      <div className="flex-1">{children}</div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={twMerge('text-lg font-semibold', className)}>
      {children}
    </h3>
  );
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={twMerge('space-y-4', className)}>
      {children}
    </div>
  );
}

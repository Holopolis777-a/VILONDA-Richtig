import React from 'react';
import { SavingsDisplay } from './SavingsDisplay';

interface SalaryCalculationResult {
  netSalaryWithoutLease: number;
  netSalaryWithLease: number;
  effectiveCosts: number;
  taxSavings: number;
  socialSecuritySavings: number;
  monthlyBenefit: number;
}

interface SalaryCalculationResultProps {
  calculation: SalaryCalculationResult;
}

export function NewSalaryCalculationResult({ calculation }: SalaryCalculationResultProps) {
  return (
    <SavingsDisplay
      taxSavings={calculation.taxSavings}
      socialInsuranceSavings={calculation.socialSecuritySavings}
      effectiveMonthlyCost={calculation.effectiveCosts}
      monthlySavings={calculation.monthlyBenefit}
    />
  );
}

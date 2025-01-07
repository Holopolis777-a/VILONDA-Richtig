import React from 'react';
import { SavingsDisplay } from './SavingsDisplay';
import type { SalaryCalculationResult } from '../../types/salary';

interface NewSalaryCalculationResultProps {
  calculation: SalaryCalculationResult;
}

export function NewSalaryCalculationResult({ calculation }: NewSalaryCalculationResultProps) {
  return (
    <SavingsDisplay
      taxSavings={calculation.taxSavings}
      socialInsuranceSavings={calculation.socialSecuritySavings}
      effectiveMonthlyCost={calculation.effectiveCosts}
      monthlySavings={calculation.monthlyBenefit}
    />
  );
}

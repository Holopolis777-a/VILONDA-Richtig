export interface SalaryCalculationResult {
  netSalaryWithoutLease: number;
  netSalaryWithLease: number;
  effectiveCosts: number;
  taxSavings: number;
  socialSecuritySavings: number;
  monthlyBenefit: number;
}

export interface SocialSecurity {
  pension: number;
  health: number;
  care: number;
  unemployment: number;
}

export interface MonetaryBenefit {
  private: number;
  commute: number;
}

export interface SalaryCalculationBase {
  gross: number;
  incomeTax: number;
  churchTax: number;
  socialSecurity: SocialSecurity;
  net: number;
}

export interface SalaryCalculationWithLease extends SalaryCalculationBase {
  leaseAmount: number;
  monetaryBenefit: MonetaryBenefit;
  chargingBenefit: number;
}

export interface SalaryCalculations {
  withoutLease: SalaryCalculationBase;
  withLease: SalaryCalculationWithLease;
  savings: {
    employee: number;
    employer: number;
  };
}

export interface SalaryStatementData {
  grossSalary: number;
  taxClass: string;
  distanceToWork: number;
  monthlyRate: number;
  churchTax: boolean;
  calculations: SalaryCalculations;
}

export interface SalaryDetailsProps {
  grossSalary: number;
  onGrossSalaryChange: (value: number) => void;
  taxClass: string;
  onTaxClassChange: (value: string) => void;
  distanceToWork: number;
  onDistanceChange: (value: number) => void;
  canChargeAtWork: boolean;
  onCanChargeAtWorkChange: (value: boolean) => void;
  monthlyRate: number;
  listPrice: number;
}

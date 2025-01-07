import type { SalaryCalculationResult } from '../types/salary';

// Steuerfaktoren für verschiedene Steuerklassen
const TAX_CLASS_FACTORS = {
  '1': 0.36,
  '2': 0.34,
  '3': 0.32,
  '4': 0.36,
  '5': 0.40,
  '6': 0.42,
} as const;

// Sozialversicherungssätze (Stand 2024)
const SOCIAL_SECURITY_RATES = {
  pension: 0.093, // Rentenversicherung
  health: 0.073, // Krankenversicherung
  care: 0.0175, // Pflegeversicherung
  unemployment: 0.012, // Arbeitslosenversicherung
} as const;

interface SalaryCalculationParams {
  grossSalary: number;
  taxClass: string;
  distanceToWork: number;
  canChargeAtWork: boolean;
  monthlyRate: number;
  listPrice: number;
  hasChurchTax?: boolean;
}

/**
 * Berechnet die Sozialversicherungsbeiträge
 */
function calculateSocialSecurity(grossSalary: number): number {
  const totalRate = Object.values(SOCIAL_SECURITY_RATES).reduce((sum, rate) => sum + rate, 0);
  return grossSalary * totalRate;
}

/**
 * Berechnet den geldwerten Vorteil
 */
function calculateMonetaryBenefit(listPrice: number, distanceToWork: number) {
  const privateBenefit = listPrice * 0.0025; // 0.25% für private Nutzung
  const commuteBenefit = listPrice * 0.000075 * distanceToWork; // 0.03% pro km
  return privateBenefit + commuteBenefit;
}

/**
 * Berechnet die Gehaltsumwandlung und die resultierenden Ersparnisse
 * @param params - Parameter für die Berechnung
 * @returns Berechnungsergebnis mit allen relevanten Werten
 */
export function calculateSalarySacrifice(params: SalaryCalculationParams): SalaryCalculationResult {
  // Parameter validieren
  if (params.grossSalary < 0) throw new Error('Bruttogehalt muss positiv sein');
  if (params.monthlyRate < 0) throw new Error('Leasingrate muss positiv sein');
  if (params.listPrice < 0) throw new Error('Listenpreis muss positiv sein');
  if (params.distanceToWork < 0) throw new Error('Entfernung muss positiv sein');
  if (!TAX_CLASS_FACTORS[params.taxClass as keyof typeof TAX_CLASS_FACTORS]) {
    throw new Error('Ungültige Steuerklasse');
  }

  const {
    grossSalary,
    taxClass,
    distanceToWork,
    canChargeAtWork,
    monthlyRate,
    listPrice,
    hasChurchTax = false
  } = params;

  // 1. Ausgangssituation ohne Gehaltsumwandlung
  const taxFactor = TAX_CLASS_FACTORS[taxClass as keyof typeof TAX_CLASS_FACTORS];
  const incomeTax = grossSalary * taxFactor;
  const churchTax = hasChurchTax ? incomeTax * 0.09 : 0;
  const socialSecurity = calculateSocialSecurity(grossSalary);

  // Netto ohne Leasing
  const netSalaryWithoutLease = grossSalary - (incomeTax + churchTax + socialSecurity);

  // 2. Situation mit Gehaltsumwandlung
  const newGrossSalary = grossSalary - monthlyRate;
  const totalBenefit = calculateMonetaryBenefit(listPrice, distanceToWork);
  const chargingBenefit = canChargeAtWork ? 30 : 70;

  // Neues zu versteuerndes Einkommen
  const newTaxableIncome = newGrossSalary + totalBenefit;
  const newIncomeTax = newTaxableIncome * taxFactor;
  const newChurchTax = hasChurchTax ? newIncomeTax * 0.09 : 0;
  const newSocialSecurity = calculateSocialSecurity(newGrossSalary);

  // Neues Nettogehalt
  const netSalaryWithLease = newTaxableIncome - (newIncomeTax + newChurchTax + newSocialSecurity) - totalBenefit + chargingBenefit;

  // Ersparnisse berechnen
  const taxSavings = incomeTax - newIncomeTax;
  const socialSecuritySavings = socialSecurity - newSocialSecurity;

  // Effektive Kosten und monatlicher Benefit
  const effectiveCosts = netSalaryWithoutLease - netSalaryWithLease;
  const monthlyBenefit = monthlyRate - effectiveCosts - (churchTax / 2) - 40;

  return {
    netSalaryWithoutLease,
    netSalaryWithLease,
    effectiveCosts,
    taxSavings,
    socialSecuritySavings,
    monthlyBenefit
  };
}


export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
}

export type CreditType = 'phone' | 'message' | 'campaign';

export interface CreditPackagesData {
  phone: CreditPackage[];
  message: CreditPackage[];
  campaign: CreditPackage[];
}

export interface CreditCosts {
  phone: number;
  message: number;
  campaign: number;
}

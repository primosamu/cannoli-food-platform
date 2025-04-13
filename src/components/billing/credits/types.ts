
export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
}

export type CreditType = 'phone' | 'message' | 'campaign' | 'rcs';

export interface CreditPackagesData {
  phone: CreditPackage[];
  message: CreditPackage[];
  campaign: CreditPackage[];
  rcs: CreditPackage[];
}

export interface CreditCosts {
  phone: number;
  message: number;
  campaign: number;
  rcs: number;
}

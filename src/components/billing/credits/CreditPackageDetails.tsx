
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
}

interface CreditPackageDetailsProps {
  currentPackage: CreditPackage;
}

export const CreditPackageDetails: React.FC<CreditPackageDetailsProps> = ({ currentPackage }) => {
  const { translations } = useLanguage();
  
  return (
    <div className="bg-muted/50 p-3 rounded-md my-4 space-y-2">
      <div className="flex justify-between">
        <span>{translations.creditPackage}</span>
        <span className="font-medium">{currentPackage.name}</span>
      </div>
      <div className="flex justify-between">
        <span>{translations.credits}</span>
        <span className="font-medium">{currentPackage.credits}</span>
      </div>
      <div className="flex justify-between">
        <span>{translations.pricePerCredit}</span>
        <span className="font-medium">
          ${(currentPackage.price / currentPackage.credits).toFixed(3)}
        </span>
      </div>
    </div>
  );
};


import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface CreditSummaryProps {
  total: number;
  totalCredits: number;
}

export const CreditSummary: React.FC<CreditSummaryProps> = ({ total, totalCredits }) => {
  const { translations } = useLanguage();
  
  return (
    <div className="bg-primary/10 p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{translations.total}</h3>
        <div className="text-2xl font-bold">${total.toFixed(2)}</div>
      </div>
      
      <div className="text-sm text-muted-foreground mt-1">
        {totalCredits} {translations.credits}
      </div>
    </div>
  );
};

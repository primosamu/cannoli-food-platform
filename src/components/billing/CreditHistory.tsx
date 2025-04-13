
import React from 'react';
import { CreditHistoryTable, CreditTransaction } from "@/components/billing/CreditHistoryTable";
import { CreditUsageChart } from "@/components/billing/CreditUsageChart";
import { useLanguage } from "@/contexts/LanguageContext";

interface CreditHistoryProps {
  transactions: CreditTransaction[];
  usageData: {
    type: string;
    value: number;
    color: string;
  }[];
  totalCredits: number;
}

export const CreditHistory: React.FC<CreditHistoryProps> = ({ 
  transactions, 
  usageData,
  totalCredits 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <CreditHistoryTable transactions={transactions} />
      </div>
      <div>
        <CreditUsageChart data={usageData} total={totalCredits} />
      </div>
    </div>
  );
};

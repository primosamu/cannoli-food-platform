
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface CreditCostsInfoProps {
  selectedTab: 'phone' | 'message' | 'campaign';
  costs: {
    phone: number;
    message: number;
    campaign: number;
  };
}

export const CreditCostsInfo: React.FC<CreditCostsInfoProps> = ({ selectedTab, costs }) => {
  const { translations } = useLanguage();
  
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-2">
        <span>{translations.creditCosts}</span>
        <span className="font-medium">
          ${costs[selectedTab]} 
          {selectedTab === 'phone' && translations.eachPhoneEnrichment}
          {selectedTab === 'message' && translations.eachMessageSent}
          {selectedTab === 'campaign' && translations.eachCampaignCreated}
        </span>
      </div>
    </div>
  );
};
